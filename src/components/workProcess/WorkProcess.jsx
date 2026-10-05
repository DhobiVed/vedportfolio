import WorkSteps from "./WorkSteps";

const workStepData = [
  {
    id: 1,
    title: "1. Research & Analysis",
    description:
      "Identifying real user pain points—like GTU diploma study material scatter or manual attendance proxy fraud—to define clear requirements.",
    svgPath:
      "M21.3333 18.6667H10.6667C10.313 18.6667 9.97391 18.8072 9.72386 19.0573C9.47381 19.3073 9.33333 19.6465 9.33333 20.0001C9.33333 20.3537 9.47381 20.6928 9.72386 20.9429C9.97391 21.1929 10.313 21.3334 10.6667 21.3334H21.3333C21.687 21.3334 22.0261 21.1929 22.2761 20.9429C22.5262 20.6928 22.6667 20.3537 22.6667 20.0001C22.6667 19.6465 22.5262 19.3073 22.2761 19.0573C22.0261 18.8072 21.687 18.6667 21.3333 18.6667ZM21.3333 13.3334H13.3333C12.9797 13.3334 12.6406 13.4739 12.3905 13.7239C12.1405 13.974 12 14.3131 12 14.6667C12 15.0204 12.1405 15.3595 12.3905 15.6096C12.6406 15.8596 12.9797 16.0001 13.3333 16.0001H21.3333C21.687 16.0001 22.0261 15.8596 22.2761 15.6096C22.5262 15.3595 22.6667 15.0204 22.6667 14.6667C22.6667 14.3131 22.5262 13.974 22.2761 13.7239C22.0261 13.4739 21.687 13.3334 21.3333 13.3334Z",
  },
  {
    id: 2,
    title: "2. Architecture Design",
    description:
      "Designing scalable NoSQL & relational database schemas (Firestore, PostgreSQL, MySQL), REST APIs, and clean Native Android / Django structures.",
    svgPath:
      "M9.33333 21.3334C9.86377 21.3334 10.3725 21.1227 10.7475 20.7476C11.1226 20.3726 11.3333 19.8638 11.3333 19.3334C11.3398 19.2669 11.3398 19.1999 11.3333 19.1334L15.0533 15.4134H15.36H15.6667L17.8133 17.5601C17.8133 17.5601 17.8133 17.6267 17.8133 17.6667C17.8133 18.1972 18.024 18.7059 18.3991 19.081C18.7742 19.456 19.2829 19.6667 19.8133 19.6667C20.3438 19.6667 20.8525 19.456 21.2275 19.081C21.6026 18.7059 21.8133 18.1972 21.8133 17.6667V17.5601L26.6667 12.6667Z",
  },
  {
    id: 3,
    title: "3. Build & Optimization",
    description:
      "Writing clean Java/Python code, implementing Firestore startAfter() pagination (90% read cost reduction), and optimizing local disk persistence.",
    svgPath:
      "M29.3333 9.65319C29.3343 9.47772 29.3007 9.30377 29.2343 9.14132C29.168 8.97887 29.0702 8.83111 28.9466 8.70653L23.2933 3.05319C23.1687 2.92962 23.021 2.83185 22.8585 2.7655C22.6961 2.69915 22.5221 2.66551 22.3466 2.66653Z",
  },
  {
    id: 4,
    title: "4. AI & Cloud Deployment",
    description:
      "Integrating sub-50ms Groq LPU models, Google ML Kit face recognition, RAG pipelines, and deploying to production via Netlify and Render.",
    svgPath:
      "M28 18.6668H26.6666V9.3335C26.6666 8.27263 26.2452 7.25521 25.4951 6.50507C24.7449 5.75492 23.7275 5.3335 22.6666 5.3335H9.33329Z",
  },
];

const WorkProcess = () => {
  return (
    <div
      className="content grid xl:grid-cols-2 xl:items-center px-4 py-10 md:py-16 lg:py-24 max-xxl:px-4"
      id="work-process"
    >
      <div className="lg:pe-10 xl:pe-20 max-xs:mb-3 max-xl:mb-8">
        <div className="inline-block px-3 py-1 rounded-md bg-purple-100 text-purple-800 font-mono text-xs font-semibold mb-3">
          ENGINEERING APPROACH
        </div>
        <p className="section-title max-xl:text-center text-gray-900 font-bold tracking-tight">
          Work Process & Architecture Strategy
        </p>
        <p className="mt-6 mb-4 md:text-[18px] text-base font-normal max-xl:text-center text-gray-600 leading-relaxed">
          Driven by clean architecture and user-centric design, I build mobile applications, web platforms, and AI engines that deliver high performance and real-world utility.
        </p>
        <p className="mt-4 md:text-[18px] text-base font-normal max-xl:text-center text-gray-600 leading-relaxed">
          Every database query, API route, and UI component is engineered for reliability, security, and scalability.
        </p>
      </div>

      <div className="grid xs:grid-cols-2 justify-end my-2 w-fit mx-auto gap-4">
        {workStepData.map((data, index) => {
          return (
            <WorkSteps
              data={data}
              style={`max-xs:mt-3 p-5 sm:p-7 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all aspect-auto sm:max-w-78 ${
                index % 2 == 1 ? "xs:ms-3 xs:mt-4" : "xs:mb-4"
              }`}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WorkProcess;
