import type { ComponentType } from 'react';
import FitnessComparisonCard from '../../components/Sports/FitnessComparisonCard';
import SpecializationTrapCard from '../../components/Sports/SpecializationTrapCard';
import SensitivePeriodCard from '../../components/Sports/SensitivePeriodCard';
import CognitionShiftCard from '../../components/Sports/CognitionShiftCard';
import StrengthCard from '../../components/Sports/StrengthCard';
import SpeedCard from '../../components/Sports/SpeedCard';
import EnduranceCard from '../../components/Sports/EnduranceCard';
import ScientificSportsCard from '../../components/Sports/ScientificSportsCard';
import ScientificSportsMindmapCard from '../../components/Sports/ScientificSportsMindmapCard';
import DoseEffectCard from '../../components/StudyNotes/DoseEffectCard';
import LogicalThinkingCard from '../../components/StudyNotes/LogicalThinkingCard';
import ReasoningVsEmotionCard from '../../components/DailyThoughts/ReasoningVsEmotionCard';
import FamilyEducationCard from '../../components/FamilyEducation/FamilyEducationCard';
import NonviolentCommunicationCard from '../../components/CommunicationSkills/NonviolentCommunicationCard';

export type RegisteredComponent = ComponentType<Record<string, unknown>>;

export const componentRegistry: Record<string, RegisteredComponent> = {
    'Sports/FitnessComparisonCard': FitnessComparisonCard,
    'Sports/SpecializationTrapCard': SpecializationTrapCard,
    'Sports/SensitivePeriodCard': SensitivePeriodCard,
    'Sports/CognitionShiftCard': CognitionShiftCard,
    'Sports/StrengthCard': StrengthCard,
    'Sports/SpeedCard': SpeedCard,
    'Sports/EnduranceCard': EnduranceCard,
    'Sports/ScientificSportsCard': ScientificSportsCard,
    'Sports/ScientificSportsMindmapCard': ScientificSportsMindmapCard,
    'StudyNotes/DoseEffectCard': DoseEffectCard,
    'StudyNotes/LogicalThinkingCard': LogicalThinkingCard,
    'DailyThoughts/ReasoningVsEmotionCard': ReasoningVsEmotionCard,
    'FamilyEducation/FamilyEducationCard': FamilyEducationCard,
    'CommunicationSkills/NonviolentCommunicationCard': NonviolentCommunicationCard,
};

export const resolveRegisteredComponent = (componentId: string) => componentRegistry[componentId];
