import { useState } from "react";
import Projects from "./Projects";

// Real images from existing portfolio assets
import ddquestImg from "../../assets/images/portfolio-images/ddquest.jpg";
import smartAttendanceImg from "../../assets/images/portfolio-images/smart-attendance.jpg";
import academixImg from "../../assets/images/portfolio-images/academix.jpg";
import advChatbotImg from "../../assets/images/portfolio-images/advanced-chatbot.jpg";
import simpleChatbotImg from "../../assets/images/portfolio-images/simple-chatbot.jpg";
import card5 from "../../assets/images/portfolio-images/card-5.png";
import card6 from "../../assets/images/portfolio-images/card-6.png";
import card1 from "../../assets/images/portfolio-images/card-1.png";
import card3 from "../../assets/images/portfolio-images/card-3.png";

const allProjectsData = [
  {
    id: 1,
    image: ddquestImg,
    category: "STARTUP · ANDROID",
    title: "DDQuest — GTU Study App ⭐",
    description:
      "Flagship startup app providing free subject-wise study materials for GTU Diploma IT students. Built solo with Java & Firebase. Optimized Firestore with startAfter() cursor pagination cutting read costs by 90%. Includes offline disk caching and FCM push notifications.",
    tags: ["Java", "Firebase Auth", "Firestore", "FCM", "Offline Disk Cache"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 2,
    image: smartAttendanceImg,
    category: "ANDROID · ON-DEVICE AI",
    title: "Smart Attendance System",
    description:
      "Native Android biometric attendance app using Google ML Kit for on-device face recognition (~50ms). Complete privacy-first architecture — zero face images uploaded to cloud. All face embeddings are processed locally on the device.",
    tags: ["Java", "Google ML Kit", "Firestore", "Biometric", "Android Studio"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 3,
    image: academixImg,
    category: "FULL-STACK WEB · DJANGO",
    title: "Academix — Class Manager",
    description:
      "Full-stack web application for managing classes, assignments, and student grades. Built with Django Class-Based Views (CBV), Django Auth, PostgreSQL, and deployed on Render cloud platform.",
    tags: ["Python", "Django CBV", "PostgreSQL", "Render Cloud", "Bootstrap"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 4,
    image: advChatbotImg,
    category: "AI · RAG PIPELINE",
    title: "Advanced AI Chatbot Suite",
    description:
      "Suite of Python AI tools featuring PDF document Q&A using Retrieval-Augmented Generation (RAG) architecture with OpenAI embeddings. Prevents hallucination by grounding answers in real document content.",
    tags: ["Python", "OpenAI API", "RAG Architecture", "PDF Q&A", "Streamlit"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 5,
    image: simpleChatbotImg,
    category: "AI · GROQ LPU",
    title: "Nova AI Chatbot (Streamlit)",
    description:
      "High-speed personal AI chatbot deployed on Streamlit Cloud. Uses Groq LPU API for ~50ms sub-second response times with LLaMA 3. Features multi-turn conversation memory and context retention.",
    tags: ["Python", "Groq API", "LLaMA 3", "Streamlit Cloud", "50ms latency"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 6,
    image: card6,
    category: "ANDROID · LOGISTICS",
    title: "QuickCommerce Delivery App",
    description:
      "Native Android delivery tracking application featuring real-time Firestore listeners for instant live order status updates without polling overhead. Clean material UI with order history.",
    tags: ["Java", "Android Studio", "Firestore Listeners", "Real-Time", "Material UI"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 7,
    image: card5,
    category: "DATABASE · POS SYSTEM",
    title: "Smart Mall Billing System",
    description:
      "Point-of-Sale (POS) and retail inventory management system backed by MySQL relational database. Features barcode product lookup, automated stock deduction on sale, and daily billing reports.",
    tags: ["MySQL", "Java / Desktop App", "POS System", "Inventory", "Barcode Scan"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 8,
    image: card1,
    category: "WEB PLATFORM",
    title: "DDQuest Web Platform",
    description:
      "Web companion dashboard for the DDQuest ecosystem, providing browser access to GTU diploma IT study resources. Built as a responsive static web app with Vanilla JS and Firebase integration.",
    tags: ["HTML5", "CSS3", "JavaScript", "Firebase", "Responsive Design"],
    github: "https://github.com/DhobiVed",
    live: null,
  },
  {
    id: 9,
    image: card3,
    category: "PORTFOLIO · AI",
    title: "Developer Portfolio + NovaChat",
    description:
      "This very portfolio! Built with React 19, Vite 6, Tailwind CSS v4 & Picto UI template. Integrated with NovaChat 3-tier AI engine — LLaMA 3.3 70B via Netlify Serverless (production) + Ollama Qwen 2.5 locally.",
    tags: ["React 19", "Vite 6", "Tailwind CSS v4", "Netlify Functions", "LLaMA 3.3 70B"],
    github: "https://github.com/DhobiVed/vedportfolio",
    live: "https://vedportfolio.netlify.app",
  },
];

const categories = [
  "ALL",
  "STARTUP · ANDROID",
  "ANDROID · ON-DEVICE AI",
  "FULL-STACK WEB · DJANGO",
  "AI · RAG PIPELINE",
  "DATABASE · POS SYSTEM",
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredProjects =
    activeCategory === "ALL"
      ? allProjectsData
      : allProjectsData.filter((p) =>
          p.category.toLowerCase().includes(activeCategory.toLowerCase().split("·")[0].trim())
        );

  return (
    <div
      className="content mt-10 md:mt-16 xl:mt-24 mb-10 md:mb-20 max-xxl:p-4"
      id="portfolio"
    >
      <div className="xl:mb-14 mb-8">
        <div className="max-sm:px-2 text-center mx-auto max-w-2xl">
          <div className="inline-block px-3 py-1 rounded-md bg-purple-100 text-purple-800 font-mono text-xs font-semibold mb-3">
            PORTFOLIO SHOWCASE
          </div>
          <h2 className="section-title font-bold text-gray-900 tracking-tight">
            9 Real Projects Built
          </h2>
          <p className="font-normal text-base md:text-lg pt-4 text-gray-600">
            A complete showcase of production-grade Android apps, startup products,
            full-stack Django platforms, and sub-50ms AI pipelines — all built from scratch.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
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
