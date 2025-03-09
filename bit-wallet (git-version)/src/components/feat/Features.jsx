import React from "react";
import "./Features.css"; // Create a separate CSS file for styling

const featuresData = [
  { id: 1, icon: "fas fa-chart-line", title: "Global Management" },
  { id: 2, icon: "fas fa-university", title: "Corporate Banking" },
  { id: 3, icon: "fas fa-file-alt", title: "Asset Management" },
  { id: 4, icon: "fas fa-hand-holding-usd", title: "Investment Bank" },
];

const Features = () => {
  return (
    <div className="container-fluid feature pb-5">
      <div className="container pb-5">
        <div className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
          <h4 className="text-primary">Our Features</h4>
          <h1 className="display-5 mb-4">
            Connecting businesses, ideas, and people for greater impact.
          </h1>
          <p className="mb-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            adipisci facilis cupiditate recusandae aperiam temporibus corporis.
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea hic laborum odit pariatur...
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
