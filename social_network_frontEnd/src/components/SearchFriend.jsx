import React, { useState, useEffect } from "react";
import "../assets/page/searchFriend.css";
import ToggleMenu from "./ToggleMenu";
function SearchFriend() {
  return (
    <>
      <ToggleMenu />
      <div className="SearchFriend-container">
        <h1 className="title">好友請求</h1>
        <div className="field">
          <input placeholder="搜尋用戶..."></input>
          <button className="searchButton"></button>
        </div>
        <hr></hr>
        <div className="friend"> 
            <img src="images/penguin-png.png" />
            <div className="friendName">企鵝三號</div>
            <button className="agree"></button>
            <button className="disagree"></button>
        </div>
      </div>
    </>
  );
}

export default SearchFriend;
