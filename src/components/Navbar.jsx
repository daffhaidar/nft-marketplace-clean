import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { mockLogout } from "../redux/action/authAction";
import { useSDK } from "@metamask/sdk-react";

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const { isAuthenticated, user } = useSelector((state) => state.user || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sdk, connected, connecting, account } = useSDK();

  const handleLogout = () => {
    dispatch(mockLogout());
    navigate("/");
  };

  const connectWallet = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn("Failed to connect to MetaMask", err);
    }
  };

  const disconnectWallet = () => {
    if (sdk) {
      sdk.terminate();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 ps-0" to="/">
          DANNA'S SITE
        </NavLink>
        <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon navbar-toggler-icon-custom"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">Marketplace</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
          </ul>
          <div className="buttons text-center d-lg-flex align-items-lg-center mt-2 mt-lg-0">
            {isAuthenticated ? (
              <>
                <span className="btn-custom-outline d-block d-lg-inline-block mb-2 mb-lg-0">
                  <i className="fa fa-user me-1"></i> {user?.name || "User"}
                </span>
                <button onClick={handleLogout} className="btn-custom-outline d-block d-lg-inline-block ms-lg-2 mb-2 mb-lg-0">
                  <i className="fa fa-sign-out-alt me-1"></i> Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn-custom-outline d-block d-lg-inline-block mb-2 mb-lg-0">
                  <i className="fa fa-sign-in-alt me-1"></i> Login
                </NavLink>
                <NavLink to="/register" className="btn-custom-outline d-block d-lg-inline-block ms-lg-2 mb-2 mb-lg-0">
                  <i className="fa fa-user-plus me-1"></i> Register
                </NavLink>
              </>
            )}
            {connected ? (
              <>
                <span className="wallet-address d-block d-lg-inline-block ms-lg-2 mb-2 mb-lg-0">
                  <i className="fa fa-wallet me-1"></i>
                  {account && account.length > 4 ? `${account.slice(0, 4)}....` : account}
                </span>
                <button onClick={disconnectWallet} className="btn-custom-danger d-block d-lg-inline-block ms-lg-2 mb-2 mb-lg-0">
                  Disconnect
                </button>
              </>
            ) : (
              <button onClick={connectWallet} className="btn-custom-primary d-block d-lg-inline-block ms-lg-2 mb-2 mb-lg-0" disabled={connecting}>
                <i className="fa fa-wallet me-1"></i> {connecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
            <NavLink to="/cart" className="btn-custom-outline cart-nav-button d-block d-lg-inline-block ms-lg-2 mb-2 mb-lg-0">
              <i className="fa fa-shopping-cart me-1 cart-info"></i> <span className="cart-info">Cart ({state.length})</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
