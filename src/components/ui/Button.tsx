'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  onClick, 
  className = '',
  disabled = false 
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-ochre text-white hover:bg-ochre/90 focus:ring-ochre shadow-lg hover:shadow-xl',
    secondary: 'bg-protea text-white hover:bg-protea/90 focus:ring-protea shadow-lg hover:shadow-xl',
    outline: 'border-2 border-ochre text-ochre hover:bg-ochre hover:text-white focus:ring-ochre'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  const MotionComponent = href ? motion.a : motion.button;
  
  return (
    <MotionComponent
      href={href}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={classes}
      disabled={disabled}
    >
      {children}
    </MotionComponent>
  );
};

export default Button;
