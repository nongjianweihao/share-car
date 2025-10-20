import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Card,
    ContentBlock,
    ContentBlockType,
    MetricContentBlock,
    Tag,
    cloneCard,
    createCard,
} from '../../domain/card';
import { cardRepository } from '../../services/cardRepository';
import { cardStore, useCardStore, GalleryLayoutMode, GalleryTheme } from '../../state/cardStore';
import CardRenderer from '../common/CardRenderer';
import {
    ListBlockEditor,
    MetricBlockEditor,
    QuoteBlockEditor,
    RichTextBlockEditor,
} from './blocks';

const generateBlockId = () => `block_${Math.random().toString(36).slice(2, 10)}`;

const blockPalette: Array<{
    type: ContentBlockType;
    label: string;
    description: string;
}> = [
    { type: 'text', label: '富文本段落', description: '用于呈现正文内容或补充说明。' },
    { type: 'list', label: '要点列表', description: '使用项目符号或编号梳理关键要点。' },
    { type: 'metric', label: '指标条', description: '突出展示指标数值与趋势。' },
    { type: 'quote', label: '引用', description: '引用经典语句或总结观点。' },
];

const previewSizeByLayout: Record<GalleryLayoutMode, 'sm' | 'md' | 'lg'> = {
    single: 'lg',
    bento: 'md',
    compact: 'sm',
};

const layoutLabels: Record<GalleryLayoutMode, string> = {
    single: '单列',
    bento: 'Bento',
    compact: '紧凑',
};

const themeLabels: Record<GalleryTheme, string> = {
    light: '浅色',
    dark: '深色',
    ocean: '海洋',
};

const createBlock = (type: ContentBlockType): ContentBlock => {
    switch (type) {
        case 'list':
            return {
                id: generateBlockId(),
                type: 'list',
                items: ['新要点'],
                ordered: false,
            };
        case 'metric':
            return {
                id: generateBlockId(),
                type: 'metric',
                label: '新指标',
                value: 0,
                trend: 'neutral',
            } satisfies MetricContentBlock;
        case 'quote':
            return {
                id: generateBlockId(),
                type: 'quote',
                quote: '引用内容',
                attribution: '',
            };
        case 'text':
        default:
            return {
                id: generateBlockId(),
                type: 'text',
                text: '',
                emphasis: 'default',
            };
    }
};

const normalizeCardForDiff = (card?: Card | null) => {
    if (!card) {
        return null;
    }

    const { createdAt, updatedAt, ...rest } = card;
    return JSON.stringify(rest);
};

const parseTags = (value: string): Tag[] => {
    const names = value
        .split(',')
        .map(name => name.trim())
        .filter(name => name.length > 0);

    const seen = new Set<string>();
    return names.map(name => {
        const normalizedId = name
            .toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fa5]+/gi, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 36);
        const baseId = normalizedId.length > 0 ? normalizedId : name;
        let uniqueId = baseId || `tag_${Math.random().toString(36).slice(2, 8)}`;

        while (seen.has(uniqueId)) {
            uniqueId = `${baseId}_${Math.random().toString(36).slice(2, 4)}`;
        }

        seen.add(uniqueId);
        return {
            id: uniqueId,
            name,
        } satisfies Tag;
    });
};

const formatTags = (tags: Tag[]): string => tags.map(tag => tag.name).join(', ');

const validateDraft = (card: Card): string[] => {
    const errors: string[] = [];

    if (!card.title.trim()) {
        errors.push('标题不能为空');
    }

    if (card.blocks.length === 0) {
        errors.push('请至少添加一个内容块');
    }

    card.blocks.forEach((block, index) => {
        if (block.type === 'text' && !block.text.trim()) {
            errors.push(`第 ${index + 1} 个文本块内容不能为空`);
        }
        if (block.type === 'list' && block.items.length === 0) {
            errors.push(`第 ${index + 1} 个列表块至少包含一个要点`);
        }
        if (block.type === 'quote' && !block.quote.trim()) {
            errors.push(`第 ${index + 1} 个引用块内容不能为空`);
        }
        if (block.type === 'metric' && !block.label.trim()) {
            errors.push(`第 ${index + 1} 个指标块需要填写名称`);
        }
    });

    return errors;
};

