import person from "../../assets/images/person2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faCode } from "@fortawesome/free-solid-svg-icons";
import SocialMedia from "../common/socialMedia/SocialMedia";
import { Link } from "react-scroll";

const Profile = () => {
  return (
    <div
      className={`relative mx-4 xxl:mx-0.5 -bottom-20 lg:-bottom-28 z-10 rounded-3xl bg-white drop-shadow-2xl max-xl:mb-5 shadow-purple-100/50 border border-purple-50 xl:p-20 lg:p-16 md:p-12 sm:p-8 p-5`}
      id="profile"
    >
      <div className="flex max-md:flex-col justify-between items-center gap-10">
        {/* Profile image container */}
        <div className="xxl:max-w-106 w-full md:w-auto h-auto">
          <div className="max-w-96 h-108 object-cover overflow-hidden rounded-2xl shadow-lg border-4 border-white relative mx-auto">
            <img
              className="bg-soft-white w-full h-full object-cover"
              src={person}
              alt="Ved Dhobi Profile"
            />
          </div>
          {/* Social media pill */}
          <div className="relative bottom-6">
            <div className="flex justify-center">
              <div className="px-6 py-3.5 z-20 text-center bg-white rounded-2xl border border-purple-100 shadow-xl">
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
            Software Engineer, Native Android Specialist & AI Builder
          </h2>
          
          <div
            className={`text-sm xs:text-base lg:text-[17px] font-normal max-md:text-center text-gray-600 leading-relaxed`}
          >
            <p>
              I am a computer engineering student at <strong className="text-gray-900">GEC Modasa (GTU)</strong>, admitted via D2D after earning an <strong className="text-purple-700">8.87 / 10.0 CGPA</strong> (9.26 final semester) in Diploma IT at Govt. Polytechnic Himatnagar, where I earned the 🏆 <strong>Best Performance Award</strong>.
            </p>
            <p className="mt-4">
              I specialize in <strong className="text-gray-900">Native Android Development (Java + Firebase)</strong>, <strong className="text-gray-900">Python AI/ML Integration</strong> (Groq API ~50ms, RAG architecture, Scikit-learn), and <strong className="text-gray-900">Full-Stack Django</strong>. As the solo founder of <strong className="text-purple-700">DDQuest</strong>, I built and launched a real startup study platform utilized by GTU diploma IT students across Gujarat.
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
            
            <a
              className={`btn btn-lg px-6 py-3 border border-gray-200 bg-white hover:border-purple-600 hover:text-purple-700 text-gray-800 font-semibold rounded-xl transition-all shadow-sm`}
              href="mailto:veddhobi252@gmail.com?subject=Requesting%20Ved%20Dhobi's%20Resume"
            >
              <FontAwesomeIcon icon={faDownload} className="me-2 text-purple-600" /> Request Resume / CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
