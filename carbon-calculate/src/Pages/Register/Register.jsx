import React, { useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:8083/api/v1/auth/authenticate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          throw new Error("Giriş bilgileri hatalı!");
        }
        else{
          console.log("home a kecin");
        }
  
        const data = await response.json();
        console.log("Giriş başarılı:", data);
  
       
        localStorage.setItem("token", data.token);
        window.location.href = "/login"; 
      } catch (error) {
        console.log(error.message);
      }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              className="form-input"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              className="form-input"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="buttons">
            <button type="submit" className="register-button">
              Register
            </button>
            <p>
              Already have an account?
              <Link to={"/login"} className="tologin-btn">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
