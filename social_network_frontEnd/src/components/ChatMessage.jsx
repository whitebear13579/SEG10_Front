import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ChatInfo from "./ChatInfo";
import "boxicons";
import "../assets/components/chatMessage.css";

function ChatMessage({ chat }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  console.log(chat);
  useEffect(()=>{
    setMessages("");
  },[chat]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (chat.Contents && chat.Contents.length > 0) {
          const fetchedMessages = await Promise.all(
            chat.Contents.map(async (messageId) => {
              try {
                const response = await fetch(
                  "https://swep.hnd1.zeabur.app/msg/api/msg-get",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: messageId }),
                  }
                );
                if (response.ok) {
                  return response.json();
                } else {
                  console.error(`Failed to fetch message with ID: ${messageId}`, await response.text());
                  return null;
                }
              } catch (error) {
                console.error("Error fetching message ID:", messageId, error);
                return null;
              }
            })
          );
          setMessages(fetchedMessages.filter(Boolean)); // Remove null (failed fetches)
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chat.Contents]);

  
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const tempMessage = { id: Date.now(), text: newMessage, sender: "You" };
    setMessages((prev) => [...prev, tempMessage]);

    try {
      const response = await fetch("https://swep.hnd1.zeabur.app/msg/api/msg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, content: newMessage }),
      });
      if(response.ok){
        try {
            const response2 = await fetch("https://swep.hnd1.zeabur.app/chat/api/msg-add", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: chat.id, msg_id: response.id }),
            });
      
            if (!response2.ok) {
              console.error("Failed to send message:", await response2.text());
              //delete msg from msg service
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
      ) : messages.length > 0 ? (
        <>
          <div className="chat-header">
            <span>{chat.Name}</span>
            <ChatInfo />
          </div>
          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id}>
                <img src="penguin-png.png" alt="you" className="you" />
                <div className="chat-bubble left">
                  {message.text}....{message.id}
                </div>
              </div>
            ))}
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
      ) : (
        <>
          <div className="chat-header">
            <span>{chat.Name}</span>
            <ChatInfo />
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
