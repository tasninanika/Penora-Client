import aboutImg from "../assets/blogging1.json";
import BgImg from "../assets/bg.jpg";
import Lottie from "lottie-react";

const About = () => {
  return (
    <section className="relative py-20">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-20 dark:opacity-30"
        style={{ backgroundImage: `url(${BgImg})` }}
      >
        <div className="absolute inset-0 dark:bg-black/60"></div>
      </div>

      {/* Headline */}
      <div className="relative z-10 w-11/12 max-w-6xl mx-auto text-center mt-12">
        <h2
          className="text-4xl font-bold text-[#1b9c85] dark:text-[#4ade80] mb-4 opacity-0 translate-y-8"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="100"
        >
          About <span className="text-gray-800 dark:text-gray-200">Penora</span>
        </h2>
        <p
          className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed opacity-0 translate-y-8"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          Welcome to{" "}
          <span className="font-semibold text-[#1b9c85] dark:text-[#4ade80]">
            Penora
          </span>{" "}
          — a space for thinkers, storytellers, and innovators. Our mission is
          to bring diverse voices together, enabling people to share their
          insights, knowledge, and creativity with the world.
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 w-11/12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-10 rounded-2xl">
        {/* Left Side - Image */}
        <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
          <Lottie
            animationData={aboutImg}
            loop={true}
            className="rounded-2xl w-full object-cover "
          />
        </div>

        {/* Right Side - Text */}
        <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Whether you’re a seasoned writer or just starting your journey,
            Penora gives you the tools to craft, publish, and connect with
            readers who value authentic ideas and fresh perspectives.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Join us in shaping the future of content — <br /> one story at a
            time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
