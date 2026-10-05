import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Address from "./Address";
import Form from "./Form";
import SocialMedia from "../common/socialMedia/SocialMedia";

const addressData = [
  {
    icon: faLocationDot,
    title: "Location",
    description: "Modasa, Aravalli, Gujarat, India",
  },
  {
    icon: faEnvelope,
    title: "Primary Email",
    description: "veddhobi252@gmail.com",
  },
  {
    icon: faPhone,
    title: "Phone / WhatsApp",
    description: "+91 70433 62186",
  },
];

const Contact = () => {
  return (
    <div className="relative -bottom-15 -mt-15 z-10 px-4">
      <div
        className="content p-6 md:p-12 lg:p-16 bg-white rounded-3xl shadow-[0px_0px_90px_9px_rgba(0,_0,_0,_0.08)] border border-purple-50"
        id="contact"
      >
        <div className="flex flex-col-reverse lg:gap-8 xl:gap-20 lg:flex-row justify-between">
          <div className="lg:w-1/2">
            <div>
              <div className="inline-block px-3 py-1 rounded-md bg-purple-100 text-purple-800 font-mono text-xs font-semibold mb-3">
                GET IN TOUCH
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Let’s Discuss Your Project
              </h2>
              <p className="text-sm sm:text-base pt-3 font-normal text-gray-600 leading-relaxed">
                I am open to entry-level <strong className="text-purple-700">Software Developer</strong>, <strong className="text-purple-700">Android Developer</strong>, and <strong className="text-purple-700">AI/ML Engineer</strong> opportunities. Strongly prefer Remote / WFH setups.
              </p>
            </div>
            
            <div className="my-6 space-y-3">
              {addressData.map((item, index) => (
                <Address item={item} key={index} />
              ))}
            </div>

            <div className="w-full mt-6">
              <p className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Connect via Socials:</p>
              <SocialMedia />
            </div>
          </div>

          <div className="lg:w-1/2 py-2">
            <p className="text-2xl font-bold text-gray-900 lg:hidden text-center mb-6">
              Send Me a Message
            </p>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
