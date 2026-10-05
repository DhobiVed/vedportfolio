import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faRobot,
  faUser,
  faTrashAlt,
  faGraduationCap,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

// ── Full System Knowledge Prompt for Groq Cloud Direct Execution ──
const VED_SYSTEM_PROMPT = `You are Nova, an exceptionally intelligent personal AI assistant embedded in Ved Dhobi's developer portfolio. You represent Ved professionally, accurately, and with deep technical understanding.

TODAY: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

STYLE & GUIDELINES:
- Natural, confident, professional, and helpful tone.
- Format responses cleanly with Markdown: bold text, bullet points, headers, and code blocks.
- Answer any question about Ved's 9 projects, 8.87 CGPA, skills, education, experience, and contact details with 100% verified accuracy.
- For general questions (programming, computer science, Python, Java, JS, algorithms, system design, math, science, sports, and general knowledge): Use your FULL AI intelligence to provide detailed, brilliant, accurate, and structured answers!

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
3. BE Computer Engineering — GEC Modasa (GTU), 2025–2028.
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

EXPERIENCE:
- DDQuest: Founder & Solo Lead Developer (2023–Present).
- InfoLabz: Machine Learning Internship (August 2024) — Supervised ML classification pipelines.
- Hackathon: Participated in college-level internal hackathon under the Smart India Hackathon (SIH) initiative.`;

// ── Verified Instant Knowledge Corpus (50+ entries) ──
const novaCorpus = [
  {
    intent: "greeting",
    keywords: ["hi", "hello", "hey", "sup", "greetings", "good morning", "good evening", "howdy"],
    answer:
      "Hey! 👋 I'm **Nova** — Ved Dhobi's personal AI assistant. I have complete knowledge of his **9 projects**, **8.87 CGPA**, technical skills, and background.\n\nYou can ask me:\n- \"Tell me about DDQuest\" (his startup)\n- \"What are his technical skills?\"\n- \"Explain the Smart Attendance System\"\n- \"What is his CGPA?\"\n\nOr ask any programming, AI, or general knowledge question!",
  },
  {
    intent: "profile",
    keywords: ["who is ved", "about ved", "tell me about ved", "who is he", "biography", "intro"],
    answer:
      "**Ved Dhobi** is a Software Developer, Native Android Specialist (Java + Firebase), and AI Builder from Modasa, Gujarat, India.\n\n- **Education**: BE Computer Engineering at GEC Modasa (GTU 2025–2028). Diploma IT **8.87 / 10.0 CGPA** at Govt. Polytechnic Himatnagar (2022–2025, 🏆 Best Performance Award, 9.26 Final Sem).\n- **Startup**: Solo Founder of **DDQuest** (GTU diploma study app).\n- **Job Status**: 🟢 **Open to Work** (Entry-level Software / Android / AI roles, prefers Remote/WFH).\n- **Projects**: 9 flagship projects across Android, Django, and AI pipelines.",
  },
  {
    intent: "cgpa",
    keywords: ["cgpa", "marks", "percentage", "result", "diploma score", "grade", "academic score", "sgpa"],
    answer:
      "Ved achieved an outstanding **8.87 / 10.0 Overall CGPA** in Diploma in Information Technology at Govt. Polytechnic Himatnagar (GTU):\n\n- **Sem 1**: 7.16 SGPA\n- **Sem 2**: 8.00 SGPA\n- **Sem 3**: 8.86 SGPA\n- **Sem 4**: 8.74 SGPA\n- **Sem 5**: 8.65 SGPA\n- **Sem 6**: **9.26 SGPA** (⭐ Top Sem)\n- **Award**: 🏆 **Best Performance Award Winner**\n\nYou can view all 6 semester marksheets directly in the **Results section** on this page!",
  },
  {
    intent: "ddquest",
    keywords: ["ddquest", "study material app", "diploma app", "gtu app", "startup"],
    answer:
      "**DDQuest** is Ved's flagship Android startup app for GTU Diploma IT students in Gujarat:\n\n- **Tech Stack**: Native Java (Android Studio), Firebase Auth, Firestore DB, Firebase Storage, FCM Push Notifications.\n- **Optimization**: `startAfter()` cursor pagination reducing Firestore read costs by **90%**.\n- **Key Features**: Offline PDF disk caching, subject-wise organized notes, notification triggers, search functionality.",
  },
  {
    intent: "attendance",
    keywords: ["smart attendance", "face recognition", "ml kit", "biometric attendance"],
    answer:
      "**Smart Attendance System** is an Android biometric attendance application built by Ved:\n\n- **Tech Stack**: Native Java, Google ML Kit (Face Detection), Firestore.\n- **Performance**: On-device face detection in **~50ms** speed.\n- **Privacy**: Zero cloud face uploads — embeddings processed on-device for total privacy.",
  },
  {
    intent: "academix",
    keywords: ["academix", "django", "class manager", "class management"],
    answer:
      "**Academix — Class Manager** is a full-stack web application built by Ved:\n\n- **Tech Stack**: Python, Django Class-Based Views (CBV), Django Auth, PostgreSQL, Render Cloud.\n- **Features**: Teacher vs student roles, classroom management, assignments, and automated grading.",
  },
  {
    intent: "skills",
    keywords: ["skill", "skills", "programming languages", "tech stack", "frameworks"],
    answer:
      "**Ved Dhobi's Technical Stack**:\n\n- **Languages**: Python, Java, JavaScript (ES6+), HTML5, CSS3, SQL, C\n- **Mobile**: Native Android (Java), Firebase (Auth/Firestore/Storage/FCM), Google ML Kit\n- **AI & ML**: Scikit-learn, Pandas, NumPy, Streamlit, Groq LPU API (~50ms), OpenAI API, RAG Architecture\n- **Web & DB**: Django (CBV, Auth, ORM), Flask, Node.js, PostgreSQL, MySQL, Firestore, MongoDB Atlas",
  },
  {
    intent: "contact",
    keywords: ["contact", "email", "phone", "whatsapp", "linkedin", "github", "hire", "job", "resume", "cv"],
    answer:
      "**Contact Ved Dhobi**:\n\n- 📧 **Email**: veddhobi252@gmail.com\n- 📱 **Phone / WhatsApp**: +91 70433 62186\n- 💼 **LinkedIn**: linkedin.com/in/ved-dhobi-7b3a88376\n- 💻 **GitHub**: github.com/DhobiVed\n- 📄 **Resume**: Click the **View Resume** button on this site or open `/resume.pdf`\n- 📍 **Location**: Modasa, Gujarat, India\n- 🟢 **Job Status**: Open to Work (Entry-level Software, Android, AI/ML roles. Prefers Remote/WFH).",
  },
];

