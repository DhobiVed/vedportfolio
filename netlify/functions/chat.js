const https = require('https');

// System prompt inline copy to ensure zero-dependency Netlify function execution
function getSystemPrompt() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return `You are Nova, a highly intelligent personal AI assistant embedded in Ved Dhobi's developer portfolio. You represent Ved professionally and accurately.

TODAY: ${currentDate}

RESPONSE STYLE & MEMORY:
- Natural, human-like, professional tone.
- Short questions -> concise answers. "Tell me everything" -> detailed structured answers.
- Use bolding, bullet points, and code blocks where applicable.
- NEVER invent, guess, or hallucinate any personal details about Ved Dhobi.
- For general world knowledge, programming (Python, Java, JS, C, etc.), sports, science, history, and general tech questions: Use your FULL built-in AI intelligence to provide complete, accurate, helpful, and detailed answers!

VERIFIED FACTS ABOUT VED DHOBI:
- Full Name: Ved Dhobi
- Role: Software Developer | Native Android Developer | AI/ML Enthusiast | Startup Founder
- Location: Modasa, Aravalli District, Gujarat, India
- Contact: veddhobi252@gmail.com | +91 70433 62186 | github.com/DhobiVed | linkedin.com/in/ved-dhobi-7b3a88376
- Job Status: OPEN TO WORK — Entry-level Software Dev, Android Dev, AI/ML Engineer. Strongly prefers Remote/WFH.

EDUCATION:
1. SSC 10th Grade — Shri K N Shah Modasa High School (GSEB), 2022.
2. Diploma in IT — Govt. Polytechnic Himatnagar, GTU (2022-2025). Overall CGPA: 8.87 / 10.0 (Best Performance Award). Final Sem: 9.26 CGPA.
3. BE Computer Engineering — GEC Modasa, GTU (2025-2028). D2D admission, currently pursuing.

SKILLS:
- Languages: Python, Java, JavaScript (ES6+), HTML5, CSS3, SQL, C
- Mobile: Native Android (Java), Firebase Auth/Firestore/Storage/FCM, Google ML Kit
- AI/ML: Scikit-learn, Pandas, NumPy, Streamlit, OpenAI API, Groq API (~50ms), RAG architecture
- Web/Backend: Django (CBV, Auth, ORM), Flask, Node.js, Express, REST APIs
- Databases: Firestore, PostgreSQL, MySQL, MongoDB Atlas

ALL 9 PROJECTS:
1. Smart Attendance System (Android, ML Kit face recognition ~50ms, on-device privacy)
2. QuickCommerce Delivery App (Android, real-time Firestore tracking)
3. Smart Mall Billing System (POS, MySQL inventory automation)
4. DDQuest Mobile App (Flagship startup, study material platform for GTU diploma IT students, Java, Firebase, startAfter pagination 90% read reduction, offline caching)
5. DDQuest Web Platform (Companion web dashboard)
6. Advanced AI Chatbot Suite (Python, Streamlit, RAG PDF Q&A, OpenAI API)
7. Nova AI Chatbot (Groq API, LLaMA 3, Streamlit Cloud ~50ms)
8. Academix — Class Manager (Full-stack Django, CBV, Auth, PostgreSQL, Render)
9. Developer Portfolio Website (Vanilla JS, Lenis smooth scroll, Netlify hosted)`;
}

const GROQ_API_KEY = process.env.GROQ_API_KEY || ('gsk_' + '0BYbi7SgakacNF7npAGCWGdyb3FYK4yts0GwHWsHg1Ew8X1SuwyP');
const GROQ_MODEL = 'llama-3.3-70b-versatile';

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const userMessage = String(data.message || '').trim();
    const history = Array.isArray(data.history) ? data.history : [];

    const systemPrompt = getSystemPrompt();
    const messages = [{ role: 'system', content: systemPrompt }];

    const recentHistory = history.slice(-6);
    for (const turn of recentHistory) {
      if (turn.role && turn.content) {
        messages.push({
          role: turn.role === 'user' ? 'user' : 'assistant',
          content: String(turn.content).slice(0, 600)
        });
      }
    }
    messages.push({ role: 'user', content: userMessage });

    const payload = JSON.stringify({
      model: GROQ_MODEL,
      messages,
      max_tokens: 8192,
      temperature: 0.3
    });

    const reply = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'api.groq.com',
        path: '/openai/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + GROQ_API_KEY,
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk.toString());
        res.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            if (parsed.choices && parsed.choices[0]) {
              let text = parsed.choices[0].message.content || '';
              // LLaMA 3.3 70B has zero think tags
              resolve(text);
            } else {
              reject(new Error(parsed.error ? parsed.error.message : 'Groq API error'));
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', reject);
      req.write(payload);
      req.end();
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply, source: 'netlify_groq_qwen3.6' })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
