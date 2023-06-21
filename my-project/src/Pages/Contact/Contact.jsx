import React from "react";
import FAQ from "./FAQ";
import Navbar from "../../component/Navbar";
import Hero from "./Hero";
import Footer from "../../component/Footer";

const Contact = () => {
  return (
    <div className="w-full h-screen m-0 p-0  oveflow-hidden ">
      <Navbar />
      <Hero />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Contact;
