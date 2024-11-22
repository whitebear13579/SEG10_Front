import React, {useState} from 'react';
//import ToggleMenu from './ToggleMenu';
import '../assets/components/ChatAvatar.css';
function ChatAvatar({ chatRoom }) {
  const [user, setUser] = useState([
    {id: 1, name: 'User A', friends: [], requests: []},
  ]);
  const handleDisplay = async() => { //listchat
    try {

        const response = await fetch('https://swep.hnd1.zeabur.app' , { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: email }) 
        });
    
        if (!response.ok) { //then tell not found
          notFound = true;
        };
        const data = await response.json();
        setResult(data); // will change after next render
        friend_id = data.id;//get search id
        console.log("friendID and userID: " + friend_id + ", " + user_id);
      } catch (error) {
        console.error('Error during fetch:', error);
        setResult(null);
      }
};
  return (
    <div className="sidebar">
      {/*<ToggleMenu />*/}
      <div className="chatroom-list">
        <p>聊天室</p> 

      </div>
    </div>
  );
}
export default ChatAvatar;