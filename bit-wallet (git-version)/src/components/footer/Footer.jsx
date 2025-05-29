import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
      <div className='mt-50'>
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-section">
              <h3>About Us</h3>
              <p>At CryptoExchange, we are dedicated to providing a secure and user-friendly platform for trading cryptocurrencies.</p>
            </div>
  
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>
  
            <div className="footer-section">
              <h3 className='text-[#00d084]'>Contact</h3>
              <p>Email: wecodedragons@gmail.com</p>
              <p>Phone: +91 8284924116</p>
              <div className="social-icons">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
  
          <div className="footer-bottom">
            <p>Made with ❤ by @WeCodeDragons</p>
          </div>
        </footer>
      </div>
    );
  };

export default Footer