const buildInitialCard = () => {
    const id = cardRepository.generateOptimisticId();
    return createCard({
        id,
        title: '未命名卡片',
        summary: '',
        blocks: [createBlock('text')],
        tags: [],
    });
};

const CardWorkspace: React.FC = () => {
    const cards = useCardStore(store => store.cards);
    const filteredCards = useCardStore(store => store.filteredCards);
    const selectedCardId = useCardStore(store => store.selectedCardId);
    const loading = useCardStore(store => store.loading);
    const error = useCardStore(store => store.error);
    const previewLayout = useCardStore(store => store.viewPreferences.layout);
    const previewTheme = useCardStore(store => store.viewPreferences.theme);

    const selectedCard = useMemo(
        () => cards.find(card => card.id === selectedCardId),
        [cards, selectedCardId],
    );

    const [draft, setDraft] = useState<Card | undefined>();
    const [isNewDraft, setIsNewDraft] = useState(false);
    const [history, setHistory] = useState<Card[]>([]);
    const [future, setFuture] = useState<Card[]>([]);
    const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    useEffect(() => {
        if (selectedCard) {
            setDraft(cloneCard(selectedCard));
            setIsNewDraft(false);
            setHistory([]);
            setFuture([]);
            setValidationErrors([]);
            setStatus('idle');
            setStatusMessage('');
        } else if (!isNewDraft) {
            setDraft(undefined);
        }
    }, [selectedCard, isNewDraft]);

    const isDirty = useMemo(() => {
        if (!draft) {
            return false;
        }
        if (isNewDraft) {
            return true;
        }
        return normalizeCardForDiff(draft) !== normalizeCardForDiff(selectedCard ?? null);
    }, [draft, selectedCard, isNewDraft]);

    const applyDraftUpdate = useCallback((updater: (card: Card) => Card) => {
        setDraft(current => {
            if (!current) {
                return current;
            }

            setHistory(prev => [...prev, cloneCard(current)]);
            setFuture([]);
            const updated = updater(cloneCard(current));
            return cloneCard(updated);
        });
    }, []);

    const handleBlockChange = useCallback(
        (blockId: string, block: ContentBlock) => {
            applyDraftUpdate(card => ({
                ...card,
                blocks: card.blocks.map(existing => (existing.id === blockId ? { ...block } : existing)),
            }));
        },
        [applyDraftUpdate],
    );

    const handleBlockLayoutChange = useCallback(
        (blockId: string, layout: ContentBlock['layout']) => {
            const targetBlock = draft?.blocks.find(item => item.id === blockId);
            if (!targetBlock) {
                return;
            }
            handleBlockChange(blockId, { ...targetBlock, layout });
        },
        [draft?.blocks, handleBlockChange],
    );

    const handleBlockAccentChange = useCallback(
        (blockId: string, accentColor: string | undefined) => {
            const targetBlock = draft?.blocks.find(item => item.id === blockId);
            if (!targetBlock) {
                return;
            }
            handleBlockChange(blockId, { ...targetBlock, accentColor });
        },
        [draft?.blocks, handleBlockChange],
    );

    const removeBlock = useCallback(
        (blockId: string) => {
            applyDraftUpdate(card => ({
                ...card,
                blocks: card.blocks.filter(block => block.id !== blockId),
            }));
        },
        [applyDraftUpdate],
    );

    const duplicateBlock = useCallback(
        (blockId: string) => {
            if (!draft) {
                return;
            }
            const block = draft.blocks.find(item => item.id === blockId);
            if (!block) {
                return;
            }
            const clone: ContentBlock = { ...block, id: generateBlockId() };
            applyDraftUpdate(card => ({
                ...card,
                blocks: card.blocks.flatMap(item => (item.id === blockId ? [item, clone] : [item])),
            }));
        },
        [applyDraftUpdate, draft],
    );

    const moveBlock = useCallback(
        (blockId: string, direction: -1 | 1) => {
            if (!draft) {
                return;
            }
            const index = draft.blocks.findIndex(block => block.id === blockId);
            if (index === -1) {
                return;
            }
            const newIndex = index + direction;
            if (newIndex < 0 || newIndex >= draft.blocks.length) {
                return;
            }
            applyDraftUpdate(card => {
                const blocks = [...card.blocks];
                const [removed] = blocks.splice(index, 1);
                blocks.splice(newIndex, 0, removed);
                return { ...card, blocks };
            });
        },
        [applyDraftUpdate, draft],
    );

    const addBlock = (type: ContentBlockType) => {
        applyDraftUpdate(card => ({
            ...card,
            blocks: [...card.blocks, createBlock(type)],
        }));
    };

    const handleUndo = () => {
        setHistory(prevHistory => {
            if (!draft || prevHistory.length === 0) {
                return prevHistory;
            }
            const previous = prevHistory[prevHistory.length - 1];
            setFuture(prevFuture => [cloneCard(draft), ...prevFuture]);
            setDraft(cloneCard(previous));
            return prevHistory.slice(0, -1);
        });
    };

    const handleRedo = () => {
        setFuture(prevFuture => {
            if (!draft || prevFuture.length === 0) {
                return prevFuture;
            }
            const [next, ...rest] = prevFuture;
            setHistory(prevHistory => [...prevHistory, cloneCard(draft)]);
            setDraft(cloneCard(next));
            return rest;
        });
    };

    const handleFieldChange = <Key extends keyof Card>(key: Key, value: Card[Key]) => {
        applyDraftUpdate(card => ({
            ...card,
            [key]: value,
        }));
    };

    const handleLayoutChange = (updater: (layout: Card['layout'] | undefined) => Card['layout'] | undefined) => {
        applyDraftUpdate(card => ({
            ...card,
            layout: updater(card.layout),
        }));
    };

    const handleNewCard = () => {
        if (isDirty) {
            const confirmSwitch = window.confirm('当前卡片尚未保存，确定要放弃修改并新建吗？');
            if (!confirmSwitch) {
                return;
            }
        }
        const initial = buildInitialCard();
        setDraft(initial);
        setIsNewDraft(true);
        setHistory([]);
        setFuture([]);
        setValidationErrors([]);
        setStatus('idle');
        setStatusMessage('');
        void cardStore.actions.selectCard(undefined);
    };

    const handleSelectCard = (cardId: string) => {
        if (isDirty) {
            const confirmSwitch = window.confirm('当前卡片尚未保存，切换后修改将丢失，是否继续？');
            if (!confirmSwitch) {
                return;
            }
        }
        setIsNewDraft(false);
        void cardStore.actions.selectCard(cardId);
    };

    const handleDelete = async () => {
        if (!draft || isNewDraft) {
            setDraft(undefined);
            setIsNewDraft(false);
            return;
        }
        const confirmed = window.confirm('删除后无法恢复，确定删除当前卡片吗？');
        if (!confirmed) {
            return;
        }
        try {
            setStatus('saving');
            setStatusMessage('正在删除卡片...');
            await cardStore.actions.deleteCard(draft.id);
            setStatus('success');
            setStatusMessage('卡片已删除');
        } catch (error) {
            setStatus('error');
            setStatusMessage(error instanceof Error ? error.message : '删除失败');
        }
    };

    const handleSave = async () => {
        if (!draft) {
            return;
        }
        const errors = validateDraft(draft);
        setValidationErrors(errors);
        if (errors.length > 0) {
            setStatus('error');
            setStatusMessage('请先修正校验错误后再保存');
            return;
        }

        setStatus('saving');
        setStatusMessage('正在保存更改...');

        try {
            if (isNewDraft || !cards.some(card => card.id === draft.id)) {
                await cardStore.actions.createCard(draft);
                setStatusMessage('新卡片已保存');
            } else {
                await cardStore.actions.updateCard(draft);
                setStatusMessage('卡片内容已更新');
            }
            setStatus('success');
            setHistory([]);
            setFuture([]);
            setIsNewDraft(false);
            void cardStore.actions.selectCard(draft.id);
        } catch (error) {
            setStatus('error');
            setStatusMessage(error instanceof Error ? error.message : '保存失败');
        }
    };

    const tagInputValue = useMemo(() => (draft ? formatTags(draft.tags) : ''), [draft]);
    const canUndo = history.length > 0;
    const canRedo = future.length > 0;
    const previewSize = previewSizeByLayout[previewLayout];
    const previewLayoutLabel = layoutLabels[previewLayout];
    const previewThemeLabel = themeLabels[previewTheme];

    const renderBlockEditor = (block: ContentBlock) => {
        switch (block.type) {
            case 'text':
                return (
                    <RichTextBlockEditor
                        block={block}
                        onChange={updated => handleBlockChange(block.id, updated)}
                    />
                );
            case 'list':
                return (
                    <ListBlockEditor
                        block={block}
                        onChange={updated => handleBlockChange(block.id, updated)}
                    />
                );
            case 'quote':
                return (
                    <QuoteBlockEditor
                        block={block}
                        onChange={updated => handleBlockChange(block.id, updated)}
                    />
                );
            case 'metric':
                return (
                    <MetricBlockEditor
                        block={block}
                        onChange={updated => handleBlockChange(block.id, updated)}
                    />
                );
            default:
                return (
                    <div className="block-editor block-editor-unsupported">
                        <p>暂不支持的内容块类型：{block.type}</p>
                    </div>
                );
        }
    };

    const workspaceList = (
        <div className="workspace-panel workspace-panel-list">
            <div className="workspace-panel-header">
                <h3>卡片列表</h3>
                <button className="workspace-button primary" type="button" onClick={handleNewCard}>
                    新建卡片
                </button>
            </div>
            {loading && <p className="workspace-empty">正在加载卡片...</p>}
            {!loading && error && <p className="workspace-empty">{error}</p>}
            {!loading && !error && (
                <ul className="workspace-card-list">
                    {filteredCards.map(card => (
                        <li key={card.id}>
                            <button
                                type="button"
                                className={`workspace-card-item ${
                                    draft?.id === card.id && !isNewDraft ? 'active' : ''
                                }`}
                                onClick={() => handleSelectCard(card.id)}
                            >
                                <span className="workspace-card-title">{card.title}</span>
                                <span className="workspace-card-meta">
                                    {new Date(card.updatedAt).toLocaleDateString()}
                                </span>
                            </button>
                        </li>
                    ))}
                    {filteredCards.length === 0 && (
                        <li className="workspace-empty">暂无卡片，尝试调整搜索条件。</li>
                    )}
                </ul>
            )}
        </div>
    );

    if (!draft) {
        return (
            <div className="card-workspace empty-state">
                {workspaceList}
                <div className="workspace-empty-main">
                    <p>请选择左侧的卡片或新建一张卡片开始编辑。</p>
                    <button type="button" className="workspace-button primary" onClick={handleNewCard}>
                        立即新建
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="card-workspace">
            {workspaceList}
            <div className="workspace-editor">
                <header className="workspace-editor-header">
                    <div className="workspace-editor-title-group">
                        <input
                            type="text"
                            className="workspace-title-input"
                            placeholder="请输入标题"
                            value={draft.title}
                            onChange={event => handleFieldChange('title', event.target.value)}
                        />
                        <textarea
                            className="workspace-summary-input"
                            placeholder="简要描述或摘要"
                            value={draft.summary ?? ''}
                            onChange={event => handleFieldChange('summary', event.target.value)}
                            rows={2}
                        />
                    </div>
                    <div className="workspace-editor-actions">
                        <button
                            type="button"
                            className="workspace-button"
                            onClick={handleUndo}
                            disabled={!canUndo}
                        >
                            撤销
                        </button>
                        <button
                            type="button"
                            className="workspace-button"
                            onClick={handleRedo}
                            disabled={!canRedo}
                        >
                            重做
                        </button>
                        <button type="button" className="workspace-button" onClick={handleDelete}>
                            删除
                        </button>
                        <button
                            type="button"
                            className="workspace-button primary"
                            onClick={handleSave}
                            disabled={status === 'saving'}
                        >
                            {status === 'saving' ? '保存中...' : '保存'}
                        </button>
                    </div>
                </header>

                {status !== 'idle' && statusMessage && (
                    <div className={`workspace-status workspace-status-${status}`} role="status">
                        {statusMessage}
                    </div>
                )}

                {validationErrors.length > 0 && (
                    <ul className="workspace-validation">
                        {validationErrors.map(message => (
                            <li key={message}>{message}</li>
                        ))}
                    </ul>
                )}

                <section className="workspace-blocks">
                    <div className="workspace-add-block">
                        <span>添加内容块：</span>
                        <div className="workspace-add-block-actions">
                            {blockPalette.map(item => (
                                <button
                                    key={item.type}
                                    type="button"
                                    className="workspace-button secondary"
                                    onClick={() => addBlock(item.type)}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {draft.blocks.map((block, index) => (
                        <article key={block.id} className="workspace-block">
                            <header className="workspace-block-header">
                                <span className="workspace-block-title">
                                    {index + 1}. {blockPalette.find(item => item.type === block.type)?.label ?? block.type}
                                </span>
                                <div className="workspace-block-actions">
                                    <button
                                        type="button"
                                        className="workspace-button icon"
                                        onClick={() => moveBlock(block.id, -1)}
                                        disabled={index === 0}
                                        aria-label="上移"
                                    >
                                        ↑
                                    </button>
                                    <button
                                        type="button"
                                        className="workspace-button icon"
                                        onClick={() => moveBlock(block.id, 1)}
                                        disabled={index === draft.blocks.length - 1}
                                        aria-label="下移"
                                    >
                                        ↓
                                    </button>
                                    <button
                                        type="button"
                                        className="workspace-button icon"
                                        onClick={() => duplicateBlock(block.id)}
                                        aria-label="复制"
                                    >
                                        ⧉
                                    </button>
                                    <button
                                        type="button"
                                        className="workspace-button icon"
                                        onClick={() => removeBlock(block.id)}
                                        aria-label="删除"
                                    >
                                        ×
                                    </button>
                                </div>
                            </header>
                            {renderBlockEditor(block)}
                            <footer className="workspace-block-footer">
                                <label className="block-editor-sub-label" htmlFor={`layout-${block.id}`}>
                                    布局
                                </label>
                                <select
                                    id={`layout-${block.id}`}
                                    className="block-editor-select"
                                    value={block.layout ?? 'auto'}
                                    onChange={event =>
                                        handleBlockLayoutChange(
                                            block.id,
                                            event.target.value as ContentBlock['layout'],
                                        )
                                    }
                                >
                                    <option value="auto">自动</option>
                                    <option value="full">整行</option>
                                    <option value="half">两列</option>
                                </select>
                                <label className="block-editor-sub-label" htmlFor={`accent-${block.id}`}>
                                    强调色
                                </label>
                                <input
                                    id={`accent-${block.id}`}
                                    className="block-editor-input"
                                    type="color"
                                    value={block.accentColor ?? '#3498db'}
                                    onChange={event => handleBlockAccentChange(block.id, event.target.value)}
                                />
                                <button
                                    type="button"
                                    className="workspace-button"
                                    onClick={() => handleBlockAccentChange(block.id, undefined)}
                                >
                                    清除
                                </button>
                            </footer>
                        </article>
                    ))}
                </section>
                <section className="workspace-preview" aria-label="即时预览">
                    <div className="workspace-preview-header">
                        <h3>即时预览</h3>
                        <div className="workspace-preview-meta">
                            <span>{previewLayoutLabel} 布局</span>
                            <span>{previewThemeLabel} 主题</span>
                        </div>
                    </div>
                    <div className="workspace-preview-body">
                        <CardRenderer
                            card={draft}
                            layout={previewLayout}
                            size={previewSize}
                            theme={previewTheme}
                            accentColor={draft.layout?.accentColor}
                            variant={draft.layout?.variant ?? 'default'}
                        />
                    </div>
                    <p className="workspace-preview-note">调整内容或样式选项时，预览会立即同步更新。</p>
                </section>
            </div>
            <aside className="workspace-properties">
                <section className="workspace-properties-section">
                    <h3>属性</h3>
                    <label className="workspace-field-label" htmlFor="card-category">
                        分类
                    </label>
                    <input
                        id="card-category"
                        type="text"
                        className="workspace-input"
                        value={draft.category ?? ''}
                        onChange={event => handleFieldChange('category', event.target.value)}
                        placeholder="如：运动、学习"
                    />
                    <label className="workspace-field-label" htmlFor="card-tags">
                        标签（逗号分隔）
                    </label>
                    <input
                        id="card-tags"
                        type="text"
                        className="workspace-input"
                        value={tagInputValue}
                        onChange={event => handleFieldChange('tags', parseTags(event.target.value))}
                    />
                    <label className="workspace-field-label" htmlFor="card-layout-variant">
                        布局样式
                    </label>
                    <select
                        id="card-layout-variant"
                        className="workspace-input"
                        value={draft.layout?.variant ?? 'default'}
                        onChange={event =>
                            handleLayoutChange(prev => ({
                                ...(prev ?? {}),
                                variant: event.target.value as NonNullable<Card['layout']>['variant'],
                            }))
                        }
                    >
                        <option value="default">默认</option>
                        <option value="compact">紧凑</option>
                        <option value="poster">海报</option>
                    </select>
                    <label className="workspace-field-label" htmlFor="card-layout-accent">
                        主色调
                    </label>
                    <input
                        id="card-layout-accent"
                        className="workspace-input"
                        type="color"
                        value={draft.layout?.accentColor ?? '#3498db'}
                        onChange={event =>
                            handleLayoutChange(prev => ({
                                ...(prev ?? {}),
                                accentColor: event.target.value,
                            }))
                        }
                    />
                    <label className="workspace-field-label" htmlFor="card-layout-bg">
                        背景描述
                    </label>
                    <input
                        id="card-layout-bg"
                        type="text"
                        className="workspace-input"
                        value={draft.layout?.background ?? ''}
                        onChange={event =>
                            handleLayoutChange(prev => ({
                                ...(prev ?? {}),
                                background: event.target.value,
                            }))
                        }
                    />
                    <label className="workspace-field-label" htmlFor="card-layout-cover">
                        封面图片 URL
                    </label>
                    <input
                        id="card-layout-cover"
                        type="url"
                        className="workspace-input"
                        value={draft.layout?.coverImageUrl ?? ''}
                        onChange={event =>
                            handleLayoutChange(prev => ({
                                ...(prev ?? {}),
                                coverImageUrl: event.target.value,
                            }))
                        }
                    />
                    <label className="workspace-field-label">
                        固定到列表
                        <input
                            type="checkbox"
                            checked={Boolean(draft.pinned)}
                            onChange={event => handleFieldChange('pinned', event.target.checked)}
                        />
                    </label>
                    <div className="workspace-metadata">
                        <span>创建时间：{new Date(draft.createdAt).toLocaleString()}</span>
                        <span>最近更新：{new Date(draft.updatedAt).toLocaleString()}</span>
                        {isDirty ? <span className="workspace-dirty-flag">有未保存的更改</span> : <span>已保存</span>}
                    </div>
                </section>
            </aside>
        </div>
    );
};

export default CardWorkspace;
