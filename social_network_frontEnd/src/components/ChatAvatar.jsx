import React, { useContext, useState } from "react";
import ToggleMenu from "./ToggleMenu";
import "../assets/components/ChatAvatar.css";
import { AuthContext } from "../context/AuthContext";
function ChatAvatar() {
  //const {user} = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const handleClick = () => {
    const tmpChat = {id: 1,  chat: "Never"};
    setChats((prevChats) => [...prevChats, tmpChat]);
    const tmpChat2 = { id: 2,  chat: "gonna"};
    setChats((prevChats) => [...prevChats, tmpChat2]);
    const tmpChat3 = { id: 3,  chat: "give"};
    setChats((prevChats) => [...prevChats, tmpChat3]);
    const tmpChat4 = { id: 4,  chat: "you"};
    setChats((prevChats) => [...prevChats, tmpChat4]);
    const tmpChat5 = { id: 5,  chat: "up"};
    setChats((prevChats) => [...prevChats, tmpChat5]);
  };
  return (
    <div className="sidebar">
      <ToggleMenu />
      <div className="chatroom-list">
        <h3>聊天室</h3>
        <button onClick={handleClick}></button>
        {chats.map((chat) => (
              <div key={chat.id} >
                <div className="chat">
                  <img src="penguin-png.png" alt="you" className="you" />
                  {chat.chat}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
export default ChatAvatar;
