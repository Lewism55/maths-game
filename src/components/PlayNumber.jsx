import { colors } from './Utils';

const PlayNumber = (props) => (
    <button className='number' style={{ backgroundColor: colors[props.status], cursor: props.status === 'used' && 'not-allowed'}} onClick={() => props.onClick(props.number, props.status)}>
        {props.number}
    </button>
)

export default PlayNumber
