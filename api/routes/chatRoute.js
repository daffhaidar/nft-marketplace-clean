const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middlewares/user_actions/auth');

// Store messages temporarily (in production, use a database)
let chatMessages = [];

// Get chat history
router.get('/chat/history', isAuthenticatedUser, (req, res) => {
    const userId = req.user.id;
    const userMessages = chatMessages.filter(
        msg => msg.userId === userId || msg.isAdmin
    );
    res.status(200).json({
        success: true,
        messages: userMessages
    });
});

// Send a message
router.post('/chat/send', isAuthenticatedUser, (req, res) => {
    const { message } = req.body;
    const userId = req.user.id;
    
    if (!message) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a message'
        });
    }
    
    const newMessage = {
        id: Date.now().toString(),
        userId,
        sender: req.user.name,
        message,
        timestamp: new Date(),
        isAdmin: false
    };
    
    chatMessages.push(newMessage);
    
    // In a real application, emit this via socket.io to connected admins
    
    // Simple bot response for demo purposes
    setTimeout(() => {
        const botResponse = {
            id: (Date.now() + 1).toString(),
            userId,
            sender: 'Support Bot',
            message: `Thanks for your message: "${message}". Our team will get back to you soon.`,
            timestamp: new Date(),
            isAdmin: true
        };
        chatMessages.push(botResponse);
    }, 1000);
    
    res.status(201).json({
        success: true,
        message: newMessage
    });
});

module.exports = router; 