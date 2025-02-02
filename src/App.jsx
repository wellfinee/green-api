import React, { useState, useEffect } from "react";
import axios from "axios";
import { Send } from "lucide-react";

function Input({ type = "text", className = "", ...props }) {
  return (
    <input
      type={type}
      className={`border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-opacity-75 ${className}`}
      {...props}
    />
  );
}

function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-green-500 hover:bg-green-600 text-white p-2 rounded transition-all duration-200 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Sidebar({ children, theme }) {
  return (
    <div className={`w-1/4 p-4 h-full overflow-auto relative ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
      {children}
    </div>
  );
}

function ChatWindow({ children, theme }) {
  return (
    <div className={`flex-1 p-4 h-full overflow-auto flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      {children}
    </div>
  );
}

function Message({ text, sender, isOutgoing }) {
  return (
    <div
      className={`p-2 my-1 rounded text-sm max-w-xs ${
        isOutgoing ? "bg-green-500 text-white self-end" : "bg-gray-700 text-gray-100"
      }`}
    >
      <strong>{sender}:</strong> {text}
    </div>
  );
}

export default function App() {
  const [idInstance, setIdInstance] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [theme, setTheme] = useState("dark");

  const sendMessage = async () => {
    if (!idInstance || !apiToken || !phoneNumber || !message) return;
    try {
      await axios.post(
        `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiToken}`,
        {
          chatId: `${phoneNumber}@c.us`,
          message,
        }
      );
      setMessages([...messages, { text: message, sender: "You", isOutgoing: true }]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchMessages = async () => {
    if (!idInstance || !apiToken) return;
    try {
      const response = await axios.get(
        `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiToken}`
      );
      if (response.data && response.data.body) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.body.messageData.textMessageData.textMessage, sender: "Them", isOutgoing: false },
        ]);
      }
    } catch (error) {
      console.error("Error receiving messages:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [idInstance, apiToken]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`h-screen flex ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      <Sidebar theme={theme}>
        <div className="mb-4 space-y-2">
          <Input
            placeholder="ID Instance"
            className={theme === "dark" ? "placeholder-gray-400" : "placeholder-gray-600"}
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
          />
          <Input
            placeholder="API Token"
            type="password"
            className={theme === "dark" ? "placeholder-gray-400" : "placeholder-gray-600"}
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
          />
          <Input
            placeholder="Phone Number"
            className={theme === "dark" ? "placeholder-gray-400 focus:ring-yellow-500"  : "placeholder-gray-600 focus:ring-yellow-500"}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </Sidebar>
      <ChatWindow theme={theme}>
        <div className={`flex-1 overflow-y-auto p-4 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
          {messages.map((msg, index) => (
            <Message
              key={index}
              text={msg.text}
              sender={msg.sender}
              isOutgoing={msg.isOutgoing}
            />
          ))}
        </div>
        <div className={`flex items-center mt-auto p-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
          <Input
            className={theme === "dark" ? "placeholder-gray-400" : "placeholder-gray-600"}
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button className="ml-2 flex items-center justify-center p-2" onClick={sendMessage}>
            <Send className="w-5 h-5" />
          </Button>
          <Button className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center bg-transparent" onClick={toggleTheme}>
            {theme === "dark" ? "🌙" : "☀️"}
          </Button>
        </div>
      </ChatWindow>
    </div>
  );
}
