import Slider from "react-slick";
import Lottie from "lottie-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import techAnimation from "../../assets/images/technology.json";
import designAnimation from "../../assets/images/design.json";
import lifestyleAnimation from "../../assets/images/life.json";
import travelAnimation from "../../assets/images/travel.json";
import financeAnimation from "../../assets/images/finance.json";
import healthAnimation from "../../assets/images/health.json";
import foodAnimation from "../../assets/images/food.json";
import educationAnimation from "../../assets/images/education.json";
import aiAnimation from "../../assets/images/technology.json";
import programmingAnimation from "../../assets/images/technology.json";

const Categories = () => {
  const categories = [
    { name: "Technology", animation: techAnimation },
    { name: "Design", animation: designAnimation },
    { name: "Lifestyle", animation: lifestyleAnimation },
    { name: "Travel", animation: travelAnimation },
    { name: "Finance", animation: financeAnimation },
    { name: "Health", animation: healthAnimation },
    { name: "Food", animation: foodAnimation },
    { name: "Education", animation: educationAnimation },
    { name: "AI", animation: aiAnimation },
    { name: "Programming", animation: programmingAnimation },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="px-16 pb-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Categories
      </h2>
      <Slider {...settings}>
        {categories.map(({ name, animation }, idx) => (
          <div key={idx} className="px-2">
            <div className="bg-[#e7f6ea] text-[#1b9c85] rounded-xl py-6 text-center text-lg font-semibold cursor-pointer hover:bg-[#fffdef] hover:text-black transition-transform transform hover:scale-105 duration-300 shadow-md flex flex-col items-center gap-2">
              <Lottie
                animationData={animation}
                autoplay
                loop
                style={{ height: 80, width: 80 }}
              ></Lottie>
              <span>{name}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Categories;
