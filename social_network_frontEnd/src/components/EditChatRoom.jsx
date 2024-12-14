import React, { useContext, useState } from "react";
import "../assets/components/editChatRoom.css"
const EditChatRoom = () => {

  return (
    <div>
      <button
        style={{ cursor: "pointer" }}
        className="editChatRoom"
      >編輯聊天室設定</button>
    </div>
  );
};

export default EditChatRoom;
