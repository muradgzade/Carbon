import React, { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";  // useNavigate import ettik

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // useNavigate hook'u

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://10.249.160.115:8083/api/v1/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Giriş bilgileri hatalı!");
      }

      const data = await response.json();
      if (data) {
        console.log("Giriş başarılı:", data.userId);

        localStorage.setItem("userId", data.userId); // userId'yi kaydet

        // Giriş başarılı olduktan sonra yönlendirme
        navigate("/home");  // useNavigate ile yönlendirme
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
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
            <button type="submit" className="login-button">
              Login
            </button>
            <p>
              Don't have an account?
              <Link to={"/register"} className="toregister-btn">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
