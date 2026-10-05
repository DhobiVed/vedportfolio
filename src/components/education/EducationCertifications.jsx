const educationData = [
  {
    degree: "BE Computer Engineering",
    institution: "GEC Modasa (Gujarat Technological University)",
    duration: "2025 – 2028",
    score: "Pursuing (D2D Admission)",
    details: "Focusing on Advanced Data Structures, Operating Systems, Computer Networks, Artificial Intelligence, and Distributed Systems.",
  },
  {
    degree: "Diploma in Information Technology",
    institution: "Govt. Polytechnic Himatnagar (GTU)",
    duration: "2022 – 2025",
    score: "8.87 / 10.0 Overall CGPA (9.26 Final Sem)",
    award: "🏆 Best Performance Award Winner",
    details: "Top-ranking diploma student. Built DDQuest mobile startup app as final year capstone project.",
  },
  {
    degree: "SSC 10th Grade",
    institution: "Shri K N Shah Modasa High School (GSEB)",
    duration: "2022",
    score: "Completed with High Distinction",
    details: "Foundational mathematics, science, and computer fundamentals.",
  },
];

const experienceData = [
  {
    role: "Founder & Lead Mobile Engineer",
    company: "DDQuest Startup",
    period: "2023 – Present",
    desc: "Designed, engineered, and published the DDQuest Android app for GTU diploma IT students. Implemented Firestore startAfter() pagination cutting read costs by 90%."
  },
  {
    role: "Machine Learning Intern",
    company: "InfoLabz IT Services",
    period: "August 2024",
    desc: "Hands-on experience with Scikit-learn, Pandas, model evaluation metrics, and supervised machine learning classification pipelines."
  },
  {
    role: "Team Finalist Member",
    company: "Smart India Hackathon (SIH) 2025",
    period: "2025",
    desc: "Collaborated in building innovative software solutions solving real-world government and municipal problem statements."
  }
];

const certificationsData = [
  "IBM Cloud Computing Fundamentals",
  "IBM Artificial Intelligence Essentials",
  "Infosys Springboard — ETL & Data Integration",
  "Infosys Springboard — Malware Analysis",
  "IIT Bombay Spoken Tutorial — Core Java",
  "IIT Bombay Spoken Tutorial — Advanced Java",
  "Saylor Academy — Cryptocurrency (82.5%)",
  "Saylor Academy — Machine Learning",
  "E-Commerce & Digital Systems (90%)",
  "Python Programming Mastery (CodeChef)",
  "Android Application Development (Java + Firebase)",
  "Django Full-Stack Web Development",
  "Database Management Systems & SQL",
  "Git & Software Version Control",
  "Agile Software Development Fundamentals"
];

const EducationCertifications = () => {
  return (
    <div className="content py-16 lg:py-24 px-4" id="education">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-block px-3 py-1 rounded-md bg-purple-100 text-purple-800 font-mono text-xs font-semibold mb-3">
          ACADEMIC & PROFESSIONAL CREDENTIALS
        </div>
        <h2 className="section-title font-bold text-gray-900 tracking-tight">
          Education, Experience & 15+ Certifications
        </h2>
        <p className="text-gray-600 text-base md:text-lg mt-4">
          A proven record of academic distinction (8.87 CGPA), practical industry internships, hackathons, and certified software engineering expertise.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Education Timeline */}
        <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="p-2 rounded-xl bg-purple-100 text-purple-700 text-lg">🎓</span> Academic Journey
          </h3>

          <div className="space-y-6">
            {educationData.map((item, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-purple-200 pb-2">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-600 border-2 border-white"></div>
                <div className="flex flex-wrap justify-between items-baseline gap-2">
                  <h4 className="text-lg font-bold text-gray-900">{item.degree}</h4>
                  <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
                    {item.duration}
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-500 mt-1">{item.institution}</p>
                <div className="inline-block mt-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold text-xs border border-emerald-200">
                  {item.score}
                </div>
                {item.award && (
                  <p className="text-xs font-bold text-amber-600 mt-1.5">{item.award}</p>
                )}
                <p className="text-gray-600 text-xs mt-2 leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="p-2 rounded-xl bg-purple-100 text-purple-700 text-lg">💼</span> Experience & Hackathons
          </h3>

          <div className="space-y-6">
            {experienceData.map((item, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-indigo-200 pb-2">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white"></div>
                <div className="flex flex-wrap justify-between items-baseline gap-2">
                  <h4 className="text-lg font-bold text-gray-900">{item.role}</h4>
                  <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                    {item.period}
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-500 mt-1">{item.company}</p>
                <p className="text-gray-600 text-xs mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Badge Cloud */}
      <div className="mt-12 bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-8 rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-200">
          📜 Verified Professional Certifications (15+ Total)
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {certificationsData.map((cert, idx) => (
            <span
              key={idx}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 text-xs font-medium transition-all cursor-default"
            >
              ✓ {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationCertifications;
