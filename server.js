/**
 * Local AI Proxy Server for NovaChat (Ollama + Qwen 2.5:1.5B)
 * Target RAM Footprint: ~1.4 - 1.8 GB RAM
 * Zero npm dependencies (built with native Node.js modules)
 */

const http = require('http');
const { VED_KNOWLEDGE_BASE } = require('./knowledge_base/system_prompt.js');

const PORT = 3000;
const OLLAMA_HOST = '127.0.0.1';
const OLLAMA_PORT = 11434;
const MODEL_NAME = 'qwen2.5:1.5b';

const server = http.createServer((req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'GET' && req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', model: MODEL_NAME, ram_target: '1.5GB-2GB' }));
        return;
    }

    if (req.method === 'POST' && req.url === '/api/chat') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const userMessage = data.message || '';
                const history = Array.isArray(data.history) ? data.history : [];

                // Format messages array with system prompt + conversation history
                const messages = [
                    { role: 'system', content: VED_KNOWLEDGE_BASE }
                ];

                // Append last 6 turns of conversation history for memory
                const recentHistory = history.slice(-6);
                for (const turn of recentHistory) {
                    if (turn.role && turn.content) {
                        messages.push({
                            role: turn.role === 'user' ? 'user' : 'assistant',
                            content: turn.content
                        });
                    }
                }

                // Add current message
                messages.push({ role: 'user', content: userMessage });

                const payload = JSON.stringify({
                    model: MODEL_NAME,
                    messages: messages,
                    stream: false,
                    options: {
                        temperature: 0.2, // Low temperature for high factual accuracy
                        num_predict: 250   // Fast response generation
                    }
                });

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
                        try {
                            const parsed = JSON.parse(ollamaData);
                            const reply = parsed.message ? parsed.message.content : 'Sorry, could not generate a response.';
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ reply: reply, source: 'local_ollama_qwen1.5b' }));
                        } catch (err) {
                            res.writeHead(502, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Failed to parse Ollama response', details: err.message }));
                        }
                    });
                });

                ollamaReq.on('error', (err) => {
                    res.writeHead(503, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Ollama service unavailable', fallback: true }));
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

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
    console.log(`[✓] NovaChat Local AI Proxy running at http://localhost:${PORT}`);
    console.log(`[+] Connected to Ollama model '${MODEL_NAME}' (~1.5GB RAM mode)`);
});
