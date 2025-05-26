import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import axios from 'axios';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  
  const { isAuthenticated, user } = useSelector((state) => state.user || {});
  
  useEffect(() => {
    // Initialize socket connection
    try {
      const newSocket = io('http://localhost:4001');
      setSocket(newSocket);
    
      // Cleanup on unmount
      return () => {
        newSocket.disconnect();
      };
    } catch (error) {
      console.log('Socket connection failed, using mock mode');
    }
  }, []);
  
  useEffect(() => {
    if (isAuthenticated && user) {
      // Add some mock messages for demo
      if (messages.length === 0) {
        setMessages([
          {
            id: '1',
            message: 'Welcome to our support chat! How can we help you today?',
            sender: 'Support Bot',
            isAdmin: true,
            timestamp: new Date(Date.now() - 120000) // 2 minutes ago
          }
        ]);
      }
      
      // Only try to connect if socket exists
      if (socket) {
        try {
          socket.emit('join_chat', user._id);
          
          socket.on('receive_message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
          });
          
          // Get chat history
          fetchChatHistory();
        } catch (error) {
          console.log('Error in socket connection, using mock mode');
        }
      }
    }
  }, [socket, isAuthenticated, user]);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const fetchChatHistory = async () => {
    try {
      const { data } = await axios.get('/api/v1/chat/history');
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.log('Using mock chat history');
      // We're already setting mock messages in useEffect
    }
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || !isAuthenticated) return;
    
    try {
      const newMessage = {
        id: Date.now().toString(),
        message,
        sender: user?.name || 'You',
        userId: user?._id || 'mock-user',
        timestamp: new Date()
      };
      
      // Update local state first for better UX
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Try to send to backend, but don't block UI
      try {
        await axios.post('/api/v1/chat/send', { message });
        
        if (socket) {
          socket.emit('send_message', newMessage);
        }
      } catch (error) {
        console.log('Using mock mode for chat');
        
        // Add a mock response after a small delay
        setTimeout(() => {
          const botResponses = [
            "Thanks for your message! Our team will get back to you soon.",
            "Hello there! How can we assist you with your shopping today?",
            "Your question has been received. We typically respond within 2 hours.",
            "Thanks for contacting support. Is there anything else you'd like to know?"
          ];
          
          const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
          
          const botMessage = {
            id: (Date.now() + 1).toString(),
            message: randomResponse,
            sender: 'Support Bot',
            isAdmin: true,
            timestamp: new Date()
          };
          
          setMessages(prevMessages => [...prevMessages, botMessage]);
        }, 1000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="chat-widget">
      <button className="chat-button" onClick={toggleChat}>
        <i className="fa fa-comments"></i>
        {!isOpen && <span className="chat-button-text">Chat with us</span>}
      </button>
      
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h4>Customer Support</h4>
            <button className="close-button" onClick={toggleChat}>
              <i className="fa fa-times"></i>
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="empty-chat">
                <p>Start a conversation with our support team!</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.isAdmin || msg.sender === 'Support Bot' ? 'admin-message' : 'user-message'}`}
                >
                  <div className="message-content">{msg.message}</div>
                  <div className="message-meta">
                    <span>{msg.sender}</span>
                    <span className="timestamp">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button type="submit" className="send-button">
              <i className="fa fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget; 