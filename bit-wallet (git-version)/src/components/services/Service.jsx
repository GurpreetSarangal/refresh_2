import React from "react";
import "./Services.css"; // Create a CSS file for styling
import service1 from "../../assets/img/service-1.jpg";
import service2 from "../../assets/img/service-2.jpg";
import service3 from "../../assets/img/service-3.jpg";
import service4 from "../../assets/img/service-4.jpg";
import service5 from "../../assets/img/service-5.jpg";
import service6 from "../../assets/img/service-6.jpg";

const servicesData = [
  { 
    id: 1, 
    img: service1, 
    title: "Crypto Trading Strategies", 
    description: "Expert strategies to maximize your trading potential and minimize risks." 
  },
  { 
    id: 2, 
    img: service2, 
    title: "Market Analysis", 
    description: "In-depth analysis of market trends to help you make informed trading decisions." 
  },
  { 
    id: 3, 
    img: service3, 
    title: "Portfolio Management", 
    description: "Comprehensive management of your crypto assets to ensure optimal performance." 
  },
  { 
    id: 4, 
    img: service4, 
    title: "Risk Management", 
    description: "Strategies to identify and mitigate risks associated with cryptocurrency trading." 
  },
  { 
    id: 5, 
    img: service5, 
    title: "Regulatory Compliance", 
    description: "Guidance on navigating the complex regulatory landscape of cryptocurrency." 
  },
  { 
    id: 6, 
    img: service6, 
    title: "Educational Resources", 
    description: "Access to a wealth of resources to enhance your understanding of crypto trading." 
  },
];

const Services = () => {
  return (
    <div className="container-fluid service pb-5" id="services">
      <div className="container pb-5">
        <div className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
          <h4 className="text-primary">Our Services</h4>
          <h1 className="display-5 mb-4">We Provide the Best Offers</h1>
          <p className="mb-0">
            At CryptoExchange, we are committed to providing top-notch services to help you succeed in the world of cryptocurrency.
          </p>
        </div>
        <div className="row g-4">
          {servicesData.map((service, index) => (
            <div
              className="col-md-6 col-lg-4"
              key={service.id}
              data-wow-delay={`${0.2 * (index % 3 + 1)}s`} // Dynamic delay
            >
              <div className="service-item">
                <div className="service-img">
                  <img
                    src={service.img}
                    className="img-fluid rounded-top w-100"
                    alt={service.title}
                  />
                </div>
                <div className="rounded-bottom p-4">
                  <a href="#" className="h4 d-inline-block mb-4">
                    {service.title}
                  </a>
                  <p className="mb-4">
                    {service.description}
                  </p>
                  <a className="btn btn-primary rounded-pill py-2 px-4" href="#">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
