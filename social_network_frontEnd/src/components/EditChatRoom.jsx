import React, { useContext, useState } from "react";
import "../assets/components/editChatRoom.css";
const EditChatRoom = () => {
  const [editChatRoomName, seteditChatRoomName] = useState(false);

  return (
    <div>
      <button
        style={{ cursor: "pointer" }}
        className="editChatRoom"
        onClick={() => seteditChatRoomName(true)}
      >
        變更聊天室名稱
      </button>

      {editChatRoomName && (
        <div className="editRoomName">
          <div className="editRoomNamecontent">
            <h2>變更聊天室名稱</h2>
            <p>聊天室名稱:</p>
            <input
              type="text"
              placeholder="Enter new name"
            />
            <button onClick={() => seteditChatRoomName(false)} className="editCancel">取消</button>
            <button  className="editAccept">儲存</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditChatRoom;
