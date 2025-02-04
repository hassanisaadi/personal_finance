import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./pages/LandingPageBootstrap";
import SignupPage from "./pages/SignupPageBootstrap";
import LoginPage from "./pages/LoginPageBootstrap";
import CreateAccountsPage from "./pages/CreateAccountsPageBootstrap";
import DashboardPageBootstrap from "./pages/DashboardPageBootstrap";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />

        {/* Protected Routes */}
        <Route
          path="/create-accounts"
          element={
            isLoggedIn ? (
              <CreateAccountsPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              // <DashboardPageBootstrap onSignOut={handleSignOut} />
              <DashboardPageBootstrap isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
