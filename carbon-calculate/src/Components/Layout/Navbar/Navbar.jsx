import React, { useState, useEffect } from 'react';
import './navbar.scss';
import Drawer from "@mui/material/Drawer";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const userId = '123'; // Replace with actual user ID, or pass as a prop

  useEffect(() => {
    if (isDrawerOpen) {
      // Fetch user data when the drawer is opened
      fetch(`http://10.249.160.115:8083/v1/api/users/59`) // Replace with your actual API endpoint
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setUserData(data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [isDrawerOpen, userId]);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h1>Carbon Emission</h1>
      </div>
      <ul className="navbar__links">
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/calculator">Calculator</a></li>
        <li><a href="/contact">Contact</a></li>
        <li onClick={(e) => { setIsDrawerOpen(true); e.preventDefault(); }}>
          <a href="/contact">
            <img src="https://cdn-icons-png.flaticon.com/512/9742/9742847.png" alt="" />
          </a>
        </li>
        <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <div style={{ width: 250, padding: "1rem" }}>
            <h2>Personal Info</h2>
            {userData ? (
              <>
                <p>Name: {userData.firstname}</p>
                <p>Name: {userData.lastname}</p>
                <p>Email: {userData.email}</p>
                {/* Add more fields as necessary */}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </Drawer>
      </ul>
      <div className="navbar__menu">
        <i className="fas fa-bars"></i>
      </div>
    </nav>
  );
}

export default Navbar;
