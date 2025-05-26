import React from "react";
import { Footer, Navbar } from "../components";
// Ensure global styles from src/pages/styles.css are imported

const ContactPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Basic form submission alert, can be expanded later
    alert("Thank you for your message! We will get back to you soon. (This is a demo)");
    // Optionally, reset form fields here
    event.target.reset();
  };

  return (
    <>
      <Navbar />
      <div className="container my-md-5 my-3 py-md-5 py-3 static-page-container">
        <h1 className="static-page-title">Get In Touch</h1>
        
        <div className="row justify-content-center mt-4">
            <div className="col-lg-8 col-md-10">
                <p className="lead-text text-center mb-5">
                    Have questions, feedback, or interested in partnering with NFT Galaxy? We'd love to hear from you! Fill out the form below, and our team will get back to you as soon as possible.
                </p>

                <div className="checkout-form-card contact-form-card"> {/* Re-using checkout-form-card for styling consistency */} 
                    <div className="card-body">
                        <form onSubmit={handleSubmit}> {/* Added onSubmit handler */} 
                            <div className="mb-3">
                                <label htmlFor="contactName" className="form-label">Your Name</label>
                                <input
                                type="text"
                                className="form-control"
                                id="contactName"
                                placeholder="Enter your full name"
                                required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contactEmail" className="form-label">Your Email</label>
                                <input
                                type="email"
                                className="form-control"
                                id="contactEmail"
                                placeholder="you@example.com"
                                required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contactMessage" className="form-label">Your Message</label>
                                <textarea
                                rows={5}
                                className="form-control"
                                id="contactMessage"
                                placeholder="Let us know what's on your mind..."
                                required
                                />
                            </div>
                            <div className="text-center mt-4">
                                <button
                                className="btn btn-custom-primary btn-lg px-5 shadow-sm"
                                type="submit"
                                >
                                Send Message
                                </button>
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

export default ContactPage;
