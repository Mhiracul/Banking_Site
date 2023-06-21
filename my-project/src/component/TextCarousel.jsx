import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

const TextCarousel = () => {
  const [texts, setTexts] = useState([
    "Benedith from England just deposited $2000",
    "John from Germany just joined our bank",
    "Sophia from France just made a profit of $500",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === texts.length - 1 ? 0 : prevIndex + 1
        );
        setShowText(true);
      }, 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-32 left-0 transform -translate-y-1/2">
      <Transition
        show={showText}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-50"
        leaveTo="opacity-0"
      >
        <div className="bg-[#DBFF8E]  text-[#102F2D] p-4 rounded-lg">
          <div className="flex items-center">
            <span className="mr-2">🌟</span>
            <p className="text-sm font-semibold">{texts[currentIndex]}</p>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default TextCarousel;
