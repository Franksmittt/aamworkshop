'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MoodSignal {
  id: string;
  emoji: string;
  label: string;
  color: string;
}

interface MoodSignalsProps {
  onMoodSelect: (mood: MoodSignal) => void;
  selectedMood?: string;
}

const moodSignals: MoodSignal[] = [
  { id: 'lekker', emoji: '🔥', label: 'Lekker', color: 'from-sunset to-ember' },
  { id: 'braai', emoji: '🥩', label: 'Braai', color: 'from-ochre to-sunset' },
  { id: 'cheers', emoji: '🍻', label: 'Cheers', color: 'from-sky to-protea' },
  { id: 'bokmakirie', emoji: '🎵', label: 'Bokmakirie', color: 'from-protea to-sky' },
  { id: 'biltong', emoji: '🥓', label: 'Biltong', color: 'from-ochre to-dusk' },
  { id: 'rugby', emoji: '🏉', label: 'Rugby', color: 'from-protea to-ochre' }
];

const MoodSignals = ({ onMoodSelect, selectedMood }: MoodSignalsProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {moodSignals.map((mood) => (
        <motion.button
          key={mood.id}
          onClick={() => onMoodSelect(mood)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`
            relative flex flex-col items-center gap-2 p-4 rounded-2xl
            bg-gradient-to-br ${mood.color} text-white shadow-lg
            ${selectedMood === mood.id ? 'ring-4 ring-white ring-opacity-50' : ''}
            transition-all duration-300
          `}
        >
          <motion.div
            animate={selectedMood === mood.id ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="text-2xl"
          >
            {mood.emoji}
          </motion.div>
          <span className="text-sm font-medium">{mood.label}</span>
          
          {selectedMood === mood.id && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center"
            >
              <span className="text-xs">✓</span>
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default MoodSignals;
