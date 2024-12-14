import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../assets/components/showChatRoomId.css";

const ShowChatRoomId = (chat) => {
  const { user } = useContext(AuthContext); // You can use `user` if needed elsewhere.
  const id = chat.chat.ID;
  const [showId, setShowId] = useState(false); // State to toggle ID visibility

  const handleButtonClick = () => {
    setShowId((prev) => !prev); // Toggle the state
  };

  return (
    <div>
      <button
        style={{ cursor: "pointer" }}
        className="showChatId"
        onClick={handleButtonClick}
      >
        {showId ? "隱藏聊天室ID" : "顯示聊天室ID"}
      </button>
      {showId && <p className="chatIdDisplay">聊天室ID: {id}</p>}
    </div>
  );
};

export default ShowChatRoomId;
