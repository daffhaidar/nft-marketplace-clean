import React, { useState } from "react";
import "./Chatbot.css"; // We will create this CSS file next

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! How can I help you today? (This is a dummy chat)",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputText,
    };

    const botResponse = {
      id: messages.length + 2,
      sender: "bot",
      text: "Thank you for your message! Our team will reply within 2 hours from now! Please wait patiently!",
    };

    setMessages([...messages, newMessage, botResponse]);
    setInputText("");
  };

  if (!isOpen) {
    return (
      <button onClick={toggleChatbot} className="chatbot-toggler" title="Open Chat">
        <i className="fa fa-comments"></i>
      </button>
    );
  }

  return (
    <div className="chatbot-window">
      <div className="chatbot-header">
        <h3>Support Chat</h3>
        <button onClick={toggleChatbot} className="chatbot-close-btn">
          &times;
        </button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender === "bot" ? "bot-message" : "user-message"}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="chatbot-input-form">
        <input type="text" value={inputText} onChange={handleInputChange} placeholder="Type your message..." aria-label="Type your message" />
        <button type="submit" title="Send Message">
          <i className="fa fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
