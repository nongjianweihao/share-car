import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../db/dexie';
import { seedDatabase } from '../db/seed';
import type { Card, CardStyleId, ColumnId } from '../types';
import { buildSearchIndex } from '../lib/search';

interface CardState {
  cards: Card[];
  isLoading: boolean;
  activeCardId: string | null;
  searchQuery: string;
  columnFilter: ColumnId | '全部';
  init: () => Promise<void>;
  selectCard: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setColumnFilter: (column: ColumnId | '全部') => void;
  refreshCards: () => Promise<void>;
  updateCardStyle: (id: string, style?: CardStyleId) => Promise<void>;
}

export const useCardStore = create<CardState>()(
  persist(
    (set, get) => ({
      cards: [],
      isLoading: true,
      activeCardId: null,
      searchQuery: '',
      columnFilter: '全部',
      init: async () => {
        set({ isLoading: true });
        await seedDatabase();
        await get().refreshCards();
      },
      refreshCards: async () => {
        const cards = await db.cards.orderBy('updatedAt').reverse().toArray();
        buildSearchIndex(cards);
        set((state) => ({
          cards,
          isLoading: false,
          activeCardId: state.activeCardId ?? cards[0]?.id ?? null,
        }));
      },
      selectCard: (id: string) => set({ activeCardId: id }),
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setColumnFilter: (column: ColumnId | '全部') => set({ columnFilter: column }),
      updateCardStyle: async (id: string, style?: CardStyleId) => {
        const updatedAt = Date.now();
        await db.cards.update(id, { style, updatedAt });
        set((state) => {
          const cards = state.cards
            .map((card) => (card.id === id ? { ...card, style, updatedAt } : card))
            .sort((a, b) => b.updatedAt - a.updatedAt);
          buildSearchIndex(cards);
          return {
            cards,
          };
        });
      },
    }),
    {
      name: 'knowledge-card-ui',
      partialize: (state) => ({
        activeCardId: state.activeCardId,
        searchQuery: state.searchQuery,
        columnFilter: state.columnFilter,
      }),
    },
  ),
);
