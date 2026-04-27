import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPages.css";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Password match validation
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:3001/register", {
        name,
        email,
        password,
        gender,
        mobile,
      })
      .then(() => {
        Swal.fire("Success!", "Registration Successful 🎉", "success");
        navigate("/login");
      })
      .catch(() => {
        Swal.fire("Error!", "Something went wrong", "error");
      });
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
          type="tel"
          placeholder="Mobile Number"
          className="auth-input"
          required
          onChange={(e) => setMobile(e.target.value)}
        />

        {/* Gender Radio Buttons */}
        <div className="gender-group">
          <label className="gender-label">Gender</label>

          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>
        </div>

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Re-enter Password"
          className="auth-input"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
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
};

export default RegisterPage;
