import { useState } from "react";
import Projects from "./Projects";
import card1 from "../../assets/images/portfolio-images/card-1.png";
import card2 from "../../assets/images/portfolio-images/card-2.png";
import card3 from "../../assets/images/portfolio-images/card-3.png";
import card4 from "../../assets/images/portfolio-images/card-4.png";
import card5 from "../../assets/images/portfolio-images/card-5.png";
import card6 from "../../assets/images/portfolio-images/card-6.png";

const allProjectsData = [
  {
    id: 1,
    image: card1,
    category: "STARTUP / ANDROID",
    title: "DDQuest Mobile App ⭐",
    description:
      "Flagship startup app providing free study materials for GTU Diploma IT students. Built with Java & Firebase. Optimized with startAfter() pagination (90% read cost reduction) and offline disk caching.",
    tags: ["Java", "Firebase Auth", "Firestore", "FCM", "Offline Persistence"],
    github: "https://github.com/DhobiVed",
    featured: true
  },
  {
    id: 2,
    image: card2,
    category: "ANDROID / AI",
    title: "Smart Attendance System",
    description:
      "Native Android biometric attendance app using Google ML Kit for on-device face recognition (~50ms speed). Privacy-first architecture with zero cloud face image uploads.",
    tags: ["Java", "Google ML Kit", "Firestore", "On-Device AI"],
    github: "https://github.com/DhobiVed",
    featured: true
  },
  {
    id: 3,
    image: card3,
    category: "FULL-STACK WEB",
    title: "Academix — Class Manager",
    description:
      "Full-stack web application for managing classes, assignments, and student grades. Built with Django Class-Based Views (CBV), Django Auth, PostgreSQL, and deployed on Render.",
    tags: ["Python", "Django CBV", "PostgreSQL", "Render Cloud"],
    github: "https://github.com/DhobiVed",
    featured: true
  },
  {
    id: 4,
    image: card4,
    category: "AI / GROQ LPU",
    title: "Nova AI Chatbot",
    description:
      "Production-ready high-speed AI chatbot deployed on Streamlit Cloud, leveraging custom RAG architecture and Groq LPU API for ~50ms sub-second response latency.",
    tags: ["Python", "Groq API", "Streamlit", "LLaMA 3"],
    github: "https://github.com/DhobiVed",
    featured: true
  },
  {
    id: 5,
    image: card5,
    category: "AI / RAG",
    title: "Advanced AI Chatbot Suite",
    description:
      "Suite of Python AI tools featuring PDF document Q&A using Retrieval-Augmented Generation (RAG) architecture with OpenAI embeddings to prevent hallucination.",
    tags: ["Python", "OpenAI API", "RAG Pipeline", "PDF Q&A"],
    github: "https://github.com/DhobiVed",
    featured: false
  },
  {
    id: 6,
    image: card6,
    category: "ANDROID LOGISTICS",
    title: "QuickCommerce Delivery App",
    description:
      "Native Android delivery tracking application featuring real-time Firestore listeners for instant live order updates without polling overhead.",
    tags: ["Java", "Android Studio", "Firestore Listeners", "Real-Time Tracking"],
    github: "https://github.com/DhobiVed",
    featured: false
  },
  {
    id: 7,
    image: card1,
    category: "DATABASE / POS",
    title: "Smart Mall Billing System",
    description:
      "Point of Sale (POS) and retail inventory management system backed by MySQL relational database, barcode product lookup, and automated stock deduction.",
    tags: ["MySQL", "Java / Desktop", "POS System", "Inventory Mgmt"],
    github: "https://github.com/DhobiVed",
    featured: false
  },
  {
    id: 8,
    image: card2,
    category: "WEB PLATFORM",
    title: "DDQuest Web Platform",
    description:
      "Web companion dashboard for the DDQuest startup ecosystem, providing browser access to GTU diploma IT study resources.",
    tags: ["HTML5", "CSS3", "JavaScript", "Firebase"],
    github: "https://github.com/DhobiVed",
    featured: false
  },
  {
    id: 9,
    image: card3,
    category: "PORTFOLIO & AI",
    title: "Developer Portfolio & NovaChat",
    description:
      "Modern portfolio built with React, Vite & Picto UI, integrated with NovaChat 3-tier AI engine (LLaMA 3.3 70B Netlify Serverless Proxy + Ollama Qwen 2.5 local).",
    tags: ["React 19", "Vite", "Tailwind CSS v4", "Netlify Functions"],
    github: "https://github.com/DhobiVed/vedportfolio",
    featured: true
  }
];

const categories = ["ALL", "STARTUP / ANDROID", "FULL-STACK WEB", "AI / RAG", "DATABASE / POS"];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredProjects = activeCategory === "ALL"
    ? allProjectsData
    : allProjectsData.filter(p => p.category.includes(activeCategory) || (activeCategory === "AI / RAG" && p.category.includes("AI")));

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
            Featured 9 Projects
          </h2>
          <p className="font-normal text-base md:text-lg pt-4 text-gray-600">
            A comprehensive showcase of my real-world projects spanning native Android apps, startup products, full-stack Django backends, and sub-50ms AI pipelines.
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
