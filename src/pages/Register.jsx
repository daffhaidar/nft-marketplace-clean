import React from 'react';
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';

// Styles for this page will be inherited from static-page-container and form styles in styles.css

const Register = () => {
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        // Actual registration logic would go here
        alert("Registration functionality not implemented in this demo.");
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3 static-page-container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-10">
                        <h1 className="static-page-title mb-4">Create Your Account</h1>
                        {/* Removed hr, title styling has an ::after element */}
                        
                        <div className="checkout-form-card contact-form-card"> {/* Re-using card style */}
                            <div className="card-body p-md-5 p-4">
                                <form onSubmit={handleRegisterSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="registerName" className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="registerName"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="registerEmail" className="form-label">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            id="registerEmail"
                                            placeholder="name@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="registerPassword" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            id="registerPassword"
                                            placeholder="Create a strong password"
                                            required
                                        />
                                    </div>
                                    <div className="text-center mb-4">
                                        <button className="btn btn-custom-primary btn-lg w-100 shadow-sm" type="submit">
                                            Create Account
                                        </button>
                                    </div>
                                    <div className="my-3 text-center">
                                        <p className="mb-0">Already have an account? <Link to="/login" className="fw-bold text-highlight-nft">Login Here</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;