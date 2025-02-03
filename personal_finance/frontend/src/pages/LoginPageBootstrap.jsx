/* File: loginPageBootstrap.jsx */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage(data.message);
          // Optionally, redirect the user after successful login.
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('An error occurred.');
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label">Email address</label>
          <input 
            type="email"
            className="form-control"
            id="loginEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label">Password</label>
          <input 
            type="password"
            className="form-control"
            id="loginPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;



// /* File: loginPageBootstrap.jsx */
// import React, { useState } from 'react';

// function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');

//     const handleLogin = (e) => {
//         e.preventDefault();
//         fetch('http://localhost:8000/api/login/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.error) {
//                 setMessage(data.error);
//             } else {
//                 setMessage(data.message);
//                 // Redirect user or update UI on successful login
//             }
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             setMessage('An error occurred.');
//         });
//     };

//     return (
//         <div className="container">
//             <h2>Login</h2>
//             {message && <div className="alert alert-info">{message}</div>}
//             <form onSubmit={handleLogin}>
//                 <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email address</label>
//                     <input 
//                         type="email" 
//                         className="form-control" 
//                         id="email" 
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required 
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input 
//                         type="password" 
//                         className="form-control" 
//                         id="password" 
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required 
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Login</button>
//             </form>
//         </div>
//     );
// }

// export default LoginPage;


// // // Install Bootstrap by running:
// // // npm install bootstrap

// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // const LoginPageBootstrap = () => {
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Form submitted", formData);
// //   };

// //   return (
// //     <div className="bg-light vh-100 d-flex flex-column">
// //       {/* Navbar */}
// //       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
// //         <div className="container">
// //           <h1 className="navbar-brand">FinanceApp</h1>
// //           <div className="ml-auto">
// //             <Link to="/login" className="btn btn-outline-light mx-2">
// //               Login
// //             </Link>
// //             <Link to="/signup" className="btn btn-light">
// //               Sign Up
// //             </Link>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Login Form Section */}
// //       <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
// //         <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
// //           <h2 className="text-center mb-4">Login to Your Account</h2>
// //           <form onSubmit={handleSubmit}>
// //             <div className="mb-3">
// //               <label htmlFor="email" className="form-label">
// //                 Email
// //               </label>
// //               <input
// //                 type="email"
// //                 id="email"
// //                 name="email"
// //                 className="form-control"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //             <div className="mb-3">
// //               <label htmlFor="password" className="form-label">
// //                 Password
// //               </label>
// //               <input
// //                 type="password"
// //                 id="password"
// //                 name="password"
// //                 className="form-control"
// //                 value={formData.password}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //             <button type="submit" className="btn btn-primary w-100">
// //               Login
// //             </button>
// //           </form>
// //           <p className="text-center mt-3">
// //             Don't have an account? {" "}
// //             <Link to="/signup" className="text-primary">
// //               Sign Up here
// //             </Link>
// //           </p>
// //         </div>
// //       </div>

// //       {/* Footer */}
// //       <footer className="bg-primary text-white text-center py-3">
// //         <p className="mb-0">© 2025 FinanceApp. All rights reserved.</p>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default LoginPageBootstrap;
