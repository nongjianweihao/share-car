import { useSyncExternalStore } from 'react';
import { Card } from '../domain/card';
import { cardRepository } from '../services/cardRepository';

export type CardSortOrder = 'updated-desc' | 'updated-asc' | 'title-asc' | 'title-desc';
export type GalleryLayoutMode = 'single' | 'bento' | 'compact';
export type GalleryTheme = 'light' | 'dark' | 'ocean';

export interface ViewPreferences {
    sortOrder: CardSortOrder;
    layout: GalleryLayoutMode;
    theme: GalleryTheme;
}

export interface CardStoreState {
    cards: Card[];
    filteredCards: Card[];
    selectedCardId?: string;
    searchQuery: string;
    tagFilters: string[];
    loading: boolean;
    error?: string;
    viewPreferences: ViewPreferences;
}

const listeners = new Set<() => void>();

let state: CardStoreState = {
    cards: [],
    filteredCards: [],
    selectedCardId: undefined,
    searchQuery: '',
    tagFilters: [],
    loading: false,
    error: undefined,
    viewPreferences: {
        sortOrder: 'updated-desc',
        layout: 'bento',
        theme: 'light',
    },
};

const notify = () => {
    listeners.forEach(listener => listener());
};

const setState = (
    update: Partial<CardStoreState> | ((prev: CardStoreState) => Partial<CardStoreState>),
) => {
    const partial = typeof update === 'function' ? update(state) : update;
    state = { ...state, ...partial };
    notify();
};

const getState = () => state;

const resolveSelectedCardId = (candidates: Card[], currentId?: string) => {
    if (currentId && candidates.some(card => card.id === currentId)) {
        return currentId;
    }

    return candidates[0]?.id;
};

const loadCards = async () => {
    setState({ loading: true, error: undefined });

    try {
        const cards = await cardRepository.listCards();
        const { searchQuery, tagFilters, selectedCardId } = getState();
        const filtered = await cardRepository.searchCards(
            { query: searchQuery, tagIds: tagFilters },
            cards,
        );
        setState({
            cards,
            filteredCards: filtered,
            selectedCardId: resolveSelectedCardId(filtered, selectedCardId),
            loading: false,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : '无法加载卡片';
        setState({
            loading: false,
            error: message,
        });
        throw error;
    }
};

const arraysEqual = (left: string[], right: string[]) => {
    if (left.length !== right.length) {
        return false;
    }

    return left.every((value, index) => value === right[index]);
};

const applyFilters = async (overrides?: { query?: string; tagFilters?: string[] }) => {
    const snapshot = getState();
    const query = overrides?.query ?? snapshot.searchQuery;
    const tagFilters = overrides?.tagFilters ?? snapshot.tagFilters;
    const filtered = await cardRepository.searchCards(
        { query, tagIds: tagFilters },
        snapshot.cards,
    );

    const current = getState();
    if (current.searchQuery !== query || !arraysEqual(current.tagFilters, tagFilters)) {
        // 状态在等待过程中发生变化，放弃当前结果。
        return;
    }

    setState(prev => ({
        filteredCards: filtered,
        selectedCardId: resolveSelectedCardId(filtered, prev.selectedCardId),
    }));
};

const actions = {
    initialize: async () => {
        if (getState().cards.length > 0) {
            return;
        }

        await loadCards();
    },
    refresh: async () => {
        await loadCards();
    },
    selectCard: (cardId: string | undefined) => {
        setState({ selectedCardId: cardId });
    },
    setSearchQuery: async (query: string) => {
        const normalized = query;
        setState({ searchQuery: normalized });
        await applyFilters({ query: normalized });
    },
    setTagFilters: async (tagIds: string[]) => {
        const copy = [...tagIds];
        setState({ tagFilters: copy });
        await applyFilters({ tagFilters: copy });
    },
    createCard: async (card: Card) => {
        await cardRepository.createCard(card);
        await loadCards();
    },
    updateCard: async (card: Card) => {
        await cardRepository.updateCard(card);
        await loadCards();
    },
    deleteCard: async (cardId: string) => {
        await cardRepository.deleteCard(cardId);
        await loadCards();
    },
    saveMany: async (cards: Card[]) => {
        await cardRepository.saveMany(cards);
        await loadCards();
    },
    setSortOrder: (sortOrder: CardSortOrder) => {
        setState(prev => ({
            viewPreferences: { ...prev.viewPreferences, sortOrder },
        }));
    },
    setLayoutMode: (layout: GalleryLayoutMode) => {
        setState(prev => ({
            viewPreferences: { ...prev.viewPreferences, layout },
        }));
    },
    setViewTheme: (theme: GalleryTheme) => {
        setState(prev => ({
            viewPreferences: { ...prev.viewPreferences, theme },
        }));
    },
    listenToExternalChanges: () => {
        if (typeof window === 'undefined') {
            return () => {};
        }

        const handler = (event: StorageEvent) => {
            if (event.key === cardRepository.storageKey) {
                void actions.refresh();
            }
        };

        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    },
};

export const cardStore = {
    getState,
    subscribe: (listener: () => void) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },
    actions,
};

export const useCardStore = <T,>(selector: (state: CardStoreState) => T): T =>
    useSyncExternalStore(
        cardStore.subscribe,
        () => selector(cardStore.getState()),
        () => selector(cardStore.getState()),
    );
