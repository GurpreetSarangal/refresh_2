import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='mt-50'>

                 <footer className="footer">
                    <div className="footer-container">
                        <div className="footer-section">
                            <h3>About Us</h3>
                            <p>We are a team of creative developers bringing innovative solutions to the tech world.</p>
                        </div>

                        <div className="footer-section">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h3 className='text-[#00d084]'>Contact</h3>
                            <p>Email: info@example.com</p>
                            <p>Phone: +123 456 789</p>
                            <div className="social-icons">
                                <a href="#"><i className="fab fa-facebook"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; 2025 Your Company. All rights reserved.</p>
                    </div>
                </footer>

    </div>
  )
}

export default Footer
