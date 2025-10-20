import React, { useMemo } from 'react';
import { Card, ContentBlock } from '../../domain/card';
import { resolveRegisteredComponent } from '../../app/componentRegistry';

type CardLayoutMode = 'single' | 'bento' | 'compact';
type CardTheme = 'light' | 'dark' | 'ocean';
type CardSize = 'sm' | 'md' | 'lg';
type CardVariant = NonNullable<Card['layout']>['variant'] | 'default';

const estimateSpan = (block: ContentBlock, layout: CardLayoutMode): number => {
    if (layout !== 'bento') {
        return 1;
    }

    if (block.layout === 'full') {
        return 4;
    }
    if (block.layout === 'half') {
        return 2;
    }

    switch (block.type) {
        case 'media':
            return 4;
        case 'metric':
            return 3;
        case 'quote':
            return 3;
        case 'list':
            return Math.min(3, Math.max(2, Math.ceil(block.items.length / 2)));
        default:
            return 2;
    }
};

const renderTextBlock = (block: Extract<ContentBlock, { type: 'text' }>) => (
    <div className={`card-renderer__text card-renderer__text--${block.emphasis ?? 'default'}`}>
        {block.text}
    </div>
);

const renderListBlock = (block: Extract<ContentBlock, { type: 'list' }>) => {
    const ListTag = block.ordered ? 'ol' : 'ul';
    return (
        <ListTag className="card-renderer__list">
            {block.items.map(item => (
                <li key={item}>{item}</li>
            ))}
        </ListTag>
    );
};

const renderQuoteBlock = (block: Extract<ContentBlock, { type: 'quote' }>) => (
    <blockquote className="card-renderer__quote">
        <p>{block.quote}</p>
        {block.attribution && <cite>{block.attribution}</cite>}
    </blockquote>
);

const renderMetricBlock = (block: Extract<ContentBlock, { type: 'metric' }>) => (
    <div className={`card-renderer__metric card-renderer__metric--${block.trend ?? 'neutral'}`}>
        <div className="card-renderer__metric-header">
            <span className="card-renderer__metric-label">{block.label}</span>
            <span className="card-renderer__metric-value">
                {block.value}
                {block.unit && <span className="card-renderer__metric-unit">{block.unit}</span>}
            </span>
        </div>
        {(block.target !== undefined || block.description) && (
            <div className="card-renderer__metric-body">
                {block.target !== undefined && <span>目标：{block.target}</span>}
                {block.description && <p>{block.description}</p>}
            </div>
        )}
    </div>
);

const renderMediaBlock = (block: Extract<ContentBlock, { type: 'media' }>) => (
    <figure className="card-renderer__media">
        <img src={block.url} alt={block.caption ?? block.id} loading="lazy" />
        {block.caption && <figcaption>{block.caption}</figcaption>}
    </figure>
);

const renderBlockContent = (block: ContentBlock): React.ReactNode => {
    switch (block.type) {
        case 'text':
            return renderTextBlock(block);
        case 'list':
            return renderListBlock(block);
        case 'quote':
            return renderQuoteBlock(block);
        case 'metric':
            return renderMetricBlock(block);
        case 'media':
            return renderMediaBlock(block);
        case 'component': {
            const Component = resolveRegisteredComponent(block.componentId);
            if (!Component) {
                return null;
            }
            return <Component {...(block.props ?? {})} />;
        }
        default:
            return null;
    }
};

const useRenderedBlocks = (blocks: ContentBlock[], layout: CardLayoutMode): React.ReactNode[] =>
    useMemo(
        () =>
            blocks.map(block => {
                const span = estimateSpan(block, layout);
                const content = renderBlockContent(block);
                const style: React.CSSProperties = {
                    ['--grid-span' as any]: span,
                };

                if (block.accentColor) {
                    style['--block-accent' as any] = block.accentColor;
                }

                return (
                    <div
                        key={block.id}
                        className={`card-renderer__block card-renderer__block--${block.type}`}
                        data-emphasis={block.layout ?? 'auto'}
                        style={style}
                    >
                        {content}
                    </div>
                );
            }),
        [blocks, layout],
    );

export interface CardRendererProps {
    card: Card;
    layout?: CardLayoutMode;
    theme?: CardTheme;
    size?: CardSize;
    accentColor?: string;
    variant?: CardVariant;
}

const CardRenderer: React.FC<CardRendererProps> = ({
    card,
    layout = 'bento',
    theme = 'light',
    size = 'md',
    accentColor,
    variant: explicitVariant,
}) => {
    const renderedBlocks = useRenderedBlocks(card.blocks, layout);
    const style = useMemo(() => {
        const styles: Record<string, string> = {};
        const effectiveAccent = accentColor ?? card.layout?.accentColor;
        if (effectiveAccent) {
            styles['--card-accent'] = effectiveAccent;
        }
        if (card.layout?.background) {
            styles['--card-surface'] = card.layout.background;
        }
        return styles as React.CSSProperties;
    }, [accentColor, card.layout?.accentColor, card.layout?.background]);

    const variant = explicitVariant ?? card.layout?.variant ?? 'default';
    const coverImageUrl = card.layout?.coverImageUrl;
    const hasCover = Boolean(coverImageUrl);

    return (
        <article
            className={`card-renderer card-renderer--${variant}`}
            data-layout={layout}
            data-theme={theme}
            data-size={size}
            data-variant={variant}
            data-has-cover={hasCover ? 'true' : undefined}
            style={style}
        >
            {hasCover && (
                <figure className="card-renderer__cover">
                    <img
                        src={coverImageUrl ?? ''}
                        alt={card.summary ? `${card.title} - ${card.summary}` : card.title}
                        loading="lazy"
                    />
                </figure>
            )}
            <header className="card-renderer__header">
                <div className="card-renderer__heading">
                    <h3>{card.title}</h3>
                    {card.summary && <p className="card-renderer__summary">{card.summary}</p>}
                </div>
                <div className="card-renderer__meta">
                    <span className="card-renderer__timestamp" aria-label="最近更新时间">
                        {new Intl.DateTimeFormat('zh-CN', {
                            dateStyle: 'medium',
                        }).format(new Date(card.updatedAt))}
                    </span>
                    {card.tags.length > 0 && (
                        <ul className="card-renderer__tags">
                            {card.tags.slice(0, 4).map(tag => (
                                <li key={tag.id}>{tag.name}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </header>
            <div className="card-renderer__grid" role="list">
                {renderedBlocks}
            </div>
        </article>
    );
};

export default CardRenderer;
