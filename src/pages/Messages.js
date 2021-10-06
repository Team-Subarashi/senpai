import React from 'react';
import MessageList from '../components/MessageList';
import io from 'socket.io-client';
import { useState } from 'react';

const socket = io.connect("http://localhost:3001")

const Messages = () => {
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");


    const joinRoom = () => {

    };


    return (
        <div>
            <MessageList />
            <h3>🐱Join A Chat🐱</h3>
            <input type="text" placeholder="John..." onChange={(event) => (event.target.value)} />
            <input type="text" placeholder="Room ID..." />
            <button>Join A Room</button>
        </div>
    )
}

export default Messages
