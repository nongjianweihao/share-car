import './index.css';
import React, { useState } from 'react';
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
const cards = [
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

    const activeCard = cards.find(card => card.id === activeCardId);
    
    // Group cards by category
    const categories = cards.reduce((acc, card) => {
        (acc[card.category] = acc[card.category] || []).push(card);
        return acc;
    }, {} as Record<string, typeof cards>);

    return (
        <div className="app-container">
            <aside className="sidebar">
                <h2 className="sidebar-title">分享卡片</h2>
                <nav className="sidebar-nav">
                    {Object.entries(categories).map(([category, cardsInCategory]) => (
                        <div key={category} className="sidebar-category">
                            <h3 className="sidebar-category-title">{category}</h3>
                            {cardsInCategory.map(card => (
                                <button
                                    key={card.id}
                                    className={`sidebar-nav-item ${activeCardId === card.id ? 'active' : ''}`}
                                    onClick={() => setActiveCardId(card.id)}
                                >
                                    {card.title}
                                </button>
                            ))}
                        </div>
                    ))}
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