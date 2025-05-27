import React from "react";
import { Footer, Navbar } from "../components";
// Styles for static pages like this will be in src/pages/styles.css

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-md-5 my-3 py-md-5 py-3 static-page-container">
        <h1 className="static-page-title text-center">About Danna's Site:</h1>
        {/* <hr /> Optional: if hr is desired, it will be styled by global CSS */}

        <div className="row justify-content-center mt-4">
          <div className="col-lg-10 col-md-12">
            <p className="lead-text text-center mb-5">
              Welcome to Danna's Site! We are a cutting-edge platform dedicated to the vibrant universe of Non-Fungible Tokens. Our marketplace is designed for artists, collectors, and enthusiasts to explore, create, and trade unique
              digital assets with ease and security.
            </p>

            <h2 className="mt-5 mb-3 text-center">Our Mission</h2>
            <p>
              At Danna's site, our core mission is to democratize access to the digital art world and empower creators. We strive to build a transparent, user-friendly ecosystem that supports the growth of the NFT community, fostering
              innovation and providing a stage for diverse digital talents. We connect creators with a global audience and offer collectors a trusted venue to discover and acquire unique pieces.
            </p>

            <h2 className="mt-5 mb-3 text-center">Why Choose Danna's Site?</h2>
            <div className="row mt-4">
              <div className="col-md-6 mb-3">
                <h4>
                  <i className="fa fa-rocket me-2 text-highlight-nft"></i>Curated Excellence
                </h4>
                <p>Discover hand-picked collections and featured artists, ensuring a high-quality experience. We focus on unique and compelling digital art that tells a story.</p>
              </div>
              <div className="col-md-6 mb-3">
                <h4>
                  <i className="fa fa-shield me-2 text-highlight-nft"></i>Secure & Transparent
                </h4>
                <p>Leveraging the power of the Ethereum blockchain and MetaMask integration (currently on Sepolia testnet), all transactions are secure and verifiable.</p>
              </div>
              <div className="col-md-6 mb-3">
                <h4>
                  <i className="fa fa-users me-2 text-highlight-nft"></i>Community Driven
                </h4>
                <p>We are building more than a marketplace; we are building a community. Join discussions, connect with artists, and be part of the NFT revolution.</p>
              </div>
              <div className="col-md-6 mb-3">
                <h4>
                  <i className="fa fa-paint-brush me-2 text-highlight-nft"></i>Creator Focused
                </h4>
                <p>We provide tools and support for artists to mint and manage their NFTs, ensuring they receive fair recognition and royalties for their work.</p>
              </div>
            </div>

            <h2 className="mt-5 mb-3 text-center">Embark on Your NFT Journey</h2>
            <p>
              The universe of digital collectibles is vast and ever-expanding. Danna's Site is your trusted spaceship to navigate this exciting domain. Whether you're taking your first step or are a seasoned explorer, we invite you to join
              us. Browse our marketplace, connect your wallet, and discover the future of ownership.
            </p>
            <p className="text-center mt-5 fst-italic">Chart your course. Claim your NFT, and welcome to Danna's Site.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
