export interface TradeItem {
  id: number;
  name: string;
  category: string;      // e.g., "bugs"
  subcategory?: string;   // e.g., "beetles"
  image: string;         // filename only, e.g., "beetle.png"
  status?: 'have' | 'want' | null;
  quantity?: number;
}

export type Plushie = TradeItem;
export type Sticker = TradeItem;
export type Artifact = TradeItem;

export interface TradeItemSet {
  id: number;
  category: string;
  name: string;
  members: number[];
  image: string;
}

export interface TradeItemColumn {
  type: 'set' | 'orphans';
  setName: string;
  cards: TradeItem[];
}