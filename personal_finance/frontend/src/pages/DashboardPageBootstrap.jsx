// Install Bootstrap by running:
// npm install bootstrap

import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardPageBootstrap = ({ isLoggedIn, onSignOut }) => {
//   const navigate = useNavigate();

  if (!isLoggedIn) {
    // navigate("/login");
    // return null;
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="bg-primary text-white vh-100 p-3" style={{ width: "250px" }}>
        <h2 className="text-center">Dashboard</h2>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/create-accounts" className="nav-link text-white">
              Accounts
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/transactions" className="nav-link text-white">
              Transactions
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/settings" className="nav-link text-white">
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="flex-grow-1 bg-light p-4">
        {/* Top Bar */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Welcome to Your Dashboard</h1>
          <button className="btn btn-danger" onClick={onSignOut}>
            Sign Out
          </button>
        </div>

        {/* Placeholder Content */}
        <p>Select an option from the sidebar to get started.</p>
      </div>
    </div>
  );
};

export default DashboardPageBootstrap;
