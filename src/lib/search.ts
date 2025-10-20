import MiniSearch from 'minisearch';
import type { Card } from '../types';

let miniSearch: MiniSearch<Card> | null = null;

export function buildSearchIndex(cards: Card[]) {
  miniSearch = new MiniSearch<Card>({
    fields: ['title', 'contentMd', 'tags', 'column'],
    storeFields: ['id', 'title', 'excerpt', 'column', 'tags'],
  });
  miniSearch.addAll(cards);
}

export function searchCards(query: string): string[] {
  if (!miniSearch || !query.trim()) {
    return [];
  }
  return miniSearch.search(query, { prefix: true, fuzzy: 0.2 }).map((result) => result.id);
}
