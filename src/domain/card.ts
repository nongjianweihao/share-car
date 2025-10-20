export type ContentBlockType = 'text' | 'list' | 'quote' | 'component' | 'media' | 'metric';

export interface BaseContentBlock {
    id: string;
    type: ContentBlockType;
    order?: number;
    layout?: 'full' | 'half' | 'auto';
    accentColor?: string;
}

export interface TextContentBlock extends BaseContentBlock {
    type: 'text';
    text: string;
    emphasis?: 'default' | 'muted' | 'highlight';
}

export interface ListContentBlock extends BaseContentBlock {
    type: 'list';
    items: string[];
    ordered?: boolean;
}

export interface QuoteContentBlock extends BaseContentBlock {
    type: 'quote';
    quote: string;
    attribution?: string;
}

export interface MediaContentBlock extends BaseContentBlock {
    type: 'media';
    url: string;
    caption?: string;
    mediaType?: 'image' | 'video' | 'audio';
}

export interface ComponentContentBlock extends BaseContentBlock {
    type: 'component';
    componentId: string;
    props?: Record<string, unknown>;
}

export interface MetricContentBlock extends BaseContentBlock {
    type: 'metric';
    label: string;
    value: number;
    target?: number;
    unit?: string;
    trend?: 'up' | 'down' | 'neutral';
    description?: string;
}

export type ContentBlock =
    | TextContentBlock
    | ListContentBlock
    | QuoteContentBlock
    | MediaContentBlock
    | ComponentContentBlock
    | MetricContentBlock;

export interface Tag {
    id: string;
    name: string;
    kind?: 'category' | 'keyword' | 'status';
    color?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CardLayoutStyle {
    variant?: 'default' | 'compact' | 'poster';
    accentColor?: string;
    coverImageUrl?: string;
    background?: string;
}

export interface Card {
    id: string;
    title: string;
    summary?: string;
    category?: string;
    blocks: ContentBlock[];
    tags: Tag[];
    layout?: CardLayoutStyle;
    createdAt: string;
    updatedAt: string;
    pinned?: boolean;
    archived?: boolean;
    metadata?: Record<string, unknown>;
}

export type CardDraft = Partial<Omit<Card, 'id' | 'createdAt' | 'updatedAt'>> & {
    id?: string;
    title: string;
    createdAt?: string;
    updatedAt?: string;
};

const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null;

const isStringArray = (value: unknown): value is string[] =>
    Array.isArray(value) && value.every(item => typeof item === 'string');

const isContentBlock = (value: unknown): value is ContentBlock => {
    if (!isObject(value) || typeof value.id !== 'string' || typeof value.type !== 'string') {
        return false;
    }

    switch (value.type) {
        case 'text':
            return typeof value.text === 'string';
        case 'list':
            return isStringArray(value.items);
        case 'quote':
            return typeof value.quote === 'string';
        case 'media':
            return typeof value.url === 'string';
        case 'metric':
            return typeof value.label === 'string' && typeof value.value === 'number';
        case 'component':
            return typeof value.componentId === 'string';
        default:
            return false;
    }
};

const isTag = (value: unknown): value is Tag =>
    isObject(value) && typeof value.id === 'string' && typeof value.name === 'string';

export const isCard = (value: unknown): value is Card => {
    if (!isObject(value)) {
        return false;
    }

    const { id, title, blocks, tags, createdAt, updatedAt } = value;

    return (
        typeof id === 'string' &&
        typeof title === 'string' &&
        Array.isArray(blocks) &&
        blocks.every(isContentBlock) &&
        Array.isArray(tags) &&
        tags.every(isTag) &&
        typeof createdAt === 'string' &&
        typeof updatedAt === 'string'
    );
};

const nowIsoString = () => new Date().toISOString();

export const createCard = (draft: CardDraft): Card => {
    const createdAt = draft.createdAt ?? nowIsoString();
    const updatedAt = draft.updatedAt ?? createdAt;

    return {
        id: draft.id ?? `card_${Math.random().toString(36).slice(2)}`,
        title: draft.title,
        summary: draft.summary ?? '',
        category: draft.category,
        blocks: draft.blocks ? draft.blocks.filter(isContentBlock) : [],
        tags: draft.tags ? draft.tags.filter(isTag) : [],
        layout: draft.layout,
        createdAt,
        updatedAt,
        pinned: draft.pinned ?? false,
        archived: draft.archived ?? false,
        metadata: draft.metadata ?? {},
    };
};

export const cloneCard = (card: Card): Card => ({
    ...card,
    blocks: card.blocks.map(block => ({ ...block })),
    tags: card.tags.map(tag => ({ ...tag })),
    layout: card.layout ? { ...card.layout } : undefined,
    metadata: card.metadata ? { ...card.metadata } : undefined,
});
