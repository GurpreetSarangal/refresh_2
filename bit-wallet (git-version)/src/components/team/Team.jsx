import React from "react";
import "./Team.css";
import team1 from "../../assets/img/team-1.jpg";
import team2 from "../../assets/img/team-2.jpg";
import team3 from "../../assets/img/team-3.jpg";

const teamMembers = [
  { id: 1, name: "Alice Johnson", profession: "CEO & Founder", img: team1 },
  { id: 2, name: "Michael Smith", profession: "Chief Technology Officer", img: team2 },
  { id: 3, name: "Sophia Brown", profession: "Head of Marketing", img: team3 },
];

const Team = () => {
  return (
    <div className="container-fluid team pb-5" id="team">
      <div className="container pb-5">
        <div className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
          <h4 className="text-primary">Our Team</h4>
          <h1 className="display-5 mb-4">Meet Our Advisers</h1>
          <p className="mb-0">
            At CryptoExchange, our team of experts is dedicated to providing you with the best trading experience.
          </p>
        </div>
        <div className="row g-4">
          {teamMembers.map((member, index) => (
            <div
              className="col-md-6 col-lg-4"
              key={member.id}
              data-wow-delay={`${0.2 * (index + 1)}s`} // Dynamic delay
            >
              <div className="team-item">
                <div className="team-img">
                  <img src={member.img} className="img-fluid" alt={member.name} />
                </div>
                <div className="team-title">
                  <h4 className="mb-0">{member.name}</h4>
                  <p className="mb-0">{member.profession}</p>
                </div>
                <div className="team-icon">
                  <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="btn btn-primary btn-sm-square rounded-circle me-0" href="#">
                    <i className="fab fa-instagram"></i>
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

export default Team;
