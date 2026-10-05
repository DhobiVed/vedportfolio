import {
  faGithub,
  faLinkedin,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const socialIcons = [
  { icon: faGithub, link: "https://github.com/DhobiVed", name: "GitHub" },
  { icon: faLinkedin, link: "https://linkedin.com/in/ved-dhobi-7b3a88376", name: "LinkedIn" },
  { icon: faEnvelope, link: "mailto:veddhobi252@gmail.com", name: "Email" },
  { icon: faWhatsapp, link: "https://wa.me/917043362186", name: "WhatsApp" },
];

const SocialMedia = () => {
  return (
    <div className="flex items-center gap-3">
      {socialIcons.map((item, index) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
          className={`text-purple-600 hover:bg-purple-600 hover:text-white p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center`}
          key={index}
        >
          <FontAwesomeIcon
            icon={item.icon}
            className={`text-lg w-5 h-5`}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;
