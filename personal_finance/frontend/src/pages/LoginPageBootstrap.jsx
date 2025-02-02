// Install Bootstrap by running:
// npm install bootstrap

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPageBootstrap = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

      {/* Login Form Section */}
      <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-4">Login to Your Account</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? {" "}
            <Link to="/signup" className="text-primary">
              Sign Up here
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

export default LoginPageBootstrap;
