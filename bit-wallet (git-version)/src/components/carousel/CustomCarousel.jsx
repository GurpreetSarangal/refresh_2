import React from "react";
import { Carousel, Container, Button } from "react-bootstrap";
import img1 from '../../assets/img/carousel-1.jpg';
import img2 from '../../assets/img/carousel-2.jpg';
import "./Carousel.css";


const CustomCarousel = () => {
  return (
    <Carousel fade interval={2000} pause={false}>
      {/* Slide 1 */}
      <Carousel.Item>
        <img src={img1} className="d-block w-100" alt="Slide 1" />
        <Carousel.Caption>
          <Container>
            <div className="text-center">
              <h4 className="text-primary text-uppercase fw-bold mb-4">Welcome To Stocker</h4>
              <h1 className="display-4 text-uppercase text-white mb-4">
                Invest your money with higher return
              </h1>
              <p className="mb-5 fs-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              <div className="d-flex justify-content-center mb-4">
                <Button variant="light" className="rounded-pill py-3 px-4 me-2">
                  <i className="fas fa-play-circle me-2"></i> Watch Video
                </Button>
                <Button variant="primary" className="rounded-pill py-3 px-4 ms-2">
                  Learn More
                </Button>
              </div>
            </div>
          </Container>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <img src={img2} className="d-block w-100" alt="Slide 2" />
        <Carousel.Caption>
          <Container>
            <div className="text-center">
              <h4 className="text-primary text-uppercase fw-bold mb-4">Welcome To Stocker</h4>
              <h1 className="display-4 text-uppercase text-white mb-4">
                Invest your money with higher return
              </h1>
              <p className="mb-5 fs-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              <div className="d-flex justify-content-center mb-4">
                <Button variant="light" className="rounded-pill py-3 px-4 me-2">
                  <i className="fas fa-play-circle me-2"></i> Watch Video
                </Button>
                <Button variant="primary" className="rounded-pill py-3 px-4 ms-2">
                  Learn More
                </Button>
              </div>
            </div>
          </Container>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CustomCarousel;
