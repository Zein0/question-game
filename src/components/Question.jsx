import React from 'react';

const Question = ({ question, mode="" }) => {
    let text = mode == "imposter" ? "The Common Question is:" : "The Question is:"
    return (
        <div>
            <h3>{text}</h3>
            <p>{question}</p>
        </div>
    );
};

export default Question;
