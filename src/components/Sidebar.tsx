import type { FC } from 'react';
import type { Card, ColumnId } from '../types';

interface SidebarProps {
  cards: Card[];
  activeCardId: string | null;
  onSelectCard: (id: string) => void;
  columnFilter: ColumnId | '全部';
  onColumnChange: (column: ColumnId | '全部') => void;
}

const Sidebar: FC<SidebarProps> = ({
  cards,
  activeCardId,
  onSelectCard,
  columnFilter,
  onColumnChange,
}) => {
  const columns: (ColumnId | '全部')[] = ['全部', ...new Set(cards.map((card) => card.column))];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>知识卡片</h1>
        <p className="sidebar-subtitle">本地优先 · 快速分享</p>
      </div>
      <div className="sidebar-section">
        <p className="sidebar-section-title">栏目</p>
        <div className="column-filter-list">
          {columns.map((column) => (
            <button
              key={column}
              type="button"
              className={`column-filter ${columnFilter === column ? 'is-active' : ''}`}
              onClick={() => onColumnChange(column)}
            >
              {column}
            </button>
          ))}
        </div>
      </div>
      <div className="sidebar-section">
        <p className="sidebar-section-title">全部卡片</p>
        <nav className="sidebar-card-list">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              className={`sidebar-card ${activeCardId === card.id ? 'is-active' : ''}`}
              onClick={() => onSelectCard(card.id)}
            >
              <span className="sidebar-card-title">{card.title}</span>
              <span className="sidebar-card-meta">{card.column}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
