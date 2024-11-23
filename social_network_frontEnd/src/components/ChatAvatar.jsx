import React, { useContext, useState } from "react";
import ToggleMenu from "./ToggleMenu";
import AddChat from "./AddChat";
import "../assets/components/ChatAvatar.css";
import { AuthContext } from "../context/AuthContext";
function ChatAvatar() {
  const {user} = useContext(AuthContext);
  const [chatRooms, setChatRooms] = useState(user.chats);
  const handleClick = () => {
    const tmpChat = {id: 1,  name: "Never"};
    setChatRooms((prevChats) => [...prevChats, tmpChat]);
    const tmpChat2 = { id: 2,  name: "gonna"};
    setChatRooms((prevChats) => [...prevChats, tmpChat2]);
    const tmpChat3 = { id: 3,  name: "give"};
    setChatRooms((prevChats) => [...prevChats, tmpChat3]);
    const tmpChat4 = { id: 4,  name: "you"};
    setChatRooms((prevChats) => [...prevChats, tmpChat4]);
    const tmpChat5 = { id: 5,  name: "up"};
    setChatRooms((prevChats) => [...prevChats, tmpChat5]);
  };

  const handleAddChat = (newChat) => {
    setChatRooms([...chatRooms, newChat]);
  };
  return (
    <div className="sidebar">
      <ToggleMenu />
      <div className="chatroom-list">
        <h3>聊天室</h3>
        <AddChat onAddChat={handleAddChat}/>
        
        {/*<button onClick={handleClick}></button>*/}
        {chatRooms.map((chat) => (
              <div key={chat.ID} >
                <div className="chat">
                  <img src="penguin-png.png" className="you"/>
                  {chat.Name},{chat.ID}
                </div>
              </div>
        ))}
      </div>
    </div>
  );
}
export default ChatAvatar;
