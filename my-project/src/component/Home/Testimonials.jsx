import React from "react";
import bast from "../../assets/bast.jpg"; // Replace with your image path
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cards from "../../assets/cards";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div
      className="w-full md:h-full h-full bg-cover bg-center bg-opacity-10"
      style={{
        backgroundImage: `url(${bast})`,
      }}
    >
      <div className="h-full bg-gradient bg-gradient-to-br from-[#102F2D] to-transparent bg-opacity-20 rounded-md shadow-md">
        <div className="py-10">
          <p className="text-[#DBFF8E] text-center text-xl">Testimonials</p>
          <h1 className="text-white text-center mt-3 text-4xl font-bold">
            Our Clients Feedback About Their Experience With Us
          </h1>
        </div>
        <div>
          <div className="container mx-auto px-10 md:px-8 py-16 max-w-screen-lg">
            <Slider {...settings}>
              {cards.map((card) => (
                <div key={card.id} className="">
                  <div className="bg-[#DBFF8E] rounded-lg shadow-lg p-6 flex-col py-16">
                    <div className="flex items-center text-left">
                      <img
                        src={card.image}
                        alt=""
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-bold text-[#102F2D]">
                          {card.name}
                        </h3>
                        <p className="text-[#758285]">
                          Country: {card.country}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#102F2D] text-xl text-left mt-8 font-medium">
                        {card.testimonial}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {card.star}
                      {card.star}
                      {card.star}
                      {card.star}
                      {card.star}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
