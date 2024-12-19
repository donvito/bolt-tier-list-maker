export type TierRank = 'S' | 'A' | 'B' | 'C' | 'D' | 'F';

export interface TierItem {
  id: string;
  imageUrl: string;
  label: string;
}

export interface TierRow {
  rank: TierRank;
  color: string;
  items: TierItem[];
}

export const TIER_COLORS: Record<TierRank, string> = {
  S: 'rgb(255, 64, 64)',
  A: 'rgb(255, 128, 64)',
  B: 'rgb(255, 191, 64)',
  C: 'rgb(255, 255, 64)',
  D: 'rgb(191, 255, 64)',
  F: 'rgb(128, 255, 64)',
};