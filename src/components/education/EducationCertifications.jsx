import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faBriefcase,
  faFilePdf,
  faEye,
  faUniversity,
  faDatabase,
  faBug,
  faRobot,
  faShoppingCart,
  faLock,
  faBrain,
  faTrophy,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import { faJava } from "@fortawesome/free-brands-svg-icons";
import PdfModal from "../common/PdfModal";

// ── Real Semester Results with Google Drive Previews ──
const semesterResults = [
  {
    sem: "Semester 1",
    date: "Jul 2023",
    sgpa: "7.16",
    pdf: "https://drive.google.com/file/d/1JfVrS-yz-Mrn2bapsPXIAF71OX4eYnV1/preview?rm=minimal",
    highlight: false,
  },
  {
    sem: "Semester 2",
    date: "May 2023",
    sgpa: "8.00",
    pdf: "https://drive.google.com/file/d/1F2nQ35em6oe3ISeXa4PwXfWALZyVDIJG/preview?rm=minimal",
    highlight: false,
  },
  {
    sem: "Semester 3",
    date: "Dec 2024",
    sgpa: "8.86",
    pdf: "https://drive.google.com/file/d/1rYt-L-geXFizEiYtpqo7AySZAF7/preview?rm=minimal",
    highlight: false,
  },
  {
    sem: "Semester 4",
    date: "May 2024",
    sgpa: "8.74",
    pdf: "https://drive.google.com/file/d/1LPecuxFKA0W2Ctj28fPNhOWMThJsEHzC/preview?rm=minimal",
    highlight: false,
  },
  {
    sem: "Semester 5",
    date: "Dec 2024",
    sgpa: "8.65",
    pdf: "https://drive.google.com/file/d/1KLLN21M5_evkDDAUs1t94Akv-t-WLyAR/preview?rm=minimal",
    highlight: false,
  },
  {
    sem: "Semester 6",
    date: "May 2025",
    sgpa: "9.26",
    pdf: "https://drive.google.com/file/d/1z7QRQlNirl1qozroA7bFzT5D2AeSZAF7/preview?rm=minimal",
    highlight: true,
  },
];

// ── Degree Certificate ──
const degreeCert = {
  name: "Diploma in Information Technology",
  issuer: "Gujarat Technological University (GTU) · Govt. Polytechnic Himatnagar",
  date: "2022 – 2025 · Overall CGPA: 8.87 / 10 · Best Performance Award",
  pdf: "https://drive.google.com/file/d/1otFyHeff4gP9z0MN275cEb1hdFNCLJ81/preview",
  icon: faGraduationCap,
};

// ── IBM Certificates ──
const ibmCerts = [
  {
    name: "IBM Cloud Computing Fundamentals",
    issuer: "IBM Student Ambassador Program",
    date: "Apr 2024",
    pdf: "https://drive.google.com/file/d/1ZTUupOdGGdu_WPURDlf11xKFpIp6l_4e/preview",
    icon: faCloud,
    isBrand: false,
  },
  {
    name: "IBM Certification — 2",
    issuer: "IBM",
    date: "2024",
    pdf: "https://drive.google.com/file/d/1vXDjs0WlBdeNGXGWe8_VMnfN4V82VqL5/preview",
    icon: faRobot,
  },
  {
    name: "IBM Certification — 3",
    issuer: "IBM",
    date: "2024",
    pdf: "https://drive.google.com/file/d/1B9tZ8vjevA7xz6AMIkcq-69L0Mg63G3G/preview",
    icon: faRobot,
  },
];

// ── Infosys Springboard Certificates ──
const infosysCerts = [
  {
    name: "ETL using Pentaho Data Integration",
    issuer: "Infosys Springboard",
    date: "Jan 2024",
    pdf: "https://drive.google.com/file/d/1H5BXxQCGehTAnQYO7LxW1vR82Tu2u5rG/preview",
    icon: faDatabase,
  },
  {
    name: "Malware Removal: Identifying Malware Types",
    issuer: "Infosys Springboard",
    date: "Jan 2024",
    pdf: "https://drive.google.com/file/d/1H7S-k283pdXhVD32jQNTrjMQsAOFKdD6/preview",
    icon: faBug,
  },
];

