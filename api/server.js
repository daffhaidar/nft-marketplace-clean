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

// Initialize Socket.IO and attach it to the app instance if possible,
// or ensure it's configured in a way that Vercel can pick up.
// For Vercel, you typically export the app, and Vercel handles the server.
// Socket.IO in serverless can be tricky. We'll try a basic setup.

if (!process.env.VERCEL) { // Only run the full server setup if NOT on Vercel
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
          // If roomId is part of data, use it. Otherwise, adapt as needed.
          // This assumes data.roomId is provided by the client for targeted messaging.
          const targetRoom = data.roomId || data.userId; // Fallback to userId if roomId not present
          if (targetRoom) {
            io.to(targetRoom).emit('receive_message', data);
          } else {
            // Broadcast or handle differently if no room/user ID specified
            socket.broadcast.emit('receive_message', data); 
          }
      });
      
      socket.on('disconnect', () => {
          console.log('Client disconnected');
      });
  });

  server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });

  // Unhandled Promise Rejection
  process.on('unhandledRejection', (err) => {
      console.log(`Error: ${err.message}`);
      server.close(() => {
          process.exit(1);
      });
  });
}

// Export the Express app for Vercel
module.exports = app;
