import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Profile from './profile/Profile'

const UserPanel = () => {
  const navigate = useNavigate(); // Initialize useNavigate

 

  return (
    <>
      <Profile/>
         </>
  );
};

export default UserPanel;
