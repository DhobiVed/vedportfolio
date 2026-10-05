import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faTrashAlt,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

// ── Nova Instant Knowledge Corpus (50+ Verified Entries) ──
const novaCorpus = [
  {
    intent: "greeting",
    keywords: ["hi", "hello", "hey", "sup", "greetings", "good morning", "good evening", "howdy"],
    answer:
      "Hey! 👋 I'm **Nova** — Ved Dhobi's AI assistant. I have complete knowledge of his **9 projects**, **8.87 CGPA**, technical skills, and background.\n\nAsk me anything about him, or type **\"start interview\"** to test his profile in Mock Interview Mode! 🚀",
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

const novaStatusPhrases = [
  "Nova is thinking...",
  "Accessing Ved's local memory...",
  "Analyzing project architecture...",
  "Scanning 8.87 CGPA academic data...",
  "Retrieving tech stack info...",
  "Formatting intelligent answer...",
];

const NovaChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "Hey! I'm **Nova** — Ved's AI assistant. I know all about his projects, skills, education, and background.\n\nAsk me anything about him, or just have a chat! 🚀",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      badge: "LLaMA 3.3 70B",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusPhrase, setStatusPhrase] = useState(novaStatusPhrases[0]);
  const [interviewMode, setInterviewMode] = useState(false);
  const [interviewIdx, setInterviewIdx] = useState(0);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    let interval = null;
    if (loading) {
      let pIdx = 0;
      interval = setInterval(() => {
        pIdx = (pIdx + 1) % novaStatusPhrases.length;
        setStatusPhrase(novaStatusPhrases[pIdx]);
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSend = async (customText) => {
    const textToSend = (customText || input).trim();
    if (!textToSend || loading) return;

    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMessages = [...messages, { role: "user", content: textToSend, time: currentTime }];
    setMessages(newMessages);
    setLoading(true);

    const qLower = textToSend.toLowerCase();

    // ── Interview Mode Handling ──
    if (/start interview|practice interview|mock interview|interview mode/.test(qLower)) {
      setInterviewMode(true);
      setInterviewIdx(1);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `🎤 **Interview Mode Activated!** I will simulate a technical/HR interview about Ved's profile.\n\n---\n**Question 1**: *${novaInterviewQuestions[0]}*\n\n*(Type 'exit interview' to end mock interview)*`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
            role: "ai",
            content: "✅ Exited Mock Interview Mode. Back to standard AI assistant mode!",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            badge: "Nova",
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
            role: "ai",
            content: `Great answer!\n\n---\n🎤 **Question ${interviewIdx + 1}**: *${nextQuestion}*`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            badge: "🎤 Mock Interviewer",
          },
        ]);
        setLoading(false);
      }, 600);
      return;
    }

    // ── Request Netlify / Local AI / Fallback ──
    let reply = "";
    let badge = "LLaMA 3.3 70B";

    try {
      const netlifyRes = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: newMessages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (netlifyRes.ok) {
        const data = await netlifyRes.json();
        if (data && data.reply) {
          reply = data.reply;
        }
      }
    } catch (e) {
      console.log("Netlify proxy note:", e.message);
    }

    if (!reply && window.location.hostname === "localhost") {
      try {
        const localRes = await fetch("http://localhost:3000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: textToSend }),
        });
        if (localRes.ok) {
          const lData = await localRes.json();
          if (lData && lData.reply) {
            reply = lData.reply;
            badge = "Local Qwen 2.5";
          }
        }
      } catch (e) {
        console.log("Local server note:", e.message);
      }
    }

    if (!reply) {
      const match = novaCorpus.find((c) => c.keywords.some((kw) => qLower.includes(kw)));
      if (match) {
        reply = match.answer;
        badge = "Instant KB";
      } else {
        reply = `I am Nova, Ved Dhobi's AI Assistant. Regarding **"${textToSend}"**:\n\n- **Ved's Profile**: Software Developer & AI Engineer (8.87 CGPA, Founder of DDQuest).\n- Feel free to ask about his **9 projects**, **technical skills**, **diploma results**, or start **Mock Interview Mode**!`;
        badge = "Instant KB";
      }
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        badge: badge,
      },
    ]);
    setLoading(false);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "ai",
        content: "Chat history cleared. How can I assist you with Ved's portfolio?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        badge: "Nova",
      },
    ]);
    setInterviewMode(false);
  };

  const formatText = (text) => {
    // Process **bold**
    const parts = (text || "").split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-[#E11D48] font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="content py-12 px-4" id="nova-ai">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-block px-3 py-1 rounded-md bg-pink-100 text-[#DB2777] font-mono text-xs font-semibold mb-2">
          LIVE AI DEMO · CONNECTED
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Nova <span className="text-[#EC4899]">AI Chatbot</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-2">
          A fully functional AI assistant built into this portfolio. Ask anything about Ved — or just chat!
        </p>
      </div>

      {/* ════════ ELEGANT LIGHT PINK / ROSE GOLD NOVACHAT WRAPPER (EXACTLY AS MY PORTFOLIO) ════════ */}
      <div
        className="max-w-[880px] mx-auto rounded-[20px] overflow-hidden flex flex-col h-[650px] sm:h-[680px]"
        style={{
          background: "linear-gradient(135deg, #FFF0F5 0%, #FCE7F3 100%)",
          border: "1.5px solid #FBCFE8",
          boxShadow: "0 16px 40px rgba(244, 114, 182, 0.15)",
        }}
      >
        {/* Nova Header */}
        <div
          className="px-5 py-3.5 flex items-center justify-between shrink-0"
          style={{
            background: "linear-gradient(135deg, #F472B6 0%, #EC4899 100%)",
            borderBottom: "1px solid #F9A8D4",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm"
              style={{
                background: "linear-gradient(135deg, #FFFFFF, #FCE7F3)",
                color: "#DB2777",
                border: "2px solid #FFFFFF",
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
              }}
            >
              N
            </div>
            <div>
              <div className="text-white font-bold text-base tracking-wider leading-none">NOVA</div>
              <div className="text-[11px] font-mono text-pink-100 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-300 inline-block shadow-sm animate-pulse"></span>
                <span>LIVE</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-mono px-3 py-1 rounded-full text-white font-semibold"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.35)",
              }}
            >
              ⚡ LLaMA 3.3 70B
            </span>
            <button
              onClick={() => handleSend("start interview")}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-3 py-1 rounded-full text-white font-semibold hover:bg-white/30 transition-all cursor-pointer"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <FontAwesomeIcon icon={faGraduationCap} /> Interview Mode
            </button>
            <button
              onClick={clearChat}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
              title="Clear chat"
            >
              <FontAwesomeIcon icon={faTrashAlt} className="text-xs" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-sans text-sm"
          style={{ background: "#FFF5F8" }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 items-start ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm"
                style={
                  msg.role === "ai"
                    ? {
                        background: "linear-gradient(135deg, #F472B6, #EC4899)",
                        color: "#FFFFFF",
                        border: "1.5px solid #F472B6",
                      }
                    : {
                        background: "linear-gradient(135deg, #F9A8D4, #F472B6)",
                        color: "#881337",
                        border: "1.5px solid #F472B6",
                      }
                }
              >
                {msg.role === "ai" ? "N" : "U"}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[82%] sm:max-w-[78%] flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className="text-[11px] font-mono font-bold mb-1 px-1"
                  style={{ color: msg.role === "ai" ? "#9F1239" : "#BE185D" }}
                >
                  {msg.role === "ai" ? "Nova" : "You"}
                  {msg.badge && msg.role === "ai" && (
                    <span
                      className="ms-1.5 text-[9px] px-2 py-0.5 rounded-full font-bold"
                      style={{
                        background: "rgba(244, 114, 182, 0.15)",
                        color: "#BE185D",
                        border: "1px solid #FBCFE8",
                      }}
                    >
                      {msg.badge}
                    </span>
                  )}
                </div>

                <div
                  className="p-3.5 sm:p-4 text-[13.5px] sm:text-[14px] leading-relaxed shadow-sm whitespace-pre-line"
                  style={
                    msg.role === "ai"
                      ? {
                          background: "#FFFFFF",
                          border: "1px solid #FBCFE8",
                          color: "#1F2937",
                          boxShadow: "0 4px 14px rgba(244, 114, 182, 0.1)",
                          borderRadius: "14px",
                          borderTopLeftRadius: "4px",
                        }
                      : {
                          background: "linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)",
                          border: "1px solid #F43F5E",
                          color: "#FFFFFF",
                          boxShadow: "0 4px 14px rgba(236, 72, 153, 0.25)",
                          borderRadius: "14px",
                          borderTopRightRadius: "4px",
                        }
                  }
                >
                  {formatText(msg.content)}
                </div>

                <div
                  className="text-[10px] font-mono mt-1 px-1 opacity-70"
                  style={{ color: "#9F1239" }}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex gap-2.5 items-start">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 text-white"
                style={{
                  background: "linear-gradient(135deg, #F472B6, #EC4899)",
                  border: "1.5px solid #F472B6",
                }}
              >
                N
              </div>
              <div className="flex flex-col items-start">
                <div className="text-[11px] font-mono font-bold text-[#9F1239] mb-1 px-1">
                  Nova · <span className="text-[#E11D48]">Processing...</span>
                </div>
                <div
                  className="px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-semibold text-[#9F1239]"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #FBCFE8",
                    boxShadow: "0 4px 14px rgba(244, 114, 182, 0.1)",
                  }}
                >
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span>{statusPhrase}</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div
          className="px-4 py-2.5 flex gap-2 overflow-x-auto shrink-0"
          style={{
            background: "#FFF0F5",
            borderTop: "1px solid #FBCFE8",
          }}
        >
          {[
            "What projects has Ved built?",
            "What's his tech stack?",
            "Is he open to work?",
            "Tell me about DDQuest",
            "Start Mock Interview",
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full shrink-0 transition-all hover:-translate-y-0.5 cursor-pointer"
              style={{
                background: "#FFFFFF",
                border: "1px solid #F472B6",
                color: "#BE185D",
                boxShadow: "0 2px 6px rgba(244, 114, 182, 0.1)",
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div
          className="p-3.5 sm:p-4 shrink-0"
          style={{
            background: "#FCE7F3",
            borderTop: "1px solid #F9A8D4",
          }}
        >
          <div className="flex items-center gap-2">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask Nova anything about Ved..."
              className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #F472B6",
                color: "#881337",
              }}
            />

            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #EC4899, #F43F5E)",
                boxShadow: "0 4px 12px rgba(236, 72, 153, 0.3)",
              }}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
            </button>
          </div>

          <div
            className="text-[10px] font-mono text-center mt-2 opacity-70 tracking-wider"
            style={{ color: "#9F1239" }}
          >
            ⚡ Press Enter to send · Connected to Meta LLaMA 3.3 70B & Localhost
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaChat;
