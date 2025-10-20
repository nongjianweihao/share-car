import { Card, CardDraft, createCard } from '../domain/card';

const SEED_TIMESTAMP = '2024-01-01T00:00:00.000Z';

const categoryTag = (name: string) => ({
    id: `category:${name}`,
    name,
    kind: 'category' as const,
    color: '#2563eb',
    createdAt: SEED_TIMESTAMP,
    updatedAt: SEED_TIMESTAMP,
});

const keywordTag = (id: string, name: string) => ({
    id: `keyword:${id}`,
    name,
    kind: 'keyword' as const,
    createdAt: SEED_TIMESTAMP,
    updatedAt: SEED_TIMESTAMP,
});

const baseMetadata = (slug: string) => ({ slug });

const cardDrafts: CardDraft[] = [
    {
        id: 'fitness',
        title: '全面体能',
        summary: '比较专项训练与全面体能训练的差异，并强调协调发展各项身体素质的重要性。',
        category: '运动',
        tags: [categoryTag('运动'), keywordTag('fitness', '体能')],
        blocks: [
            {
                id: 'fitness-component',
                type: 'component',
                componentId: 'Sports/FitnessComparisonCard',
            },
        ],
        layout: {
            variant: 'poster',
            accentColor: '#2563eb',
            background: 'linear-gradient(140deg, rgba(37,99,235,0.92), rgba(96,165,250,0.75))',
        },
        metadata: baseMetadata('fitness'),
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
    },
    {
        id: 'trap',
        title: '专项陷阱',
        summary: '讲述青少年过早专项化训练的风险以及如何保持运动的乐趣和全面发展。',
        category: '运动',
        tags: [categoryTag('运动'), keywordTag('specialization', '专项化')],
        blocks: [
            {
                id: 'trap-component',
                type: 'component',
                componentId: 'Sports/SpecializationTrapCard',
            },
        ],
        metadata: baseMetadata('trap'),
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
    },
    {
        id: 'period',
        title: '敏感期',
        summary: '概述儿童身心发展的敏感期，以及在各阶段应关注的运动能力培养重点。',
        category: '运动',
        tags: [categoryTag('运动'), keywordTag('sensitive-period', '敏感期')],
        blocks: [
            {
                id: 'period-component',
                type: 'component',
                componentId: 'Sports/SensitivePeriodCard',
            },
        ],
        metadata: baseMetadata('period'),
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
    },
    {
        id: 'cognition',
        title: '科学训练',
        summary: '通过认知转变理解科学训练的价值，帮助孩子建立持久的运动习惯。',
        category: '运动',
        tags: [categoryTag('运动'), keywordTag('cognition', '认知转变')],
        blocks: [
            {
                id: 'cognition-component',
                type: 'component',
                componentId: 'Sports/CognitionShiftCard',
            },
        ],
        metadata: baseMetadata('cognition'),
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
    },
    {
        id: 'strength',
        title: '力量素质',
        summary: '介绍力量训练的类别、训练方式和发展重点，帮助系统提升力量能力。',
        category: '运动',
        tags: [categoryTag('运动'), keywordTag('strength', '力量')],
        blocks: [
            {
                id: 'strength-component',
                type: 'component',
                componentId: 'Sports/StrengthCard',
            },
        ],
        layout: {
            variant: 'compact',
            accentColor: '#f97316',
        },
        metadata: baseMetadata('strength'),
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
    },
    {
        id: 'speed',
        title: '速度素质',
        summary: '拆解速度训练的关键指标与练习方式，强调提升反应、移动与动作速度。',
        category: '运动',
        tags: [categoryTag('运动'), keywordTag('speed', '速度')],
        blocks: [
            {
                id: 'speed-component',
                type: 'component',
                componentId: 'Sports/SpeedCard',
            },
        ],
        metadata: baseMetadata('speed'),
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
    },
    {
        id: 'endurance',
        title: '耐力素质',
        summary: '阐述耐力训练的类型与目标，帮助理解有氧与无氧能力的协同发展。',
        category: '运动',
        tags: [categoryTag('运动'), keywordTag('endurance', '耐力')],
        blocks: [
            {
                id: 'endurance-component',
                type: 'component',
                componentId: 'Sports/EnduranceCard',
            },
        ],
        metadata: baseMetadata('endurance'),
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
    },
    {
        id: 'scientific-sports',
        title: '科学运动',
        summary: '从科学角度梳理运动训练的基本原则，强调循序渐进与数据跟踪。',
        category: '运动',
        tags: [categoryTag('运动'), keywordTag('science', '科学训练')],
        blocks: [
            {
                id: 'scientific-sports-component',
                type: 'component',
                componentId: 'Sports/ScientificSportsCard',
            },
        ],
        layout: {
            variant: 'compact',
            accentColor: '#22c55e',
        },
        metadata: baseMetadata('scientific-sports'),
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
    },
    {
        id: 'scientific-sports-mindmap',
        title: '科学运动导图',
        summary: '以导图形式呈现科学运动体系的关键节点，方便快速回顾与分享。',
        category: '运动',
        tags: [categoryTag('运动'), keywordTag('mindmap', '导图')],
        blocks: [
            {
                id: 'scientific-sports-mindmap-component',
                type: 'component',
                componentId: 'Sports/ScientificSportsMindmapCard',
            },
        ],
        metadata: baseMetadata('scientific-sports-mindmap'),
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
    },
    {
        id: 'dose',
        title: 'DOSE效应',
        summary: '解释多巴胺、催产素、血清素和内啡肽在积极体验中的作用，探讨如何激发动力。',
        category: '学习笔记',
        tags: [categoryTag('学习笔记'), keywordTag('dose', 'DOSE')],
        blocks: [
            {
                id: 'dose-component',
                type: 'component',
                componentId: 'StudyNotes/DoseEffectCard',
            },
        ],
        layout: {
            variant: 'poster',
            accentColor: '#ec4899',
            background: 'linear-gradient(150deg, rgba(236,72,153,0.9), rgba(244,114,182,0.6))',
        },
        metadata: baseMetadata('dose'),
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
    },
    {
        id: 'logical-thinking',
        title: '逻辑思考力',
        summary: '总结提升逻辑思考能力的要点，包括结构化表达与反思技巧。',
        category: '学习笔记',
        tags: [categoryTag('学习笔记'), keywordTag('logic', '逻辑思维')],
        blocks: [
            {
                id: 'logical-thinking-component',
                type: 'component',
                componentId: 'StudyNotes/LogicalThinkingCard',
            },
        ],
        layout: {
            variant: 'compact',
            accentColor: '#0ea5e9',
        },
        metadata: baseMetadata('logical-thinking'),
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
    },
    {
        id: 'reasoning',
        title: '“讲道理”为何失效',
        summary: '探讨在情绪化场景中逻辑说服的失效原因，并提供更具同理心的沟通策略。',
        category: '日常思考',
        tags: [categoryTag('日常思考'), keywordTag('communication', '沟通')],
        blocks: [
            {
                id: 'reasoning-component',
                type: 'component',
                componentId: 'DailyThoughts/ReasoningVsEmotionCard',
            },
        ],
        metadata: baseMetadata('reasoning'),
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
    },
    {
        id: 'family-ed',
        title: '鼓励 vs 惩罚',
        summary: '从家庭教育视角比较鼓励与惩罚的影响，强调建立正向循环的方法。',
        category: '家庭教育',
        tags: [categoryTag('家庭教育'), keywordTag('parenting', '育儿')],
        blocks: [
            {
                id: 'family-ed-component',
                type: 'component',
                componentId: 'FamilyEducation/FamilyEducationCard',
            },
        ],
        metadata: baseMetadata('family-ed'),
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
    },
    {
        id: 'nvc',
        title: '非暴力沟通',
        summary: '介绍非暴力沟通的四个步骤，并提供在冲突情境下的实际应用。',
        category: '沟通技巧',
        tags: [categoryTag('沟通技巧'), keywordTag('nvc', 'NVC')],
        blocks: [
            {
                id: 'nvc-component',
                type: 'component',
                componentId: 'CommunicationSkills/NonviolentCommunicationCard',
            },
        ],
        metadata: baseMetadata('nvc'),
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
    },
];

export const initialCards: Card[] = cardDrafts.map(createCard);
