import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AuthPages.css";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })

      .then(() => {
        Swal.fire("Success!", "Login Successful 🎉", "success");
        navigate("/login");
      })
      .catch(() => {
        Swal.fire("Error!", "Something went wrong", "error");
      });

    // .then((result) => {
    //   console.log(result);
    //   if (result.data === "Login Successful") {
    //     navigate("/");
    //   }
    // })

    // .catch((err) => console.log(err));
  };

  return (
    <div className="auth-page">
      <h2 className="auth-title">Login to TECYGIG</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account?
        <Link to="/register" className="auth-link">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
