import { motion } from 'framer-motion'
import { colors } from './Utils'

const scoreLevels = [
    { score: 600, message: "Congratulations, you're a certified Star Game Wizard!" },
    { score: 500, message: "Amazing!... Nearly Perfect. Keep trying!" },
    { score: 400, message: "Wow, impressive score" },
    { score: 300, message: "You're getting good at this" },
    { score: 200, message: "Nice work, keep trying to get a better score" },
    { score: 100, message: "Good game, go faster to improve your score" },
    { score: 0, message: "Well done, try a harder difficulty to get a better score"}
  ];

const PlayAgain = (props) => {
    const scoreMessage = scoreLevels.find(level => props.score >= level.score).message;

    return (<div className='game-done'>
        <div
            className='message'
            style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}
        >
            {props.gameStatus === 'lost' ? (
                <motion.div 
                    initial={{ x: -5 }} 
                    animate={{ x: 5 }} 
                    transition={{ duration: 0.1, repeat: Infinity, repeatType: "reverse" }}
                >
                    Time up! You Lose, Try Again!
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ scale: 0.9 }} 
                    animate={{ scale: 1.3 }} 
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                >
                    You Win Well Done!
                </motion.div>
            )}
        </div>
        <div>Your Score was: {props.score}</div>
        <h3>{scoreMessage}</h3>
        <button className='restart-button' onClick={props.startNewGame}>
            Play Again
        </button>
    </div>)
}

export default PlayAgain