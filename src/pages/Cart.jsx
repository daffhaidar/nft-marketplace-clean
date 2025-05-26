import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { delCart } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// Global styles from src/pages/styles.css are applied

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const EmptyCart = () => {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="empty-cart-container">
                <h4 className="display-5"> Your Cart is Empty </h4>
                <p className="lead mb-4">Looks like you haven't added any NFTs to your cart yet.</p>
                <Link to="/product" className="btn btn-custom-primary btn-lg">
                    <i className="fa fa-compass me-2"></i> Explore Marketplace
                </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const removeItemCompletely = (nft) => {
    dispatch(delCart(nft));
    toast.error(`${nft.title} removed from cart.`);
  };

  const parseEthPrice = (priceString) => {
    if (typeof priceString !== 'string') return 0;
    const value = parseFloat(priceString.replace(/\s*ETH/i, "")); // Case-insensitive removal of ETH
    return isNaN(value) ? 0 : value;
  };

  const ShowCart = () => {
    let subtotalEth = 0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotalEth += parseEthPrice(item.price);
      totalItems += 1;
    });

    return (
      <>
        <section className="cart-page-container">
          <div className="container py-lg-5 py-3">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-lg-8 mb-4 mb-lg-0">
                <div className="cart-item-card">
                  <div className="card-header">
                    <h5 className="mb-0">Your Collection ({totalItems} items)</h5>
                  </div>
                  <div className="card-body">
                    {state.map((item) => {
                      return (
                        <div key={item.id} className="row d-flex align-items-center cart-item-row">
                            <div className="col-md-2 col-4 mb-2 mb-md-0">
                                <img
                                  src={item.imageUrl}
                                  alt={item.title}
                                  className="img-fluid rounded cart-item-image"
                                  onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/100x100.png?text=NFT'; }}
                                />
                            </div>
                            <div className="col-md-5 col-8 mb-2 mb-md-0 cart-item-details">
                              <h5 className="mb-1">{item.title}</h5>
                              {item.collectionName && <p className="text-muted small mb-1">Collection: {item.collectionName}</p>}
                              {item.artist && <p className="text-muted small mb-0">Artist: {item.artist}</p>}
                            </div>
                            <div className="col-md-3 col-6">
                                <p className="cart-item-price mb-md-0 mb-1">{item.price}</p>
                            </div>
                            <div className="col-md-2 col-6 text-end">
                                <button
                                  className="btn btn-remove-item btn-sm"
                                  onClick={() => removeItemCompletely(item)}
                                  title="Remove NFT from cart"
                                >
                                  <i className="fa fa-trash me-1"></i>Remove
                                </button>
                            </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="cart-summary-card">
                  <div className="card-header">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-2">
                        Total Items
                        <span>{totalItems}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3 pt-2">
                        <div>
                          <strong className="fs-5">Total Amount</strong>
                        </div>
                        <span className="total-eth fs-5">
                          <strong>{subtotalEth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 })} ETH</strong>
                        </span>
                      </li>
                    </ul>
                    <Link
                      to="/checkout"
                      className="btn btn-custom-primary btn-lg w-100 shadow-sm"
                      aria-disabled={totalItems === 0}
                      onClick={(e) => totalItems === 0 && e.preventDefault()} // Prevent navigation if cart is empty
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3 page-container">
        <h1 className="cart-page-title display-5">Your NFT Cart</h1>
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
