# NFT Marketplace

This is a full-featured e-commerce application with chatbot and wallet functionality(demo).

## Features

- Product browsing and detailed views
- Shopping cart functionality
- User authentication
- Checkout process
- Customer support chatbot
- Integrated wallet(Metamask) for cryptocurrency transactions

## Run Locally

Clone the project

```bash
  git clone https://github.com/daffhaidar/nft-marketplace-clean.git
```

Go to the project directory

```bash
  cd nft-marketplace-final
```

Set up environment variables:

Create a `.env` file in the root directory with the following variables:
```
PORT=4001
NODE_ENV=development
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=5d
COOKIE_EXPIRE=5
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

Install dependencies

```bash
  npm install
```

If you encounter issues with npm install, try:

```bash
  npm install --legacy-peer-deps
```

Start the server

```bash
  npm start
```

## Chatbot Functionality

The application includes a live chat support feature allowing customers to:
- Get instant responses from the support bot(demo)
- Chat in real-time with support staff(demo)
- Access help from any page through the floating chat widget


## Technologies Used

- React
- Express
- MongoDB
- Socket.IO for real-time chat
- Ethers.js for wallet functionality
- Redux for state management



> Inspired by [ssahibsingh/React_E-Commerce](https://github.com/ssahibsingh/React_E-Commerce)
