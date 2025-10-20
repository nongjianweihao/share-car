import './index.css';
import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import FitnessComparisonCard from './components/Sports/FitnessComparisonCard';
import SpecializationTrapCard from './components/Sports/SpecializationTrapCard';
import SensitivePeriodCard from './components/Sports/SensitivePeriodCard';
import CognitionShiftCard from './components/Sports/CognitionShiftCard';
import StrengthCard from './components/Sports/StrengthCard';
import SpeedCard from './components/Sports/SpeedCard';
import EnduranceCard from './components/Sports/EnduranceCard';
import ScientificSportsCard from './components/Sports/ScientificSportsCard';
import ScientificSportsMindmapCard from './components/Sports/ScientificSportsMindmapCard';
import DoseEffectCard from './components/StudyNotes/DoseEffectCard';
import LogicalThinkingCard from './components/StudyNotes/LogicalThinkingCard';
import ReasoningVsEmotionCard from './components/DailyThoughts/ReasoningVsEmotionCard';
import FamilyEducationCard from './components/FamilyEducation/FamilyEducationCard';
import NonviolentCommunicationCard from './components/CommunicationSkills/NonviolentCommunicationCard';


// Data structure for all available cards, now with categories
type CardConfig = {
    id: string;
    title: string;
    category: string;
    component: JSX.Element;
};

const cards: CardConfig[] = [
    { id: 'fitness', title: '全面体能', category: '运动', component: <FitnessComparisonCard /> },
    { id: 'trap', title: '专项陷阱', category: '运动', component: <SpecializationTrapCard /> },
    { id: 'period', title: '敏感期', category: '运动', component: <SensitivePeriodCard /> },
    { id: 'cognition', title: '科学训练', category: '运动', component: <CognitionShiftCard /> },
    { id: 'strength', title: '力量素质', category: '运动', component: <StrengthCard /> },
    { id: 'speed', title: '速度素质', category: '运动', component: <SpeedCard /> },
    { id: 'endurance', title: '耐力素质', category: '运动', component: <EnduranceCard /> },
    { id: 'scientific-sports', title: '科学运动', category: '运动', component: <ScientificSportsCard /> },
    { id: 'scientific-sports-mindmap', title: '科学运动导图', category: '运动', component: <ScientificSportsMindmapCard /> },
    { id: 'dose', title: 'DOSE效应', category: '学习笔记', component: <DoseEffectCard /> },
    { id: 'logical-thinking', title: '逻辑思考力', category: '学习笔记', component: <LogicalThinkingCard /> },
    { id: 'reasoning', title: '“讲道理”为何失效', category: '日常思考', component: <ReasoningVsEmotionCard /> },
    { id: 'family-ed', title: '鼓励 vs 惩罚', category: '家庭教育', component: <FamilyEducationCard /> },
    { id: 'nvc', title: '非暴力沟通', category: '沟通技巧', component: <NonviolentCommunicationCard /> },
];

const App = () => {
    const [activeCardId, setActiveCardId] = useState(cards[0].id);
    const [searchTerm, setSearchTerm] = useState('');

    const normalizedSearch = searchTerm.trim().toLowerCase();

    type CategoryEntry = {
        name: string;
        cards: CardConfig[];
        total: number;
    };

    const categoryEntries = useMemo<CategoryEntry[]>(() => {
        const grouped = cards.reduce<Record<string, CardConfig[]>>((acc, card) => {
            (acc[card.category] = acc[card.category] || []).push(card);
            return acc;
        }, {});

        return Object.entries(grouped).map(([name, groupedCards]) => ({
            name,
            cards: groupedCards,
            total: groupedCards.length,
        }));
    }, []);

    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() =>
        categoryEntries.reduce<Record<string, boolean>>((acc, entry) => {
            acc[entry.name] = true;
            return acc;
        }, {})
    );

    const filteredCategories = useMemo<CategoryEntry[]>(() => {
        return categoryEntries
            .map(entry => {
                const matchingCards = normalizedSearch
                    ? entry.cards.filter(card => {
                          const normalizedTitle = card.title.toLowerCase();
                          const normalizedCategory = card.category.toLowerCase();
                          const normalizedId = card.id.toLowerCase();

                          return (
                              normalizedTitle.includes(normalizedSearch) ||
                              normalizedCategory.includes(normalizedSearch) ||
                              normalizedId.includes(normalizedSearch)
                          );
                      })
                    : entry.cards;

                return {
                    ...entry,
                    cards: matchingCards,
                };
            })
            .filter(entry => entry.cards.length > 0 || !normalizedSearch);
    }, [categoryEntries, normalizedSearch]);

    useEffect(() => {
        if (!normalizedSearch) {
            return;
        }

        setExpandedCategories(prev => {
            const next = { ...prev };

            filteredCategories.forEach(entry => {
                if (entry.cards.length > 0) {
                    next[entry.name] = true;
                }
            });

            return next;
        });
    }, [filteredCategories, normalizedSearch]);

    const hasResults = filteredCategories.some(entry => entry.cards.length > 0);

    const toggleCategory = (categoryName: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryName]: !prev[categoryName],
        }));
    };

    const activeCard = cards.find(card => card.id === activeCardId);

    return (
        <div className="app-container">
            <aside className="sidebar">
                <h2 className="sidebar-title">分享卡片</h2>
                <div className="sidebar-search" role="search">
                    <span className="sidebar-search-icon" aria-hidden="true" />
                    <input
                        type="search"
                        className="sidebar-search-input"
                        placeholder="搜索卡片或分类..."
                        value={searchTerm}
                        onChange={event => setSearchTerm(event.target.value)}
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            className="sidebar-search-clear"
                            aria-label="清除搜索"
                            onClick={() => setSearchTerm('')}
                        >
                            ×
                        </button>
                    )}
                </div>
                <nav className="sidebar-nav">
                    {hasResults ? (
                        filteredCategories.map(entry => {
                            const isExpanded = expandedCategories[entry.name];
                            const visibleCount = entry.cards.length;
                            const countLabel =
                                visibleCount === entry.total || normalizedSearch
                                    ? `${visibleCount}`
                                    : `${visibleCount}/${entry.total}`;

                            return (
                                <section key={entry.name} className="sidebar-category">
                                    <button
                                        type="button"
                                        className="sidebar-category-header"
                                        onClick={() => toggleCategory(entry.name)}
                                        aria-expanded={isExpanded}
                                    >
                                        <span className="sidebar-category-name">{entry.name}</span>
                                        <span className="sidebar-category-meta">
                                            <span className="sidebar-category-count" aria-label={`共 ${entry.total} 张卡片`}>
                                                {countLabel}
                                            </span>
                                            <span
                                                className={`sidebar-category-chevron ${isExpanded ? 'open' : ''}`}
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </button>
                                    {isExpanded && (
                                        <div className="sidebar-category-items">
                                            {entry.cards.map(card => (
                                                <button
                                                    key={card.id}
                                                    className={`sidebar-nav-item ${activeCardId === card.id ? 'active' : ''}`}
                                                    onClick={() => setActiveCardId(card.id)}
                                                >
                                                    {card.title}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </section>
                            );
                        })
                    ) : (
                        <p className="sidebar-empty">未找到匹配的卡片，请尝试其他关键词。</p>
                    )}
                </nav>
            </aside>
            <main className="main-content">
                {activeCard ? activeCard.component : <p>请选择一个卡片</p>}
            </main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);