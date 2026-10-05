/**
 * NovaChat AI Server — Production Grade
 * - Local Ollama proxy (Qwen 2.5:1.5B) for localhost
 * - Groq Cloud proxy (/api/chat/groq) for Netlify / HTTPS deployments
 * - Adaptive token budget based on query intent
 * - Context compression for long conversations
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { getSystemPrompt } = require('./knowledge_base/system_prompt.cjs');

// Auto-load .env file for local development immediately
if (fs.existsSync(path.join(__dirname, '.env'))) {
  const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf-8');
  envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) process.env[parts[0].trim()] = parts.slice(1).join('=').trim();
  });
}

const PORT = 3000;
const OLLAMA_HOST = '127.0.0.1';
const OLLAMA_PORT = 11434;
const MODEL_NAME = 'qwen2.5:1.5b';

// ─── Groq Cloud Config ─────────────────────────────────────────────────────
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = 'qwen/qwen3.8-27b'; // Active, ultra-fast (~400ms on Groq)
const GROQ_FALLBACK_MODEL = 'openai/gpt-oss-120b'; // 120B parameter reasoning fallback
// ──────────────────────────────────────────────────────────────────────────

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

// ─── Detect query intent for adaptive token budget ─────────────────────────
function detectIntent(message) {
  const q = (message || '').toLowerCase();
  // Deep-dive queries need more tokens
  if (/detail|explain|deep dive|tell me everything|full|complete|all about|architecture|how does|how did|describe|elaborate|breakdown|in depth/.test(q)) {
    return 'deep';
  }
  // Project-specific queries
  if (/ddquest|smart attendance|academix|quickcommerce|nova ai|billing|chatbot|portfolio website/.test(q)) {
    return 'project';
  }
  // Short conversational
  if (q.length < 40 || /^(hi|hello|hey|what|who|when|where|how are|thanks|ok|yes|no)\b/.test(q)) {
    return 'simple';
  }
  return 'normal';
}

// ─── Build Ollama options per intent ──────────────────────────────────────
function getOllamaOptions(intent) {
  return {
    temperature: 0.3,   // Grounded and natural
    top_p: 0.85,
    top_k: 40,
    num_ctx: 3072,      // Expanded context window
    num_thread: 8,
    repeat_penalty: 1.1,
    num_predict: 1536   // High output token budget to ensure full un-truncated responses for all 9 projects
  };
}

// ─── Build messages array with context compression ─────────────────────────
function buildMessages(userMessage, history) {
  const systemPrompt = getSystemPrompt();
  const messages = [{ role: 'system', content: systemPrompt }];

  // Keep last 6 turns (3 exchanges) for conversation memory
  const recentHistory = Array.isArray(history) ? history.slice(-6) : [];
  for (const turn of recentHistory) {
    if (turn.role && turn.content) {
      messages.push({
        role: turn.role === 'user' ? 'user' : 'assistant',
        content: String(turn.content).slice(0, 600) // Compress long history entries
      });
    }
  }
  messages.push({ role: 'user', content: userMessage });
  return messages;
}

// ─── Main HTTP Server ──────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  // Security & Cache headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // ── Health endpoint ──
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      model: MODEL_NAME,
      kb_version: '3.0-ultimate',
      groq_configured: GROQ_API_KEY !== 'YOUR_GROQ_API_KEY_HERE',
      context_window: 2048
    }));
    return;
  }

  // ── Local Ollama Chat endpoint (/api/chat) ──
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const userMessage = String(data.message || '').trim();
        const history = Array.isArray(data.history) ? data.history : [];
        const intent = detectIntent(userMessage);
        const messages = buildMessages(userMessage, history);
        const options = getOllamaOptions(intent);

        const payload = JSON.stringify({
          model: MODEL_NAME,
          messages,
          stream: false,
          options
        });

        let handled = false;

        const ollamaReq = http.request({
          hostname: OLLAMA_HOST,
          port: OLLAMA_PORT,
          path: '/api/chat',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
          }
        }, (ollamaRes) => {
          let ollamaData = '';
          ollamaRes.on('data', chunk => { ollamaData += chunk.toString(); });
          ollamaRes.on('end', () => {
            if (handled || res.headersSent) return;
            handled = true;
            try {
              const parsed = JSON.parse(ollamaData);
              const reply = parsed.message ? parsed.message.content : 'Sorry, I could not generate a response.';
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ reply, source: 'local_ollama_qwen2.5_1.5b', intent }));
            } catch (err) {
              callGroqFallback(messages, res, intent);
            }
          });
        });

        ollamaReq.on('error', () => {
          if (!handled && !res.headersSent) {
            handled = true;
            console.log('[Server] Ollama offline -> fallback to Groq Cloud Qwen 3.6');
            callGroqFallback(messages, res, intent);
          }
        });

        ollamaReq.setTimeout(20000, () => {
          if (!handled && !res.headersSent) {
            handled = true;
            ollamaReq.destroy();
            console.log('[Server] Ollama timeout -> fallback to Groq Cloud Qwen 3.6');
            callGroqFallback(messages, res, intent);
          }
        });

        ollamaReq.write(payload);
        ollamaReq.end();

      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    });
    return;
  }

  // ── Groq Cloud Chat endpoint (/api/chat/groq) ──
  if (req.method === 'POST' && req.url === '/api/chat/groq') {
    if (!GROQ_API_KEY || GROQ_API_KEY === 'YOUR_GROQ_API_KEY_HERE') {
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Groq API key not configured', fallback: true }));
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const userMessage = String(data.message || '').trim();
        const history = Array.isArray(data.history) ? data.history : [];
        const intent = detectIntent(userMessage);
        const messages = buildMessages(userMessage, history);

        const maxTokens = intent === 'deep' ? 700 : intent === 'project' ? 600 : intent === 'simple' ? 200 : 400;

        const groqPayload = JSON.stringify({
          model: GROQ_MODEL,
          messages,
          max_tokens: maxTokens,
          temperature: 0.3,
          top_p: 0.85
        });

        const groqReq = https.request({
          hostname: 'api.groq.com',
          path: '/openai/v1/chat/completions',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Length': Buffer.byteLength(groqPayload)
          }
        }, (groqRes) => {
          let groqData = '';
          groqRes.on('data', chunk => { groqData += chunk.toString(); });
          groqRes.on('end', () => {
            try {
              const parsed = JSON.parse(groqData);
              if (parsed.error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: parsed.error.message, fallback: true }));
                return;
              }
              const reply = parsed.choices && parsed.choices[0] ? parsed.choices[0].message.content : 'No response generated.';
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ reply, source: `groq_${GROQ_MODEL}`, intent }));
            } catch (err) {
              res.writeHead(502, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Failed to parse Groq response', fallback: true }));
            }
          });
        });

        groqReq.on('error', (err) => {
          res.writeHead(503, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Groq service unavailable', fallback: true }));
        });

        groqReq.write(groqPayload);
        groqReq.end();

      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    });
    return;
  }

  // ── Static file serving ──
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') reqUrl = '/index.html';

  const filePath = path.join(__dirname, reqUrl);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  const groqReady = GROQ_API_KEY !== 'YOUR_GROQ_API_KEY_HERE';
  console.log(`═══════════════════════════════════════════════════`);
  console.log(`🚀 NovaChat AI Server v3.0 — http://localhost:${PORT}`);
  console.log(`🧠 Local LLM : ${MODEL_NAME} | ctx: 2048 tokens`);
  console.log(`☁️  Groq Cloud: ${groqReady ? '✅ Configured (LLaMA 3.1 8B)' : '⚠️  Not configured — set GROQ_API_KEY'}`);
  console.log(`📚 KB Version: 3.0-ultimate (9 projects, full architecture)`);
  console.log(`═══════════════════════════════════════════════════`);
  if (!groqReady) {
    console.log(`\n💡 To enable Groq (free): https://console.groq.com → copy key → set GROQ_API_KEY in start_app.js\n`);
  }
});

function callGroqFallback(messages, res, intent) {
  if (res.headersSent) return;
  if (!GROQ_API_KEY || GROQ_API_KEY === 'YOUR_GROQ_API_KEY_HERE') {
    res.writeHead(503, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ollama offline & Groq not configured' }));
    return;
  }
  const groqPayload = JSON.stringify({
    model: GROQ_MODEL,
    messages,
    max_tokens: 8192,
    temperature: 0.3
  });
  const req = https.request({
    hostname: 'api.groq.com',
    path: '/openai/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GROQ_API_KEY,
      'Content-Length': Buffer.byteLength(groqPayload)
    }
  }, (groqRes) => {
    let gData = '';
    groqRes.on('data', chunk => { gData += chunk.toString(); });
    groqRes.on('end', () => {
      if (res.headersSent) return;
      try {
        const parsed = JSON.parse(gData);
        if (parsed.choices && parsed.choices[0]) {
          let raw = parsed.choices[0].message.content || '';
          raw = raw.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ reply: raw, source: `groq_${GROQ_MODEL}`, intent }));
        } else {
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Groq empty response', details: parsed }));
        }
      } catch (err) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Groq parse error' }));
      }
    });
  });
  req.on('error', () => {
    if (res.headersSent) return;
    res.writeHead(503, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Groq service error' }));
  });
  req.write(groqPayload);
  req.end();
}
