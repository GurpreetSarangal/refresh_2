import React from "react";
import aboutImg1 from "../../assets/img/about-2.png";
import aboutImg2 from "../../assets/img/about-3.png";
import aboutImg3 from "../../assets/img/about-4.png";
import aboutImg4 from "../../assets/img/about-5.jpg";

// const AboutUs = () => {
//   return (
//     <div className="container-fluid about py-5">
//       <div className="container py-5">
//         <div className="row g-5 align-items-center">
//           {/* Left Section */}
//           <div className="col-xl-7 wow fadeInLeft" data-wow-delay="0.2s">
//             <div>
//               <h4 className="text-primary">About Us</h4>
//               <h1 className="display-5 mb-4">
//                 Your trusted partner in cryptocurrency trading
//               </h1>
//               <p className="mb-4">
//                 At CryptoExchange, we are dedicated to providing a secure and user-friendly platform for trading digital assets. Our mission is to empower individuals to take control of their financial future.
//               </p>
//               <div className="row g-4">
//                 <div className="col-md-6 col-lg-6 col-xl-6">
//                   <div className="d-flex">
//                     <div>
//                       <i className="fas fa-lightbulb fa-3x text-primary"></i>
//                     </div>
//                     <div className="ms-4">
//                       <h4>Expert Guidance</h4>
//                       <p>Our team of experts is here to help you navigate the crypto landscape.</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-6 col-lg-6 col-xl-6">
//                   <div className="d-flex">
//                     <div>
//                       <i className="bi bi-bookmark-heart-fill fa-3x text-primary"></i>
//                     </div>
//                     <div className="ms-4">
//                       <h4>Years Of Experience</h4>
//                       <p>With years of experience in the industry, we ensure a reliable trading environment.</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-sm-6">
//                   <a href="#" className="btn btn-primary rounded-pill py-3 px-5 flex-shrink-0">
//                     Discover Now
//                   </a>
//                 </div>
//                 <div className="col-sm-6">
//                   <div className="d-flex">
//                     <i className="fas fa-phone-alt fa-2x text-primary me-4"></i>
//                     <div>
//                       <h4>Contact Us</h4>
//                       <p className="mb-0 fs-5" style={{ letterSpacing: "1px" }}>
//                         +01234567890
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="col-xl-5 wow fadeInRight" data-wow-delay="0.2s">
//             <div className="bg-primary rounded position-relative overflow-hidden">
//               <img src={aboutImg1} className="img-fluid rounded w-100" alt="About Us" />

//               <div style={{ position: "absolute", top: "-15px", right: "-15px" }}>
//                 <img
//                   src={aboutImg2}
//                   className="img-fluid"
//                   style={{ width: "150px", height: "150px", opacity: "0.7" }}
//                   alt="About"
//                 />
//               </div>
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "-20px",
//                   left: "10px",
//                   transform: "rotate(90deg)",
//                 }}
//               >
//                 <img
//                   src={aboutImg3}
//                   className="img-fluid"
//                   style={{ width: "100px", height: "150px", opacity: "0.9" }}
//                   alt="About"
//                 />
//               </div>
//               <div className="rounded-bottom">
//                 <img src={aboutImg4} className="img-fluid rounded-bottom w-100" alt="About" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


const AboutUs = () => {
  return (
    <div id="about" className="container-fluid about py-5">
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          {/* Left Section */}
          <div className="col-xl-7 wow fadeInLeft" data-wow-delay="0.2s">
            <div>
              <h4 className="text-primary">About Us</h4>
              <h1 className="display-5 mb-4">
                Your trusted partner in cryptocurrency trading
              </h1>
              <p className="mb-4">
                At CryptoExchange, we are dedicated to providing a secure and user-friendly platform for trading digital assets. Our mission is to empower individuals to take control of their financial future.
              </p>
              <div className="row g-4">
                <div className="col-md-6 col-lg-6 col-xl-6">
                  <div className="d-flex">
                    <div>
                      <i className="fas fa-lightbulb fa-3x text-primary"></i>
                    </div>
                    <div className="ms-4">
                      <h4>Expert Guidance</h4>
                      <p>Our team of experts is here to help you navigate the crypto landscape.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                  <div className="d-flex">
                    <div>
                      <i className="bi bi-bookmark-heart-fill fa-3x text-primary"></i>
                    </div>
                    <div className="ms-4">
                      <h4>Years Of Experience</h4>
                      <p>With years of experience in the industry, we ensure a reliable trading environment.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <a href="/support" className="btn btn-primary rounded-pill py-3 px-5 flex-shrink-0">
                    Discover Now
                  </a>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex">
                    <i className="fas fa-phone-alt fa-2x text-primary me-4"></i>
                    <div>
                      <h4>Contact Us</h4>
                      <p className="mb-0 fs-5" style={{ letterSpacing: "1px" }}>
                        +91 8284924116
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-xl-5 wow fadeInRight" data-wow-delay="0.2s">
            <div className="bg-primary rounded position-relative overflow-hidden">
              <img src={aboutImg1} className="img-fluid rounded w-100" alt="About Us" />

              <div style={{ position: "absolute", top: "-15px", right: "-15px" }}>
                <img
                  src={aboutImg2}
                  className="img-fluid"
                  style={{ width: "150px", height: "150px", opacity: "0.7" }}
                  alt="About"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "10px",
                  transform: "rotate(90deg)",
                }}
              >
                <img
                  src={aboutImg3}
                  className="img-fluid"
                  style={{ width: "100px", height: "150px", opacity: "0.9" }}
                  alt="About"
                />
              </div>
              <div className="rounded-bottom">
                <img src={aboutImg4} className="img-fluid rounded-bottom w-100" alt="About" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
