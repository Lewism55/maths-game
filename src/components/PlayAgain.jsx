import { motion } from 'framer-motion'
import { colors } from './Utils'

const PlayAgain = (props) => (
    <div className='game-done'>
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
        <button className='restart-button' onClick={props.startNewGame}>
            Play Again
        </button>
    </div>
)

export default PlayAgain