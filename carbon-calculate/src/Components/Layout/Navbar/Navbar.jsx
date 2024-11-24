import React, { useState, useEffect } from "react";
import "./navbar.scss";
import Drawer from "@mui/material/Drawer";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({
    lastname: "Zeynalli",
    firstname: "Zeynal",
    email: "Zepalli@gmail.com",
  });
  const userId = "123"; // Replace with actual user ID, or pass as a prop

  useEffect(() => {
    if (isDrawerOpen) {
      const storedUserId = localStorage.getItem("userId");
      // Fetch user data when the drawer is opened
      fetch(`http://10.249.160.115:8083/v1/api/users/${storedUserId}`) // Replace with your actual API endpoint
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [isDrawerOpen, userId]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar__logo">
          <h1>Carbon Emission</h1>
        </div>
        <ul className="navbar__links">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/calculator">Calculator</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
        <div className="navbar__right">
          <button onClick={() => console.log("logout")}>
            <FiLogOut />
          </button>
          <button
            onClick={(e) => {
              setIsDrawerOpen(true);
              e.preventDefault();
            }}
          >
            <FaRegUser />
          </button>
          <button
            className="navbar__sidebar-trigger"
            onClick={() => setIsSidebarOpen(true)}
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </nav>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="drawer-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9742/9742847.png"
            alt=""
          />
          {userData ? (
            <div className="user-info">
              <h3>
                {userData.lastname} {userData.firstname}
              </h3>

              <p> {userData.email}</p>
              {/* Add more fields as necessary */}
            </div>
          ) : (
            <p className="loading">Loading...</p>
          )}
        </div>
      </Drawer>
      <Drawer
        anchor="right"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      >
        <div className="drawer-container">
          <ul className="navbar__sidebar-links">
            <li>
              <NavLink to="/home" onClick={() => setIsSidebarOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setIsSidebarOpen(false)}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/calculator" onClick={() => setIsSidebarOpen(false)}>
                Calculator
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setIsSidebarOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
