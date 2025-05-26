import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// Styles are now in src/pages/styles.css

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addProductToCart = (nft) => {
    dispatch(addCart(nft));
    toast.success(`${nft.title} added to cart!`);
  };

  useEffect(() => {
    let componentMounted = true;

    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/data/products.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const nftData = await response.json();
        if (componentMounted) {
          setData(nftData);
          console.log("Fetched NFT Data:", nftData);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        if (componentMounted) {
          setData([]);
        }
      } finally {
        if (componentMounted) {
          setLoading(false);
        }
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  const Loading = () => {
    return (
      <>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="nft-card"> 
              <Skeleton height={250} style={{ borderRadius: '15px 15px 0 0' }}/>
              <div className="nft-card-content"> 
                <Skeleton height={20} width="80%" style={{ marginBottom: '0.5rem' }} />
                <Skeleton height={15} width="60%" style={{ marginBottom: '0.75rem' }} />
                <Skeleton height={18} width="40%" style={{ marginBottom: '1rem' }} />
                <div style={{ flexGrow: 1 }}><Skeleton height={60} style={{ marginBottom: '1rem' }}/></div> 
                <Skeleton height={20} width="30%" style={{ marginBottom: '1.25rem' }}/> 
                <div className="nft-card-actions"> 
                  <Skeleton height={40} style={{ flexGrow: 1, marginRight: '0.375rem' /* Half of gap */ }}/>
                  <Skeleton height={40} style={{ flexGrow: 1, marginLeft: '0.375rem' /* Half of gap */ }}/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const ShowNfts = () => {
    return (
      <>
        {data.map((nft) => {
          return (
            <div
              key={nft.id} 
              className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch"
            >
              <div className="nft-card"> 
                <img
                  src={nft.imageUrl}
                  alt={nft.title}
                  onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/600x600.png?text=NFT+Image+Not+Found"; }}
                />
                <div className="nft-card-content"> 
                  <h5 className="nft-card-title">{nft.title}</h5>
                  {nft.collectionName && (
                    <p className="nft-card-collection">Collection: {nft.collectionName}</p>
                  )}
                  {nft.artist && (
                     <p className="nft-card-artist">Artist: {nft.artist}</p>
                  )}
                  <p className="nft-card-description">{nft.description.substring(0,100)}{nft.description.length > 100 ? '...':''}</p>
                  <p className="nft-card-price">{nft.price}</p>
                  
                  <div className="nft-card-actions"> 
                    <Link
                        to={`/product/${nft.id}`}
                        className="btn btn-view-details" 
                    >
                        View Details
                    </Link>
                    <button
                        className="btn-action-primary" 
                        onClick={() => addProductToCart(nft)}
                        title="Add to Cart"
                    >
                        <i className="fa fa-shopping-cart me-1"></i> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container my-5 py-5 page-container-nft-market">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 className="display-4 fw-bold text-center page-title-nft">Explore NFT Marketplace</h1>
            <hr style={{ borderColor: '#00BFFF', borderWidth: '2px', opacity: 0.5 }}/>
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowNfts />}
        </div>
      </div>
    </>
  );
};

export default Products;
