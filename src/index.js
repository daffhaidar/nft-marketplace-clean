import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./pages/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { MetaMaskProvider } from "@metamask/sdk-react";

import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
  WalletPage,
} from "./pages";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import Chatbot from "./components/Chatbot";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MetaMaskProvider debug={false} sdkOptions={{
    dappMetadata: {
      name: "Example React Dapp",
      url: window.location.href,
    }
  }}>
    <BrowserRouter>
      <ScrollToTop>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/product/*" element={<PageNotFound />} />
          </Routes>
          <Chatbot />
        </Provider>
      </ScrollToTop>
    </BrowserRouter>
    <Toaster />
  </MetaMaskProvider>
);
