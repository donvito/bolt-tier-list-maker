import React, { useState, useRef, useEffect } from 'react';
import { Trophy, PencilLine, HelpCircle } from 'lucide-react';
import { TierItem } from './types/tier';
import { handleImageDrop } from './utils/imageUpload';
import TierRow from './components/TierRow';
import ItemPool from './components/ItemPool';
import { useTierList } from './hooks/useTierList';

function App() {
  const { tiers, poolItems, addItemToPool, moveItemToTier, removeItemFromPool, removeItemFromTier, clearPool } = useTierList();
  const [title, setTitle] = useState('Tier List Maker');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.width = `${Math.max(title.length, 10)}ch`;
    }
  }, [title]);

  const handleGlobalDrop = async (e: React.DragEvent) => {
    // Check if drop target is within ItemPool
    const isItemPoolDrop = (e.target as Element)?.closest('[data-item-pool]');
    if (isItemPoolDrop) return;
    
    const results = await handleImageDrop(e.nativeEvent);
    if (results.length > 0) {
      results.forEach(result => {
        const newItem: TierItem = {
          id: result.id,
          imageUrl: result.url,
          label: result.name,
        };
        addItemToPool(newItem);
      });
    }
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
    setTimeout(() => {
      titleRef.current?.focus();
      titleRef.current?.select();
    }, 0);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      titleRef.current?.blur();
    }
  };

  return (
    <div 
      className="min-h-screen bg-gray-900 p-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleGlobalDrop}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-10 h-10 text-yellow-500 flex-shrink-0" />
          <div className="flex-1 flex flex-col">
            <div className="flex items-baseline gap-2">
              <div 
                className="relative group flex items-baseline gap-2 cursor-pointer" 
                onClick={handleTitleClick}
              >
                <input
                  ref={titleRef}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleTitleBlur}
                  onKeyDown={handleTitleKeyDown}
                  className={`text-4xl font-bold text-gray-100 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1 -ml-1 ${isEditingTitle ? 'ring-2 ring-indigo-500' : ''}`}
                  style={{ width: `${Math.max(title.length, 10)}ch` }}
                  readOnly={!isEditingTitle}
                />
                <div className="group-hover:opacity-100 opacity-0 transition-opacity">
                  <PencilLine className="w-5 h-5 text-gray-400 hover:text-gray-300 transition-colors" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <HelpCircle className="w-4 h-4 text-gray-400" />
              <p className="text-gray-400">
                Drag and drop images anywhere to add them
              </p>
            </div>
          </div>
        </div>

        <div 
          className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-4 border border-gray-700"
        >
          {tiers.map((tier) => (
            <TierRow
              key={tier.rank}
              rank={tier.rank}
              color={tier.color}
              items={tier.items}
              onDrop={moveItemToTier}
              onRemoveItem={removeItemFromTier}
            />
          ))}
        </div>

        <ItemPool 
          items={poolItems} 
          onNewItem={addItemToPool}
          onRemoveItem={removeItemFromPool}
          onClearAll={clearPool}
        />
      </div>
      <div className="fixed bottom-4 inset-x-4 flex justify-between items-center text-gray-500 text-sm">
        <div className="flex items-center gap-2">
          Made with ❤️ by{' '}
          <a 
            href="https://donvitocodes.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            DonvitoCodes
          </a>
          <span className="text-gray-600">•</span>
          <a 
            href="https://github.com/donvito" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            GitHub
          </a>
          <span className="text-gray-600">•</span>
          <a 
            href="https://x.com/donvito" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            𝕏
          </a>
        </div>
        <div>
          Tip: Images are stored locally and will be cleared when you refresh
        </div>
      </div>
    </div>
  );
}

export default App;
