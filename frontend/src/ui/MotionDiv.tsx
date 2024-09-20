import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const popInVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
};

function MotionDiv({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="w-full max-w-sm"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={popInVariants}
    >
      {children}
    </motion.div>
  );
}

export default MotionDiv;
