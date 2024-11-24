import React, { useState, useEffect } from 'react';
import './navbar.scss';
import Drawer from "@mui/material/Drawer";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const userId = '123'; // Replace with actual user ID, or pass as a prop

  useEffect(() => {
    if (isDrawerOpen) {
      const storedUserId = localStorage.getItem("userId");
      // Fetch user data when the drawer is opened
      fetch(`http://10.10.0.29:8083/v1/api/users/${storedUserId}`) // Replace with your actual API endpoint
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
  <div className="drawer-container">
    <img src="https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png" alt="" />
    {userData ? (
      <div className="user-info">
        <h3> {userData.lastname}    {userData.firstname}</h3>
        
        <p> {userData.email}</p>
        {/* Add more fields as necessary */}
      </div>
    ) : (
      <p className="loading">Loading...</p>
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
