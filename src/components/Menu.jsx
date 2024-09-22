import React, { useState } from 'react';
import socket from '../services/socket';

const Menu = ({ setInRoom, setRoomData, setPhase }) => {
    const [roomCode, setRoomCode] = useState('');
    const [username, setUsername] = useState('');

    const joinRoom = () => {
        if (roomCode && username) {
            socket.connect(); // Manually connect to socket server
            socket.emit('joinRoom', { roomCode, username }, (response) => {
                if (response.success) {
                    setRoomData(response.room);
                    setPhase('lobby');
                } else {
                    alert(response.message);
                }
            });
        }
    };

    return (
        <div>
            <h2>Enter Room</h2>
            <input type="text" placeholder="Room Code" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <button onClick={joinRoom}>Join Room</button>
        </div>
    );
};

export default Menu;
