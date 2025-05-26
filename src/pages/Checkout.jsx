import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSDK } from '@metamask/sdk-react';
import { ethers } from 'ethers';
import toast from "react-hot-toast";

// Global styles from src/pages/styles.css are applied

// Helper function to parse ETH price string (e.g., "1.5 ETH") to a number
const parseEthPrice = (priceString) => {
    if (typeof priceString !== 'string') return 0;
    const value = parseFloat(priceString.replace(/\s*ETH/i, ""));
    return isNaN(value) ? 0 : value;
};

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  const { sdk, connected, account, provider, chainId } = useSDK();
  const [paymentStatus, setPaymentStatus] = useState({ message: "", type: "" }); // type: info, success, error
  const [transactionHash, setTransactionHash] = useState(null); // New state for tx hash
  const navigate = useNavigate();

  // Redirect to products if cart is empty
  useEffect(() => {
    if (state.length === 0) {
      toast.error("Your cart is empty. Redirecting to marketplace...");
      navigate("/product");
    }
  }, [state, navigate]);

  const ShowCheckout = () => {
    let subtotalEth = 0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotalEth += parseEthPrice(item.price);
      totalItems += 1;
    });

    const handleCryptoPayment = async () => {
      if (!connected || !provider || !account) {
        setPaymentStatus({ message: "Please connect your MetaMask wallet first.", type: "error" });
        toast.error("Please connect your MetaMask wallet first.");
        return;
      }

      const targetChainId = '0xaa36a7'; // Sepolia Testnet
      if (chainId !== targetChainId) {
        try {
          setPaymentStatus({ message: "Requesting to switch to Sepolia testnet...", type: "info" });
          toast.loading("Requesting to switch to Sepolia testnet...");
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetChainId }],
          });
          toast.dismiss();
          setPaymentStatus({ message: "Switched to Sepolia. Please try payment again.", type: "info" });
          toast.info("Switched to Sepolia. Please proceed with payment.");
        } catch (switchError) {
          toast.dismiss();
          if (switchError.code === 4902) { // Chain not added
            try {
              setPaymentStatus({ message: "Sepolia network not found. Attempting to add...", type: "info" });
              toast.loading("Sepolia network not found. Attempting to add...");
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: targetChainId,
                  chainName: 'Sepolia Test Network',
                  rpcUrls: ['https://rpc.sepolia.org/'], // Corrected RPC URL
                  nativeCurrency: { name: 'SepoliaETH', symbol: 'ETH', decimals: 18 },
                  blockExplorerUrls: ['https://sepolia.etherscan.io/'],
                }],
              });
              toast.dismiss();
              setPaymentStatus({ message: "Sepolia network added. Please switch and try payment again.", type: "info" });
              toast.info("Sepolia network added. Please try payment again.");
            } catch (addError) {
              toast.dismiss();
              setPaymentStatus({ message: "Failed to add Sepolia. Please add it manually via MetaMask.", type: "error" });
              toast.error("Failed to add Sepolia. Please add it manually.");
              console.error("Failed to add Sepolia network", addError);
            }
          } else {
            setPaymentStatus({ message: "Failed to switch to Sepolia. Please do it manually.", type: "error" });
            toast.error("Failed to switch to Sepolia. Please do it manually.");
            console.error("Failed to switch to Sepolia network", switchError);
          }
          return;
        } // End of catch for switchError
        return; // Return after attempting to switch/add chain, user needs to re-initiate payment
      } // End of if chainId !== targetChainId

      setPaymentStatus({ message: "Initiating dummy payment on Sepolia...", type: "info" });
      toast.loading("Initiating dummy payment...");

      const recipientAddress = "0x000000000000000000000000000000000000dEaD"; // Dummy recipient
      // Calculate total from cart state for dummy transaction
      // const totalAmountForTx = state.reduce((sum, item) => sum + parseEthPrice(item.price), 0);
      // const amountInEthString = totalAmountForTx.toFixed(18); // Ensure enough precision
      const numberOfItems = state.length;
      const pricePerItem = 0.01; // Price per item in ETH for the test transaction
      const totalEthForTx = numberOfItems * pricePerItem;
      const amountInEthString = totalEthForTx.toFixed(18); // Ensure enough precision, toFixed(2) or toFixed(5) might also be fine

      try {
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await ethersProvider.getSigner();
        
        const tx = await signer.sendTransaction({
          to: recipientAddress,
          value: ethers.utils.parseEther(amountInEthString)
        });
        toast.dismiss();
        setPaymentStatus({ message: `Transaction initiated! Hash: ${tx.hash}. Waiting for confirmation...`, type: "info" });
        toast.loading(`Transaction sending... Hash: ${tx.hash.substring(0,10)}...`);
        
        await tx.wait();
        toast.dismiss();
        setPaymentStatus({ message: "Payment successful! Transaction confirmed.", type: "success" });
        setTransactionHash(tx.hash); // Store the transaction hash
        toast.success("Payment successful! Transaction confirmed.");
        // Potentially clear cart and redirect here
        // dispatch(clearCartAction()); // Example: if you have a clearCartAction
        // navigate("/thank-you");
      } catch (error) {
        toast.dismiss();
        console.error("Payment failed", error);
        let errorMessage = "Payment failed.";
        if (error.message) errorMessage += ` ${error.message.substring(0, 100)}...`;
        if (error.code === 4001) errorMessage = "Transaction rejected by user.";
        
        setPaymentStatus({ message: errorMessage, type: "error" });
        toast.error(errorMessage);
      }
    };

    return (
      <>
        <div className="container py-5 checkout-page-container">
          <div className="row my-4 justify-content-center">
            {/* Order Summary Column */}
            <div className="col-md-5 col-lg-4 order-md-last mb-4">
              <div className="checkout-summary-card">
                <div className="card-header">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush mb-3">
                    {state.map(item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center nft-item-summary">
                            <span className="nft-title">{item.title.substring(0,25)}{item.title.length > 25 ? '...':''}</span>
                            <span className="text-highlight-nft">{item.price}</span>
                        </li>
                    ))}
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 pt-3 mt-2">
                      <div>
                        <strong className="fs-5">Total Amount</strong>
                      </div>
                      <span className="total-eth fs-5">
                        <strong>{subtotalEth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 })} ETH</strong>
                      </span>
                    </li>
                  </ul>
                  <button 
                    className="btn btn-custom-primary btn-lg btn-pay-crypto shadow-sm"
                    onClick={handleCryptoPayment}
                    disabled={!connected || paymentStatus.type === 'info' } // Disable if not connected or payment processing
                  >
                    {paymentStatus.type === 'info' && paymentStatus.message.includes("Initiating") ? 
                     'Processing...' : 
                     paymentStatus.type === 'info' && paymentStatus.message.includes("Switching") ? 
                     'Switching Network...' : 
                     'Pay with Crypto (Sepolia)'}
                  </button>
                  {paymentStatus.message && (
                    <div className={`payment-status-message mt-3 ${paymentStatus.type}`}>
                      {paymentStatus.message}
                      {paymentStatus.type === 'success' && transactionHash && (
                        <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                          View on Sepolia Etherscan: {' '}
                          <a 
                            href={`https://sepolia.etherscan.io/tx/${transactionHash}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: '#1e6f22', textDecoration: 'underline' }} // Style for better visibility
                          >
                            {transactionHash.substring(0, 12)}...{transactionHash.substring(transactionHash.length - 10)}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Billing Address Column */}
            <div className="col-md-7 col-lg-8">
              <div className="checkout-form-card">
                <div className="card-header">
                  <h4 className="mb-0">Billing Details (Optional)</h4>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-4 small">
                    For NFT purchases, billing details are typically not required for the transaction itself but can be provided for your records.
                  </p>
                  <form className="needs-validation" noValidate>
                    <div className="row g-3">
                      <div className="col-sm-6 mb-2">
                        <label htmlFor="firstName" className="form-label">First name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="" />
                      </div>
                      <div className="col-sm-6 mb-2">
                        <label htmlFor="lastName" className="form-label">Last name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="" />
                      </div>
                      <div className="col-12 mb-2">
                        <label htmlFor="email" className="form-label">Email <span className="text-muted">(For receipt)</span></label>
                        <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                      </div>
                      <div className="col-12 mb-2">
                        <label htmlFor="address" className="form-label">Address <span className="text-muted">(Optional)</span></label>
                        <input type="text" className="form-control" id="address" placeholder="1234 Main St" />
                      </div>
                    </div>
                    {/* Add more form fields here if necessary, or a submit button if this form was to be saved */}
                    {/* <hr className="my-4" /> */}
                    {/* <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to payment</button> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      {/* Render ShowCheckout directly if cart is not empty (handled by useEffect redirect) */}
      {state.length > 0 ? <ShowCheckout /> : 
        <div className="container py-5 text-center page-container">
            <h4 className="p-3 display-5">Loading Cart or Redirecting...</h4>
            {/* This will be shown briefly if redirection is happening */}
        </div>
      }
      <Footer />
    </>
  );
};

export default Checkout;
