import { useEffect, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import CardGrid from './components/CardGrid';
import CardDetail from './components/CardDetail';
import { useCardStore } from './store/cardStore';
import { searchCards } from './lib/search';
import type { Card } from './types';
import './styles.css';

const SHARE_BASE_URL = 'https://example.com/shares/';

const App = () => {
  const init = useCardStore((state) => state.init);
  const cards = useCardStore((state) => state.cards);
  const isLoading = useCardStore((state) => state.isLoading);
  const activeCardId = useCardStore((state) => state.activeCardId);
  const selectCard = useCardStore((state) => state.selectCard);
  const searchQuery = useCardStore((state) => state.searchQuery);
  const setSearchQuery = useCardStore((state) => state.setSearchQuery);
  const columnFilter = useCardStore((state) => state.columnFilter);
  const setColumnFilter = useCardStore((state) => state.setColumnFilter);

  useEffect(() => {
    void init();
  }, [init]);

  const filteredCards = useMemo(() => {
    if (!cards.length) {
      return [] as Card[];
    }

    let list = cards;
    if (columnFilter !== '全部') {
      list = list.filter((card) => card.column === columnFilter);
    }

    if (searchQuery.trim()) {
      const ids = new Set(searchCards(searchQuery));
      list = list.filter((card) => ids.has(card.id));
    }

    return list;
  }, [cards, columnFilter, searchQuery]);

  const activeCard = useMemo(() => {
    if (!activeCardId) {
      return null;
    }
    return cards.find((card) => card.id === activeCardId) ?? null;
  }, [cards, activeCardId]);

  return (
    <div className="layout">
      <Sidebar
        cards={cards}
        activeCardId={activeCardId}
        onSelectCard={selectCard}
        columnFilter={columnFilter}
        onColumnChange={setColumnFilter}
      />
      <main className="content">
        <div className="content-header">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <p className="content-hint">
            {isLoading
              ? '正在加载知识卡片...'
              : `共 ${filteredCards.length} 张卡片 · ${columnFilter === '全部' ? '全部栏目' : columnFilter}`}
          </p>
        </div>
        <div className="content-body">
          <CardGrid cards={filteredCards} onSelect={selectCard} activeCardId={activeCardId} />
          <CardDetail card={activeCard} shareBaseUrl={SHARE_BASE_URL} />
        </div>
      </main>
    </div>
  );
};

export default App;
