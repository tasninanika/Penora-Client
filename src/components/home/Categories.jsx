import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Categories = () => {
  const categories = [
    "Technology",
    "Design",
    "Lifestyle",
    "Travel",
    "Finance",
    "Health",
    "Food",
    "Education",
    "AI",
    "Programming",
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
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Categories
      </h2>
      <Slider {...settings}>
        {categories.map((cat, idx) => (
          <div key={idx} className="px-2">
            <div className="bg-[#d1f3d5] text-[#1b9c85] rounded-xl py-6 text-center text-lg font-semibold cursor-pointer hover:bg-[#1b9c85] hover:text-white transition-transform transform hover:scale-105 duration-300 shadow-md">
              {cat}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Categories;
