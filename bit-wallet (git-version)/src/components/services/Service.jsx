import React from "react";
import "./Services.css"; // Create a CSS file for styling
import service1 from "../../assets/img/service-1.jpg";
import service2 from "../../assets/img/service-2.jpg";
import service3 from "../../assets/img/service-3.jpg";
import service4 from "../../assets/img/service-4.jpg";
import service5 from "../../assets/img/service-5.jpg";
import service6 from "../../assets/img/service-6.jpg";

const servicesData = [
  { id: 1, img: service1, title: "Strategy Consulting" },
  { id: 2, img: service2, title: "Financial Advisory" },
  { id: 3, img: service3, title: "Managements" },
  { id: 4, img: service4, title: "Supply Optimization" },
  { id: 5, img: service5, title: "HR Consulting" },
  { id: 6, img: service6, title: "Marketing Consulting" },
];

const Services = () => {
  return (
    <div className="container-fluid service pb-5">
      <div className="container pb-5">
        <div className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
          <h4 className="text-primary">Our Services</h4>
          <h1 className="display-5 mb-4">We Provide the Best Offers</h1>
          <p className="mb-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            adipisci facilis cupiditate recusandae aperiam temporibus corporis.
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tenetur, sint? Excepturi facilis neque nesciunt similique
                    officiis veritatis.
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
