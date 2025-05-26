const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middlewares/user_actions/auth');
const ethers = require('ethers');

// In-memory storage for wallets (in production, use a secure database)
const userWallets = new Map();

// Generate new wallet for a user
router.post('/wallet/create', isAuthenticatedUser, async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Check if user already has a wallet
        if (userWallets.has(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Wallet already exists for this user'
            });
        }
        
        // Create a new wallet using ethers.js
        const wallet = ethers.Wallet.createRandom();
        const walletData = {
            address: wallet.address,
            privateKey: wallet.privateKey, // In production, encrypt this before storing
            balance: '0',
            transactions: []
        };
        
        userWallets.set(userId, walletData);
        
        // Don't send private key to frontend in production
        return res.status(201).json({
            success: true,
            wallet: {
                address: walletData.address,
                balance: walletData.balance
            }
        });
    } catch (error) {
        console.error('Wallet creation error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating wallet'
        });
    }
});

// Get wallet details
router.get('/wallet/details', isAuthenticatedUser, async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Check if user has a wallet
        if (!userWallets.has(userId)) {
            return res.status(404).json({
                success: false,
                message: 'No wallet found for this user'
            });
        }
        
        const wallet = userWallets.get(userId);
        
        // In production, you would query a blockchain provider for the actual balance
        return res.status(200).json({
            success: true,
            wallet: {
                address: wallet.address,
                balance: wallet.balance,
                transactions: wallet.transactions
            }
        });
    } catch (error) {
        console.error('Get wallet error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving wallet details'
        });
    }
});

// Simulate a transaction (in production, use actual blockchain transactions)
router.post('/wallet/transaction', isAuthenticatedUser, async (req, res) => {
    try {
        const { amount, recipientAddress } = req.body;
        const userId = req.user.id;
        
        if (!amount || !recipientAddress) {
            return res.status(400).json({
                success: false,
                message: 'Amount and recipient address are required'
            });
        }
        
        // Check if user has a wallet
        if (!userWallets.has(userId)) {
            return res.status(404).json({
                success: false,
                message: 'No wallet found for this user'
            });
        }
        
        const wallet = userWallets.get(userId);
        const currentBalance = parseFloat(wallet.balance);
        const transactionAmount = parseFloat(amount);
        
        if (currentBalance < transactionAmount) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient balance'
            });
        }
        
        // Create a new transaction
        const transaction = {
            id: Date.now().toString(),
            amount: transactionAmount,
            recipientAddress,
            timestamp: new Date(),
            status: 'completed'
        };
        
        // Update wallet data
        wallet.balance = (currentBalance - transactionAmount).toString();
        wallet.transactions.push(transaction);
        userWallets.set(userId, wallet);
        
        return res.status(200).json({
            success: true,
            transaction,
            newBalance: wallet.balance
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error processing transaction'
        });
    }
});

module.exports = router; 