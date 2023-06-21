import React from "react";

const ProgressBar = ({ title, progress }) => {
  return (
    <div className="mb-4 rounded-lg">
      <p className="text-gray-600">{title}</p>
      <div className="relative h-4 bg-green-500 rounded-lg">
        <div
          className="absolute top-0 left-0 h-4 bg-[#474646] rounded-lg"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

const AboutPageAbout = () => {
  return (
    <div className="bg-gradient-to-r from-[#0C1C19] to-[#102F2D] text-white">
      <div className="py-20 lg:px-50 md:px-20 px-10">
        <p className="text-center uppercase mb-10 text-[#5c7724]">About us</p>
        <h1 className="text-center mb-10 font-bold text-5xl">
          Our Loans Will Fill All Your Dreams
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-20 justify-center">
          <div className="font-nunito font-light text-[#717685]">
            <p>
              At our company, we are dedicated to providing you with the best
              loan options that can turn your dreams into reality. We understand
              the importance of financial support when it comes to achieving
              your goals, whether it's buying a new home, pursuing higher
              education, starting a business, or fulfilling personal needs. With
              our wide range of loan products and services, we aim to cater to
              diverse needs and empower individuals and businesses to thrive.
            </p>
          </div>

          <div className="text-[#717685] font-nunito font-light">
            <p>
              When you choose our company for your loan needs, you can expect
              competitive interest rates, flexible repayment terms, and
              exceptional customer service.
            </p>
            <p>
              Over the years, we have built strong relationships with our
              customers, earning their trust and loyalty. We are proud of our
              track record of success and customer satisfaction, which is a
              testament to our commitment to excellence.
            </p>
          </div>
        </div>
        <div className="mt-16 ">
          <img
            src="https://templatekit.tokomoo.com/loankit2/wp-content/uploads/sites/94/elementor/thumbs/millennial-couple-buying-new-apartment-shaking-ha-2021-12-09-20-11-06-utc-pveqg5yim5k9588rqjiurq6aezoqv7iwufgcogivew.jpg"
            alt=""
            className="rounded-md"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-20 justify-center mt-20">
          <div className="">
            <h1 className="font-medium text-4xl">We started from 2001</h1>
            <p className="mt-3 text-[#717685] font-nunito font-light">
              Since our establishment in 2001, we have been dedicated to serving
              our customers with integrity and professionalism. Over the years,
              we have helped countless individuals and businesses achieve their
              financial goals and aspirations. Our extensive experience in the
              industry has given us valuable insights into the ever-changing
              financial landscape, allowing us to adapt and provide innovative
              solutions to our clients.
            </p>
          </div>

          <div className="">
            <h1 className="font-medium text-4xl">
              Our mission is to provide the best services.
            </h1>
            <p className="mt-3 text-[#717685] font-nunito font-light">
              At our company, our mission is simple - to provide you with the
              best loan services in the market. We understand that each customer
              is unique, with different financial needs and goals. That's why we
              take a personalized approach, tailoring our services to meet your
              specific requirements. Whether you need a business loan, education
              loan, personal loan, or shopping loan, we have the expertise and
              resources to help you make informed decisions and secure the
              financing you need.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-20 justify-center mt-20">
          <div>
            <p className="uppercase">Specialist</p>
            <h1 className=" font-medium text-4xl my-2">
              Your satisfaction is our priority
            </h1>
            <p className="mt-3 text-[#717685]  font-nunito font-light">
              We understand that there are numerous options available when it
              comes to choosing a loan provider. However, we believe that we
              stand out from the crowd for several reasons. Firstly, our
              commitment to customer satisfaction sets us apart. We genuinely
              care about your financial well-being and will work tirelessly to
              find the best loan solutions for you.
            </p>
          </div>
          <div className="">
            <ProgressBar title="Business Loan" progress={70} />
            <ProgressBar title="Education Loan" progress={90} />
            <ProgressBar title="Personal Loan" progress={50} />
            <ProgressBar title="Shopping Loan" progress={80} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageAbout;
