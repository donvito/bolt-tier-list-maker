import { useState } from 'react';
import { TierItem, TierRank, TierRow } from '../types/tier';
import { INITIAL_ITEMS, INITIAL_TIERS } from '../config/constants';

export function useTierList() {
  const [tiers, setTiers] = useState<TierRow[]>(INITIAL_TIERS);
  const [poolItems, setPoolItems] = useState<TierItem[]>(INITIAL_ITEMS);

  const isItemExists = (id: string): boolean => {
    // Check pool items
    if (poolItems.some(item => item.id === id)) {
      return true;
    }
    // Check tier items
    return tiers.some(tier => tier.items.some(item => item.id === id));
  };

  const clearPool = () => {
    setPoolItems([]);
  };
  
  const removeItemFromTier = (itemId: string) => {
    setTiers(prev => {
      // Find the item before removing it
      let foundItem: TierItem | undefined;
      for (const tier of prev) {
        foundItem = tier.items.find(i => i.id === itemId);
        if (foundItem) break;
      }
      
      // Remove item from tier
      const newTiers = prev.map(tier => ({
        ...tier,
        items: tier.items.filter(item => item.id !== itemId)
      }));
      
      // If item was found, add it to the pool
      if (foundItem) {
        setPoolItems(prev => {
          // Check if item already exists in pool
          if (prev.some(i => i.id === itemId)) {
            return prev;
          }
          return [...prev, foundItem!];
        });
      }
      
      return newTiers;
    });
  };

  const removeItemFromPool = (itemId: string) => {
    setPoolItems(prev => prev.filter(item => item.id !== itemId));
  };

  const addItemToPool = (item: TierItem) => {
    if (isItemExists(item.id)) {
      return;
    }
    setPoolItems(prev => [...prev, item]);
  };

  const moveItemToTier = (rank: TierRank, item: TierItem) => {
    // Remove from pool if it's there
    setPoolItems((prev) => prev.filter((i) => i.id !== item.id));

    // Remove from any existing tier
    setTiers((prev) => {
      return prev.map((tier) => ({
        ...tier,
        items: tier.items.filter((i) => i.id !== item.id),
      })).map((tier) => {
        if (tier.rank === rank) {
          return {
            ...tier,
            items: [...tier.items, item],
          };
        }
        return tier;
      });
    });
  };

  return {
    tiers,
    poolItems,
    removeItemFromPool,
    removeItemFromTier,
    addItemToPool,
    moveItemToTier,
    clearPool,
  };
}