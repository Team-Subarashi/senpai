import React from 'react';
import MessageList from '../components/MessageList';
import io from 'socket.io-client';
import { useState } from 'react';

const socket = io.connect("http://localhost:3001")//useeffect!!!! first 

const Messages = () => {
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");


    const joinRoom = () => {
        if (userName !== "" && room !== "") {
            socket.emit("join_room", room)
        }
    };


    return (
        <div>
            <MessageList />
            <h3>🐱Join A Chat🐱</h3>
            <input type="text" placeholder="Your Name here.." onChange={(event) => { setUserName(event.target.value) }} />
            <input type="text" placeholder="Room ID..." onChange={(event) => { setRoom(event.target.value) }} />
            <button onClick={joinRoom}>Join A Room</button>
        </div>
    )
}

export default Messages
