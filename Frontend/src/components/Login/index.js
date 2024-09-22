import React, { useState, useEffect } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const jwt = Cookies.get("jwtToken");
    if (jwt !== undefined) {
      navigate("/");
    } else {
      const fetchData = async () => {
        const response = await fetch("/test");
        if (response.ok) {
          const data = await response.text();
          console.log(data);
        }
      };
      fetchData();
    }
  }, [navigate]);

  const toggleForm = (event) => {
    event.preventDefault();
    setIsRegister(!isRegister);
    clearFields();
  };

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setMobileNumber("");
    setRegisterEmail("");
    setRegisterPassword("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRegister) {
      const registerData = {
        firstName,
        lastName,
        email: registerEmail,
        password: registerPassword,
        mobileNumber,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(registerData),
      };

      const response = await fetch("http://localhost:4000/register", options);
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        clearFields();
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } else {
      const loginingData = {
        email,
        password,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginingData),
      };
      const response = await fetch("http://localhost:4000/login", options);
      if (response.ok) {
        const data = await response.json();
        console.log(data.jwtToken);
        Cookies.set("jwtToken", data.jwtToken, {
          expires: 30,
        });

        clearFields();
        navigate("/");
      } else {
        alert("login failed");
      }
    }
  };

  return (
    <div className="login-container login-main-page ">
      <div className="login-box">
        <h2 className="login-title">{isRegister ? "Register" : "Login"}</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                className="input-field"
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              />
              <input
                className="input-field"
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
              />
              <input
                className="input-field"
                type="tel"
                placeholder="Mobile Number"
                onChange={(e) => setMobileNumber(e.target.value)}
                value={mobileNumber}
                required
              />
              <input
                className="input-field"
                type="email"
                placeholder="Register Email Address"
                onChange={(e) => setRegisterEmail(e.target.value)}
                value={registerEmail}
                required
              />
              <input
                className="input-field"
                type="password"
                placeholder="Register Password"
                onChange={(e) => setRegisterPassword(e.target.value)}
                value={registerPassword}
                required
              />
            </>
          )}
          {!isRegister && (
            <>
              <input
                className="input-field"
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </>
          )}
          <button className="submit-btn" type="submit">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <p className="toggle-text">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <a href="#" className="toggle-link" onClick={toggleForm}>
            {isRegister ? "Login here" : "Register here"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
