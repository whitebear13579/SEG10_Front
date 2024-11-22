import React, {useState, useEffect} from 'react';
import 'boxicons';
import '../assets/components/chatMessage.css';
function ChatMessage({ sender, content }) {
  let data = JSON.parse(localStorage.getItem('loginData'));//userData
  const [friends, setFriends] = useState('');
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch( 'https://swep.hnd1.zeabur.app/user/api/user-get' , { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: data.id }) 
            });
          const result = await response.json();
          setFriends(result.friends);
        } catch (error) {
          console.error('Error fetching child data:', error);
        }
      };
  
      fetchData();
    }, []);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    // Optimistically add the message to the UI
    const tempMessage = { id: Date.now(), text: newMessage, sender: 'You' };
    setMessages((prevMessages) => [...prevMessages, tempMessage]);

    // Send the message to the server
    try {
      await fetch('https://swep.hnd1.zeabur.app/msg/api/msg', { //SaveMsg
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id: data.id, content: newMessage }),
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }

    // Clear the input
    setNewMessage('');
  };
    return (
      <>
      {friends.length <= 0 ? (
        <div className="chat-container">
          <h1>{sender}</h1>
          <p>Start Chat by add friend now!!</p>
        </div>
      ):(
        <div className="chat-container">
          <div className="chat-header">
            <img src="vite.svg" alt="Avatar" className="avatar" />
            <span className="chat-username">張小王 the first friend</span>
          </div>
          <div className="chat-messages">
            <div className="chat-bubble left">不行，我還在外面</div>
            <div className="chat-bubble right">有空打球嗎</div>
            {messages.map((message) => (
            <div key={message.id}>{message.sender}: {message.text}</div>
          ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="傳送訊息..."
            />
            <button className='send-button' onClick={sendMessage}><box-icon type='solid' name='send'></box-icon></button>
          </div>
          
        </div>
      )}
      
      </>
    );
  }

  export default ChatMessage;
  