import React, { useState, useEffect } from "react";
import "./index.css";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/test");
      if (response.ok) {
        const data = await response.text();
        console.log(data);
      }
    };
    fetchData();
  }, []);

  const toggleForm = (event) => {
    event.preventDefault();
    setIsRegister(!isRegister);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRegister) {
      const registerData = {
        firstName,
        lastName,
        registerEmail,
        registerPassword,
        mobileNumber,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(registerData),
      };
      const response = await fetch("/register", options);
      if (response.ok) {
        const data = await response.JSON();
        console.log(data.message);
      }
    } else {
      console.log("Logging in with:", { email, password });
    }
  };

  return (
    <div className="login-container">
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
              />
              <input
                className="input-field"
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              <input
                className="input-field"
                type="tel"
                placeholder="Mobile Number"
                onChange={(e) => setMobileNumber(e.target.value)}
                value={mobileNumber}
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
                required
              />
            </>
          )}
          <button className="submit-btn">
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
