import React from "react";
import ToggleMenu from "../components/ToggleMenu";
import "../assets/page/userProfile.css";
function UserProfilePage() {
  return (
    <>
      <ToggleMenu />
      <div className="profile-container">
        <h1 className="title">Setting</h1>
        <div className="setting">
          <label for="name">姓名</label>
          <input type="text" id="name" name="name" placeholder="文字輸入區" />
        </div>
        <div className="setting">
          <label for="birthday">生日</label>
          <input type="date" id="birthday"></input>
        </div>
        <div className="setting">
          <label>性別</label>
          <div className="sex">
            <label for="man">男</label>
            <input type="radio" name="sex" id="man"></input>
            <label for="woman">女</label>
            <input type="radio" name="sex" id="woman"></input>
            <label for="lgbtq">非二元性別</label>
            <input type="radio" name="sex" id="lgbtq"></input>
            <label for="no">不願透漏</label>
            <input type="radio" name="sex" id="no"></input>
          </div>
          <div className="setting">
            <label for="selfIntro">個人簡介</label>
            <textarea
              id="selfIntro"
              name="selfIntro"
              rows="4"
              placeholder="文字輸入區"
            ></textarea>
          </div>
        </div>
        <div className="save-container">
          <button className="save-button">儲存變更</button>
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;
