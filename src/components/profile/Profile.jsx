import vedAbout from "../../assets/images/ved_about.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faCode } from "@fortawesome/free-solid-svg-icons";
import SocialMedia from "../common/socialMedia/SocialMedia";
import { Link } from "react-scroll";

const Profile = () => {
  return (
    <div
      className={`relative mx-4 xxl:mx-0.5 -bottom-20 lg:-bottom-28 z-10 rounded-3xl bg-white drop-shadow-2xl max-xl:mb-5 shadow-purple-100/50 border border-purple-100 xl:p-20 lg:p-16 md:p-12 sm:p-8 p-5`}
      id="profile"
    >
      <div className="flex max-md:flex-col justify-between items-center gap-12">
        {/* Profile image with visible background card */}
        <div className="xxl:max-w-110 w-full md:w-auto h-auto flex flex-col items-center">
          <div className="relative mx-auto w-full max-w-96 sm:max-w-104">
            {/* Back tilted accent card */}
            <div className="absolute -inset-2.5 bg-gradient-to-tr from-purple-600 via-indigo-500 to-purple-400 rounded-3xl transform -rotate-3 shadow-xl opacity-90"></div>
            {/* Second subtle offset card */}
            <div className="absolute -inset-1.5 bg-gradient-to-bl from-indigo-200 via-purple-100 to-pink-100 rounded-3xl transform rotate-2 border border-purple-300/60 shadow-md"></div>

            {/* Main visible card container */}
            <div className="relative z-10 p-3.5 sm:p-4 rounded-3xl bg-gradient-to-b from-purple-50 via-white to-indigo-50 border-2 border-purple-200 shadow-2xl">
              <div className="w-full h-96 sm:h-104 overflow-hidden rounded-2xl shadow-inner border border-purple-100 bg-purple-950/5">
                <img
                  className="w-full h-full object-cover object-[28%_center] hover:scale-105 transition-transform duration-500"
                  src={vedAbout}
                  alt="Ved Dhobi Profile"
                />
              </div>
            </div>
          </div>

          {/* Social media pill */}
          <div className="relative -top-6 z-20">
            <div className="flex justify-center">
              <div className="px-6 py-3.5 text-center bg-white rounded-2xl border-2 border-purple-200 shadow-xl">
                <SocialMedia />
              </div>
            </div>
          </div>
        </div>

        <div className="max-sm:w-full w-full md:w-[36rem]">
          <div className="inline-block px-3 py-1 rounded-md bg-purple-100 text-purple-800 font-mono text-xs font-semibold mb-3">
            ABOUT VED DHOBI
          </div>

          <h2
            className={`text-2xl xxs:text-3xl sm:text-4xl lg:text-[36px] text-gray-900 max-md:text-center font-bold mb-6 tracking-tight leading-tight`}
          >
            Software Engineer, Native Android Dev & AI Builder
          </h2>

          <div
            className={`text-sm xs:text-base lg:text-[17px] font-normal max-md:text-center text-gray-600 leading-relaxed`}
          >
            <p>
              Computer Engineering student at{" "}
              <strong className="text-gray-900">GEC Modasa (GTU)</strong>, admitted via D2D
              after earning an{" "}
              <strong className="text-purple-700">8.87 / 10.0 CGPA</strong> (9.26 final
              semester) in Diploma IT at Govt. Polytechnic Himatnagar — where I received the
              🏆 <strong>Best Performance Award</strong>.
            </p>
            <p className="mt-4">
              Solo founder of{" "}
              <strong className="text-purple-700">DDQuest</strong> — a real startup Android
              app used by GTU Diploma IT students across Gujarat. Specialized in{" "}
              <strong className="text-gray-900">Native Android (Java + Firebase)</strong>,{" "}
              <strong className="text-gray-900">Python AI/ML</strong> (Groq ~50ms, RAG,
              Scikit-learn), and{" "}
              <strong className="text-gray-900">Full-Stack Django</strong>.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 max-md:justify-center">
            <Link
              className="btn btn-lg px-7 py-3 btn-primary text-white font-semibold rounded-xl shadow-md cursor-pointer"
              to="portfolio"
              smooth={true}
              duration={900}
              offset={-100}
            >
              <FontAwesomeIcon icon={faCode} className="me-2" /> View All 9 Projects
            </Link>

            {/* Direct open resume — no request needed */}
            <a
              className={`btn btn-lg px-6 py-3 border border-gray-200 bg-white hover:border-purple-600 hover:text-purple-700 text-gray-800 font-semibold rounded-xl transition-all shadow-sm`}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFilePdf} className="me-2 text-red-500" /> View Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
