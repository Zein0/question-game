import React, { useEffect, useState } from 'react';
import Lobby from './Lobby';
import Game from './Game';
import Result from './Result';
import Menu from './Menu';
import GuessTheImposter from './GuessTheImposter';
import socket from '../services/socket';
function GameRoom() {
    const [roomData, setRoomData] = useState(null);
    const [question, setQuestion] = useState('');
    const [commonQuestion, setCommonQuestion] = useState('');
    const [votes, setVotes] = useState([]);
    const [players, setPlayers] = useState([]);
    const [phase, setPhase] = useState('menu');
    const [resultData, setResultData] = useState({
        trueImposter:"",
        majorityVote:"",
        isCorrect:""
    })

    useEffect(()=>{
        socket.on('question', ({questionText, room}) => {
            setQuestion(questionText);
            setRoomData(room)
            setPhase('question')
        });
        socket.on('playerJoined', (players) => {
            setPlayers(players);
        });
        socket.on('revealCommonQuestion', (question) => {
            setCommonQuestion(question);
            setPhase('guess')
        });
        socket.on('revealVotes', (votes) => {
            setVotes(votes);
        });
        socket.on('finalResult', (result) => {
            setResultData(result)
            setPhase('results')
        });
        return () => {
            socket.off('question');
            socket.off('playerJoined');
            socket.off('revealCommonQuestion');
            socket.off('revealVotes');
            socket.off('finalResult');
        };
    },[])
  
    return (
        <div className="App">
            {phase === 'menu' && <Menu setRoomData={setRoomData} setPhase={setPhase} />}
            {phase === 'lobby' && <Lobby roomData={roomData} players={players}/>}
            {phase === 'question' && <Game question={question} roomData={roomData} />}
            {phase === 'guess' && <GuessTheImposter question={commonQuestion} roomData={roomData} votes={votes} />}
            {phase === 'results' && <Result roomData={roomData} setPhase={setPhase} resultData={resultData} />}
        </div>
    );
  }
export default GameRoom;