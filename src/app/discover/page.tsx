'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavigationShell from '@/components/joune/NavigationShell';
import ProfileCard from '@/components/joune/ProfileCard';
import MoodSignals from '@/components/joune/MoodSignals';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Shuffle, Filter, MapPin } from 'lucide-react';

const mockProfiles = [
  {
    id: '1',
    name: 'Annika',
    age: 26,
    location: 'Stellenbosch, Wes-Kaap',
    bio: 'Liefde vir die berge, goeie wyn, en braai met vriende. Soek iemand wat my passie vir avonture deel.',
    images: ['profile1.jpg'],
    interests: ['Hiking', 'Wyn proe', 'Braai', 'Rugby'],
    culturalBadges: ['Stellenbosch Alumni', 'Bokke Supporter'],
    vibe: {
      colors: ['#D2691E', '#228B22', '#87CEEB'],
      music: 'Fokofpolisiekar - Hemel op die Platteland',
      mood: 'Avontuurlustig'
    }
  },
  {
    id: '2',
    name: 'Pieter',
    age: 29,
    location: 'Kaapstad, Wes-Kaap',
    bio: 'Entrepreneur met \'n passie vir tegnologie en die see. Altyd op soek na die volgende groot ding.',
    images: ['profile2.jpg'],
    interests: ['Surfing', 'Tech', 'Koffie', 'Fotografie'],
    culturalBadges: ['UCT Alumni', 'Startup Founder'],
    vibe: {
      colors: ['#FF4500', '#87CEEB', '#228B22'],
      music: 'Jeremy Loops - Down South',
      mood: 'Kreatief'
    }
  },
  {
    id: '3',
    name: 'Mariska',
    age: 24,
    location: 'Pretoria, Gauteng',
    bio: 'Dokter in opleiding wat graag dans en lees. Soek iemand met \'n goeie sin vir humor.',
    images: ['profile3.jpg'],
    interests: ['Dans', 'Lees', 'Mediese navorsing', 'Yoga'],
    culturalBadges: ['UP Student', 'Medical Professional'],
    vibe: {
      colors: ['#228B22', '#D2691E', '#FF7518'],
      music: 'Snotkop - Parapapa',
      mood: 'Intellektueel'
    }
  }
];

export default function DiscoverPage() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [selectedMood, setSelectedMood] = useState<string>();

  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
    console.log(`Swiped ${direction} on profile ${mockProfiles[currentProfileIndex].name}`);
    
    if (direction === 'right') {
      console.log('Liked!');
    } else if (direction === 'left') {
      console.log('Passed');
    }
    
    setCurrentProfileIndex((prev) => (prev + 1) % mockProfiles.length);
  };

  const currentProfile = mockProfiles[currentProfileIndex];

  return (
    <NavigationShell currentPath="/discover">
      <Container className="py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-dusk mb-4">
            Ontdek die <span className="text-ochre">Veld</span>
          </h1>
          <p className="text-dusk/70 max-w-2xl mx-auto">
            Verken nuwe verbindings in jou area. Swipe reg vir lekker, links om aan te beweeg.
          </p>
        </motion.div>

        {/* Mood Selector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-dusk text-center mb-4">
            Wat is jou vibe vandag?
          </h3>
          <MoodSignals 
            onMoodSelect={(mood) => setSelectedMood(mood.id)}
            selectedMood={selectedMood}
          />
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <ProfileCard 
            profile={currentProfile}
            onSwipe={handleSwipe}
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4 mb-8"
        >
          <Button
            variant="outline"
            onClick={() => setCurrentProfileIndex((prev) => (prev + 1) % mockProfiles.length)}
            className="border-protea text-protea hover:bg-protea hover:text-white"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Volgende
          </Button>
          
          <Button
            variant="secondary"
            className="bg-sky text-white hover:bg-sky/90"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          
          <Button
            variant="outline"
            className="border-sunset text-sunset hover:bg-sunset hover:text-white"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Naby my
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-dusk/60"
        >
          <p>
            {mockProfiles.length - currentProfileIndex - 1} meer profile in jou area
          </p>
        </motion.div>
      </Container>
    </NavigationShell>
  );
}
