import React, { useState, useEffect } from "react";
import "../assets/page/searchFriend.css";
import ToggleMenu from "./ToggleMenu";
function SearchFriend() {
  const [isInviting, setIsInviting] = useState(false);

  const inviteClick = () => {
    setIsInviting((isInviting) => !isInviting);
  };
  return (
    <>
      <ToggleMenu />
      <div className="SearchFriend-container">
        <h1 className="title">好友搜尋</h1>
        <div className="field">
          <input placeholder="搜尋用戶..."></input>
          <button className="searchButton"></button>
        </div>
        <hr></hr>
        <div className="friend">
          <img src="images/penguin-png.png" />
          <div className="friendName">企鵝三號</div>
          <button className="sendInvite" onClick={inviteClick}>
            {isInviting ? "等待中..." : "送出邀請"}
          </button>
        </div>
        <hr></hr>
      </div>
    </>
  );
}

export default SearchFriend;
