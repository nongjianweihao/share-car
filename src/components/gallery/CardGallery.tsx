import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CardRenderer from '../common/CardRenderer';
import { Card } from '../../domain/card';
import {
    CardSortOrder,
    GalleryLayoutMode,
    GalleryTheme,
    cardStore,
    useCardStore,
} from '../../state/cardStore';

type SortOrder = CardSortOrder;

type LayoutMode = GalleryLayoutMode;

const layoutBatchSize: Record<LayoutMode, number> = {
    single: 6,
    bento: 12,
    compact: 30,
};

const sizeByLayout: Record<LayoutMode, 'sm' | 'md' | 'lg'> = {
    single: 'lg',
    bento: 'md',
    compact: 'sm',
};

const sortCards = (cards: Card[], order: SortOrder): Card[] => {
    const copy = [...cards];
    switch (order) {
        case 'title-asc':
            return copy.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'));
        case 'title-desc':
            return copy.sort((a, b) => b.title.localeCompare(a.title, 'zh-CN'));
        case 'updated-asc':
            return copy.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
        case 'updated-desc':
        default:
            return copy.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }
};

const CardGallery: React.FC = () => {
    const cards = useCardStore(store => store.filteredCards);
    const { sortOrder, layout, theme } = useCardStore(store => store.viewPreferences);
    const [visibleCount, setVisibleCount] = useState(layoutBatchSize[layout]);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const sortedCards = useMemo(() => sortCards(cards, sortOrder), [cards, sortOrder]);
    const limitedCards = useMemo(() => sortedCards.slice(0, visibleCount), [sortedCards, visibleCount]);

    const handleLoadMore = useCallback(() => {
        setVisibleCount(current => {
            if (current >= sortedCards.length) {
                return current;
            }
            const next = current + layoutBatchSize[layout];
            return Math.min(next, sortedCards.length);
        });
    }, [layout, sortedCards.length]);

    useEffect(() => {
        setVisibleCount(layoutBatchSize[layout]);
    }, [layout, cards.length]);

    useEffect(() => {
        if (!sentinelRef.current) {
            return;
        }

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    handleLoadMore();
                }
            });
        }, { rootMargin: '200px 0px' });

        observerRef.current.observe(sentinelRef.current);

        return () => observerRef.current?.disconnect();
    }, [handleLoadMore, limitedCards.length]);

    useEffect(() => () => observerRef.current?.disconnect(), []);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        cardStore.actions.setSortOrder(event.target.value as SortOrder);
    };

    const handleLayoutChange = (mode: LayoutMode) => {
        cardStore.actions.setLayoutMode(mode);
    };

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        cardStore.actions.setViewTheme(event.target.value as GalleryTheme);
    };

    const hasMore = visibleCount < sortedCards.length;
    const empty = sortedCards.length === 0;

    return (
        <section className="card-gallery">
            <header className="card-gallery__toolbar" aria-label="图库视图设置">
                <div className="card-gallery__toolbar-group">
                    <label className="card-gallery__label" htmlFor="card-gallery-sort">
                        排序
                    </label>
                    <select
                        id="card-gallery-sort"
                        className="card-gallery__select"
                        value={sortOrder}
                        onChange={handleSortChange}
                    >
                        <option value="updated-desc">最近更新</option>
                        <option value="updated-asc">最早更新</option>
                        <option value="title-asc">标题（A-Z）</option>
                        <option value="title-desc">标题（Z-A）</option>
                    </select>
                </div>
                <div className="card-gallery__toolbar-group" role="radiogroup" aria-label="布局模式">
                    <button
                        type="button"
                        className={`card-gallery__layout-btn ${layout === 'single' ? 'is-active' : ''}`}
                        onClick={() => handleLayoutChange('single')}
                        aria-pressed={layout === 'single'}
                    >
                        单列
                    </button>
                    <button
                        type="button"
                        className={`card-gallery__layout-btn ${layout === 'bento' ? 'is-active' : ''}`}
                        onClick={() => handleLayoutChange('bento')}
                        aria-pressed={layout === 'bento'}
                    >
                        Bento
                    </button>
                    <button
                        type="button"
                        className={`card-gallery__layout-btn ${layout === 'compact' ? 'is-active' : ''}`}
                        onClick={() => handleLayoutChange('compact')}
                        aria-pressed={layout === 'compact'}
                    >
                        紧凑
                    </button>
                </div>
                <div className="card-gallery__toolbar-group">
                    <label className="card-gallery__label" htmlFor="card-gallery-theme">
                        主题
                    </label>
                    <select
                        id="card-gallery-theme"
                        className="card-gallery__select"
                        value={theme}
                        onChange={handleThemeChange}
                    >
                        <option value="light">浅色</option>
                        <option value="dark">深色</option>
                        <option value="ocean">海洋</option>
                    </select>
                </div>
            </header>
            {empty ? (
                <p className="card-gallery__empty">没有符合条件的卡片，请调整筛选条件。</p>
            ) : (
                <div className={`card-gallery__viewport card-gallery__viewport--${layout}`} role="list">
                    {limitedCards.map(card => (
                        <CardRenderer
                            key={card.id}
                            card={card}
                            layout={layout}
                            size={sizeByLayout[layout]}
                            theme={theme}
                            accentColor={card.layout?.accentColor}
                        />
                    ))}
                </div>
            )}
            {hasMore && <div ref={sentinelRef} className="card-gallery__sentinel" aria-hidden="true" />}
        </section>
    );
};

export default CardGallery;
