import React, { useState, useEffect } from "react";
import "../assets/page/friendRequest.css";
import ToggleMenu from "./ToggleMenu";
function FriendRequest() {
  return (
    <>
      <ToggleMenu />
      <div className="FriendRequest-container">
      <h1 className="title">好友請求</h1>
        <hr></hr>
        <div className="friendrequest">
            <img src="images/penguin-png.png" />
            <div className="friendName">企鵝四號</div>
            <button className="agree"></button>
            <button className="disagree"></button>
        </div>
        <hr className="Line"></hr>
        <div className="friendrequest">
            <img src="images/penguin-png.png" />
            <div className="friendName">企鵝五號</div>
            <button className="agree"></button>
            <button className="disagree"></button>
        </div>
        <hr className="Line"></hr>
        <div className="friendrequest">
            <img src="images/penguin-png.png" />
            <div className="friendName">企鵝六號</div>
            <button className="agree"></button>
            <button className="disagree"></button>
        </div>
        <hr className="Line"></hr>
      </div>
    </>
  );
}

export default FriendRequest;
