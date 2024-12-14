import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import ChatInfo from "./ChatInfo";
import "boxicons";
import "../assets/components/chatMessage.css";

function ChatMessage({ chat }) {
  const { user } = useContext(AuthContext);
  const [members, setMembers] = useState([user]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messageListRef = useRef(null);

  // Fetch messages and members on initial render
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Fetch messages
        const fetchedMessages = await Promise.all(
          chat.Contents?.map(async (msgId) => {
            try {
              const response = await fetch("https://swep.hnd1.zeabur.app/msg/api/msg-get", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: msgId }),
              });
              if (response.ok) {
                return response.json();
              } else {
                console.error(`Failed to fetch message with ID ${msgId}`);
                return null;
              }
            } catch (error) {
              console.error(`Error fetching message with ID ${msgId}:`, error);
              return null;
            }
          }) || []
        );
        setMessages(fetchedMessages.filter(Boolean));

        // Fetch members
        const fetchedUsers = await Promise.all(
          chat.Members?.map(async (memID) => {
            try {
              const response = await fetch("https://swep.hnd1.zeabur.app/user/api/user-get", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: memID }),
              });
              if (response.ok) {
                return response.json();
              } else {
                console.error(`Failed to fetch user with ID ${memID}`);
                return null;
              }
            } catch (error) {
              console.error(`Error fetching user with ID ${memID}:`, error);
              return null;
            }
          }) || []
        );
        setMembers(fetchedUsers.filter(Boolean));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [chat.Contents, chat.Members]);

  // Scroll to the bottom of the message list when messages change
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch("https://swep.hnd1.zeabur.app/msg/api/msg-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, content: newMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('print data');
        console.log(data);
        try {
            const response2 = await fetch("https://swep.hnd1.zeabur.app/chat/api/msg-add", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: chat.ID, msg_id: data.id }),
            });
      
            if (!response2.ok) {
              console.error("Failed to store message to chatroom:", await response2.text());
              //delete msg from msg service(not done yet)
            }
            else{
              console.log('socket send');
              const msgData = { room: chat.ID, author: user.id, msg: newMessage, data: data};
              //console.log('roomName:', chat.ID);
              //console.log(msgData);
              //console.log('massage: ', messages);
              socket.emit('send_message', msgData);
            }
          } catch (error) {
            console.error("Error sending message:", error);
          }
      }
      if (!response.ok) {
        console.error("Failed to send message:", await response.text());

      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setNewMessage("");
  };

  return (
    <div className="chat-container">
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <>
          <div className="chat-header">
            <img src="images/penguin-png.png" alt="penguin" className="headerAvatar" />
            <span>{chat.Name}</span>
            <ChatInfo />
          </div>

          <hr className="headerLine" />
          <div className="chat-messages" ref={messageListRef}>
            {messages.map((message) => {
              const member = members.find((m) => m.id === message.sender) || {};
              console.log(member);
              return (
                <div key={message.id} className="chatMessages">
                  <img
                    src={member.profile || "default-profile.png"}
                    alt={member.name || "Unknown"}
                    className="you"
                  />
                  {console.log(member)}
                  <span>
                    {message.content}....{message.sender || "Unknown"}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="傳送訊息..."
            />
            <button className="send-button" onClick={sendMessage}>
              <box-icon type="solid" name="send"></box-icon>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatMessage;
