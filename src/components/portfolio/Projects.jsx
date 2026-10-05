import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt, faLock } from "@fortawesome/free-solid-svg-icons";

const Projects = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
      <div>
        {/* Top Header without images — Clean icon banner */}
        <div className={`p-6 bg-gradient-to-br ${data.gradient || "from-purple-50 to-indigo-50"} border-b border-gray-100 flex items-center justify-between`}>
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl text-purple-700 group-hover:scale-110 transition-transform">
            <FontAwesomeIcon icon={data.icon} />
          </div>

          <span
            className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border ${
              data.badgeType === "live"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : data.badgeType === "founder"
                ? "bg-purple-100 text-purple-800 border-purple-200"
                : "bg-gray-100 text-gray-700 border-gray-200"
            }`}
          >
            {data.badge || data.category}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono font-bold text-purple-600 uppercase tracking-wider">
              {data.category}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors tracking-tight">
            {data.title}
          </h3>

          <p className="text-gray-600 text-sm mt-3 leading-relaxed">
            {data.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            {data.tags &&
              data.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-[11px] font-medium"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-6 pt-0 border-t border-gray-50 flex items-center justify-between mt-4">
        {data.github ? (
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-semibold text-gray-700 hover:text-purple-700 transition-colors"
          >
            <FontAwesomeIcon icon={faGithub} className="text-base me-1.5" /> Source Code
          </a>
        ) : (
          <span className="inline-flex items-center text-xs font-medium text-gray-400">
            <FontAwesomeIcon icon={faLock} className="me-1.5" /> Private Repository
          </span>
        )}

        {data.live ? (
          <a
            href={data.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors"
          >
            Live App <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1 text-[10px]" />
          </a>
        ) : (
          <span className="text-[11px] font-mono text-gray-400">Production Build</span>
        )}
      </div>
    </div>
  );
};

export default Projects;
