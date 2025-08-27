'use client';

import { useState, useEffect } from 'react';
import { getRecentMedia } from '@/lib/data-service';
import { Media } from '@/lib/types';
import Image from 'next/image';

const PhotoHighlights = () => {
  const [recentMedia, setRecentMedia] = useState<Media[]>([]);

  useEffect(() => {
    setRecentMedia(getRecentMedia(4)); // Get the latest 4 images
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-soft">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Photo Highlights</h3>
      {recentMedia.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {recentMedia.map(item => (
            <div key={item.id} className="relative aspect-square rounded-md overflow-hidden group">
              <Image
                src={item.url}
                alt={item.caption}
                fill
                sizes="200px"
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No recent photos uploaded.</p>
      )}
    </div>
  );
};

export default PhotoHighlights;