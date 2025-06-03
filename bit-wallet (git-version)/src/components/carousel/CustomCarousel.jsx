import React from "react";
import { Carousel, Container, Button } from "react-bootstrap";
import img1 from '../../assets/img/carousel-1.jpg';
import img2 from '../../assets/img/carousel-2.jpg';
import "./Carousel.css";
import { Backdrop } from "@mui/material";
import { Link } from "react-router-dom";



const CustomCarousel = () => {
  return (
    <Carousel slide interval={2000} pause={false}>
      {/* Slide 1 */}
      <Carousel.Item sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <img src={img1} className="d-block w-100" alt="Slide 1" />
        <Carousel.Caption style={{
            position: 'absolute',
            bottom: '0rem',
            paddingTop: '10%',
            paddingBottom: '1.25rem',
            color: '#fff',
            textAlign: 'center',
            background: '#0000003b',
            width: '100%',
            height: '100%',
            left: 0,
          }} >
        
          <Container >
            <div className="text-center">
              <h4 className="text-primary text-uppercase fw-bold mb-4">Welcome To CryptoExchange</h4>
              <h1 className="display-4 text-uppercase text-white mb-4">
                Trade cryptocurrencies with confidence
              </h1>
              <p className="mb-5 fs-5">
                Your gateway to the world of digital assets and blockchain technology.
              </p>
              <div className="d-flex justify-content-center mb-4">
                <Button variant="light" className="rounded-pill py-3 px-4 me-2">
                  <i className="fas fa-play-circle me-2"></i> Watch Video
                </Button>
                <Button variant="primary" className="rounded-pill py-3 px-4 ms-2"><Link to="/usermanual" className="text-white">
                  Manual
                </Link>
                </Button>
              </div>
            </div>
          </Container>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <img src={img2} className="d-block w-100" alt="Slide 2" />
        <Carousel.Caption style={{
            position: 'absolute',
            bottom: '0rem',
            paddingTop: '10%',
            paddingBottom: '1.25rem',
            color: '#fff',
            textAlign: 'center',
            background: '#0000003b',
            width: '100%',
            height: '100%',
            left: 0,
          }}>
          <Container>
            <div className="text-center">
              <h4 className="text-primary text-uppercase fw-bold mb-4">Welcome To CryptoExchange</h4>
              <h1 className="display-4 text-uppercase text-white mb-4">
                Trade cryptocurrencies with confidence
              </h1>
              <p className="mb-5 fs-5">
                Your gateway to the world of digital assets and blockchain technology.
              </p>
              <div className="d-flex justify-content-center mb-4">
                <Button variant="light" className="rounded-pill py-3 px-4 me-2">
                  <i className="fas fa-play-circle me-2"></i> Watch Video
                </Button>
                <Button variant="primary" className="rounded-pill py-3 px-4 ms-2"><Link to="/usermanual" className="text-white">
                  Manual
                </Link>
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
