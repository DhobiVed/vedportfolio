import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Projects = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between group">
      <div>
        <div className="relative overflow-hidden aspect-video bg-gray-100">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] font-mono font-bold text-purple-700 shadow-sm border border-purple-100">
            {data.category}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors tracking-tight">
            {data.title}
          </h3>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">
            {data.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {data.tags &&
              data.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-purple-50 border border-purple-100 text-purple-800 text-[11px] font-medium"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 border-t border-gray-50 flex items-center justify-between mt-4">
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs font-semibold text-gray-700 hover:text-purple-600 transition-colors"
        >
          <FontAwesomeIcon icon={faGithub} className="text-base me-1.5" /> Source Code
        </a>

        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors"
        >
          Details <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ms-1 text-[10px]" />
        </a>
      </div>
    </div>
  );
};

export default Projects;
