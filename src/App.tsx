import React, { useEffect, useMemo, useState } from 'react';
import CardGallery from './components/gallery/CardGallery';
import CardWorkspace from './components/workspace/CardWorkspace';
import { Card } from './domain/card';
import { cardStore, useCardStore } from './state/cardStore';
import AppShell from './AppShell';

interface CategoryEntry {
    name: string;
    totalCards: Card[];
    visibleCards: Card[];
}

type MainView = 'workspace' | 'gallery';

const fallbackCategory = '未分类';

const getCategoryName = (card: Card) =>
    card.category ?? card.tags.find(tag => tag.kind === 'category')?.name ?? fallbackCategory;

const buildCategoryEntries = (cards: Card[], filteredCards: Card[]): CategoryEntry[] => {
    const map = new Map<string, CategoryEntry>();

    cards.forEach(card => {
        const name = getCategoryName(card);
        if (!map.has(name)) {
            map.set(name, { name, totalCards: [], visibleCards: [] });
        }
        map.get(name)!.totalCards.push(card);
    });

    filteredCards.forEach(card => {
        const name = getCategoryName(card);
        if (!map.has(name)) {
            map.set(name, { name, totalCards: [], visibleCards: [] });
        }
        map.get(name)!.visibleCards.push(card);
    });

    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
};

const App: React.FC = () => {
    const cards = useCardStore(store => store.cards);
    const filteredCards = useCardStore(store => store.filteredCards);
    const selectedCardId = useCardStore(store => store.selectedCardId);
    const searchQuery = useCardStore(store => store.searchQuery);
    const loading = useCardStore(store => store.loading);
    const error = useCardStore(store => store.error);
    const theme = useCardStore(store => store.viewPreferences.theme);

    const categories = useMemo(() => buildCategoryEntries(cards, filteredCards), [cards, filteredCards]);
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
    const [view, setView] = useState<MainView>('workspace');

    useEffect(() => {
        void cardStore.actions.initialize();
        return cardStore.actions.listenToExternalChanges();
    }, []);

    useEffect(() => {
        if (typeof document === 'undefined') {
            return;
        }
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        setExpandedCategories(prev => {
            const next: Record<string, boolean> = {};
            categories.forEach(entry => {
                next[entry.name] = prev[entry.name] ?? true;
            });
            return next;
        });
    }, [categories]);

    useEffect(() => {
        if (!searchQuery) {
            return;
        }

        setExpandedCategories(prev => {
            const next = { ...prev };
            categories.forEach(entry => {
                if (entry.visibleCards.length > 0) {
                    next[entry.name] = true;
                }
            });
            return next;
        });
    }, [categories, searchQuery]);

    const visibleEntries = useMemo(() => {
        const trimmed = searchQuery.trim();
        if (!trimmed) {
            return categories;
        }
        return categories.filter(entry => entry.visibleCards.length > 0);
    }, [categories, searchQuery]);

    const activeCard = useMemo(() => {
        if (!selectedCardId) {
            return filteredCards[0];
        }

        return cards.find(card => card.id === selectedCardId) ?? filteredCards[0];
    }, [cards, filteredCards, selectedCardId]);

    const hasResults = filteredCards.length > 0;

    const toggleCategory = (name: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    const handleSearchChange = (value: string) => {
        void cardStore.actions.setSearchQuery(value);
    };

    const sidebar = (
        <>
            <h2 className="sidebar-title">分享卡片</h2>
            <div className="sidebar-view-toggle" role="tablist" aria-label="主视图切换">
                <button
                    type="button"
                    className={`sidebar-view-toggle-btn ${view === 'workspace' ? 'active' : ''}`}
                    onClick={() => setView('workspace')}
                    role="tab"
                    aria-selected={view === 'workspace'}
                >
                    工作台
                </button>
                <button
                    type="button"
                    className={`sidebar-view-toggle-btn ${view === 'gallery' ? 'active' : ''}`}
                    onClick={() => setView('gallery')}
                    role="tab"
                    aria-selected={view === 'gallery'}
                >
                    图库
                </button>
            </div>
            <div className="sidebar-search" role="search">
                <span className="sidebar-search-icon" aria-hidden="true" />
                <input
                    type="search"
                    className="sidebar-search-input"
                    placeholder="搜索卡片或分类..."
                    value={searchQuery}
                    onChange={event => handleSearchChange(event.target.value)}
                />
                {searchQuery && (
                    <button
                        type="button"
                        className="sidebar-search-clear"
                        aria-label="清除搜索"
                        onClick={() => handleSearchChange('')}
                    >
                        ×
                    </button>
                )}
            </div>
            <nav className="sidebar-nav">
                {loading && <p className="sidebar-empty">正在加载卡片...</p>}
                {!loading && error && <p className="sidebar-empty">{error}</p>}
                {!loading && !error && (
                    <>
                        {hasResults ? (
                            visibleEntries.map(entry => {
                                const isExpanded = expandedCategories[entry.name];
                                const visibleCount = entry.visibleCards.length;
                                const totalCount = entry.totalCards.length;
                                const countLabel =
                                    visibleCount === totalCount || searchQuery.trim()
                                        ? `${visibleCount}`
                                        : `${visibleCount}/${totalCount}`;

                                return (
                                    <section key={entry.name} className="sidebar-category">
                                        <button
                                            type="button"
                                            className="sidebar-category-header"
                                            onClick={() => toggleCategory(entry.name)}
                                            aria-expanded={isExpanded}
                                        >
                                            <span className="sidebar-category-name">{entry.name}</span>
                                            <span className="sidebar-category-meta">
                                                <span
                                                    className="sidebar-category-count"
                                                    aria-label={`共 ${totalCount} 张卡片`}
                                                >
                                                    {countLabel}
                                                </span>
                                                <span
                                                    className={`sidebar-category-chevron ${isExpanded ? 'open' : ''}`}
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </button>
                                        {isExpanded && (
                                            <div className="sidebar-category-items">
                                                {(searchQuery.trim() ? entry.visibleCards : entry.totalCards).map(card => (
                                                    <button
                                                        key={card.id}
                                                        className={`sidebar-nav-item ${
                                                            activeCard?.id === card.id ? 'active' : ''
                                                        }`}
                                                        onClick={() => cardStore.actions.selectCard(card.id)}
                                                    >
                                                        {card.title}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </section>
                                );
                            })
                        ) : (
                            <p className="sidebar-empty">未找到匹配的卡片，请尝试其他关键词。</p>
                        )}
                    </>
                )}
            </nav>
        </>
    );

    return (
        <AppShell sidebar={sidebar}>
            {view === 'workspace' ? <CardWorkspace /> : <CardGallery />}
        </AppShell>
    );
};

export default App;
