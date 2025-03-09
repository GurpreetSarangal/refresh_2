import React from "react";
import { Link } from "react-router-dom"; // If using React Router
import headerBg from '../../assets/img/carousel-1.jpg'; // Update with your actual image path
import AboutUs from '../../components/about/AboutUs'; // Update with your actual component path
import Contact from "../contact/Contact";
import Footer from "../footer/Footer";

const Header = () => {
  return (
    <>
    <div className="container-fluid bg-breadcrumb" style={{ backgroundImage: `url(${headerBg })`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="container text-center py-5" style={{ maxWidth: "900px" }}>
        <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">
          Contact Us
        </h4>
        <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
          <li className="breadcrumb-item">
            <Link to="/" className="text-white">Home</Link>
          </li>
         
          <li className="breadcrumb-item active text-primary">Contact Us</li>
        </ol>
      </div>
    </div>
    <Contact/>
    <AboutUs/>
    <Footer/>
    </>
  );
};

export default Header;
