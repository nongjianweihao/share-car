import { db } from './dexie';
import { defaultSettings, sampleCards, sampleCollections } from '../data/sampleCards';

/**
 * Seed the IndexedDB database with example content when empty.
 */
export async function seedDatabase() {
  const cardCount = await db.cards.count();
  if (cardCount > 0) {
    return;
  }

  await db.transaction('rw', db.cards, db.collections, db.settings, async () => {
    await db.cards.bulkAdd(sampleCards);
    await db.collections.bulkAdd(sampleCollections);
    await db.settings.put(defaultSettings);
  });
}
