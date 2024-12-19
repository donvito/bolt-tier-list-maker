import React from 'react';
import { TierItem, TierRank } from '../types/tier';
import { handleImageDrop } from '../utils/imageUpload';
import DraggableImage from './DraggableImage';

interface TierRowProps {
  rank: TierRank;
  color: string;
  items: TierItem[];
  onRemoveItem?: (id: string) => void;
  onDrop: (rank: TierRank, item: TierItem) => void;
}

export default function TierRow({ rank, color, items, onDrop, onRemoveItem }: TierRowProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    
    // Try to get internal item data first
    const jsonData = e.dataTransfer.getData('application/json');
    if (jsonData) {
      try {
        const item = JSON.parse(jsonData);
        onDrop(rank, item);
        return;
      } catch (err) {
        console.error('Failed to parse drag data:', err);
      }
    }
    
    // If no internal item, try handling as external image
    const results = await handleImageDrop(e.nativeEvent);
    if (results.length > 0) {
      // Only use the first image when dropping directly into a tier
      const result = results[0];
      if (result) {
        const newItem: TierItem = {
          id: result.id,
          imageUrl: result.url,
          label: result.name,
        };
        onDrop(rank, newItem);
      }
    }
  };

  return (
    <div 
      className="flex items-center gap-2 py-4 px-2 border-b border-gray-700"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div 
        className="w-24 h-24 flex items-center justify-center text-3xl font-bold text-white rounded-lg"
        style={{ backgroundColor: color }}
      >
        {rank}
      </div>
      <div className="flex-1 min-h-[6rem] bg-gray-700/50 p-3 rounded-lg flex flex-wrap gap-2">
        {items.map((item) => (
          <DraggableImage
            key={item.id}
            item={item}
            onRemove={onRemoveItem}
            className="w-32 h-24"
          />
        ))}
      </div>
    </div>
  );
}