import React, { useEffect, useState } from 'react';
/*import ChatMessage from '../components/ChatMessage';
import ChatAvatar from '../components/ChatAvatar';*/
import '../assets/page/home.css';
function HomePage(){
   /* const [msgData, setMsgData] = useState('');
    const [chatData, setChatData] = useState('');
    let myJson = localStorage.getItem('responseData');
    let data = JSON.parse(myJson);
    console.log(data);
    const [item, setItem] = useState(data);
    let email = item.id;
    useEffect(() => {
        let myJson = localStorage.getItem('responseData');
        data = JSON.parse(myJson);
        email = item.id;
        console.log(email);
    }, []);
    console.log(email);*/
    return (
    <div className="container">
        <p>home</p>
        {/*<ChatAvatar />
        <ChatMessage sender={email}/>*/}
    </div>

    );
}

export default HomePage;