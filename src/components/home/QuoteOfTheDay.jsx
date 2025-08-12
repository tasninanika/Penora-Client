import React, { useEffect, useState } from "react";

const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => setQuote(data))
      .catch((err) => console.error("Error fetching quote:", err));
  }, []);

  return (
    <section className="w-11/12 mx-auto my-16 text-center">
      <h2 className="text-3xl font-bold mb-6">Quote of the Day</h2>

      <div data-aos="fade-up" data-aos-duration="800">
        {quote ? (
          <div className="bg-[#f5f5f5] p-8 rounded-xl shadow-md max-w-2xl mx-auto">
            <p className="text-lg italic text-gray-700">"{quote.content}"</p>
            <p className="mt-4 font-semibold text-gray-900">— {quote.author}</p>
          </div>
        ) : (
          <p>Loading quote...</p>
        )}
      </div>
    </section>
  );
};

export default QuoteOfTheDay;
