import React, { useEffect, useState } from 'react';
import socket from '../services/socket';

const Lobby = ({ roomData, players }) => {
    const [buttonDisable, setButtonDisable] = useState(false)

    const startGame = () => {
        setButtonDisable(true)
        socket.emit('startGame', { roomCode: roomData.roomCode }, (response) => {
            if (!response.success) {
                alert(response.message);
                setButtonDisable(false)
            }
        });
    };

    return (
        <div>
            <h2>Room: {roomData.roomCode}</h2>
            <h3>Players: {players.map(player => player.username).join(', ')}</h3>
            <button disabled={buttonDisable} onClick={startGame}>Start Game</button>
        </div>
    );
};

export default Lobby;
