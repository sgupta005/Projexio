import { cn } from '@/utils/helper';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const popInVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
};

function MotionDiv({
  className,
  children,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn('w-full max-w-sm', className)}
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
