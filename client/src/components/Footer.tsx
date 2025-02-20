import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentDate = new Date().toLocaleDateString("en-GB");

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-4">
          <p>&copy; {currentDate}. Hashim. All rights reserved.</p>
        </div>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/HashimAyamon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-all"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://www.linkedin.com/in/hashim-a-139a00269/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 transition-all"
          >
            <FaLinkedin size={30} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
