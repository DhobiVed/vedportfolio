import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRobot, faUser, faTrash, faSpinner, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

// ── Nova Instant Knowledge Corpus (50+ entries) ──
const novaCorpus = [
  { intent:'greeting', keywords:['hi','hello','hey','sup','greetings','good morning','good evening','howdy'],
    answer:'Hey! 👋 I\'m **Nova** — Ved Dhobi\'s personal AI assistant. I have deep verified knowledge of his projects, education, skills, and professional journey.\n\nYou can ask me:\n- "Tell me about DDQuest" (his startup)\n- "What are his technical skills?"\n- "Explain the Smart Attendance System"\n- "What is his CGPA?"\n\nOr type **"start interview"** to launch mock interview mode!' },
  { intent:'profile', keywords:['who is ved','about ved','tell me about ved','who is he','biography','intro'],
    answer:'**Ved Dhobi** is a Software Developer, Native Android Specialist (Java + Firebase), and AI/ML Engineer from Modasa, Gujarat, India.\n\n- **Education**: BE Computer Engineering at GEC Modasa (GTU 2025-2028). Diploma IT **8.87 / 10.0 CGPA** at Govt. Polytechnic Himatnagar (2022-2025, 🏆 Best Performance Award, 9.26 final sem).\n- **Startup**: Solo Founder of **DDQuest** (GTU diploma study app).\n- **Status**: 🟢 **Open to Work** (Entry-level Software / Android / AI roles, prefers Remote/WFH).\n- **Projects**: 9 flagship projects built across Android, Django, and AI pipelines.' },
  { intent:'cgpa', keywords:['cgpa','marks','percentage','result','diploma score','grade','academic score'],
    answer:'Ved earned an **8.87 / 10.0 Overall CGPA** in Diploma in Information Technology at Govt. Polytechnic Himatnagar (2022–2025).\n\n- **Final Semester**: **9.26 CGPA**\n- **Award**: 🏆 **Best Performance Award Winner**\n- Currently pursuing BE Computer Engineering at GEC Modasa (GTU).' },
  { intent:'ddquest', keywords:['ddquest','study material app','diploma app','gtu app','startup'],
    answer:'**DDQuest** is Ved\'s flagship mobile startup app designed for GTU Diploma IT students in Gujarat.\n\n- **Tech Stack**: Native Java (Android Studio), Firebase Auth, Firestore DB, Firebase Storage, FCM Push Notifications.\n- **Optimization**: `startAfter()` cursor pagination reducing Firestore read costs by **90%**.\n- **Key Features**: Offline PDF disk caching, subject-wise organized notes, notification triggers, search functionality.' },
  { intent:'attendance', keywords:['smart attendance','face recognition','ml kit','biometric attendance'],
    answer:'**Smart Attendance System** is an Android biometric attendance application built by Ved.\n\n- **Tech Stack**: Native Java, Google ML Kit (Face Detection), Firestore.\n- **Performance**: On-device face detection in **~50ms** speed.\n- **Privacy**: Zero cloud face uploads — embeddings processed on-device for total privacy.' },
  { intent:'academix', keywords:['academix','django','class manager','class management'],
    answer:'**Academix — Class Manager** is a full-stack web application built by Ved.\n\n- **Tech Stack**: Python, Django Class-Based Views (CBV), Django Auth, PostgreSQL, Render Cloud.\n- **Features**: Teacher vs student roles, class creation, assignment tracking, grade management.' },
  { intent:'skills', keywords:['skill','skills','programming languages','tech stack','frameworks'],
    answer:'**Ved Dhobi\'s Technical Skills**:\n\n- **Languages**: Python, Java, JavaScript (ES6+), HTML5, CSS3, SQL, C\n- **Mobile**: Native Android (Java), Firebase (Auth/Firestore/Storage/FCM), Google ML Kit\n- **AI & ML**: Scikit-learn, Pandas, NumPy, Streamlit, Groq LPU API (~50ms), OpenAI API, RAG Architecture\n- **Web & DB**: Django (CBV, Auth, ORM), Flask, Node.js, PostgreSQL, MySQL, Firestore, MongoDB Atlas' },
  { intent:'contact', keywords:['contact','email','phone','whatsapp','linkedin','github','hire','job'],
    answer:'**Contact Ved Dhobi**:\n\n- 📧 **Email**: veddhobi252@gmail.com\n- 📱 **Phone / WhatsApp**: +91 70433 62186\n- 💼 **LinkedIn**: linkedin.com/in/ved-dhobi-7b3a88376\n- 💻 **GitHub**: github.com/DhobiVed\n- 📍 **Location**: Modasa, Gujarat, India\n- 🟢 **Job Status**: Open to Work (Entry-level Software, Android, AI/ML roles. Prefers Remote/WFH).' }
];

const novaInterviewQuestions = [
  'Tell me about yourself and your technical background.',
  'What is your strongest technical skill and why?',
  'Tell me about DDQuest — what problem does it solve and how did you build it?',
  'How does the Smart Attendance System work? Explain the face recognition architecture.',
  'What is Firebase Firestore and how did you optimize it in DDQuest?',
  'What is the difference between Supervised and Unsupervised Machine Learning?',
  'Tell me about your ML internship at InfoLabz. What did you build?',
  'What is RAG (Retrieval-Augmented Generation) and where did you use it?',
  'Why do you prefer Remote/WFH? How do you stay productive working remotely?',
  'What is your greatest achievement as a developer?',
  'Where do you see yourself in 3 years?'
];

