import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import ChatInfo from "./ChatInfo";
import "boxicons";
import "../assets/components/chatMessage.css";
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

function ChatMessage({ chat, chatfunc }) {
  const { user } = useContext(AuthContext);
  const [members, setMembers] = useState([user]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isChatInfoOpen, setChatInfoOpen] = useState(false);
  const messageListRef = useRef(null);


  const fetchMessage = async (msgId) => {
    try {
      const response = await fetch("https://swep.hnd1.zeabur.app/msg/api/msg-get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msgId }),
      });

      if (response.ok) {
        return await response.json();
      } else {
        console.error(`Failed to fetch message with ID ${msgId}:`, await response.text());
        return null;
      }
    } catch (error) {
      console.error(`Error fetching message with ID ${msgId}:`, error);
      return null;
    }
  };

  const getMsgs = async () => {
    console.log('initial message');
    try {
      if (chat.Contents && chat.Contents.length > 0) {
        const fetchedMessages = [];
        // console.log('get message');
        // console.log('user: ', user.id);
        // console.log('room: ', chat.ID);
        // console.log(chat.Contents);
        for (const msgId of chat.Contents) {
          // console.log(msgId);
          const message = await fetchMessage(msgId);  // 使用公共函式
          if (message) {
            fetchedMessages.push(message);
          }
        }
        setMessages(fetchedMessages);  // 更新訊息
      } else {
        console.log("No messages to fetch.");

      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  //initial request
  useEffect(() => {
    const execute = async () => {
      setMessages([]); 
      await getMsgs();
    };
  
    execute();
  }, [chat]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
    }, 0); // 0ms delay, but ensures it runs after DOM update

    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, []);


  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);


  useEffect(() => {
    if (chat) {
      socket.disconnect();
      socket.connect();
      socket.emit('join_room', chat.ID);
      // console.log('join ', chat.ID);
      // console.log(chat.Contents);
    }

    // 接收訊息
    const handleReceiveMessage = (data) => {
      // console.log('handle recieve');
      // console.log(data);
      
      setMessages((prev) => {
        const updatedMessages = [...prev, data];
        console.log('Updated messages:', updatedMessages);
        return updatedMessages;
      });

      // console.log(chat.Contents);
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage); // 清理監聽器
    };
  }, [chat]);


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
              // console.log('roomName:', chat.ID);
              // console.log(msgData);
              // console.log('massage: ', messages);
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
            <img
              src="images/penguin-png.png"
              alt="penguin"
              className="headerAvatar"
            />
            <span>{chat.Name}</span>
            <button
              onClick={() => setChatInfoOpen(true)}
              className="chatInfoButton"
            >
              <box-icon type="solid" name="edit"></box-icon>
            </button>
          </div>

          <hr className="headerLine" />
          <div className="chat-messages" ref={messageListRef}>
            {messages.map((message) => {
              const member = members.find((m) => m.id === message.sender) || {};
              return (
                <div key={message.id} className="chatMessages">
                  <img
                    src={member.profile || "default-profile.png"}
                    alt={member.name || "Unknown"}
                    className="you"
                  />
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <button className="send-button" onClick={sendMessage}>
              <box-icon type="solid" name="send"></box-icon>
            </button>
          </div>
          <ChatInfo
            chat={chat}
            isChatInfoOpen={isChatInfoOpen}
            onCloseChatInfo={() => setChatInfoOpen(false)}
          ></ChatInfo>
        </>
      )}
    </div>
  );
}

export default ChatMessage;
