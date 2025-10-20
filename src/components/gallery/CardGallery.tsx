import React, { useMemo } from 'react';
import { ContentBlock } from '../../domain/card';
import { resolveRegisteredComponent } from '../../app/componentRegistry';
import { useCardStore } from '../../state/cardStore';

const renderGenericBlock = (block: ContentBlock) => {
    switch (block.type) {
        case 'text':
            return (
                <p key={block.id} className={`card-block-text card-block-text-${block.emphasis ?? 'default'}`}>
                    {block.text}
                </p>
            );
        case 'list':
            return block.ordered ? (
                <ol key={block.id} className="card-block-list ordered">
                    {block.items.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ol>
            ) : (
                <ul key={block.id} className="card-block-list">
                    {block.items.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            );
        case 'quote':
            return (
                <blockquote key={block.id} className="card-block-quote">
                    <p>{block.quote}</p>
                    {block.attribution && <cite>{block.attribution}</cite>}
                </blockquote>
            );
        case 'media':
            return (
                <figure key={block.id} className="card-block-media">
                    <img src={block.url} alt={block.caption ?? block.id} />
                    {block.caption && <figcaption>{block.caption}</figcaption>}
                </figure>
            );
        case 'metric':
            return (
                <div key={block.id} className="card-block-metric">
                    <div className="card-block-metric-header">
                        <span className="card-block-metric-label">{block.label}</span>
                        <span className="card-block-metric-value">
                            {block.value}
                            {block.unit && <span className="card-block-metric-unit">{block.unit}</span>}
                        </span>
                    </div>
                    {(block.target !== undefined || block.description) && (
                        <div className="card-block-metric-body">
                            {block.target !== undefined && <span>目标：{block.target}</span>}
                            {block.description && <p>{block.description}</p>}
                        </div>
                    )}
                </div>
            );
        case 'component':
        default:
            return null;
    }
};

const CardGallery: React.FC = () => {
    const cards = useCardStore(store => store.cards);
    const filteredCards = useCardStore(store => store.filteredCards);
    const selectedCardId = useCardStore(store => store.selectedCardId);

    const activeCard = useMemo(() => {
        if (!selectedCardId) {
            return filteredCards[0];
        }

        return cards.find(card => card.id === selectedCardId) ?? filteredCards[0];
    }, [cards, filteredCards, selectedCardId]);

    if (!activeCard) {
        return <p className="card-gallery-empty">请选择左侧的卡片以查看内容。</p>;
    }

    const componentBlock = activeCard.blocks.find(block => block.type === 'component');

    if (componentBlock && componentBlock.type === 'component') {
        const Component = resolveRegisteredComponent(componentBlock.componentId);
        if (Component) {
            return <Component {...(componentBlock.props ?? {})} />;
        }
    }

    return (
        <article className="card-article">
            <header className="card-article-header">
                <h1>{activeCard.title}</h1>
                {activeCard.summary && <p className="card-summary">{activeCard.summary}</p>}
            </header>
            {activeCard.blocks.map(renderGenericBlock)}
        </article>
    );
};

export default CardGallery;
