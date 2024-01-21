const PlayAgain = (props) => (
    <div className='game-done'>
        <div className='message' style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}>
            {props.gameStatus === 'lost' ? 'Game Over' : 'You Win Well Done!'}
        </div>
        <div>Your Score was: {props.score}</div>
        <button className='restart-button' onClick={props.startNewGame}>
            Play Again
        </button>
    </div>
)

export default PlayAgain
