import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const AddChat = ({ onAddChat }) => {
  const [showModal, setShowModal] = useState(false);
  const [chatName, setChatName] = useState('');
  const {user} = useContext(AuthContext);

  const handleAddChat = async () => {
    try {
      // Example API call to save chat room in the backend
      const response = await fetch('https://swep.hnd1.zeabur.app/chat/api/chat-add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: chatName , members: [user.id, "friend@gmail.com"]}),
      });

      if (response.ok) {
        const newChat = await response.json();
        onAddChat(newChat); // Notify parent of new chat (object from chat service)
        setShowModal(false); // Close modal
        setChatName(''); // Reset input
      } else {
        alert("create chat failed");
        console.error('Failed to create chat room.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
        <box-icon name='plus' onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}></box-icon>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create Chat Room</h2>
            <input
              type="text"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              placeholder="Enter chat name"
            />
            <button onClick={handleAddChat}>Create Chat</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddChat;
