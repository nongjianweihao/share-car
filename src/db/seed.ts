import { db } from './dexie';
import { defaultSettings, sampleCards, sampleCollections } from '../data/sampleCards';
import { CARD_STYLES } from '../lib/cardStyles';

/**
 * Seed the IndexedDB database with example content when empty.
 */
export async function seedDatabase() {
  const cardCount = await db.cards.count();
  if (cardCount > 0) {
    await seedStylesAsCards();
    return;
  }

  await db.transaction('rw', db.cards, db.collections, db.settings, async () => {
    await db.cards.bulkAdd(sampleCards);
    await db.collections.bulkAdd(sampleCollections);
    await db.settings.put(defaultSettings);
  });

  await seedStylesAsCards();
}

export async function seedStylesAsCards() {
  const now = Date.now();
  const styleIds = CARD_STYLES.map((style) => `style-${style.id}`);
  const existing = await db.cards.bulkGet(styleIds);

  const stylesToInsert = CARD_STYLES.filter((_, index) => !existing[index]);
  if (!stylesToInsert.length) {
    return;
  }

  await db.cards.bulkAdd(
    stylesToInsert.map((style) => ({
      id: `style-${style.id}`,
      title: `【风格】${style.name}`,
      contentMd: `**核心特征：** ${style.summary}

**最佳应用场景：** ${style.bestFor.join('、')}

**【调用指令】**  
${style.callPrompt}
`,
      column: '科学训练',
      tags: ['风格', '模板', '设计'],
      createdAt: now,
      updatedAt: now,
      style: style.id,
    })),
  );
}
