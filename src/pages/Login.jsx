import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useDispatch } from "react-redux";
import { mockLogin } from "../redux/action/authAction";

// Styles for this page will be inherited from static-page-container and form styles in styles.css

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Actual login logic would go here
    alert("Login functionality not implemented in this demo.");
  };

  const handleDemoLogin = () => {
    dispatch(mockLogin());
    navigate('/product'); // Navigate to marketplace after demo login
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3 static-page-container">
        <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10">
                <h1 className="static-page-title mb-4">Login to Your Account</h1>
                {/* Removed hr, title styling has an ::after element */}
                
                <div className="checkout-form-card contact-form-card"> {/* Re-using card style */}
                    <div className="card-body p-md-5 p-4">
                        <form onSubmit={handleLoginSubmit}>
                            <div className="mb-4">
                                <label htmlFor="loginEmail" className="form-label">Email address</label>
                                <input
                                type="email"
                                className="form-control form-control-lg"
                                id="loginEmail"
                                placeholder="name@example.com"
                                required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="loginPassword" className="form-label">Password</label>
                                <input
                                type="password"
                                className="form-control form-control-lg"
                                id="loginPassword"
                                placeholder="Enter your password"
                                required
                                />
                            </div>
                            <div className="text-center mb-4">
                                <button className="btn btn-custom-primary btn-lg w-100 shadow-sm" type="submit">
                                Login
                                </button>
                            </div>
                            <div className="my-3 text-center">
                                <p className="mb-0">New Here? <Link to="/register" className="fw-bold text-highlight-nft">Create an Account</Link></p>
                            </div>
                        </form>
                        
                        <hr className="my-4" /> {/* Styled HR */}

                        <div className="text-center">
                            <p className="text-muted mb-3">Or quickly explore with a demo account:</p>
                            <button 
                                className="btn btn-custom-outline btn-lg w-100 shadow-sm" 
                                onClick={handleDemoLogin}
                            >
                                <i className="fa fa-rocket me-2"></i>Demo Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
