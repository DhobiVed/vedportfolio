import { useEffect, useState } from "react";
import { Link } from "react-scroll";

const navItems = [
  { id: 1, name: "Home", url: "introduction" },
  { id: 2, name: "About", url: "profile" },
  { id: 3, name: "Process", url: "work-process" },
  { id: 4, name: "Projects", url: "portfolio" },
  { id: 5, name: "Skills", url: "profession" },
  { id: 6, name: "Education", url: "education" },
  { id: 7, name: "Nova AI", url: "nova-ai" },
  { id: 8, name: "Contact", url: "contact" },
];

const handleMenuClick = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

const menu = navItems.map((item) => (
  <li key={item.id} onMouseDown={(e) => e.preventDefault()}>
    <Link
      onClick={handleMenuClick}
      to={item.url.toLowerCase()}
      smooth={true}
      duration={1000}
      spy={true}
      offset={-100}
      activeStyle={{
        backgroundColor: "#9929fb",
        color: "white",
      }}
      className={`hover:text-picto-primary px-4 py-2 mx-1 cursor-pointer font-medium transition-all rounded-lg`}
    >
      {item.name}
    </Link>
  </li>
));

const NavBar = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`sticky top-0 ${
        position > 50
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
          : "bg-white border-white"
      } z-50 transition-all duration-500`}
    >
      <div className="navbar flex justify-between mx-auto content px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-lg dropdown-content rounded-box z-50 mt-3 w-lvw p-3 shadow-xl font-semibold flex-nowrap bg-white text-black`}
            >
              {menu}
            </ul>
          </div>

          <Link
            to={`introduction`}
            smooth={true}
            duration={900}
            className="flex items-center border-0 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-bold flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
              V
            </div>
            <div className="ms-3">
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 leading-none">
                VED<span className="text-picto-primary">.</span>
              </p>
              <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-0.5">
                Software Dev & AI
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ul className="hidden lg:flex menu menu-horizontal text-[15px] font-medium md:shrink-0">
            {menu}
          </ul>
          
          <Link
            className="btn btn-sm sm:btn-md btn-primary px-5 text-white font-semibold rounded-xl shadow-md hover:shadow-purple-200 cursor-pointer"
            to={`nova-ai`}
            smooth={true}
            duration={900}
            offset={-100}
          >
            ✨ Nova AI
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
