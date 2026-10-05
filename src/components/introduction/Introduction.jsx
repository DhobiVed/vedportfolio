import person from "../../assets/images/person.png";
import "./introduction.css";
import InformationSummary from "./InformationSummary";
import { Link } from "react-scroll";

const informationSummaryData = [
  {
    id: 1,
    title: "Overall CGPA",
    description: "8.87",
  },
  {
    id: 2,
    title: "Projects Built",
    description: "9+",
  },
  {
    id: 3,
    title: "Certifications",
    description: "15+",
  },
];

const Introduction = () => {
  return (
    <div
      className="flex max-lg:flex-col-reverse sm:justify-between pt-8 lg:pt-24 lg:mb-20 max-xl:gap-6 p-4 max-xxl:px-4"
      id="introduction"
    >
      <div className="w-full flex flex-col justify-between max-lg:text-center">
        <div className="pt-4 lg:pt-8 w-full lg:w-auto transition-all duration-500">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            🟢 Open to Work — Entry-Level / Remote (WFH)
          </div>

          <p className="text-3xl xxs:text-4xl sm:max-xl:text-5xl xl:text-6xl font-bold w-full text-gray-900 tracking-tight">
            Hello, I’m
            <span className="text-nowrap shrink-0 inline-block w-full text-purple-700 mt-1">
              Ved Dhobi
            </span>
          </p>
          <p className="text-xs xxs:text-base lg:text-[18px] my-5 text-gray-600 leading-relaxed max-w-2xl">
            A passionate <span className="bg-highlight font-semibold text-gray-900">Software Developer</span>,{" "}
            <span className="bg-highlight font-semibold text-gray-900">Native Android Developer</span> (Java + Firebase), and{" "}
            <span className="bg-highlight font-semibold text-gray-900">AI/ML Engineer</span>. Founder of <strong className="text-purple-700 font-bold">DDQuest</strong>—a real startup app used by GTU diploma IT students in Gujarat.
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-6">
            <a
              className="btn-primary btn btn-md sm:btn-lg text-white font-semibold rounded-xl px-7 shadow-lg shadow-purple-200"
              href="mailto:veddhobi252@gmail.com"
            >
              Say Hello! 📬
            </a>

            <Link
              className="btn btn-outline border-purple-300 text-purple-700 hover:bg-purple-50 btn-md sm:btn-lg font-semibold rounded-xl px-6 cursor-pointer"
              to="nova-ai"
              smooth={true}
              duration={900}
              offset={-100}
            >
              ✨ Ask Nova AI
            </Link>

            <Link
              className="btn btn-ghost text-gray-600 hover:bg-gray-100 btn-md sm:btn-lg font-semibold rounded-xl px-5 cursor-pointer"
              to="portfolio"
              smooth={true}
              duration={900}
              offset={-100}
            >
              Explore Projects 🚀
            </Link>
          </div>
        </div>

        <div className="mx-auto lg:mx-0 relative">
          <div className="grid grid-cols-3 w-fit mt-10 gap-3">
            {informationSummaryData.map((item) => (
              <InformationSummary key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div
        className={`max-w-120 w-full h-full max-lg:mx-auto aspect-[536/636] relative`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-indigo-400 rounded-3xl transform rotate-3 scale-95 opacity-20 blur-xl"></div>
        <img
          className={`shadow-2xl shadow-purple-100 w-full h-full relative z-10 object-cover bg-white rounded-3xl border-4 border-white`}
          src={person}
          alt="Ved Dhobi"
        />
      </div>
    </div>
  );
};

export default Introduction;
