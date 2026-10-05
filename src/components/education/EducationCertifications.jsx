import { useState } from "react";

const educationData = [
  {
    degree: "BE Computer Engineering",
    institution: "GEC Modasa (Gujarat Technological University)",
    duration: "2025 – 2028",
    score: "Pursuing (D2D Lateral Admission)",
    award: null,
    details:
      "Focusing on Advanced Data Structures, Operating Systems, Computer Networks, Artificial Intelligence, and Distributed Systems.",
  },
  {
    degree: "Diploma in Information Technology",
    institution: "Govt. Polytechnic Himatnagar (GTU)",
    duration: "2022 – 2025",
    score: "8.87 / 10.0 Overall CGPA",
    semBreakdown: [
      { sem: "Sem 1", sgpa: "8.22" },
      { sem: "Sem 2", sgpa: "8.56" },
      { sem: "Sem 3", sgpa: "8.80" },
      { sem: "Sem 4", sgpa: "8.84" },
      { sem: "Sem 5", sgpa: "9.03" },
      { sem: "Sem 6", sgpa: "9.26" },
    ],
    award: "🏆 Best Performance Award Winner",
    details:
      "Top-ranking diploma student. Built DDQuest startup Android app as final year capstone project.",
  },
  {
    degree: "SSC 10th Grade",
    institution: "Shri K N Shah Modasa High School (GSEB)",
    duration: "2022",
    score: "Completed",
    award: null,
    details: "Foundational mathematics, science, and computer fundamentals.",
  },
];

const experienceData = [
  {
    role: "Founder & Lead Android Engineer",
    company: "DDQuest — Personal Startup",
    period: "2023 – Present",
    desc: "Designed, developed, and published the DDQuest Android app independently. Implemented Firestore startAfter() pagination cutting DB read costs by 90%. App used by GTU Diploma IT students across Gujarat.",
  },
  {
    role: "Machine Learning Intern",
    company: "InfoLabz IT Services",
    period: "August 2024",
    desc: "Hands-on experience with Scikit-learn, Pandas, model evaluation metrics, and supervised machine learning classification pipelines on real datasets.",
  },
  {
    role: "Internal Hackathon Participant",
    company: "Govt. Polytechnic Himatnagar",
    period: "2024",
    desc: "Participated in the college-level internal hackathon organized under the Smart India Hackathon (SIH) initiative. Built a problem-statement-based project within the team.",
  },
];

const certificationsData = [
  { name: "IBM Cloud Computing Fundamentals", issuer: "IBM / Cognitive Class", year: "2024" },
  { name: "IBM Artificial Intelligence Essentials", issuer: "IBM / Cognitive Class", year: "2024" },
  { name: "ETL & Data Integration", issuer: "Infosys Springboard", year: "2024" },
  { name: "Malware Analysis & Cybersecurity", issuer: "Infosys Springboard", year: "2024" },
  { name: "Core Java Programming", issuer: "IIT Bombay Spoken Tutorial", year: "2023" },
  { name: "Advanced Java Programming", issuer: "IIT Bombay Spoken Tutorial", year: "2023" },
  { name: "Cryptocurrency & Blockchain", issuer: "Saylor Academy", year: "2024", score: "82.5%" },
  { name: "Machine Learning Fundamentals", issuer: "Saylor Academy", year: "2024" },
  { name: "E-Commerce & Digital Business Systems", issuer: "Online Certification", year: "2024", score: "90%" },
  { name: "Python Programming Mastery", issuer: "CodeChef / Online", year: "2024" },
  { name: "Android Application Development (Java + Firebase)", issuer: "Self-Certified / Project-Based", year: "2023" },
  { name: "Django Full-Stack Web Development", issuer: "Self-Certified / Project-Based", year: "2024" },
  { name: "Database Management & SQL", issuer: "Online Certification", year: "2023" },
  { name: "Git & Software Version Control", issuer: "Online Certification", year: "2023" },
  { name: "Agile Software Development Fundamentals", issuer: "Online Certification", year: "2024" },
];

const tabs = ["Education & Experience", "Diploma Results", "Certifications (15+)"];

