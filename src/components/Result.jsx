import React, { useState, useEffect } from 'react';

const Result = ({ roomData, setPhase, resultData }) => {

    if (!resultData.trueImposter) return <h2>Waiting for final results...</h2>;

    return (
        <div>
            <h2>Results</h2>
            <p><strong>True Imposter:</strong> {resultData.trueImposter}</p>
            <p><strong>Majority Vote:</strong> {resultData.majorityVote}</p>
            <p>{resultData.isCorrect ? "The majority was correct!" : "The majority was wrong!"}</p>
            <button onClick={() => setPhase('lobby')}>Play Again</button>
        </div>
    );
};

export default Result;
