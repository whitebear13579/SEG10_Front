import React from 'react';
import ToggleMenu from '../components/ToggleMenu';
import FriendList from '../components/FriendList';
export default function FriendListPage(){
    return (
        <>
        <ToggleMenu />
        <p>friend list</p>
        {<FriendList />}
        </>
    )
}
