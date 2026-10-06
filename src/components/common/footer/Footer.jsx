import { Link } from "react-scroll";

const navItems = [
  { id: 1, name: "Home", url: "introduction" },
  { id: 2, name: "About", url: "profile" },
  { id: 3, name: "Process", url: "work-process" },
  { id: 4, name: "Projects", url: "portfolio" },
  { id: 5, name: "Skills", url: "skills" },
  { id: 6, name: "Education", url: "education" },
  { id: 7, name: "Nova AI", url: "nova-ai" },
  { id: 8, name: "Contact", url: "contact" },
];
const copyrightYear = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="pt-24 md:pt-36 content max-2xl:px-4 pb-12">
      <div className="flex max-md:flex-col justify-between items-center gap-6 pb-8 border-b border-gray-200">
        <Link to="introduction" smooth={true} duration={900} className="flex items-center cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-bold flex items-center justify-center text-xl shadow-md">
            V
          </div>
          <div className="ms-3">
            <p className="text-2xl font-bold tracking-tight text-gray-900 leading-none">
              VED<span className="text-purple-600">.</span>
            </p>
            <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-0.5">
              Software Dev & AI Builder
            </p>
          </div>
        </Link>

        <div className="flex flex-wrap justify-center gap-4 text-center">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.url.toLowerCase()}
              smooth={true}
              duration={900}
              offset={-100}
              className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-purple-600 cursor-pointer transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          &copy; {copyrightYear} Ved Dhobi. All rights reserved.
        </p>
      </div>

      <p className="text-gray-500 text-center text-xs mt-6">
        Engineered with 💜 by <strong className="text-gray-900">Ved Dhobi</strong> | Powered by React 19, Tailwind CSS v4 & Picto UI
      </p>
    </div>
  );
};

export default Footer;
