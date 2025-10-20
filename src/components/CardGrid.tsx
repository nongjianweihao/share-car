import type { FC } from 'react';
import type { Card, CardStyleId } from '../types';

const styleClassBy = (styleId?: CardStyleId) => {
  if (!styleId) {
    return '';
  }

  switch (styleId) {
    case 'handdrawn_infographic':
      return 'card-style card-style-handdrawn';
    case 'magazine_light':
      return 'card-style card-style-magazine';
    case 'bento_brand_moodboard':
      return 'card-style card-style-bento';
    case 'glassmorphism_3d':
      return 'card-style card-style-glass';
    case 'growth_scrapbook_doodle':
      return 'card-style card-style-growth';
    case 'sunrise_sunset_gradient':
      return 'card-style card-style-sunrise';
    case 'liquid_digitalism':
      return 'card-style card-style-liquid';
    case 'elegant_retro':
      return 'card-style card-style-retro';
    case 'watercolor':
      return 'card-style card-style-watercolor';
    default:
      return 'card-style';
  }
};

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
      {cards.map((card) => {
        const extraClasses = [styleClassBy(card.style)];
        if (activeCardId === card.id) {
          extraClasses.push('is-active');
        }

        return (
          <button
            key={card.id}
            type="button"
            className={`card-grid-item ${extraClasses.filter(Boolean).join(' ')}`.trim()}
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
        );
      })}
    </div>
  );
};

export default CardGrid;
