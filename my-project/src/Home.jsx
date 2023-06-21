import React from "react";
import Navbar from "./component/Navbar";
import Hero from "./component/Home/Hero";
import About from "./component/Home/About";
import Service from "./component/Home/Service";
import Footer from "./component/Footer";
import RandomTable from "./component/RandomTable";
import Testimonials from "./component/Home/Testimonials";
import OurTeam from "./component/Home/OurTeam";

const Home = () => {
  return (
    <div className=" w-full m-0 p-0 h-screen oveflow-hidden ">
      <Navbar />
      <div className="">
        <Hero />
        <About />
        <Service />
        <OurTeam />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
