import React, { useState } from 'react';
import "./WhoKnowsMore.css";
import Counter from "../Counter";
import words1 from "../whoknowsmore.json";

function WhoKnowsMore() {
    const [words, setWords] = useState(words1);
    const [remainingWords, setRemainingWords] = useState([]);
    const [visible, setVisible] = useState([]);  // Zustand für die Sichtbarkeit

    const handleStart = () => {
        const random = Math.floor(Math.random() * words.length);
        const selectedWords = words[random].items;
        setRemainingWords(selectedWords);
        setVisible(new Array(selectedWords.length).fill(false));  // Initialisiert die Sichtbarkeit mit false
        remove(words[random].ids);
    };

    const remove = (id) => {
        const newList = words.filter(item => item.ids !== id);
        setWords(newList);
    };

    const toggleVisibility = (index) => {
        const newVisible = [...visible];
        newVisible[index] = !newVisible[index];
        setVisible(newVisible);
    };

    return (
        <div className='more'>
            <div className='more__counter'>
                <Counter />
            </div>
            <div className='more__title'>
                <h1>Wer weiß mehr?</h1>
            </div>
            <button className='more__button' onClick={handleStart}>start</button>
            <div className='more__content'>
                {remainingWords.length > 0 && (
                    <div className='more__category'>
                        <h3>{remainingWords[0].title}</h3>
                    </div>
                )}
                {remainingWords.map((item, index) => (
                    <div key={index} className="more__names" onClick={() => toggleVisibility(index)}>
                        <h2>{visible[index] ? item.name : ''}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WhoKnowsMore;