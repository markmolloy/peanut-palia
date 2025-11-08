export interface Plushie {
  id: number;
  name: string;
  category: string;      // e.g., "bugs"
  subcategory?: string;   // e.g., "beetles"
  image: string;         // filename only, e.g., "beetle.png"
  status?: 'have' | 'want' | null;
  quantity?: number;
}

export interface PlushieSet {
  id: number;
  category: string;
  name: string;
  members: number[];
}

export interface PlushieColumn {
  type: 'set' | 'orphans';
  setName: string;
  cards: Plushie[];
}