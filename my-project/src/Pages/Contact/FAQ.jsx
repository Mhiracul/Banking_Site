import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const faqData = [
    {
      question: "How do I get started?",
      answer:
        "To get started, simply sign up on our website and follow the instructions to create your account.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards, such as Visa, Mastercard, and American Express. We also support payments through PayPal.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, you can cancel your subscription at any time. Simply go to your account settings and follow the cancellation process.",
    },
    {
      question: "How do i invest?",
      answer:
        "Yes, we offer a free trial period of 7 days for new users. You can explore our services and features during this trial period.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "For any inquiries or assistance, you can reach out to our customer support team through email or our support hotline.",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#0C1C19] to-[#102F2D] rounded-t-[40px]">
      <div className="flex justify-center">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 px-10 py-20 w-full max-w-screen-lg">
          <div className="w-[390px]">
            <h1 className="text-[#E1FEA3]">FAQ</h1>
            <h1 className="text-white md:text-3xl text-xl font-bold capitalize mt-2">
              Frequently Asked Questions
            </h1>
            <p className="text-xs text-bodydark mt-2">
              If you have any questions, check out our frequently <br /> asked
              questions below.
            </p>
          </div>
          <div className="box md:w-[390px] w-[300px]">
            {faqData.map((item, index) => (
              <div key={index} className="faq-item">
                <div
                  className={`flex justify-between items-center text-[#728B6D] mb-2 bg-[#13221F] rounded-md p-3 ${
                    activeIndex === index ? "mb-2" : ""
                  }`}
                  onClick={() => handleClick(index)}
                >
                  <div className="faq-question">
                    <p className="text-sm">{item.question}</p>
                  </div>
                  <div className="faq-icon">
                    {activeIndex === index ? <FiMinus /> : <FiPlus />}
                  </div>
                </div>
                {activeIndex === index && (
                  <div className="faq-answer bg-white p-2 rounded-md">
                    <p className="text-sm">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-10">
        <h1 className="text-center text-bodydark">Our Sponsors</h1>
        <div></div>
      </div>
    </div>
  );
};

export default FAQ;
