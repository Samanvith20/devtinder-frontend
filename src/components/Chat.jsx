"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";


const Chat = () => {
  const { id } = useParams(); // ✅ Extract user ID from URL
  const [messages, setMessages] = useState([
    { sender: "user", text: "Hey! How are you?" },
    { sender: "receiver", text: "I'm good! How about you?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const user=useSelector((state)=>state.user)
  let userId=user?._id
  console.log("User",userId)

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if(!userId) return
    // establish a connection
    const socket= io("http://localhost:3000",)
    socket.emit("joinRoom", {
        userId, 
        targetId:id,
        username:user.name,
    })
    socket.on("receiveMessage", (data) => {
        console.log("Received Message", data);
        setMessages((prev) => [...prev, { sender: "receiver", text: data.text }]);
      }
    );

    return () => {
        socket.disconnect();
      };

  }, [userId, id]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
     const socket= io("http://localhost:3000",)
    socket.emit("sendMessage", {
        userId, 
        targetId:id,
        text:newMessage,

    })
    setNewMessage("")
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* 🔹 Chat Header */}
      <div className="bg-[#1A696B] text-white flex items-center p-4 shadow-md">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgJCptPOx71EJH7cxh-m3JebMLah27zZgA7Ewl7hE6a0QpxLMhBsbrHx8&s"
          alt="User"
          width={40}
          height={40}
          className="rounded-full border-2 border-white"
        />
        <h2 className="ml-4 font-semibold text-lg">Chat with {id}</h2>
      </div>

      {/* 🔹 Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                msg.sender === "user"
                  ? "bg-[#E77B3E] text-white"
                  : "bg-gray-300 text-black"
              } px-4 py-2 rounded-lg max-w-xs`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* 🔹 Auto-scroll Target */}
      </div>

      {/* 🔹 Chat Input */}
      <div className="p-4 bg-white flex items-center border-t shadow-lg">
        <button className="text-gray-500 p-2">
          <BsEmojiSmile size={22} />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 mx-2 border rounded-lg outline-none"
          
        />
        <button
          onClick={sendMessage}
          className="bg-[#1A696B] text-white px-4 py-2 rounded-lg hover:bg-[#155d58]"
        >
          <FiSend size={22} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
