import { utils } from './Utils'
import { motion, AnimatePresence } from 'framer-motion'

const StarsDisplay = (props) => (
    <>
        <AnimatePresence>
            {utils.range(1, props.stars).map((starId) => (
                <motion.div
                    key={starId}
                    className='star'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
            ))}
        </AnimatePresence>
    </>
)

export default StarsDisplay
