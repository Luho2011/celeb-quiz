import React, { useState, useEffect, useRef } from 'react';
import "./Claim.css";
import Counter from "../Counter";
import Claims from "../Claims.json";

function Claim() {
  const [claims] = useState(Claims);
  const [currentClaim, setCurrentClaim] = useState(null);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [showAnswers, setShowAnswers] = useState([]);
  const [displayedIds, setDisplayedIds] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const stopButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        if (stopButtonRef.current) {
          stopButtonRef.current.click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (currentClaim && showAnswers.length > 0) {
      const id = setInterval(() => {
        setCurrentAnswerIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          if (nextIndex < showAnswers.length) {
            resetBar();
            startBarAnimation();
            return nextIndex;
          } else {
            clearInterval(id);
            return prevIndex;
          }
        });
      }, 8000);

      setIntervalId(id);
      startBarAnimation();

      return () => clearInterval(id);
    }
  }, [currentClaim, showAnswers]);

  useEffect(() => {
    if (currentClaim) {
      resetBar();
      startBarAnimation();
    }
  }, [currentAnswerIndex, currentClaim]);

  const resetBar = () => {
    const bar = document.querySelector('.claim__answer-bar');
    if (bar) {
      bar.style.transition = 'none';
      bar.style.width = '0';
      bar.style.backgroundColor = 'green';
      void bar.offsetWidth;
      bar.style.transition = '';
    }
  };

  const startBarAnimation = () => {
    const bar = document.querySelector('.claim__answer-bar');
    if (bar) {
      setIsAnimating(true);
      setTimeout(() => {
        bar.style.transition = 'width 8s linear';
        bar.style.width = '100%';
      }, 50);
    }
  };

  const stopBarAnimation = () => {
    const bar = document.querySelector('.claim__answer-bar');
    if (bar) {
      const computedStyle = window.getComputedStyle(bar);
      const width = computedStyle.width;
      bar.style.transition = 'none';
      bar.style.width = width;
      setIsAnimating(false);
    }
  };

  const getRandomClaim = () => {
    const remainingClaims = claims.filter(claim => !displayedIds.includes(claim.ids));

    if (remainingClaims.length === 0) {
      alert('Alle Claims wurden bereits angezeigt.');
      return null;
    }

    const randomIndex = Math.floor(Math.random() * remainingClaims.length);
    return remainingClaims[randomIndex];
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleStart = () => {
    const selectedClaim = getRandomClaim();
    if (selectedClaim) {
      setDisplayedIds(prevIds => [...prevIds, selectedClaim.ids]);
      setCurrentClaim(selectedClaim);
      setShowAnswers([]);
      setCurrentAnswerIndex(0);
    }
  };

  const handleGo = () => {
    if (currentClaim) {
      const shuffledAnswers = shuffleArray(currentClaim.items.filter(item => item.id === "1" || item.id === "2"));
      setShowAnswers(shuffledAnswers);
      setCurrentAnswerIndex(0);
      resetBar();
      startBarAnimation();
    }
  };

  const handleStop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    stopBarAnimation();
  };

  const handleSolution = () => {
    const currentAnswer = showAnswers[currentAnswerIndex];
    const bar = document.querySelector('.claim__answer-bar');
    if (bar) {
      bar.style.transition = 'none';
      bar.style.width = '100%';
      if (currentAnswer.id === "1") {
        bar.style.backgroundColor = 'red';
      } else if (currentAnswer.id === "2") {
        bar.style.backgroundColor = 'green';
      }
    }
  };

  return (
    <div className='claim'>
      <div className='claim__counter'>
        <Counter />
      </div>
    <div className='claim__title'>
       <h1>Wer lügt?</h1>
    </div>
       <button className='claim__startBtn' onClick={handleStart}>Start</button>

      {currentClaim && (
        <div className='claim__content'>
          <div className='claim__claim'>
            <h2>{currentClaim.items.find(item => item.id === "0").claim}</h2>
          </div>
          {showAnswers.length > 0 && (
            <div className='claim__answer'>
              <div className='claim__answer-bar'></div>
              <h2>{showAnswers[currentAnswerIndex]?.answer}</h2>
            </div>
          )}
            <div className='claim__buttons'>
              <button className='claim__button' onClick={handleGo}>Go</button>
              <button className='claim__button' ref={stopButtonRef} onClick={handleStop}>Stop</button>
              <button className='claim__button' onClick={handleSolution}>Solution</button>
            </div>
          
        </div>
      )}
    </div>
  );
}

export default Claim;