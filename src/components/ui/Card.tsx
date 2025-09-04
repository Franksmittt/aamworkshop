'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ember' | 'veld';
}

const Card = ({ children, className = '', hover = true, padding = 'md', variant = 'default' }: CardProps) => {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const variants = {
    default: 'bg-white border border-gray-200',
    ember: 'bg-gradient-to-br from-beige to-white border border-ochre/20 campfire-glow',
    veld: 'bg-gradient-to-br from-beige/50 to-white border border-protea/20 bg-veld-pattern'
  };
  
  const baseClasses = `rounded-lg shadow-soft ${variants[variant]} ${paddings[padding]} ${className}`;
  
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className={`${baseClasses} hover:shadow-medium transition-shadow duration-300`}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
};

export default Card;
