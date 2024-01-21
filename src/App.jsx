import React, { useState, useEffect } from 'react';
import './App.css';

// STAR MATCH - Starting Template

const StarsDisplay = props => (
  <> 
    {utils.range(1, props.stars).map(starId => (
      <div key={starId} className="star" />
    ))}
  </>
);
// <> </>this is a react fragment, it's a way to produce a new element with no HTML
// the props.stars represents the const stars value 
// the whole function supplies a range between 1 and "stars" and then maps the amount of stars required

const PlayAgain = props => (
  <div className="game-done">
    <div 
    className="message" 
    style={{ color: props.gameStatus === 'lost' ? "red" : "green"}}
    >
      {props.gameStatus === 'lost' ? 'Game Over' : 'You Win Well Done!'}</div>
    <div>
      Your Score was: {props.score}
    </div>
    <button className="restart-button" onClick={props.startNewGame}>Play Again</button>
  </div>
)

const PlayNumber = props => ( 
  <button 
  className="number" 
  style={{backgroundColor: colors[props.status]}}
  onClick={() => props.onClick(props.number, props.status)}
  >
    {props.number}
  </button>
);
//the Playnumber function provides the number elements between 1 and whatever range is input


const StarMatch = (props) => {
  const initialSecondsLeft = props.selectedDifficulty === 'easy' ? props.selectedNumber * 5 : props.selectedDifficulty === 'moderate' ? props.selectedNumber * 4 : props.selectedNumber * 3;
  const [stars, setStars] = useState(utils.random(1, props.selectedNumber));
  const [availableNums, setAvailableNums] = useState(utils.range(1, props.selectedNumber));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState([initialSecondsLeft])
  //candidateNums
  //wrongNums (shouldnt be added into state because we can calculate it)
  //usedNums (shouldnt be added into state because we can calculate it from availableNums)
  //availableNums 
    const gameStatus = availableNums.length === 0 
    ? 'won'
    : secondsLeft === 0 ? 'lost' : 'active';
    
    useEffect(() => {
    if (secondsLeft > 0 && gameStatus === 'active') {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft -1);
      }, 1000);
      return() => clearTimeout(timerId);
    } //always use a function to CLEAN UP (clear timeout is a clean up function)
     //react will invoke this function every time the component is CHANGING
  }, [secondsLeft, gameStatus]);

  const score = secondsLeft * props.selectedNumber;

  const candidatesAreWrong = utils.sum(candidateNums) > stars;


  const numberStatus = (number) => { //this links to the Colors const. Available Used Wrong or Candidate numbers have different colors
    if (!availableNums.includes(number)) {//is a used number
      return "used";
    }
    if (candidateNums.includes(number)) {//is either candidate or wrong
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available"
  };

  const onNumberClick = (number, currentStatus) => {
    // Based on the current status, what should the new status be?
    if (gameStatus !=='active' || currentStatus === 'used') {
      return; // if the number has been used, we dont want any actions
    }

    const newCandidateNums = 
      currentStatus === 'available'
        ? candidateNums.concat(number) 
        : candidateNums.filter(cn => cn !== number); //concatinates the number into candidate numbers
    
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums); //whilst the numbers DONT add up to stars, they are within "candidate nums"
    } else { // whilst the sum of candidate nums == stars
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      ); //Filtered version of available numbers by removing any candidate numbers which were used in correct answer
      setStars(utils.randomSumIn(newAvailableNums, props.selectedNumber));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
      //now we need to redraw stars from remaining possible stars... using our maths (DONE ABOVE)
    }
  };
  
  return (
    <div className="game">
      <div className="help">
        Select 1 or more numbers that add up to the number of stars displayed!
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== "active" 
          ? (<PlayAgain gameStatus={gameStatus} startNewGame={props.startNewGame} score={score}/>) 
          : (<StarsDisplay stars={stars} />)
          }
        </div>
        <div className="right">
          {utils.range(1, props.selectedNumber).map(number => (
            <PlayNumber 
            key={number} 
            status={numberStatus(number)}
            number={number} 
            onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      {gameStatus === "active" 
          ? (<div className="timer">Time Remaining: {secondsLeft}</div>) 
          : (<div></div>)
          }
    </div>
  );
};

const Intro = () => {
  const [gameId, setGameId] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(5);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');

  const handleChangeNumber = (event) => {
    setSelectedNumber(event.target.value);
  };

  const handleChangeDifficulty = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const startCounter = () => {
   const i = 1; 
   setGameId(i);
  }

  const startGame = () => {
  if (gameId === 0) {
   return;
   } else {
   return (
    <>
    <button onClick={() => setGameId(0)}>Refresh</button>
    <StarMatch key={gameId} selectedNumber={selectedNumber} selectedDifficulty={selectedDifficulty} startNewGame={() => setGameId(gameId + 1)}/>
    </>
  );}
  }

  return (
  <div className="home-page">
    <h1>Star Math Game</h1>
      {gameId === 0 &&
      (<> <h2>How to play:</h2>
      <div>

      <p>Welcome to the Star Game. This is a game to test your mental arithmetic.</p>
      <p>First choose a difficulty, and a number of stars below. (more stars will be a longer and more challenging game!)</p>
      <p>stars will appear in the left panel and numbers will appear in the right panel</p>
      <p>You must click <b>1 or more</b> numbers that add up to the number of stars displayed</p>
      <p>Numbers will turn blue when selected, green when used successfully and red if they won't work for the current stars</p>
      <p>Your aim is to get all of the numbers to turn green before the timer runs out!</p>
      </div>
            <select value={selectedNumber} onChange={handleChangeNumber}>
        {[...Array(16).keys()].map(i => 
          <option key={i} value={i + 5}>{i + 5}</option>
        )}
      </select>
      <select value={selectedDifficulty} onChange={handleChangeDifficulty}>
        {['beginner', 'moderate', 'hard'].map(i => 
          <option key={i} value={i}>{i}</option>
        )}
      </select><button className="start-game-button" onClick={startCounter}>Start Game</button> </>)}
      <div>{startGame()}</div>
  </div>
  );
}

const App = () => {
  return <Intro />
}

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};


export default App;
