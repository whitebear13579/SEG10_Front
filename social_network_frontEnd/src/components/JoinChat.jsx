import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../assets/components/JoinChat.css";

const JoinChat = ({ onJoinChat }) => {
  const [showModal, setShowModal] = useState(false);
  const [chatID, setChatID] = useState("");
  const { user } = useContext(AuthContext);

  const handleJoinChat = async () => {
    try {
      // Example API call to save chat room in the chat service
      const response = await fetch(
        "https://swep.hnd1.zeabur.app/chat/api/member-add",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chat_id: chatID, user_id: user.id }),
        }
      );

      if (response.ok) {
        const newChat = await response.json();
        onJoinChat(newChat); // Notify parent of new chat (object from chat service)
        setChatID(""); // Reset input
        setShowModal(false); // Close modal
      } else {
        alert("create chat failed");
        console.error("Failed to create chat room.");
      }
    } catch (error) {
      console.error("Error:", error);
    } 
  };
  return (
    <div>
      <button onClick={() => setShowModal(true)} style={{ cursor: "pointer" }} className="joinChatroom">
        加入聊天室...
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Join Chat with chat ID</h2>
            <input
              type="text"
              value={chatID}
              onChange={(e) => setChatID(e.target.value)}
              placeholder="Enter ID"
            />
            <button onClick={handleJoinChat}>Join Chat</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinChat;