const EducationCertifications = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="content py-16 lg:py-24 px-4" id="education">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-block px-3 py-1 rounded-md bg-purple-100 text-purple-800 font-mono text-xs font-semibold mb-3">
          ACADEMIC & PROFESSIONAL CREDENTIALS
        </div>
        <h2 className="section-title font-bold text-gray-900 tracking-tight">
          Education, Results & Certifications
        </h2>
        <p className="text-gray-600 text-base md:text-lg mt-4">
          Verified academic track record, diploma semester-wise results, internship experience, and 15+ professional certifications.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === idx
                ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ─── TAB 0: Education & Experience ─── */}
      {activeTab === 0 && (
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-purple-100 text-purple-700 text-lg">🎓</span>
              Academic Journey
            </h3>
            <div className="space-y-7">
              {educationData.map((item, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-purple-200 pb-1">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-600 border-2 border-white shadow"></div>
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <h4 className="text-base font-bold text-gray-900">{item.degree}</h4>
                    <span className="text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 mt-1">{item.institution}</p>
                  <div className="inline-block mt-2 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold text-xs border border-emerald-200">
                    {item.score}
                  </div>
                  {item.award && (
                    <p className="text-xs font-bold text-amber-600 mt-1.5">{item.award}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">{item.details}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-purple-100 text-purple-700 text-lg">💼</span>
              Experience & Hackathon
            </h3>
            <div className="space-y-7">
              {experienceData.map((item, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-indigo-200 pb-1">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow"></div>
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <h4 className="text-base font-bold text-gray-900">{item.role}</h4>
                    <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 mt-1">{item.company}</p>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 1: Diploma Results ─── */}
      {activeTab === 1 && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 rounded-xl bg-purple-100 text-purple-700 text-lg">📊</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Diploma IT — Semester Results</h3>
                <p className="text-xs text-gray-500 font-mono">Govt. Polytechnic Himatnagar · GTU · 2022–2025</p>
              </div>
            </div>

            <div className="mt-6 mb-4 flex items-center justify-between bg-purple-50 border border-purple-100 rounded-2xl px-5 py-4">
              <div>
                <p className="text-xs text-purple-600 font-mono font-bold uppercase tracking-wider">Overall CGPA</p>
                <p className="text-4xl font-black text-purple-700 mt-1">8.87 <span className="text-base font-semibold text-purple-400">/ 10.0</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs text-amber-600 font-bold">🏆 Best Performance Award</p>
                <p className="text-xs text-gray-500 mt-1">Graduation: May 2025</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              {educationData[1].semBreakdown.map((sem, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border p-4 text-center transition-all ${
                    idx === 5
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "bg-gray-50 border-gray-100"
                  }`}
                >
                  <p className={`text-xs font-mono font-bold uppercase tracking-wider ${idx === 5 ? "text-purple-200" : "text-gray-500"}`}>
                    {sem.sem}
                  </p>
                  <p className={`text-3xl font-black mt-1 ${idx === 5 ? "text-white" : "text-gray-900"}`}>
                    {sem.sgpa}
                  </p>
                  <p className={`text-[10px] mt-1 ${idx === 5 ? "text-purple-200" : "text-gray-400"}`}>
                    {idx === 5 ? "⭐ Best Sem" : "SGPA"}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 text-center mt-5 font-mono">
              Consistently improved every semester · Final Sem SGPA 9.26
            </p>
          </div>
        </div>
      )}

      {/* ─── TAB 2: Certifications ─── */}
      {activeTab === 2 && (
        <div>
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-purple-100">
              📜 Verified Certifications — 15 Total
            </h3>
            <p className="text-purple-300 text-xs font-mono mb-6">IBM · Infosys · IIT Bombay · Saylor Academy · CodeChef & more</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {certificationsData.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-white/8 hover:bg-white/15 backdrop-blur-md rounded-2xl border border-white/10 p-4 transition-all cursor-default"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-white text-xs font-semibold leading-snug">
                      ✓ {cert.name}
                    </p>
                    {cert.score && (
                      <span className="shrink-0 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-md font-mono font-bold">
                        {cert.score}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-purple-300 text-[10px] font-mono">{cert.issuer}</p>
                    <p className="text-purple-400 text-[10px] font-mono">{cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationCertifications;
