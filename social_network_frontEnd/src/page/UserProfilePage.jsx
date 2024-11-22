import React from 'react';
import ToggleMenu from '../components/ToggleMenu';
import '../assets/page/userProfile.css';
function UserProfilePage(){
    return(
        <>
            <ToggleMenu />
            <div className="profile-container">

                <header className="profile-header">
                    
                    <h1 className="title">Setting</h1>
                </header>

                <section className="profile-info">
                    <div className="field">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" placeholder="Enter your name"/>
                    </div>
                    <div className="field">
                        <label for="phone">Phone:</label>
                        <input type="tel" id="phone" name="phone" placeholder="Enter your phone number"/>
                    </div>
                    <div className="field">
                        <label for="selfIntro">Self Intro:</label>
                        <textarea id="selfIntro" name="selfIntro" rows="4" placeholder="Write a brief introduction"></textarea>
                    </div>
                </section>

                <div className="save-container">
                    <button className="save-button">Save Changes</button>
                </div>
            </div>
        </>
    );
}

export default UserProfilePage;