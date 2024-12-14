import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import ChatInfo from "./ChatInfo";
import "boxicons";
import "../assets/components/chatMessage.css";
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

function ChatMessage({ chat, chatfunc }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messageListRef = useRef(null);

  

  // 公共函式，負責請求訊息
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
        console.log('get message');
        console.log('user: ', user.id);
        console.log('room: ', chat.ID);
        console.log(chat.Contents);
        for (const msgId of chat.Contents) {
          console.log(msgId);
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

  // 長輪詢的 useEffect
  useEffect(() => {
    const fetchMessages = async () => {
      console.log('fetch message');
      try {
        if (chat.Contents && chat.Contents.length > 0) {
          const fetchedMessages = await Promise.all(
            chat.Contents.map(async (messageId) => {
              const message = await fetchMessage(messageId);  // 使用公共函式
              return message;  // 可以返回 null，表示請求失敗
            })
          );
          setMessages(fetchedMessages.filter(Boolean));  // 移除 null 值（請求失敗的訊息）
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    //fetchMessages();
  }, [chat.Contents]);

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
    // 加入新房間
    if (chat) {
      socket.disconnect();
      socket.connect();
      socket.emit('join_room', chat.ID);
      console.log('join ', chat.ID);
      console.log(chat.Contents);
    }

    // 接收訊息
    const handleReceiveMessage = (data) => {
      console.log('handle recieve');
      console.log(data);
      
      setMessages((prev) => {
        const updatedMessages = [...prev, data];
        console.log('Updated messages:', updatedMessages); // 查看更新後的資料
        return updatedMessages;
      });

      console.log(chat.Contents);
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
      if(response.ok){
        
        const data = await response.json();
        console.log('print data');
        console.log(data);
        //setMessages((prev) => [...prev, data]);
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
              console.log('roomName:', chat.ID);
              console.log(msgData);
              console.log('massage: ', messages);
              
              //const newchat = chat;
              //newchat.Contents.push(data.id);
              //chatfunc(newchat);
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
      ) :  (
        <>
          <div className="chat-header">
          <img src="images/penguin-png.png" alt="penguin" className="headerAvatar" />
            <span>{chat.Name}</span>
            <ChatInfo />
          </div>

          <hr className="headerLine"/>
          <div className="chat-messages" ref={messageListRef}>
            {messages.map((message) => (
              <div key={message.id} className="chatMessages">
                <img src={user.picture} alt="you" className="you" />
                <span>
                  {message.content}....{message.sender}
                </span>
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
      ) }
    </div>
  );
}

export default ChatMessage;
