import React from 'react';
import { Header, Footer, Navbar } from '../components';
import Wallet from '../components/Wallet/Wallet';

const WalletPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12">
            <Wallet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WalletPage; 