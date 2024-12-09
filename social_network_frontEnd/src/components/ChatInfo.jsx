import React, { useContext, useState,useEffect,useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import "../assets/components/ChatInfo.css";
const ChatInfo = ({ isChatInfoOpen, onCloseChatInfo }) => {
  if (!isChatInfoOpen) return null;
  const { user } = useContext(AuthContext);
  const ChatInfoCloseRef = useRef(null)
  const closeFloatChatInfo = (event) => {
    if(ChatInfoCloseRef.current && !ChatInfoCloseRef.current.contains(event.target)){
      onCloseChatInfo();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", closeFloatChatInfo);

    return () => {
      document.removeEventListener("mousedown", closeFloatChatInfo);
    };
  }, []);
  return (
    <div>
      <div className="chatInfo-overlay">
        <div className="chatInfo-content" ref={ChatInfoCloseRef}>
          <h2>join Chat ID:</h2>
          <label>{user.chats[0]}</label>
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
