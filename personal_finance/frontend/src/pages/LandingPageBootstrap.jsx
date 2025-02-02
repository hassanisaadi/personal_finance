// Install Bootstrap by running:
// npm install bootstrap

import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPageBootstrap = () => {
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

      {/* Hero Section */}
      <div className="container text-center flex-grow-1 d-flex align-items-center justify-content-center">
        <div>
          <h1 className="display-4 text-primary mb-4">Take Control of Your Finances</h1>
          <p className="lead text-secondary mb-4">
            Manage your expenses, track your income, and plan for a secure future with FinanceApp.
          </p>
          <Link to="/signup" className="btn btn-primary btn-lg mx-2">
            Get Started
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3">
        <p className="mb-0">© 2025 FinanceApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPageBootstrap;
