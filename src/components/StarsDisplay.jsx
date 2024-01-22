import { utils } from './Utils'
import { motion, AnimatePresence } from 'framer-motion'

const StarsDisplay = (props) => (
    <>
        <AnimatePresence>
            {utils.range(1, props.stars).map((starId) => (
                <motion.div
                    key={starId}
                    className='star'
                    initial={{ opacity: 0, rotate: 360 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            ))}
        </AnimatePresence>
    </>
)

export default StarsDisplay
