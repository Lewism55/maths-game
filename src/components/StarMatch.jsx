import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { utils } from './Utils'
import PlayNumber from './PlayNumber'
import StarsDisplay from './StarsDisplay'
import PlayAgain from './PlayAgain'

const StarMatch = (props) => {
    const initialSecondsLeft =
        props.selectedDifficulty === 'easy'
            ? props.selectedNumber * 5
            : props.selectedDifficulty === 'moderate'
            ? props.selectedNumber * 4
            : props.selectedNumber * 3
    const [stars, setStars] = useState(utils.random(1, props.selectedNumber))
    const [availableNums, setAvailableNums] = useState(utils.range(1, props.selectedNumber))
    const [candidateNums, setCandidateNums] = useState([])
    const [secondsLeft, setSecondsLeft] = useState([initialSecondsLeft])
    //candidateNums
    //wrongNums (shouldnt be added into state because we can calculate it)
    //usedNums (shouldnt be added into state because we can calculate it from availableNums)
    //availableNums
    const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active'

    useEffect(() => {
        if (secondsLeft > 0 && gameStatus === 'active') {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1)
            }, 1000)
            return () => clearTimeout(timerId)
        } //always use a function to CLEAN UP (clear timeout is a clean up function)
        //react will invoke this function every time the component is CHANGING
    }, [secondsLeft, gameStatus])

    const score = secondsLeft * props.selectedNumber

    const candidatesAreWrong = utils.sum(candidateNums) > stars

    const numberStatus = (number) => {
        //this links to the Colors const. Available Used Wrong or Candidate numbers have different colors
        if (!availableNums.includes(number)) {
            //is a used number
            return 'used'
        }
        if (candidateNums.includes(number)) {
            //is either candidate or wrong
            return candidatesAreWrong ? 'wrong' : 'candidate'
        }
        return 'available'
    }

    const onNumberClick = (number, currentStatus) => {
        // Based on the current status, what should the new status be?
        if (gameStatus !== 'active' || currentStatus === 'used') {
            return // if the number has been used, we dont want any actions
        }

        const newCandidateNums = currentStatus === 'available' ? candidateNums.concat(number) : candidateNums.filter((cn) => cn !== number) //concatinates the number into candidate numbers

        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums) //whilst the numbers DONT add up to stars, they are within "candidate nums"
        } else {
            // whilst the sum of candidate nums == stars
            const newAvailableNums = availableNums.filter((n) => !newCandidateNums.includes(n)) //Filtered version of available numbers by removing any candidate numbers which were used in correct answer
            setStars(utils.randomSumIn(newAvailableNums, props.selectedNumber))
            setAvailableNums(newAvailableNums)
            setCandidateNums([])
            //now we need to redraw stars from remaining possible stars... using our maths (DONE ABOVE)
        }
    }

    return (
        <motion.div className='game' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            {gameStatus !== 'active' ? (
                <PlayAgain gameStatus={gameStatus} startNewGame={props.startNewGame} score={score} />
            ) : (
                <>
                    <div className='help'>Select 1 or more numbers that add up to the number of stars displayed!</div>
                    <div className='main'>
                        <div className='left'>
                            <StarsDisplay stars={stars} key={availableNums}/>
                        </div>
                        <div className='right'>
                            {utils.range(1, props.selectedNumber).map((number) => (
                                <PlayNumber key={number} status={numberStatus(number)} number={number} onClick={onNumberClick} />
                            ))}
                        </div>
                    </div>
                </>
            )}
            {gameStatus === 'active' ? <div className='timer'>Time Remaining: {secondsLeft}</div> : <div></div>}
        </motion.div>
    )
}

export default StarMatch
