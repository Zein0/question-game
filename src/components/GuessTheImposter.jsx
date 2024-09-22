import React, { useState, useEffect } from 'react';
import Question from './Question';
import Vote from './Vote';

const GuessTheImposter = ({ roomData, question, votes }) => {
    const [votesSubmitted, setVotesSubmitted] = useState(false);
    return (
        <div>
            <Question question={question} mode="imposter"/>
            <h2>Votes:</h2>
            {votes.map((vote, index) => (
                <p key={index}>{vote.username} voted for {vote.questionVote}</p>
            ))}
            {!votesSubmitted ? (
                <>
                    <Vote roomData={roomData} mode="imposter" setVotesSubmitted={setVotesSubmitted} />
                </>
            ) : (
                <h2>Waiting for other players...</h2>
            )}
        </div>
    );
};

export default GuessTheImposter;
