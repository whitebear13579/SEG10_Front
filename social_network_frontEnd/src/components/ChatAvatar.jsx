import React, { useContext, useEffect, useState } from "react";
import ToggleMenu from "./ToggleMenu";
import AddChat from "./AddChat";
import "../assets/components/ChatAvatar.css";
import { AuthContext } from "../context/AuthContext";

function ChatAvatar() {
  const { user, updateUser } = useContext(AuthContext);
  const [chatRoomsID, setChatRoomsID] = useState(user?.chats || []);
  const [chatRooms, setChatRooms] = useState([]); // Array of chat details

  // Fetch chat details for all chat IDs in chatRoomsID
  const fetchChatDetails = async () => {
    try {
      const chatDetails = [];
      for (const chatID of chatRoomsID) {
        console.log(JSON.stringify({ id: chatID }));
        const response = await fetch(`https://swep.hnd1.zeabur.app/chat/api/chat-get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: chatID }),
        });

        if (!response.ok) {
          console.error(`Failed to fetch chat info for ID: ${chatID}`);
          continue;
        }

        const chatDetail = await response.json(); // Chat detail object
        chatDetails.push(chatDetail);
      }

      setChatRooms(chatDetails); // Update chatRooms only after all data is fetched
    } catch (error) {
      console.error("Error fetching chat details:", error);
    }
  };

  useEffect(() => {
    const fetchChatsOnMount = async () => {
      if (user?.chats?.length) {
        await fetchChatDetails(); // Fetch and update chatRooms state
      }
    };
    fetchChatsOnMount();
  }, [user]);

  const handleAddChat = (newChat) => {
    if (chatRoomsID.includes(newChat.ID)) {
      console.log("Chat already exists");
      return;
    }

    setChatRoomsID((prev) => [...prev, newChat.ID]);
    updateUser(newChat.ID);

    const UserAddChat = async () => {
      try {
        const response = await fetch("https://swep.hnd1.zeabur.app/user/api/chat-add", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user.id, chat_id: newChat.ID }),
        });

        if (!response.ok) {
          throw new Error("Failed to update backend");
        }

        // Fetch details of the new chat and update immediately
        const chatResponse = await fetch(`https://swep.hnd1.zeabur.app/chat/api/chat-get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: newChat.ID }),
        });

        if (chatResponse.ok) {
          const newChatDetails = await chatResponse.json();
          //setChatRooms((prev) => [...prev, newChatDetails]); // Add new chat details
        }
      } catch (error) {
        alert("Failed to add chat to user");
        console.error(error);
      }
    };

    UserAddChat();
  };

  return (
    <div className="sidebar">
      <ToggleMenu />
      <div className="chatroom-list">
        <h3>聊天室</h3>
        <AddChat onAddChat={handleAddChat} />

        {/* Display chat names */}
        {chatRooms.map((chat) => (
          <div key={chat.id}>
            <div className="chat">
              <img src="penguin-png.png" className="you" alt="avatar" />
              {chat.Name} {/* Display chat name */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatAvatar;
