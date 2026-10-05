const https = require('https');

function getSystemPrompt() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return `You are Nova, a highly intelligent personal AI assistant embedded in Ved Dhobi's developer portfolio. You represent Ved professionally, accurately, and intelligently.

TODAY: ${currentDate}

RESPONSE STYLE & MEMORY:
- Natural, confident, human-like, and professional tone.
- Short questions -> concise, punchy answers. "Tell me everything" or deep questions -> structured, detailed technical breakdown.
- Use clean Markdown: bolding, bullet points, and code blocks where applicable.
- NEVER invent, guess, or hallucinate personal details about Ved Dhobi.
- For general questions (coding, algorithms, data structures, history, science, sports, tech trends): Use your FULL built-in AI intelligence to provide complete, accurate, helpful, and insightful answers!

VERIFIED FACTS ABOUT VED DHOBI:
- Full Name: Ved Dhobi
- Role: Software Developer | Native Android Developer (Java + Firebase) | AI/ML Builder | Startup Founder
- Location: Modasa, Aravalli District, Gujarat, India
- Contact: veddhobi252@gmail.com | +91 70433 62186 | github.com/DhobiVed | linkedin.com/in/ved-dhobi-7b3a88376
- Job Status: OPEN TO WORK — Entry-level Software Dev, Android Dev, AI/ML Engineer. Strongly prefers Remote / WFH.

ACADEMIC RECORD:
1. SSC (10th Grade) — Shri K N Shah Modasa High School (GSEB), 2022.
2. Diploma in Information Technology — Govt. Polytechnic Himatnagar, GTU (2022–2025).
   - Overall CGPA: 8.87 / 10.0
   - Final Semester: 9.26 CGPA (⭐ Top Semester)
   - Honors: 🏆 Best Performance Award Winner for the batch
   - Sem Results: Sem 1 (7.16), Sem 2 (8.00), Sem 3 (8.86), Sem 4 (8.74), Sem 5 (8.65), Sem 6 (9.26)
3. BE Computer Engineering — GEC Modasa (Gujarat Technological University), 2025–2028.
   - D2D (Diploma-to-Degree) lateral entry, currently pursuing.

ALL 9 PROJECTS:
1. DDQuest Mobile App ⭐: Flagship startup app providing free organized study materials for GTU Diploma IT students in Gujarat. Built solo with Java (Android Studio), Firebase Auth, Firestore, Firebase Storage, FCM Push Notifications. Optimized with startAfter() cursor pagination (90% read cost reduction) and offline disk caching.
2. Smart Attendance System: Native Android biometric attendance using Google ML Kit for on-device face recognition (~50ms speed). Privacy-first architecture — zero raw face images uploaded to cloud.
3. Academix — Class Manager: Full-stack web application for classrooms, assignments, and grades. Built with Django Class-Based Views (CBV), Django Auth, PostgreSQL, deployed on Render cloud.
4. Nova AI Chatbot: Production-ready high-speed AI chatbot deployed on Streamlit Cloud using Groq LPU API (~50ms latency) with multi-turn conversation memory.
5. Advanced AI Chatbot Suite: Python AI suite with PDF Q&A using Retrieval-Augmented Generation (RAG) architecture and OpenAI embeddings to prevent hallucinations.
6. QuickCommerce Delivery App: Native Android delivery app with real-time Firestore document snapshot listeners for instant order updates without polling.
7. Smart Mall Billing System: Point of Sale (POS) and inventory management system backed by MySQL relational database, barcode scanning, and stock deduction.
8. DDQuest Web Platform: Responsive companion web portal for the DDQuest startup ecosystem (HTML5, CSS3, JS, Firebase).
9. Developer Portfolio Website: Full-stack portfolio built with React 19, Vite 6, Tailwind CSS v4, and NovaChat AI knowledge engine.

TECHNICAL SKILLS:
- Languages: Python, Java, JavaScript (ES6+), HTML5, CSS3, SQL, C
- Mobile: Native Android (Java), Firebase (Auth, Firestore, Storage, FCM), Google ML Kit
- AI/ML: Scikit-learn, Pandas, NumPy, Streamlit, Groq API (~50ms), OpenAI API, RAG Pipelines
- Web/Backend: Django (CBV, Auth, ORM), Flask, Node.js, Express, REST APIs
- Databases: Firestore (NoSQL), PostgreSQL, MySQL, MongoDB Atlas
- Tools & Cloud: Git, GitHub, Netlify, Render, IBM Cloud, GCP

EXPERIENCE & HACKATHONS:
- DDQuest: Founder & Solo Lead Developer (2023–Present).
- InfoLabz: Machine Learning Internship (August 2024) — Supervised ML classification pipelines.
- Hackathon: Participated in college-level internal hackathon under the Smart India Hackathon (SIH) initiative.`;
}

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const PRIMARY_MODEL = 'qwen/qwen3.8-27b';
const FALLBACK_MODEL = 'openai/gpt-oss-120b';

function callGroq(model, messages) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model: model,
      messages: messages,
      max_tokens: 4096,
      temperature: 0.3
    });

    const req = https.request({
      hostname: 'api.groq.com',
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GROQ_API_KEY,
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 18000
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk.toString(); });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.choices && parsed.choices[0] && parsed.choices[0].message) {
            let content = parsed.choices[0].message.content || '';
            content = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
            resolve({ reply: content, model: model });
          } else if (parsed.error) {
            reject(new Error(parsed.error.message || 'Groq API error'));
          } else {
            reject(new Error('Empty response from Groq'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Groq request timeout'));
    });

    req.write(payload);
    req.end();
  });
}

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const userMessage = String(body.message || '').trim();
    const history = Array.isArray(body.history) ? body.history : [];

    if (!userMessage) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Message is required' }) };
    }

    if (!GROQ_API_KEY) {
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({ error: 'Groq API key not configured', fallback: true })
      };
    }

    const messages = [{ role: 'system', content: getSystemPrompt() }];
    for (const turn of history.slice(-6)) {
      if (turn.role && turn.content) {
        messages.push({
          role: turn.role === 'user' ? 'user' : 'assistant',
          content: String(turn.content).slice(0, 1000)
        });
      }
    }
    messages.push({ role: 'user', content: userMessage });

    try {
      const res = await callGroq(PRIMARY_MODEL, messages);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ reply: res.reply, source: res.model })
      };
    } catch (primaryErr) {
      console.log('Primary model error, trying fallback:', primaryErr.message);
      const fallbackRes = await callGroq(FALLBACK_MODEL, messages);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ reply: fallbackRes.reply, source: fallbackRes.model })
      };
    }

  } catch (error) {
    console.error('Chat error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Internal server error', fallback: true })
    };
  }
};
