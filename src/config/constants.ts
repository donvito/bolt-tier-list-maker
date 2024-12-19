import { TierItem, TierRank, TierRow, TIER_COLORS } from '../types/tier';

export const INITIAL_ITEMS: TierItem[] = [];

export const INITIAL_TIERS: TierRow[] = Object.entries(TIER_COLORS).map(([rank, color]) => ({
  rank: rank as TierRank,
  color,
  items: [],
}));