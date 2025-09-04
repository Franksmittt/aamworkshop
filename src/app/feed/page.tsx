'use client';

import React from 'react';
import NavigationShell from '@/components/joune/NavigationShell';
import DualLayerFeed from '@/components/joune/DualLayerFeed';

const mockSocialPosts = [
  {
    id: '1',
    author: {
      name: 'Annika van der Merwe',
      avatar: 'avatar1.jpg',
      location: 'Stellenbosch'
    },
    content: 'Net \'n amazing sunset hike op Jonkershoek voltooi! Die Kaapse berge is regtig ongelooflik. Wie wil saam gaan volgende keer? 🏔️',
    image: 'sunset_hike.jpg',
    timestamp: '2 uur gelede',
    likes: 24,
    comments: 8,
    type: 'moment' as const
  },
  {
    id: '2',
    author: {
      name: 'Pieter Botha',
      avatar: 'avatar2.jpg',
      location: 'Kaapstad'
    },
    content: 'Braai weather is hier! Wie\'s in vir \'n lekker braai by die strand hierdie naweek? Bring jou eie vleis en \'n goeie gesindheid! 🔥🥩',
    timestamp: '4 uur gelede',
    likes: 31,
    comments: 12,
    type: 'moment' as const
  },
  {
    id: '3',
    author: {
      name: 'Mariska Pretorius',
      avatar: 'avatar3.jpg',
      location: 'Pretoria'
    },
    content: 'Echo: Was by Koffie en Koek vanoggend - die beste cappuccino in Hatfield! Perfekte plek vir \'n eerste date ☕',
    timestamp: '6 uur gelede',
    likes: 18,
    comments: 5,
    type: 'echo' as const
  }
];

const mockDiscoverPosts = [
  {
    id: '4',
    author: {
      name: 'Lekker Spots',
      avatar: 'sponsor.jpg',
      location: 'Kaapstad'
    },
    content: 'Nuwe craft beer tasting by Woodstock Brewery! Kom proe ons nuutste IPA en ontmoet ander bier-liefhebbers. Kaartjies beskikbaar online.',
    image: 'brewery.jpg',
    timestamp: 'Geborg',
    likes: 45,
    comments: 15,
    type: 'moment' as const
  },
  {
    id: '5',
    author: {
      name: 'Johan Kruger',
      avatar: 'avatar4.jpg',
      location: 'Durban'
    },
    content: 'Story Quest voltooi! Net die Afrikaanse kultuur trivia gekompleet en \'n gratis koffie by Vida e Caffè gewen. Wie anders is lief vir ons heritage? 🇿🇦',
    timestamp: '1 dag gelede',
    likes: 67,
    comments: 23,
    type: 'story' as const
  },
  {
    id: '6',
    author: {
      name: 'Sarie Marais',
      avatar: 'avatar5.jpg',
      location: 'Bloemfontein'
    },
    content: 'Echo: Hierdie restaurant in Naval Hill het die beste boerewors rolls! Perfect vir \'n casual lunch date. Dankie vir die recommendation, Joune! 🌭',
    timestamp: '2 dae gelede',
    likes: 29,
    comments: 11,
    type: 'echo' as const
  }
];

export default function FeedPage() {
  return (
    <NavigationShell currentPath="/feed">
      <DualLayerFeed 
        socialPosts={mockSocialPosts}
        discoverPosts={mockDiscoverPosts}
      />
    </NavigationShell>
  );
}
