import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast"; // For toast notifications

import { Footer, Navbar } from "../components";
// Ensure src/pages/styles.css is imported globally

const Product = () => {
  const { id } = useParams();
  const [nft, setNft] = useState(null); // Initialize with null for better checks
  const [loading, setLoading] = useState(true); // Start with loading true

  const dispatch = useDispatch();

  const addNftToCart = (selectedNft) => {
    dispatch(addCart(selectedNft));
    toast.success(`${selectedNft.title} added to cart!`);
  };

  useEffect(() => {
    const getNft = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/data/products.json`);
        const allNfts = await response.json();
        const selectedNft = allNfts.find(item => item.id === id);
        if (selectedNft) {
          setNft(selectedNft);
        } else {
          // Handle NFT not found, e.g., redirect or show a message
          console.error("NFT not found with ID:", id);
          setNft(null); // Explicitly set to null if not found
        }
      } catch (error) {
        console.error("Failed to fetch NFT data:", error);
        setNft(null); // Set to null on error
      }
      setLoading(false);
    };
    getNft();
  }, [id]);

  const Loading = () => {
    return (
      <div className="container my-5 py-5 single-nft-page">
        <div className="row">
          <div className="col-md-6 py-3">
            <Skeleton height={500} style={{ borderRadius: '15px' }} />
          </div>
          <div className="col-md-6 py-md-5 px-md-4">
            <Skeleton height={30} width="60%" style={{ marginBottom: '1rem' }} />
            <Skeleton height={45} width="80%" style={{ marginBottom: '1rem' }} />
            <Skeleton height={20} width="40%" style={{ marginBottom: '2rem' }} />
            <Skeleton height={100} style={{ marginBottom: '2rem' }} />
            <Skeleton height={50} width={120} style={{ marginBottom: '1rem' }}/>
            <div className="d-flex">
              <Skeleton height={50} width={150} />
              <Skeleton height={50} width={150} className="ms-3" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ShowNftDetails = () => {
    if (!nft) {
      // This case should ideally redirect or show a proper "Not Found" component
      return (
        <div className="container my-5 py-5 single-nft-page nft-not-found-container">
          <h2>NFT Not Found</h2>
          <p>The NFT you are looking for does not exist or could not be loaded.</p>
          <Link to="/product" className="btn btn-custom-primary">Explore Marketplace</Link>
        </div>
      );
    }

    return (
      <div className="container my-5 py-5 single-nft-page">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0 nft-image-container">
            <img
              className="img-fluid rounded shadow-lg"
              src={nft.imageUrl}
              alt={nft.title}
              onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/800x800.png?text=NFT+Image+Error"; }}
            />
          </div>
          <div className="col-lg-6 col-md-12 ps-lg-5 nft-details-container">
            {nft.collectionName && (
              <h4 className="text-muted-nft mb-2"><em>{nft.collectionName}</em></h4>
            )}
            <h1 className="display-5 fw-bold nft-title-main">{nft.title}</h1>
            {nft.artist && (
              <p className="lead nft-artist mb-3">Created by <span className="fw-semibold text-highlight-nft">{nft.artist}</span></p>
            )}
            
            <p className="nft-description-full mb-4">{nft.description}</p>
            <h3 className="display-6 my-4 nft-price-main">{nft.price}</h3>
            
            <div className="d-flex mt-4 action-buttons-nft">
              <button
                className="btn btn-custom-primary btn-lg flex-grow-1 me-2 shadow-sm"
                onClick={() => addNftToCart(nft)}
              >
                <i className="fa fa-shopping-cart me-2"></i>Add to Cart
              </button>
              <Link to="/cart" className="btn btn-custom-outline btn-lg flex-grow-1 ms-2 shadow-sm">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      {loading ? <Loading /> : <ShowNftDetails />}
      <Footer />
    </>
  );
};

export default Product;
