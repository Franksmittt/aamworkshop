'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, MapPin, Music, Camera } from 'lucide-react';
import Card from '@/components/ui/Card';

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    age: number;
    location: string;
    bio: string;
    images: string[];
    interests: string[];
    culturalBadges: string[];
    vibe: {
      colors: string[];
      music?: string;
      mood: string;
    };
  };
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void;
}

const ProfileCard = ({ profile, onSwipe }: ProfileCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
    onSwipe?.(direction);
  };

  return (
    <motion.div
      className="card-3d w-80 h-96 mx-auto cursor-grab active:cursor-grabbing"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(event, info) => {
        const threshold = 100;
        if (Math.abs(info.offset.x) > threshold) {
          handleSwipe(info.offset.x > 0 ? 'right' : 'left');
        } else if (Math.abs(info.offset.y) > threshold) {
          handleSwipe(info.offset.y > 0 ? 'down' : 'up');
        }
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
            onClick={() => setIsFlipped(true)}
          >
            <Card variant="ember" className="h-full relative overflow-hidden">
              {/* Profile Image */}
              <div className="relative h-48 -m-6 mb-4">
                <div 
                  className="w-full h-full bg-gradient-to-br from-ochre/20 to-sunset/20 rounded-t-lg"
                  style={{
                    background: `linear-gradient(45deg, ${profile.vibe.colors.join(', ')})`
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-12 w-12 text-white/80" />
                </div>
                
                {/* Cultural Badges */}
                <div className="absolute top-2 right-2 flex gap-1">
                  {profile.culturalBadges.slice(0, 2).map((badge, index) => (
                    <span 
                      key={index}
                      className="bg-ochre/90 text-white text-xs px-2 py-1 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Profile Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-2xl font-bold text-dusk">
                    {profile.name}, {profile.age}
                  </h3>
                  <div className="flex items-center text-dusk/70 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                  </div>
                </div>

                <p className="text-dusk/80 text-sm line-clamp-3">
                  {profile.bio}
                </p>

                {/* Vibe Indicator */}
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-protea" />
                  <span className="text-sm text-protea font-medium">
                    {profile.vibe.mood}
                  </span>
                </div>
              </div>

              {/* Swipe Hint */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xs text-dusk/50"
                >
                  Tik vir meer
                </motion.div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: -180 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
            onClick={() => setIsFlipped(false)}
          >
            <Card variant="veld" className="h-full">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-dusk">Meer oor {profile.name}</h4>
                
                {/* Interests */}
                <div>
                  <h5 className="text-sm font-medium text-dusk/80 mb-2">Belangstellings</h5>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <span 
                        key={index}
                        className="bg-protea/20 text-protea text-xs px-2 py-1 rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cultural Badges */}
                <div>
                  <h5 className="text-sm font-medium text-dusk/80 mb-2">Kulturele Verbindings</h5>
                  <div className="flex flex-wrap gap-2">
                    {profile.culturalBadges.map((badge, index) => (
                      <span 
                        key={index}
                        className="bg-ochre/20 text-ochre text-xs px-2 py-1 rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Music Vibe */}
                {profile.vibe.music && (
                  <div>
                    <h5 className="text-sm font-medium text-dusk/80 mb-2">Huidige Vibe</h5>
                    <div className="flex items-center gap-2 bg-sky/20 p-2 rounded-lg">
                      <Music className="h-4 w-4 text-sky" />
                      <span className="text-sm text-sky">{profile.vibe.music}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSwipe('left');
                  }}
                  className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSwipe('right');
                  }}
                  className="w-12 h-12 bg-ochre rounded-full flex items-center justify-center protea-bloom"
                >
                  <Heart className="h-6 w-6 text-white" />
                </motion.button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfileCard;
