// [path]: components/dashboard/KpiDial.tsx

'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface KpiDialProps {
  title: string;
  value: string;
  Icon: React.ElementType;
  colorClass: 'text-green-400' | 'text-yellow-400' | 'text-blue-400' | 'text-red-400';
  animationDelay: number;
}

const KpiDial = ({ title, value, Icon, colorClass, animationDelay }: KpiDialProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className="bg-gray-800 border border-white/10 p-6 rounded-lg shadow-soft flex flex-col justify-between"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-white">{title}</h3>
        <Icon className={`h-6 w-6 ${colorClass}`} />
      </div>
      <div>
        <p className={`text-5xl font-bold tracking-tighter ${colorClass}`}>{value}</p>
      </div>
    </motion.div>
  );
};

export default KpiDial;