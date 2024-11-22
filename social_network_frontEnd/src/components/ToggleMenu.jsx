import React from "react";
import "../assets/components/ToggleMenu.css";
function ToggleMenu() {
  const toggleMenu = () => {
    const menu = document.getElementById("side-menu");
    if (menu.style.width === "250px") {
      menu.style.width = "0";
    } else {
      menu.style.width = "250px";
    }
  };
  return (
    <div>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <div id="side-menu" className="side-menu">
        <a href="#home">聊天室</a>
        <a href="#userInfo">設定</a>
        <a href="#friendList">好友列表</a>
        <a href="#friendRequest">好友請求及搜尋</a>
        <a href="#login">登出</a>
      </div>
    </div>
  );
}

export default ToggleMenu;