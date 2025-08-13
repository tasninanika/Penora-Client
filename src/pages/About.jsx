import aboutImg from "../assets/images/blog.jpg";

const About = () => {
  return (
    <section className="w-11/12 mx-auto my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Image */}
        <div data-aos="fade-right" data-aos-duration="800">
          <img
            src={aboutImg}
            alt="About Us"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Right Side - Text */}
        <div data-aos="fade-left" data-aos-duration="800">
          <h2 className="text-3xl font-bold mb-6 text-[#1b9c85]">
            About Penora
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to{" "}
            <span className="font-semibold text-gray-800">Penora</span> — a
            space for thinkers, storytellers, and innovators. Our mission is to
            bring diverse voices together, enabling people to share their
            insights, knowledge, and creativity with the world.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Whether you’re a seasoned writer or a beginner, Penora gives you the
            tools to craft, publish, and connect with readers who value
            authentic ideas and fresh perspectives.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Join us in shaping the future of content — one story at a time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
