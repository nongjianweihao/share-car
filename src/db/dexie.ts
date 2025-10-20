import Dexie, { type Table } from 'dexie';
import type { AppSettings, Card, Collection } from '../types';

export class KnowledgeCardDB extends Dexie {
  cards!: Table<Card, string>;
  collections!: Table<Collection, string>;
  settings!: Table<AppSettings, number>;

  constructor() {
    super('knowledge_cards');
    this.version(1).stores({
      cards: 'id, title, column, updatedAt, *tags',
      collections: 'id, name, updatedAt',
      settings: '++id',
    });
  }
}

export const db = new KnowledgeCardDB();