const novaInterviewQuestions = [
  "Tell me about yourself and your technical background.",
  "What is your strongest technical skill and why?",
  "Tell me about DDQuest — what problem does it solve and how did you build it?",
  "How does the Smart Attendance System work? Explain the face recognition architecture.",
  "What is Firebase Firestore and how did you optimize it in DDQuest?",
  "What is the difference between Supervised and Unsupervised Machine Learning?",
  "Tell me about your ML internship at InfoLabz. What did you work on?",
  "What is RAG (Retrieval-Augmented Generation) and where did you apply it?",
  "Why do you prefer Remote/WFH? How do you stay productive?",
  "What is your greatest achievement as a student developer?",
  "Where do you see yourself in 3 years as a software engineer?",
];

// ── Pronoun & Context Resolver ──
function novaResolveContext(query, history) {
  const q = (query || "").toLowerCase();
  if (!Array.isArray(history) || history.length < 2) return query;

  const pronouns = ["it", "that", "this", "its", "the project", "explain more", "tell me more", "continue", "more details", "what about"];
  const hasPronoun = pronouns.some((p) => q.includes(p));
  if (!hasPronoun) return query;

  let lastUser = "";
  let lastAI = "";
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].role === "user" && !lastUser) lastUser = history[i].content || "";
    if (history[i].role === "assistant" && !lastAI) lastAI = history[i].content || "";
    if (lastUser && lastAI) break;
  }
  const combined = (lastUser + " " + lastAI).toLowerCase();

  if (/ddquest|startup|study material/.test(combined)) return query + " [CONTEXT: DDQuest Mobile App project]";
  if (/smart attendance|face recognition|ml kit/.test(combined)) return query + " [CONTEXT: Smart Attendance System project]";
  if (/academix|django|class manager/.test(combined)) return query + " [CONTEXT: Academix project]";
  if (/nova ai|groq|llama|streamlit/.test(combined)) return query + " [CONTEXT: Nova AI Chatbot project]";
  if (/quickcommerce|delivery/.test(combined)) return query + " [CONTEXT: QuickCommerce Delivery App]";
  if (/billing|mall|pos/.test(combined)) return query + " [CONTEXT: Smart Mall Billing System]";
  if (/education|diploma|degree|cgpa|8.87/.test(combined)) return query + " [CONTEXT: Ved's academic education]";
  if (/skill|language|tech stack/.test(combined)) return query + " [CONTEXT: Ved's technical skills]";

  return query;
}

const NovaChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm **Nova**, Ved Dhobi's AI Knowledge Engine.\n\nI can answer questions about his **9 projects**, **8.87 CGPA**, **technical skills**, or test you in **Mock Interview Mode**! Feel free to ask anything.",
      badge: "✨ Nova AI Engine",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [interviewMode, setInterviewMode] = useState(false);
  const [interviewIdx, setInterviewIdx] = useState(0);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const rawQuery = (textToSend || input).trim();
    if (!rawQuery || loading) return;

    setInput("");
    const resolvedQuery = novaResolveContext(rawQuery, messages);
    const newMessages = [...messages, { role: "user", content: rawQuery }];
    setMessages(newMessages);
    setLoading(true);

    const qLower = rawQuery.toLowerCase();

    // ── Check Mock Interview Mode ──
    if (/start interview|practice interview|mock interview|interview mode/.test(qLower)) {
      setInterviewMode(true);
      setInterviewIdx(1);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `🎤 **Interview Mode Activated!** I will simulate a technical/HR interview about Ved's profile.\n\n---\n**Question 1**: *${novaInterviewQuestions[0]}*\n\n*(Type 'exit interview' to end mock interview)*`,
            badge: "🎤 Mock Interviewer",
          },
        ]);
        setLoading(false);
      }, 500);
      return;
    }

    if (interviewMode) {
      if (qLower.includes("exit interview")) {
        setInterviewMode(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "✅ Exited Mock Interview Mode. Back to standard AI assistant mode!",
            badge: "✨ Nova AI Engine",
          },
        ]);
        setLoading(false);
        return;
      }

      const nextQuestion = novaInterviewQuestions[interviewIdx];
      const nextIdx = (interviewIdx + 1) % novaInterviewQuestions.length;
      setInterviewIdx(nextIdx);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Great response!\n\n---\n🎤 **Question ${interviewIdx + 1}**: *${nextQuestion}*`,
            badge: "🎤 Mock Interviewer",
          },
        ]);
        setLoading(false);
      }, 600);
      return;
    }

    // ── Powerful Multi-Tier AI Request Pipeline ──
    let aiReply = "";
    let replyBadge = "☁️ Groq Qwen 3.8 (27B)";

    const groqKey = import.meta.env.VITE_GROQ_API_KEY || "";

    // Tier 1: Direct Groq Cloud API with Qwen 3.8 27B / GPT-OSS 120B
    if (groqKey) {
      try {
        const groqMessages = [
          { role: "system", content: VED_SYSTEM_PROMPT },
          ...newMessages.slice(-6).map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
        ];

        // Try primary model
        let groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: "qwen/qwen3.8-27b",
            messages: groqMessages,
            max_tokens: 4096,
            temperature: 0.3,
          }),
        });

        if (!groqRes.ok) {
          // Fallback to 120B model
          groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${groqKey}`,
            },
            body: JSON.stringify({
              model: "openai/gpt-oss-120b",
              messages: groqMessages,
              max_tokens: 4096,
              temperature: 0.3,
            }),
          });
        }

        if (groqRes.ok) {
          const gData = await groqRes.json();
          if (gData.choices && gData.choices[0] && gData.choices[0].message) {
            let content = gData.choices[0].message.content || "";
            content = content.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
            aiReply = content;
            replyBadge = `⚡ Groq Cloud (${gData.model})`;
          }
        }
      } catch (e) {
        console.log("Direct Groq call note:", e.message);
      }
    }

    // Tier 2: Production Netlify Serverless Function
    if (!aiReply) {
      try {
        const netlifyRes = await fetch("/.netlify/functions/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: resolvedQuery,
            history: newMessages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (netlifyRes.ok) {
          const nData = await netlifyRes.json();
          if (nData && nData.reply) {
            aiReply = nData.reply;
            replyBadge = `☁️ Serverless (${nData.source || "Groq Cloud"})`;
          }
        }
      } catch (e) {
        console.log("Netlify proxy note:", e.message);
      }
    }

    // Tier 3: Local Server proxy (http://localhost:3000/api/chat)
    if (!aiReply && window.location.hostname === "localhost") {
      try {
        const localRes = await fetch("http://localhost:3000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: resolvedQuery,
            history: newMessages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        if (localRes.ok) {
          const lData = await localRes.json();
          if (lData && lData.reply) {
            aiReply = lData.reply;
            replyBadge = "⚡ Local AI Server";
          }
        }
      } catch (e) {
        console.log("Local AI check note:", e.message);
      }
    }

    // Tier 4: Instant Knowledge Retrieval Corpus Fallback
    if (!aiReply) {
      const match = novaCorpus.find((item) => item.keywords.some((kw) => qLower.includes(kw)));
      if (match) {
        aiReply = match.answer;
        replyBadge = "⚡ Instant Knowledge Engine";
      } else {
        aiReply = `### **Information Overview**\nI am Nova, Ved Dhobi's AI Assistant. Regarding **"${rawQuery}"**:\n\n- **Ved's Profile**: Software Developer & AI Builder (8.87 CGPA, Founder of DDQuest).\n- **Ask Me**: Feel free to ask about his **9 projects**, **technical skills**, **diploma results**, or start **Mock Interview Mode**!`;
        replyBadge = "⚡ Instant Knowledge Engine";
      }
    }

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: aiReply, badge: replyBadge },
    ]);
    setLoading(false);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat history cleared. How can I assist you with Ved's portfolio?",
        badge: "✨ Nova AI Engine",
      },
    ]);
    setInterviewMode(false);
  };

  return (
    <div className="content py-16 px-4" id="nova-ai">
      {/* ════════ PICTO TEMPLATE UI DESIGN ════════ */}
      <div className="bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-purple-800/40">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white text-xl shadow-lg shadow-purple-900/50">
              <FontAwesomeIcon icon={faRobot} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                NovaChat AI Knowledge Engine
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  v3.0 Live
                </span>
              </h2>
              <p className="text-xs text-purple-200/70 font-mono mt-0.5">
                Powered by Groq Cloud (Qwen 3.8 27B & 120B LLM) + Verified KB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSend("start interview")}
              className="px-4 py-2 rounded-xl bg-purple-600/40 hover:bg-purple-600 text-purple-200 text-xs font-semibold border border-purple-400/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={faGraduationCap} /> Mock Interview Mode
            </button>
            <button
              onClick={clearChat}
              title="Clear Chat"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <FontAwesomeIcon icon={faTrashAlt} className="text-sm" />
            </button>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            "Tell me about DDQuest",
            "What is Ved's CGPA?",
            "Explain Smart Attendance System",
            "What are his technical skills?",
            "Start Mock Interview",
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-purple-600/30 border border-white/10 text-purple-200 text-xs font-medium transition-all cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="h-[430px] overflow-y-auto pr-2 space-y-4 font-sans custom-scrollbar">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white text-xs shrink-0 mt-1 shadow">
                  <FontAwesomeIcon icon={faRobot} />
                </div>
              )}

              <div
                className={`max-w-[85%] md:max-w-[78%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white rounded-tr-none shadow-md shadow-purple-900/40"
                    : "bg-white/10 text-gray-100 backdrop-blur-md border border-white/10 rounded-tl-none shadow-md"
                }`}
              >
                {msg.badge && (
                  <div className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 w-fit mb-2 border border-purple-400/20">
                    {msg.badge}
                  </div>
                )}
                <div className="whitespace-pre-line font-sans">{msg.content}</div>
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xs shrink-0 mt-1 shadow">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-purple-300 text-xs font-mono">
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white">
                <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
              </div>
              <span>Nova is thinking with high-performance LLM...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mt-6 flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Nova anything about Ved's projects, skills, CGPA, or general coding..."
            className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="btn btn-primary px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg shadow-purple-900/40"
          >
            <span>Send</span>
            <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NovaChat;
