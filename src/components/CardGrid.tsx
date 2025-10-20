import type { FC } from 'react';
import type { Card } from '../types';

interface CardGridProps {
  cards: Card[];
  onSelect: (id: string) => void;
  activeCardId: string | null;
}

const CardGrid: FC<CardGridProps> = ({ cards, onSelect, activeCardId }) => {
  if (!cards.length) {
    return <div className="empty-state">没有匹配的卡片，试试换个关键词？</div>;
  }

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <button
          key={card.id}
          type="button"
          className={`card-grid-item ${activeCardId === card.id ? 'is-active' : ''}`}
          onClick={() => onSelect(card.id)}
        >
          <div className="card-grid-header">
            <span className="card-grid-column">{card.column}</span>
            <span className="card-grid-updated">{new Date(card.updatedAt).toLocaleDateString()}</span>
          </div>
          <h3>{card.title}</h3>
          <p>{card.excerpt ?? card.contentMd.slice(0, 72)}</p>
          <div className="card-grid-tags">
            {card.tags.slice(0, 4).map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
};

export default CardGrid;
