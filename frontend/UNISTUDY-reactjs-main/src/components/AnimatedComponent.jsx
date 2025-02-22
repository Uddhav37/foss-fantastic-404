import React from 'react';
import { motion } from 'framer-motion';

const AnimatedComponent = ({ direction = 'left', children }) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : '0%',
      y: direction === 'top' ? '-100%' : direction === 'bottom' ? '100%' : '0%',
    },
    visible: {
      opacity: 1,
      x: '0%',
      y: '0%',
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponent;
