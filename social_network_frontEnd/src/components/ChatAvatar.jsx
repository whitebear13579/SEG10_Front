import React, { useContext, useEffect, useState } from "react";
import ToggleMenu from "./ToggleMenu";
import AddChat from "./AddChat";
import "../assets/components/ChatAvatar.css";
import { AuthContext } from "../context/AuthContext";
function ChatAvatar() {
  const {user, updateUser} = useContext(AuthContext);
  const [chatRooms, setChatRooms] = useState(user.chats);
//, "demo@gmail.com"
  useEffect(() => {
    setChatRooms(user.chats);
  }, [user])
  const handleAddChat = (newChat) => {
    setChatRooms([...chatRooms, newChat.ID]);
    console.log(user.ID);
    //add chat id to user chats
    console.log(JSON.stringify({user_id:user.ID, chat_id:newChat.ID}));
    const UserAddChat = async() =>{
      try {
        const response = await fetch('https://swep.hnd1.zeabur.app/user/api/chat-add', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({user_id:user.ID, chat_id:newChat.ID}),
        });
        console.log(response);
      } catch (error) {
        alert("failed to add chat to user");
        console.error('Error:', error);
      }
    }
    alert("type of userchat id" + newChat.ID);
    UserAddChat();
    console.log("finish useraddchat");
    updateUser(newChat.ID);
    console.log("finish update");
  };
  return (
    <div className="sidebar">
      <ToggleMenu />
      <div className="chatroom-list">
        <h3>聊天室</h3>
        <AddChat onAddChat={handleAddChat}/>
        
        {/*<button onClick={handleClick}></button>*/}
        {chatRooms.map((chat) => (
              <div key={chat} >
                <div className="chat">
                  <img src="penguin-png.png" className="you"/>
                  {chat}
                </div>
              </div>
        ))}
      </div>
    </div>
  );
}
export default ChatAvatar;
