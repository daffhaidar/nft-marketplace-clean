const app = require('./app');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');
const http = require('http');
const socketIo = require('socket.io');
const PORT = process.env.PORT || 4001;

// UncaughtException Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

// connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('join_chat', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined chat`);
    });
    
    socket.on('send_message', (data) => {
        io.to(data.roomId).emit('receive_message', data);
    });
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});
