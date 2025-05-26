import React, { useState, useEffect } from "react";
import { Navbar, Footer } from "../components";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

// This is a simplified version of the NFT card for the homepage.
// For consistency, you might eventually want a reusable NFTCard component.
const MiniNftCard = ({ nft }) => {
  if (!nft) return null;
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch">
      <div className="nft-card text-center">
        <img
          src={nft.imageUrl}
          alt={nft.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x300.png?text=NFT";
          }}
        />
        <div className="nft-card-content">
          <h5 className="nft-card-title mb-1">{nft.title}</h5>
          <p className="nft-card-price mb-2">{nft.price}</p>
          <div className="nft-card-actions">
            <Link to={`/product/${nft.id}`} className="btn btn-view-details btn-sm">
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <h1 className="hero-tagline">Discover, Collect & Trade Unique NFTs</h1>
        <p className="hero-subtitle">Step into the future of digital ownership. Explore a universe of rare digital art, collectibles, and more on Danna's Site.</p>
        <Link to="/product" className="btn btn-custom-primary btn-hero-cta">
          Explore Marketplace
        </Link>
      </div>
    </section>
  );
};

const FeaturedNfts = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/data/products.json");
        const allNfts = await response.json();
        setFeatured(allNfts.slice(0, 4)); // Take first 4 for featured section
      } catch (error) {
        console.error("Failed to fetch featured NFTs:", error);
      }
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="featured-nfts-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Featured Collections</h2>
          <div className="row">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="nft-card">
                  <Skeleton height={220} style={{ borderRadius: "15px 15px 0 0" }} />
                  <div className="nft-card-content">
                    <Skeleton height={20} width="80%" style={{ marginBottom: "0.5rem" }} />
                    <Skeleton height={18} width="40%" style={{ marginBottom: "1rem" }} />
                    <div className="nft-card-actions">
                      <Skeleton height={30} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!featured.length) return null; // Don't render section if no featured items

  return (
    <section className="featured-nfts-section py-5">
      <div className="container">
        <h2 className="section-title text-center mb-5">Featured Collections</h2>
        <div className="row justify-content-center">
          {featured.map((nft) => (
            <MiniNftCard key={nft.id} nft={nft} />
          ))}
        </div>
      </div>
    </section>
  );
};

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturedNfts />
      <Footer />
    </>
  );
}

export default Home;
