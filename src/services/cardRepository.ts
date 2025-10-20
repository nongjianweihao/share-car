import { initialCards } from '../data/initialCards';
import {
    Card,
    CardDraft,
    ContentBlock,
    createCard,
    cloneCard,
    isCard,
} from '../domain/card';

export interface SearchCardsOptions {
    query?: string;
    tagIds?: string[];
    tagNames?: string[];
    sortBy?: 'createdAt' | 'updatedAt' | 'title';
    sortDirection?: 'asc' | 'desc';
    includeArchived?: boolean;
}

const STORAGE_KEY = 'share-car.cards';

const inMemoryStore: { cards: Card[] } = { cards: [] };

const getLocalStorage = (): Storage | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        return window.localStorage;
    } catch {
        return null;
    }
};

const readFromStorage = (): Card[] => {
    const storage = getLocalStorage();

    if (!storage) {
        return inMemoryStore.cards.map(cloneCard);
    }

    const raw = storage.getItem(STORAGE_KEY);

    if (!raw) {
        return [];
    }

    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.filter(isCard).map(cloneCard);
    } catch {
        return [];
    }
};

const persistToStorage = (cards: Card[]): void => {
    const serialized = JSON.stringify(cards);
    const storage = getLocalStorage();

    if (!storage) {
        inMemoryStore.cards = cards.map(cloneCard);
        return;
    }

    storage.setItem(STORAGE_KEY, serialized);
};

let hasSeeded = false;

const ensureSeedData = () => {
    if (hasSeeded) {
        return;
    }

    const existing = readFromStorage();

    if (existing.length === 0) {
        persistToStorage(initialCards.map(cloneCard));
    }

    hasSeeded = true;
};

const normalizeCards = (cards: Card[]): Card[] =>
    cards
        .map(cloneCard)
        .filter(card => !card.archived)
        .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0));

const matchesQuery = (card: Card, normalizedQuery: string): boolean => {
    if (!normalizedQuery) {
        return true;
    }

    const targetStrings: string[] = [
        card.title,
        card.summary ?? '',
        card.category ?? '',
        ...card.tags.map(tag => tag.name),
        ...card.blocks.flatMap(extractContentBlockText),
    ];

    return targetStrings.some(text => text.toLowerCase().includes(normalizedQuery));
};

const extractContentBlockText = (block: ContentBlock): string[] => {
    switch (block.type) {
        case 'text':
            return [block.text];
        case 'list':
            return block.items;
        case 'quote':
            return [block.quote, block.attribution ?? ''];
        case 'metric':
            return [
                block.label,
                block.description ?? '',
                block.unit ? `${block.value}${block.unit}` : String(block.value),
                block.target !== undefined ? `target:${block.target}` : '',
                block.trend ?? '',
            ];
        default:
            return [];
    }
};

const matchesTags = (card: Card, tagIds?: string[], tagNames?: string[]): boolean => {
    if ((!tagIds || tagIds.length === 0) && (!tagNames || tagNames.length === 0)) {
        return true;
    }

    const cardTagIds = card.tags.map(tag => tag.id);
    const cardTagNames = card.tags.map(tag => tag.name.toLowerCase());

    const tagIdsOk = !tagIds || tagIds.every(id => cardTagIds.includes(id));
    const tagNamesOk =
        !tagNames || tagNames.every(name => cardTagNames.includes(name.toLowerCase()));

    return tagIdsOk && tagNamesOk;
};

const sortCards = (cards: Card[], sortBy: SearchCardsOptions['sortBy'], direction: 'asc' | 'desc') => {
    const factor = direction === 'asc' ? 1 : -1;

    return [...cards].sort((a, b) => {
        switch (sortBy) {
            case 'title':
                return a.title.localeCompare(b.title) * factor;
            case 'createdAt':
                return (a.createdAt > b.createdAt ? 1 : -1) * factor;
            case 'updatedAt':
            default:
                return (a.updatedAt > b.updatedAt ? 1 : -1) * factor;
        }
    });
};

const generateOptimisticId = () => `card_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

const listCards = async (): Promise<Card[]> => {
    ensureSeedData();
    return normalizeCards(readFromStorage());
};

const create = async (draft: CardDraft): Promise<Card> => {
    ensureSeedData();
    const now = new Date().toISOString();
    const cards = readFromStorage();
    const card = createCard({
        ...draft,
        id: draft.id ?? generateOptimisticId(),
        createdAt: draft.createdAt ?? now,
        updatedAt: now,
    });

    cards.push(card);
    persistToStorage(cards);
    return cloneCard(card);
};

const update = async (card: Card): Promise<Card> => {
    ensureSeedData();
    const cards = readFromStorage();
    const index = cards.findIndex(existing => existing.id === card.id);

    if (index === -1) {
        throw new Error(`Card with id ${card.id} not found`);
    }

    const updated: Card = {
        ...card,
        updatedAt: new Date().toISOString(),
    };

    cards[index] = cloneCard(updated);
    persistToStorage(cards);
    return cloneCard(updated);
};

const remove = async (cardId: string): Promise<void> => {
    ensureSeedData();
    const cards = readFromStorage();
    const next = cards.filter(card => card.id !== cardId);
    persistToStorage(next);
};

const saveMany = async (cards: Card[]): Promise<Card[]> => {
    ensureSeedData();
    persistToStorage(cards.map(cloneCard));
    return listCards();
};

const search = async (
    options: SearchCardsOptions = {},
    sourceCards?: Card[],
): Promise<Card[]> => {
    ensureSeedData();
    const cards = sourceCards ? sourceCards.map(cloneCard) : readFromStorage();
    const normalizedQuery = (options.query ?? '').trim().toLowerCase();

    const filtered = cards.filter(card => {
        if (!options.includeArchived && card.archived) {
            return false;
        }

        return matchesQuery(card, normalizedQuery) && matchesTags(card, options.tagIds, options.tagNames);
    });

    const sortBy = options.sortBy ?? 'updatedAt';
    const direction = options.sortDirection ?? 'desc';
    return sortCards(filtered, sortBy, direction).map(cloneCard);
};

export const cardRepository = {
    listCards,
    createCard: create,
    updateCard: update,
    deleteCard: remove,
    saveMany,
    searchCards: search,
    generateOptimisticId,
    storageKey: STORAGE_KEY,
};

export type CardRepository = typeof cardRepository;
