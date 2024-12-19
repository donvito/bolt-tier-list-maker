import React from 'react';
import { Trash2 } from 'lucide-react';
import { TierItem } from '../types/tier';
import { handleImageDrop } from '../utils/imageUpload';
import DraggableImage from './DraggableImage';

interface ItemPoolProps {
  items: TierItem[];
  onNewItem?: (item: TierItem) => void;
  onRemoveItem?: (id: string) => void;
  onClearAll?: () => void;
}

export default function ItemPool({ items, onNewItem, onRemoveItem, onClearAll }: ItemPoolProps) {
  const handlePoolDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event from bubbling up to global handler
    
    const results = await handleImageDrop(e.nativeEvent);
    if (results.length > 0 && onNewItem) {
      results.forEach(result => {
        const newItem: TierItem = {
          id: result.id,
          imageUrl: result.url,
          label: result.name,
        };
        onNewItem(newItem);
      });
    }
  };

  return (
    <div 
      className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 border-dashed min-h-[200px] relative"
      data-item-pool
      onDragOver={(e) => e.preventDefault()}
      onDrop={handlePoolDrop}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100">Available Items</h2>
        {items.length > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <DraggableImage
            key={item.id}
            item={item}
            onRemove={onRemoveItem}
            className="w-36 h-28 cursor-move"
          />
        ))}
        {items.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
            <p className="text-center">
              Drag and drop images here<br />
              to add them to your tier list
            </p>
          </div>
        )}
      </div>
    </div>
  );
}