// ── Internship & Academic Certificates ──
const internshipAcademicCerts = [
  {
    name: "Machine Learning Internship",
    issuer: "InfoLabz",
    date: "Aug 2024",
    pdf: "https://drive.google.com/file/d/1XPYvFFEMx55eGkN1Ye0o39vbTddR_anL/preview",
    icon: faBriefcase,
  },
  {
    name: "Internship Certificate — 2",
    issuer: "Internship",
    date: "2024",
    pdf: "https://drive.google.com/file/d/1lssOJip7I9rttPdbngDf1eijnA0-oBKy/preview",
    icon: faBriefcase,
  },
  {
    name: "Java Training — Spoken Tutorial",
    issuer: "IIT Bombay",
    date: "Aug 2024",
    pdf: "https://drive.google.com/file/d/1H81NwTtXHcX68drSWHelypHeGVuD8DsO/preview",
    icon: faUniversity,
  },
  {
    name: "E-Commerce Fundamentals",
    issuer: "B-School (GTU) · Score: 90%",
    date: "2024",
    pdf: "https://drive.google.com/file/d/1SL0tnkjAMqatMETdT7o8WiFzoyNL-cNs/preview",
    icon: faShoppingCart,
  },
  {
    name: "Advance Java",
    issuer: "Jagrut Awaaz",
    date: "Oct 2025",
    pdf: "https://drive.google.com/file/d/1LSXHFOKES4Aq7IXBpWutcwFcgc-uvMAF/preview",
    icon: faJava,
    isBrand: true,
  },
  {
    name: "Smart India Hackathon 2025",
    issuer: "GEC Modasa · Participant",
    date: "2025",
    pdf: "https://drive.google.com/file/d/10zRaJtzWwwi7cPVOnh-CvZ8UJjiwWEzq/preview",
    icon: faTrophy,
  },
];

// ── Online Courses ──
const onlineCourseCerts = [
  {
    name: "Introduction to Cryptography & Network Security",
    issuer: "Saylor Academy · CS260 · Score: 82.5%",
    date: "2024",
    pdf: "https://drive.google.com/file/d/1aJ6cfPBfSykJbOXZm3DSj5qBXIuyXic8/preview",
    icon: faLock,
  },
  {
    name: "Fundamentals of Machine Learning",
    issuer: "Saylor Academy",
    date: "2024",
    pdf: "https://drive.google.com/file/d/1tnRjwXxG8K9L2vFxp-c375hp960m8RpU/preview",
    icon: faBrain,
  },
];

const tabs = ["Academic Results", "Certifications (15+)", "Education Timeline"];

