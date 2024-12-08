import React, { useState } from "react";
import "../assets/page/friendRequest.css";
import ToggleMenu from "./ToggleMenu";

function FriendRequest() {
  const [fndRsps, setFndRsps] = useState([
    { name: "企鵝四號", id: 0 },
    { name: "企鵝五號", id: 1 },
    { name: "企鵝六號", id: 2 },
    { name: "企鵝七號", id: 3 },
    { name: "企鵝八號", id: 4 },
  ]);

  const handleResponse = (id, isAccept) => {
    if (isAccept) {
      console.log(`Friend request accepted for id: ${id}`);
      // Add logic to add the friend (if needed)
    } else {
      console.log(`Friend request ignored for id: ${id}`);
      // Logic for ignoring the friend request
    }
    // Remove the request from the list
    const newFndRsps = fndRsps.filter((fndRsp) => fndRsp.id !== id);
    setFndRsps(newFndRsps);
  };

  return (
    <>
      <ToggleMenu />
      <div className="FriendRequest-container">
        <h1 className="title">好友請求</h1>
        <hr />
        <div className="friend-requests">
          {fndRsps.map((fndRsp) => (
            <div key={fndRsp.id} className="friendrequest">
              <img src="images/penguin-png.png" alt="Penguin" />
              <div className="friendName">{fndRsp.name}</div>
              <button
                className="agree"
                onClick={() => handleResponse(fndRsp.id, true)}
              >
              </button>
              <button
                className="disagree"
                onClick={() => handleResponse(fndRsp.id, false)}
              >
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FriendRequest;
