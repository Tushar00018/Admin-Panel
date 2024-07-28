import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage({ setLogin, setUserName }) {
  let [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    if (
      loginDetails.userName === "admin" &&
      loginDetails.password === "password"
    ) {
      setLogin(true);
      setUserName(loginDetails.userName);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="login-page">
      <h1>Login Page</h1>

      <form onSubmit={handleLogin}>
        <div className="login-form">
          <div>
            <label htmlFor="username">User Name</label>
            <br />
            <input
              type="text"
              required
              id="username"
              name="userName"
              value={loginDetails.userName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              required
              id="password"
              name="password"
              value={loginDetails.password}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="button">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