const EducationCertifications = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [modalState, setModalState] = useState({ isOpen: false, url: "", title: "" });

  const openPdfViewer = (url, title) => {
    setModalState({ isOpen: true, url, title });
  };

  const closePdfViewer = () => {
    setModalState({ isOpen: false, url: "", title: "" });
  };

  return (
    <div className="content py-16 lg:py-24 px-4" id="education">
      {/* PDF Modal Viewer */}
      <PdfModal
        isOpen={modalState.isOpen}
        onClose={closePdfViewer}
        pdfUrl={modalState.url}
        title={modalState.title}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-block px-3 py-1 rounded-md bg-purple-100 text-purple-800 font-mono text-xs font-semibold mb-3">
          VERIFIED DOCUMENTATION
        </div>
        <h2 className="section-title font-bold text-gray-900 tracking-tight">
          Results & Verified Certificates
        </h2>
        <p className="text-gray-600 text-base md:text-lg mt-4">
          Official semester results, degree documentation, and certified credentials with direct in-page verification.
        </p>
      </div>

      {/* Tabs */}
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

      {/* ════════ TAB 0: ACADEMIC RESULTS (EXACTLY AS MY PORTFOLIO) ════════ */}
      {activeTab === 0 && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">
                Diploma in Information Technology
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                Govt. Polytechnic Himatnagar · GTU
              </h3>
              <p className="text-xs text-gray-500 font-mono mt-1">
                2022 – 2025 · 🏆 Best Performance Award Winner
              </p>
            </div>
            <div className="bg-white px-6 py-3.5 rounded-2xl shadow-sm border border-purple-100 text-right">
              <p className="text-[11px] font-mono font-bold text-gray-400 uppercase">Overall CGPA</p>
              <p className="text-3xl font-black text-purple-700">8.87 <span className="text-sm font-semibold text-gray-400">/ 10</span></p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {semesterResults.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 border border-red-100 flex items-center justify-center text-xl shrink-0">
                    <FontAwesomeIcon icon={faFilePdf} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-gray-900 truncate">{item.sem}</h4>
                    <p className="text-xs text-gray-500 font-mono">{item.date}</p>
                    <div className="mt-1">
                      <span
                        className={`text-2xl font-black font-mono tracking-tight ${
                          item.highlight ? "text-emerald-600" : "text-purple-700"
                        }`}
                      >
                        {item.sgpa}
                      </span>
                      <span className="text-[11px] text-gray-400 font-mono ms-1">
                        {item.highlight ? "⭐ Top Sem" : "SGPA"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openPdfViewer(item.pdf, `${item.sem} Result (${item.sgpa} SGPA)`)}
                  className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 text-xs font-semibold border border-purple-100 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <FontAwesomeIcon icon={faEye} />
                  <span>View</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════ TAB 1: CERTIFICATIONS (EACH WITH OPEN VIEW) ════════ */}
      {activeTab === 1 && (
        <div className="space-y-10">
          {/* Degree Certificate */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-0.5 bg-purple-600"></span>
              <h4 className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">
                Degree Certificate
              </h4>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-md hover:shadow-xl transition-all flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center text-2xl shrink-0">
                  <FontAwesomeIcon icon={degreeCert.icon} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{degreeCert.name}</h3>
                  <p className="text-xs text-gray-600 mt-0.5">{degreeCert.issuer}</p>
                  <p className="text-xs font-mono text-purple-700 font-semibold mt-1">{degreeCert.date}</p>
                </div>
              </div>
              <button
                onClick={() => openPdfViewer(degreeCert.pdf, degreeCert.name)}
                className="btn btn-primary btn-sm px-5 rounded-xl text-white font-semibold flex items-center gap-2 shrink-0"
              >
                <FontAwesomeIcon icon={faEye} /> View Certificate
              </button>
            </div>
          </div>

          {/* IBM Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-0.5 bg-purple-600"></span>
              <h4 className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">
                IBM Certifications
              </h4>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ibmCerts.map((c, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center text-lg shrink-0">
                      <FontAwesomeIcon icon={c.icon} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 leading-snug">{c.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{c.issuer}</p>
                      <p className="text-[11px] font-mono text-purple-600 font-semibold mt-0.5">{c.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openPdfViewer(c.pdf, c.name)}
                    className="mt-4 w-full py-2 rounded-xl bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 text-xs font-semibold border border-purple-100 transition-all flex items-center justify-center gap-1.5"
                  >
                    <FontAwesomeIcon icon={faEye} /> View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Infosys Springboard */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-0.5 bg-purple-600"></span>
              <h4 className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">
                Infosys Springboard
              </h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {infosysCerts.map((c, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-lg shrink-0">
                      <FontAwesomeIcon icon={c.icon} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 leading-snug">{c.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{c.issuer}</p>
                      <p className="text-[11px] font-mono text-purple-600 font-semibold mt-0.5">{c.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openPdfViewer(c.pdf, c.name)}
                    className="mt-4 w-full py-2 rounded-xl bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 text-xs font-semibold border border-purple-100 transition-all flex items-center justify-center gap-1.5"
                  >
                    <FontAwesomeIcon icon={faEye} /> View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Internship, Academic & Skill */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-0.5 bg-purple-600"></span>
              <h4 className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">
                Internship, Academic & Skill Certificates
              </h4>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {internshipAcademicCerts.map((c, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center text-lg shrink-0">
                      <FontAwesomeIcon icon={c.icon} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 leading-snug">{c.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{c.issuer}</p>
                      <p className="text-[11px] font-mono text-purple-600 font-semibold mt-0.5">{c.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openPdfViewer(c.pdf, c.name)}
                    className="mt-4 w-full py-2 rounded-xl bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 text-xs font-semibold border border-purple-100 transition-all flex items-center justify-center gap-1.5"
                  >
                    <FontAwesomeIcon icon={faEye} /> View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Online Courses */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-0.5 bg-purple-600"></span>
              <h4 className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">
                Online Courses (Saylor Academy)
              </h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {onlineCourseCerts.map((c, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-lg shrink-0">
                      <FontAwesomeIcon icon={c.icon} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 leading-snug">{c.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{c.issuer}</p>
                      <p className="text-[11px] font-mono text-purple-600 font-semibold mt-0.5">{c.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openPdfViewer(c.pdf, c.name)}
                    className="mt-4 w-full py-2 rounded-xl bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 text-xs font-semibold border border-purple-100 transition-all flex items-center justify-center gap-1.5"
                  >
                    <FontAwesomeIcon icon={faEye} /> View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════════ TAB 2: EDUCATION TIMELINE ════════ */}
      {activeTab === 2 && (
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-purple-100 text-purple-700 text-base">🎓</span> Academic Timeline
            </h3>
            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-purple-300 pb-2">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-600 border-2 border-white shadow"></div>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-base font-bold text-gray-900">BE Computer Engineering</h4>
                  <span className="text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">2025–2028</span>
                </div>
                <p className="text-xs text-gray-500 font-semibold mt-1">GEC Modasa (GTU)</p>
                <span className="inline-block mt-2 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold text-xs border border-emerald-200">
                  Pursuing (D2D Lateral Entry)
                </span>
              </div>

              <div className="relative pl-6 border-l-2 border-purple-300 pb-2">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-600 border-2 border-white shadow"></div>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-base font-bold text-gray-900">Diploma in Information Technology</h4>
                  <span className="text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">2022–2025</span>
                </div>
                <p className="text-xs text-gray-500 font-semibold mt-1">Govt. Polytechnic Himatnagar (GTU)</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold text-xs border border-emerald-200">
                    8.87 / 10.0 Overall CGPA
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-semibold text-xs border border-amber-200">
                    🏆 Best Performance Award
                  </span>
                </div>
              </div>

              <div className="relative pl-6 border-l-2 border-purple-300">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-600 border-2 border-white shadow"></div>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-base font-bold text-gray-900">SSC 10th Grade</h4>
                  <span className="text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">2022</span>
                </div>
                <p className="text-xs text-gray-500 font-semibold mt-1">Shri K N Shah Modasa High School (GSEB)</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-purple-100 text-purple-700 text-base">💼</span> Experience & Hackathon
            </h3>
            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-indigo-300 pb-2">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow"></div>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-base font-bold text-gray-900">Founder & Lead Developer</h4>
                  <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">2023 – Present</span>
                </div>
                <p className="text-xs text-gray-500 font-semibold mt-1">DDQuest — Personal EdTech Startup</p>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                  Published native Android app for GTU diploma students with Firestore pagination and offline PDF storage.
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-indigo-300 pb-2">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow"></div>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-base font-bold text-gray-900">Machine Learning Intern</h4>
                  <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">Aug 2024</span>
                </div>
                <p className="text-xs text-gray-500 font-semibold mt-1">InfoLabz IT Services</p>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                  Supervised ML algorithms, data preprocessing, and model evaluation metrics using Scikit-learn and Pandas.
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-indigo-300">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow"></div>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-base font-bold text-gray-900">Internal Hackathon Participant</h4>
                  <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">2024 / 2025</span>
                </div>
                <p className="text-xs text-gray-500 font-semibold mt-1">Govt. Polytechnic Himatnagar (SIH Initiative)</p>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                  College-level internal team hackathon building software solutions to address practical challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationCertifications;
