import Introduction from "../components/introduction/Introduction";
import Profile from "../components/profile/Profile";
import WorkProcess from "../components/workProcess/WorkProcess";
import Portfolio from "../components/portfolio/Portfolio";
import Profession from "../components/profession/Profession";
import HappyClients from "../components/happyClients/HappyClients";
import NovaChat from "../components/nova/NovaChat";
import Contact from "../components/contact/Contact";
import Footer from "../components/common/footer/Footer";
import NavBar from "../components/common/navbar/NavBar";
import ScrollToTop from "../components/common/scrollToTop/ScrollToTop";
import "../../index.css";

const Home = () => {
  return (
    <div className="relative bg-white min-h-screen font-sans text-gray-900 selection:bg-purple-500 selection:text-white">
      <NavBar />

      <div className="introduction-profile-background">
        <div className="content">
          <Introduction />
          <Profile />
        </div>
      </div>

      <div className="bg-soft-white pt-24">
        <WorkProcess />
      </div>

      <Portfolio />

      <div className="bg-soft-white">
        <Profession />
      </div>

      <HappyClients />

      <NovaChat />

      <div className="bg-gray-900 text-white">
        <Contact />
        <Footer />
      </div>

      <ScrollToTop />
    </div>
  );
};

export default Home;
