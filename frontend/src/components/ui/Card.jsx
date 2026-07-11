import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const Card = ({ className, children, hoverEffect = false, ...props }) => {
  const Component = hoverEffect ? motion.div : 'div';
  const motionProps = hoverEffect ? {
    whileHover: { y: -5, transition: { duration: 0.2 } }
  } : {};

  return (
    <Component
      className={cn("glass-card", className)}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
};
