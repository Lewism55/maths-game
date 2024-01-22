import { motion } from 'framer-motion'

const scoreLevels = [
    { score: 1500, message: "Congratulations, you're a certified Star Game Wizard!" },
    { score: 1250, message: "Amazing!... Nearly Perfect. Keep trying!" },
    { score: 900, message: "Wow, an impressive score" },
    { score: 500, message: "You're getting good at this, if you're not on hard, try it now!" },
    { score: 250, message: "Nice work, you've mastered the basics. Keep going!" },
    { score: 100, message: "Good game, go faster or up the difficuly to improve your score" },
    { score: 0, message: "Well done, try adding more stars to get a better score"}
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
    </div>)
}

export default PlayAgain