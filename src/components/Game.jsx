import React, { useState, useEffect } from 'react';
import Question from './Question';
import Vote from './Vote';

const Game = ({ roomData, question }) => {
    const [votesSubmitted, setVotesSubmitted] = useState(false);
    return (
        <div>
            {!votesSubmitted ? (
                <>
                    <Question question={question} mode="question" />
                    <Vote roomData={roomData} mode="question" setVotesSubmitted={setVotesSubmitted} />
                </>
            ) : (
                <h2>Waiting for other players...</h2>
            )}
        </div>
    );
};

export default Game;
