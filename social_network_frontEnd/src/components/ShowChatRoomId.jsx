import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../assets/components/showChatRoomId.css"
const ShowChatRoomId = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <button
        style={{ cursor: "pointer" }}
        className="showChatId"
      >顯示聊天室ID</button>
    </div>
  );
};

export default ShowChatRoomId;
