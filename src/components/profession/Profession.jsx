import Roles from "./Roles";

const skillCategories = [
  {
    id: 1,
    title: "Mobile Development (Android)",
    skills: ["Java (Android Studio)", "Firebase Auth", "Firestore DB", "Firebase Storage", "Firebase FCM", "Google ML Kit (Face Detection)"],
  },
  {
    id: 2,
    title: "AI & Machine Learning",
    skills: ["Python", "Scikit-learn", "Pandas", "NumPy", "Groq LPU API (~50ms)", "OpenAI API", "RAG Architecture", "Streamlit"],
  },
  {
    id: 3,
    title: "Web & Full-Stack Backend",
    skills: ["Django (CBV, Auth, ORM)", "Flask", "Node.js", "Express", "REST APIs", "JavaScript (ES6+)", "HTML5 / CSS3"],
  },
  {
    id: 4,
    title: "Databases & Cloud Infrastructure",
    skills: ["PostgreSQL", "MySQL", "Firestore (NoSQL)", "MongoDB Atlas", "Git / GitHub", "Netlify", "Render Cloud"],
  },
];

const Profession = () => {
  return (
    <div className="content py-16 lg:py-24 px-4" id="skills">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-block px-3 py-1 rounded-md bg-purple-100 text-purple-800 font-mono text-xs font-semibold mb-3">
          TECHNICAL EXPERTISE
        </div>
        <h2 className="section-title font-bold text-gray-900 tracking-tight">
          Skills & Tech Stack Matrix
        </h2>
        <p className="text-gray-600 text-base md:text-lg mt-4">
          A comprehensive breakdown of programming languages, frameworks, databases, and AI pipelines I use to build scalable products.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category) => (
          <Roles key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Profession;
