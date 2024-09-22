import React, { useState } from 'react';
import socket from '../services/socket';

const Vote = ({ roomData, mode="", setVotesSubmitted}) => {
    const [vote, setVote] = useState('');
    let question = mode == "imposter" ? "Who do you think is the imposter?" : "Who do you think this question best describe?"
    const submitVote = () => {
        let event = mode == "imposter" ? "submitImposterVote" : "submitQuestionVote" 
        if (vote) {
            socket.emit(event, {
                roomCode: roomData.roomCode,
                vote,
            });
            setVotesSubmitted(true);
        }
    };

    return (
        <div>
            <h3>{question}</h3>
            <select value={vote} onChange={(e) => setVote(e.target.value)}>
                <option value="">Select Player</option>
                {roomData.players.map((player) => (
                    <option key={player.socketId} value={player.username}>{player.username}</option>
                ))}
            </select>
            <button onClick={submitVote}>Submit Vote</button>
        </div>
    );
};

export default Vote;
