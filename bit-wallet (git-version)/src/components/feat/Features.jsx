import React from "react";
import "./Features.css"; // Create a separate CSS file for styling

const featuresData = [
  { 
    id: 1, 
    icon: "fas fa-chart-line", 
    title: "Real-Time Market Data", 
    description: "Access to live market data and analytics to make informed trading decisions." 
  },
  { 
    id: 2, 
    icon: "fas fa-university", 
    title: "Secure Transactions", 
    description: "Robust security measures to ensure safe and secure transactions for all users." 
  },
  { 
    id: 3, 
    icon: "fas fa-file-alt", 
    title: "User -Friendly Interface", 
    description: "An intuitive platform designed for both beginners and experienced traders." 
  },
  { 
    id: 4, 
    icon: "fas fa-hand-holding-usd", 
    title: "24/7 Customer Support", 
    description: "Dedicated support team available around the clock to assist you with any inquiries." 
  },
];

const Features = () => {
  return (
    <div className="container-fluid feature pb-5" id="features">
      <div className="container pb-5">
        <div className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
          <h4 className="text-primary">Our Features</h4>
          <h1 className="display-5 mb-4">
            Connecting businesses, ideas, and people for greater impact.
          </h1>
          <p className="mb-0">
            At CryptoExchange, we offer a range of features designed to enhance your trading experience.
          </p>
        </div>
        <div className="row g-4">
          {featuresData.map((feature, index) => (
            <div
              className="col-md-6 col-lg-6 col-xl-3"
              key={feature.id}
              data-wow-delay={`${0.2 * (index + 1)}s`} // Dynamic delay
            >
              <div className="feature-item p-4">
                <div className="feature-icon p-4 mb-4">
                  <i className={`${feature.icon} fa-4x text-primary`}></i>
                </div>
                <h4>{feature.title}</h4>
                <p className="mb-4">
                  {feature.description}
                </p>
                <a className="btn btn-primary rounded-pill py-2 px-4" href="#">
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
