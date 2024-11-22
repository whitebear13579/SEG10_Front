import React ,{useEffect, useState, useContext} from "react";
import { AuthContext } from '../context/AuthContext';

export default function FriendList(){
    const { user } = useContext(AuthContext); // Access user and logout from context
    const [friends, setFriends] = useState('');
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch( 'https://swep.hnd1.zeabur.app/user/api/user-get' , { 
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: user.id }) 
              });
            const result = await response.json();
            setFriends(result.friends);
          } catch (error) {
            console.error('Error fetching child data:', error);
          }
        };
    
        fetchData();
      }, []);
    console.log(friends);
    
    //display friend in list
    return (
    <div>
        { friends.length <= 0 ? (
        <p>No friends</p>
        ) : (
            // Display the friend list if there are friends
            <ul>
            {friends.map((friend, index) => (
                <li key={index}>
                    {friend} 
                </li>
            ))}
            </ul>
        )}
    </div>
    );
}