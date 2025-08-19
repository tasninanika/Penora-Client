import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1b1b1b] text-gray-300 pt-12 pb-6">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Penora</h2>
          <p className="text-sm leading-6">
            Penora is your space for insightful blogs, trending stories, and
            creative ideas. Read, write, and share your voice with the world.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-[#1b9c85]">
                Home
              </a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-[#1b9c85]">
                Blogs
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#1b9c85]">
                About
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-[#1b9c85]">
                Technology
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#1b9c85]">
                Health
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#1b9c85]">
                Lifestyle
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#1b9c85]">
                Travel
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded-full hover:bg-[#1b9c85] transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded-full hover:bg-[#1b9c85] transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded-full hover:bg-[#1b9c85] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded-full hover:bg-[#1b9c85] transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Penora. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
