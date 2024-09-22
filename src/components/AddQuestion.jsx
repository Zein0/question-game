import React, { useState } from 'react';
import axios from 'axios';

const AddQuestion = () => {
    const [questionText, setQuestionText] = useState('');

    const addQuestion = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/questions/add',{
                text: questionText
            });

            if (response.data.success) {
                alert('Question added successfully!');
                setQuestionText('');
            } else {
                alert('Failed to add question');
            }
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    return (
        <div>
            <h2>Add New Question</h2>
            <input
                type="text"
                placeholder="Question"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
            />
            <button onClick={addQuestion}>Add Question</button>
        </div>
    );
};

export default AddQuestion;
