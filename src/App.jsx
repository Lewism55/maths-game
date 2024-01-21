import React, { useState } from 'react'
import './App.css'
import { motion } from 'framer-motion'
import StarMatch from './components/StarMatch'

const App = () => {
    const [gameId, setGameId] = useState(0)
    const [selectedNumber, setSelectedNumber] = useState(5)
    const [selectedDifficulty, setSelectedDifficulty] = useState('easy')

    const handleChangeNumber = (event) => {
        setSelectedNumber(event.target.value)
    }

    const handleChangeDifficulty = (event) => {
        setSelectedDifficulty(event.target.value)
    }

    const startCounter = () => {
        const i = 1
        setGameId(i)
    }

    const startGame = () => {
        if (gameId === 0) {
            return
        } else {
            return (
                <>
                    
                    <StarMatch
                        key={gameId}
                        selectedNumber={selectedNumber}
                        selectedDifficulty={selectedDifficulty}
                        startNewGame={() => setGameId(gameId + 1)}
                    />
                </>
            )
        }
    }

    return (
        <div className='home-page'>
            <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                Star Math Game
            </motion.h1>
            {gameId !== 0 && <button className='back-button' onClick={() => setGameId(0)}>Back to Rules & Settings</button>}
            {gameId === 0 && (
                <>
                    {' '}
                    <h2>How to play:</h2>
                    <div>
                        <p>Welcome to the Star Game. This is a game to test your mental arithmetic.</p>
                        <p>To begin, please choose a difficulty and a number of stars below. (more stars will be a longer and more challenging game!)</p>
                        <p>stars will appear in the left panel and numbers will appear in the right panel</p>
                        <p>
                            You must click <b>1 or more</b> numbers that add up to the number of stars displayed
                        </p>
                        <p>Numbers will turn blue when selected, green when used successfully and red if they won't work for the current stars</p>
                        <p>Your aim is to get all of the numbers to turn green before the timer runs out!</p>
                    </div>
                    <div>
                        <label htmlFor='number'>Number of Stars:</label>
                        <select value={selectedNumber} onChange={handleChangeNumber}>
                            {[...Array(16).keys()].map((i) => (
                                <option key={i} value={i + 5}>
                                    {i + 5}
                                </option>
                            ))}
                        </select>
                        <label htmlFor='difficulty'>Difficulty:</label>
                        <select value={selectedDifficulty} onChange={handleChangeDifficulty}>
                            {['beginner', 'moderate', 'hard'].map((i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className='start-game-button' onClick={startCounter}>
                        Start Game
                    </button>{' '}
                </>
            )}
            <div>{startGame()}</div>
        </div>
    )
}

export default App
