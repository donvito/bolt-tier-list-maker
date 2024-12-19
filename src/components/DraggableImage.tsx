import React from 'react';
import { TierItem } from '../types/tier';

interface DraggableImageProps {
  item: TierItem;
  className?: string;
  onRemove?: (id: string) => void;
}

export default function DraggableImage({ item, className = '', onRemove }: DraggableImageProps) {
  return (
    <div
      className={`relative group hover:scale-105 transition-transform ${className}`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('application/json', JSON.stringify(item));
      }}
    >
      <img
        src={item.imageUrl}
        alt={item.label}
        crossOrigin="anonymous"
        className="w-full h-full object-contain bg-gray-900 rounded-md"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-opacity rounded-md flex flex-col items-center justify-center">
        <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity text-center p-2">
          {item.label}
        </span>
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded mt-1"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}