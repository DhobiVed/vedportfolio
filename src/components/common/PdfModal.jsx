import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faExternalLinkAlt, faFilePdf } from "@fortawesome/free-solid-svg-icons";

const PdfModal = ({ isOpen, onClose, pdfUrl, title }) => {
  if (!isOpen || !pdfUrl) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-4xl h-[88vh] flex flex-col shadow-2xl overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-purple-700 to-indigo-700 text-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <FontAwesomeIcon icon={faFilePdf} className="text-red-300 text-lg shrink-0" />
            <h3 className="text-base font-bold truncate tracking-tight">{title || "Document Viewer"}</h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={pdfUrl.replace("/preview?rm=minimal", "/view").replace("/preview", "/view")}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all text-xs font-semibold flex items-center gap-1.5"
              title="Open in new tab"
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              <span className="hidden sm:inline">New Tab</span>
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all"
              title="Close"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>

        {/* Modal Body with Iframe */}
        <div className="flex-1 bg-gray-100 relative">
          <iframe
            src={pdfUrl}
            title={title || "Document"}
            className="w-full h-full border-0"
            allow="autoplay"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PdfModal;
