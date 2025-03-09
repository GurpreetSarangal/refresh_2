import React from "react";
import "./Team.css";
import team1 from "../../assets/img/team-1.jpg";
import team2 from "../../assets/img/team-2.jpg";
import team3 from "../../assets/img/team-3.jpg";

const teamMembers = [
  { id: 1, name: "David James", profession: "Profession", img: team1 },
  { id: 2, name: "David James", profession: "Profession", img: team2 },
  { id: 3, name: "David James", profession: "Profession", img: team3 },
];

const Team = () => {
  return (
    <div className="container-fluid team pb-5">
      <div className="container pb-5">
        <div className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
          <h4 className="text-primary">Our Team</h4>
          <h1 className="display-5 mb-4">Meet Our Advisers</h1>
          <p className="mb-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            adipisci facilis cupiditate recusandae aperiam temporibus corporis.
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
