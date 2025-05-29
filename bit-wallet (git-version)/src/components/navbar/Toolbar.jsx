import React from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <>
      <div className="container-fluid topbar bg-light px-5 d-block d-lg-block">
        <div className="row gx-0 align-items-center justify-between">
          {/* Left Section */}
          <div className="col-md-8 text-center text-lg-start mb-2 d-none d-md-block">
            <div className="d-flex flex-wrap">
              <Link to="/location" className="text-muted small me-4">
                <i className="fas fa-map-marker-alt text-primary me-2"></i>GNDU, AMRITSAR
              </Link>
              <a href="tel:+01234567890" className="text-muted small me-4">
                <i className="fas fa-phone-alt text-primary me-2"></i>+91 8284924116
              </a>
              <a href="mailto:example@gmail.com" className="text-muted small me-0">
                <i className="fas fa-envelope text-primary me-2"></i>wecodedragons@gmail.com
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-lg-4 col-md-3  text-center text-lg-end">
            <div className="d-inline-flex align-items-center" style={{ height: "45px" }}>
              <Link to="/signup">
                <small className="me-3 text-dark">
                  <i className="fa fa-user text-primary me-2"></i>Register
                </small>
              </Link>
              <Link to="/login">
                <small className="me-3 text-dark">
                  <i className="fa fa-sign-in-alt text-primary me-2"></i>Login
                </small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
