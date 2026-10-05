import { useState } from "react";
import Projects from "./Projects";
import {
  faGraduationCap,
  faUserCheck,
  faLaptopCode,
  faRobot,
  faBrain,
  faTruck,
  faCashRegister,
  faGlobe,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

const allProjectsData = [
  {
    id: 1,
    icon: faGraduationCap,
    gradient: "from-purple-100 via-pink-50 to-indigo-50",
    badge: "Startup · Founder",
    badgeType: "founder",
    category: "ANDROID · STARTUP",
    title: "DDQuest — GTU Study Material App ⭐",
    description:
      "Flagship startup mobile app providing free organized study materials for GTU Diploma IT students. Built solo with Java & Firebase. Optimized Firestore queries with startAfter() cursor pagination (90% read cost reduction) and offline disk caching.",
    tags: ["Java", "Firebase Auth", "Firestore", "FCM Push", "Offline Cache", "Android Studio"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 2,
    icon: faUserCheck,
    gradient: "from-emerald-100 via-teal-50 to-cyan-50",
    badge: "On-Device AI",
    badgeType: "live",
    category: "ANDROID · AI BIOMETRIC",
    title: "Smart Attendance System",
    description:
      "Native Android biometric attendance system using Google ML Kit for on-device face recognition (~50ms speed). Designed with a privacy-first architecture where zero raw face images are uploaded to the cloud.",
    tags: ["Java", "Google ML Kit", "Firestore", "On-Device AI", "Android Studio"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 3,
    icon: faLaptopCode,
    gradient: "from-blue-100 via-indigo-50 to-purple-50",
    badge: "Full-Stack Web",
    badgeType: "live",
    category: "WEB · DJANGO",
    title: "Academix — Class Manager",
    description:
      "Full-stack academic platform for managing classrooms, assignments, and student grades. Built with Django Class-Based Views (CBV), Django Auth, PostgreSQL database, and deployed on Render cloud.",
    tags: ["Python", "Django CBV", "PostgreSQL", "Render Cloud", "Bootstrap"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 4,
    icon: faRobot,
    gradient: "from-pink-100 via-rose-50 to-purple-50",
    badge: "50ms LPU Speed",
    badgeType: "live",
    category: "AI · GROQ CLOUD",
    title: "Nova AI Chatbot (Streamlit Cloud)",
    description:
      "Production-ready personal AI chatbot hosted on Streamlit Cloud. Powered by Groq LPU API and LLaMA 3 for ultra-low latency (~50ms response times) with multi-turn conversation memory.",
    tags: ["Python", "Groq API", "LLaMA 3", "Streamlit Cloud", "Sub-50ms"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 5,
    icon: faBrain,
    gradient: "from-amber-100 via-orange-50 to-rose-50",
    badge: "RAG Architecture",
    badgeType: "live",
    category: "AI · RAG PIPELINE",
    title: "Advanced AI Chatbot Suite",
    description:
      "Python AI tool suite featuring PDF document question-answering with Retrieval-Augmented Generation (RAG) architecture and OpenAI embeddings to prevent hallucinations and ground responses in source text.",
    tags: ["Python", "OpenAI API", "RAG Pipeline", "Vector Search", "Streamlit"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 6,
    icon: faTruck,
    gradient: "from-red-100 via-rose-50 to-pink-50",
    badge: "Real-Time Tracking",
    badgeType: "live",
    category: "ANDROID · LOGISTICS",
    title: "QuickCommerce Delivery App",
    description:
      "Native Android delivery app inspired by quick-commerce platforms. Features real-time Firestore document snapshot listeners for instant order status updates without battery-draining polling.",
    tags: ["Java", "Android Studio", "Firestore Listeners", "Real-Time DB", "Material UI"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 7,
    icon: faCashRegister,
    gradient: "from-cyan-100 via-sky-50 to-blue-50",
    badge: "POS System",
    badgeType: "default",
    category: "DATABASE · DESKTOP",
    title: "Smart Mall Billing System",
    description:
      "Point of Sale (POS) and inventory management system backed by MySQL relational database. Includes barcode scanning, automatic stock deduction on checkout, and daily billing revenue analytics.",
    tags: ["MySQL", "Java / Desktop", "POS System", "Inventory Mgmt", "Relational DB"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 8,
    icon: faGlobe,
    gradient: "from-violet-100 via-purple-50 to-indigo-50",
    badge: "Web Platform",
    badgeType: "default",
    category: "WEB PLATFORM",
    title: "DDQuest Web Platform",
    description:
      "Web companion platform for the DDQuest startup ecosystem, allowing students to access syllabus, past papers, and study guides from desktop browsers with smooth responsive UI.",
    tags: ["HTML5", "CSS3", "JavaScript", "Firebase", "Responsive Web"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 9,
    icon: faCode,
    gradient: "from-purple-100 via-indigo-50 to-pink-50",
    badge: "Live · Open Source",
    badgeType: "live",
    category: "REACT · PORTFOLIO",
    title: "Developer Portfolio & NovaChat",
    description:
      "Modern full-stack portfolio built with React 19, Vite 6 & Tailwind CSS v4. Features embedded NovaChat AI engine backed by Meta LLaMA 3.3 70B via Netlify Serverless Functions and Ollama Qwen 2.5 locally.",
    tags: ["React 19", "Vite 6", "Tailwind CSS v4", "Netlify Functions", "LLaMA 3.3 70B"],
    github: "https://github.com/DhobiVed/vedportfolio",
    live: "https://vedportfolio.netlify.app",
  },
];

const categories = [
  "ALL",
  "ANDROID",
  "AI",
  "WEB",
  "DATABASE",
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredProjects =
    activeCategory === "ALL"
      ? allProjectsData
      : allProjectsData.filter((p) => p.category.includes(activeCategory));

  return (
    <div
      className="content mt-10 md:mt-16 xl:mt-24 mb-10 md:mb-20 max-xxl:p-4"
      id="portfolio"
    >
      <div className="xl:mb-14 mb-8">
        <div className="max-sm:px-2 text-center mx-auto max-w-2xl">
          <div className="inline-block px-3 py-1 rounded-md bg-purple-100 text-purple-800 font-mono text-xs font-semibold mb-3">
            FLAGSHIP PROJECTS
          </div>
          <h2 className="section-title font-bold text-gray-900 tracking-tight">
            9 Real Projects Built
          </h2>
          <p className="font-normal text-base md:text-lg pt-4 text-gray-600">
            Engineered from scratch across Native Android, Full-Stack Django backends, and sub-50ms AI systems.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex justify-center">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8 w-full">
          {filteredProjects.map((data, index) => (
            <Projects data={data} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
