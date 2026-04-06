import React from "react";
import { Link } from "react-router-dom";
import "./AuthPages.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();

      axios
        .post("http://localhost:3001/register", { name, email, password })
        .then((result) => {
          console.log(result);
          navigate("/login");
        })
        .catch((err) => console.log(err));
    };

    return (
      <div className="auth-page">
        <h2 className="auth-title">Create an Account</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="auth-input"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="auth-input"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?
          <Link to="/login" className="auth-link">
            Login here
          </Link>
        </p>
      </div>
    );
  }
};

export default RegisterPage;