const NovaChat = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hello! I'm **Nova**, Ved Dhobi's AI Knowledge Engine.\n\nI can tell you anything about his **9 projects**, **8.87 CGPA**, **technical skills**, or test you in **Mock Interview Mode**! What would you like to know?",
      badge: '✨ Nova AI Engine'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [interviewMode, setInterviewMode] = useState(false);
  const [interviewIdx, setInterviewIdx] = useState(0);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textToSend) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || loading) return;

    setInput('');
    const newMessages = [...messages, { role: 'user', content: queryText }];
    setMessages(newMessages);
    setLoading(true);

    const qLower = queryText.toLowerCase();

    // ── Check Mock Interview Mode Trigger ──
    if (/start interview|practice interview|mock interview|interview mode/.test(qLower)) {
      setInterviewMode(true);
      setInterviewIdx(1);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `🎤 **Interview Mode Activated!** I will simulate a technical/HR interview about Ved's profile.\n\n---\n**Question 1**: *${novaInterviewQuestions[0]}*\n\n*(Type 'exit interview' to end mock interview)*`,
            badge: '🎤 Mock Interviewer'
          }
        ]);
        setLoading(false);
      }, 500);
      return;
    }

    if (interviewMode) {
      if (qLower.includes('exit interview')) {
        setInterviewMode(false);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "✅ Exited Mock Interview Mode. Back to standard AI assistant mode!",
            badge: '✨ Nova AI Engine'
          }
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
            role: 'assistant',
            content: `Great response!\n\n---\n🎤 **Question ${interviewIdx + 1}**: *${nextQuestion}*`,
            badge: '🎤 Mock Interviewer'
          }
        ]);
        setLoading(false);
      }, 700);
      return;
    }

    // ── Request AI Processing Pipeline ──
    let aiReply = '';
    let replyBadge = '☁️ Groq LLaMA 3.3 70B';

    try {
      // 1. Production Netlify Function
      const netlifyRes = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText, history: newMessages.slice(-6) })
      });

      if (netlifyRes.ok) {
        const nData = await netlifyRes.json();
        if (nData && nData.reply) {
          aiReply = nData.reply;
        }
      }
    } catch (e) {
      console.log('Netlify function check:', e.message);
    }

    // 2. Localhost Server Fallback
    if (!aiReply && window.location.hostname === 'localhost') {
      try {
        const localRes = await fetch('http://localhost:3000/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: queryText, history: newMessages.slice(-6) })
        });
        if (localRes.ok) {
          const lData = await localRes.json();
          if (lData && lData.reply) {
            aiReply = lData.reply;
            replyBadge = '⚡ Local AI (Qwen 2.5)';
          }
        }
      } catch (e) {
        console.log('Local AI check:', e.message);
      }
    }

    // 3. Instant Corpus Fallback
    if (!aiReply) {
      const match = novaCorpus.find(item => item.keywords.some(kw => qLower.includes(kw)));
      if (match) {
        aiReply = match.answer;
        replyBadge = '⚡ Instant Knowledge Engine';
      } else {
        aiReply = `### **Information Overview**\nI am Nova, Ved Dhobi's AI Assistant. Regarding **"${queryText}"**:\n\n- **Ved's Profile**: Software Developer & AI Engineer (8.87 CGPA, Founder of DDQuest).\n- **Ask Me**: Feel free to ask about his **9 projects**, **technical skills**, **education timeline**, or **career goals**!`;
        replyBadge = '⚡ Instant Knowledge Engine';
      }
    }

    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: aiReply, badge: replyBadge }
    ]);
    setLoading(false);
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Chat history cleared. How can I assist you with Ved's portfolio?",
        badge: '✨ Nova AI Engine'
      }
    ]);
    setInterviewMode(false);
  };

  return (
    <div className="content py-12 px-4" id="nova-ai">
      <div className="bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 rounded-3xl p-6 md:p-10 text-white shadow-2xl border border-purple-800/40">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xl shadow-lg">
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
                Powered by Meta LLaMA 3.3 (70B) & Verified KB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSend("start interview")}
              className="px-4 py-2 rounded-xl bg-purple-600/40 hover:bg-purple-600 text-purple-200 text-xs font-semibold border border-purple-400/30 transition-all flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faGraduationCap} /> Mock Interview Mode
            </button>
            <button
              onClick={clearChat}
              title="Clear Chat"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
            >
              <FontAwesomeIcon icon={faTrash} className="text-sm" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            "Tell me about DDQuest",
            "What is Ved's CGPA?",
            "Explain Smart Attendance System",
            "What are his technical skills?",
            "Start Mock Interview"
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-purple-600/30 border border-white/10 text-purple-200 text-xs font-medium transition-all"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Messages Container */}
        <div className="h-[420px] overflow-y-auto pr-2 space-y-4 font-sans custom-scrollbar">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white text-xs shrink-0 mt-1">
                  <FontAwesomeIcon icon={faRobot} />
                </div>
              )}

              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-none'
                    : 'bg-white/10 text-gray-100 backdrop-blur-md border border-white/10 rounded-tl-none'
                }`}
              >
                {msg.badge && (
                  <div className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 w-fit mb-2 border border-purple-400/20">
                    {msg.badge}
                  </div>
                )}
                <div className="whitespace-pre-line font-sans">{msg.content}</div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xs shrink-0 mt-1">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-purple-300 text-xs font-mono">
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              </div>
              <span>Nova is thinking...</span>
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
            placeholder="Ask Nova anything about Ved's projects, skills, CGPA..."
            className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="btn btn-primary px-5 py-3 rounded-xl text-white font-semibold flex items-center gap-2 disabled:opacity-50"
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
