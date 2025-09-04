'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Compass, Heart, MessageCircle, Share } from 'lucide-react';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';

interface FeedPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    location: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  type: 'moment' | 'echo' | 'story';
}

interface DualLayerFeedProps {
  socialPosts: FeedPost[];
  discoverPosts: FeedPost[];
}

const DualLayerFeed = ({ socialPosts, discoverPosts }: DualLayerFeedProps) => {
  const [activeLayer, setActiveLayer] = useState<'social' | 'discover'>('social');

  const layerVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const switchLayer = (layer: 'social' | 'discover') => {
    if (layer !== activeLayer) {
      setActiveLayer(layer);
    }
  };

  const renderPost = (post: FeedPost) => (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card variant="default" className="mb-4">
        {/* Post Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-ochre to-sunset rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {post.author.name.charAt(0)}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-dusk">{post.author.name}</h4>
            <p className="text-sm text-dusk/60">{post.author.location} • {post.timestamp}</p>
          </div>
          {post.type === 'echo' && (
            <span className="ml-auto bg-sky/20 text-sky text-xs px-2 py-1 rounded-full">
              Echo
            </span>
          )}
        </div>

        {/* Post Content */}
        <div className="mb-3">
          <p className="text-dusk/80 mb-3">{post.content}</p>
          {post.image && (
            <div className="w-full h-48 bg-gradient-to-br from-beige to-sky/20 rounded-lg flex items-center justify-center">
              <span className="text-dusk/50">📸 Foto</span>
            </div>
          )}
        </div>

        {/* Post Actions */}
        <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-dusk/60 hover:text-ochre transition-colors"
          >
            <Heart className="h-4 w-4" />
            <span className="text-sm">{post.likes}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-dusk/60 hover:text-protea transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">{post.comments}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-dusk/60 hover:text-sky transition-colors"
          >
            <Share className="h-4 w-4" />
            <span className="text-sm">Deel</span>
          </motion.button>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <Container className="py-8">
      {/* Layer Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-1 shadow-medium">
          <div className="flex">
            <motion.button
              onClick={() => switchLayer('social')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                activeLayer === 'social'
                  ? 'bg-ochre text-white shadow-lg'
                  : 'text-dusk/60 hover:text-dusk'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="h-4 w-4" />
              <span className="font-medium">Jou Kuier</span>
            </motion.button>
            
            <motion.button
              onClick={() => switchLayer('discover')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                activeLayer === 'discover'
                  ? 'bg-protea text-white shadow-lg'
                  : 'text-dusk/60 hover:text-dusk'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Compass className="h-4 w-4" />
              <span className="font-medium">Die Veld</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Feed Content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={activeLayer === 'discover' ? 1 : -1}>
          <motion.div
            key={activeLayer}
            custom={activeLayer === 'discover' ? 1 : -1}
            variants={layerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full"
          >
            {activeLayer === 'social' ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-dusk mb-6">Jou Kuier</h2>
                {socialPosts.map(renderPost)}
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-dusk mb-6">Ontdek die Veld</h2>
                {discoverPosts.map(renderPost)}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
};

export default DualLayerFeed;
