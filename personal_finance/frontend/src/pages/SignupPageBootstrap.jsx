// Install Bootstrap by running:
// npm install bootstrap

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SignupPageBootstrap = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="bg-light vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <h1 className="navbar-brand">FinanceApp</h1>
          <div className="ml-auto">
            <Link to="/login" className="btn btn-outline-light mx-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-light">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Sign Up Form Section */}
      <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-4">Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account? {" "}
            <Link to="/login" className="text-primary">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3">
        <p className="mb-0">© 2025 FinanceApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignupPageBootstrap;
