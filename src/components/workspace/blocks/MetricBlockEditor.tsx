import React from 'react';
import { MetricContentBlock } from '../../../domain/card';
import { BlockEditorProps } from './types';

const parseNumber = (value: string): number | undefined => {
    if (value.trim() === '') {
        return undefined;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
};

export const MetricBlockEditor: React.FC<BlockEditorProps<MetricContentBlock>> = ({ block, onChange }) => (
    <div className="block-editor block-editor-metric">
        <label className="block-editor-label" htmlFor={`block-${block.id}-label`}>
            指标名称
        </label>
        <input
            id={`block-${block.id}-label`}
            className="block-editor-input"
            type="text"
            value={block.label}
            onChange={event => onChange({ ...block, label: event.target.value })}
        />
        <div className="block-editor-row">
            <label className="block-editor-sub-label" htmlFor={`block-${block.id}-value`}>
                当前数值
            </label>
            <input
                id={`block-${block.id}-value`}
                className="block-editor-input"
                type="number"
                value={Number.isFinite(block.value) ? block.value : ''}
                onChange={event =>
                    onChange({
                        ...block,
                        value: parseNumber(event.target.value) ?? 0,
                    })
                }
            />
            <label className="block-editor-sub-label" htmlFor={`block-${block.id}-unit`}>
                单位
            </label>
            <input
                id={`block-${block.id}-unit`}
                className="block-editor-input"
                type="text"
                placeholder="如 %、次/周"
                value={block.unit ?? ''}
                onChange={event => onChange({ ...block, unit: event.target.value })}
            />
        </div>
        <div className="block-editor-row">
            <label className="block-editor-sub-label" htmlFor={`block-${block.id}-target`}>
                目标值
            </label>
            <input
                id={`block-${block.id}-target`}
                className="block-editor-input"
                type="number"
                value={block.target ?? ''}
                onChange={event => onChange({ ...block, target: parseNumber(event.target.value) })}
            />
            <label className="block-editor-sub-label" htmlFor={`block-${block.id}-trend`}>
                趋势
            </label>
            <select
                id={`block-${block.id}-trend`}
                className="block-editor-select"
                value={block.trend ?? 'neutral'}
                onChange={event =>
                    onChange({ ...block, trend: event.target.value as MetricContentBlock['trend'] })
                }
            >
                <option value="up">向上</option>
                <option value="down">向下</option>
                <option value="neutral">持平</option>
            </select>
        </div>
        <label className="block-editor-label" htmlFor={`block-${block.id}-description`}>
            指标说明
        </label>
        <textarea
            id={`block-${block.id}-description`}
            className="block-editor-textarea"
            rows={3}
            value={block.description ?? ''}
            onChange={event => onChange({ ...block, description: event.target.value })}
        />
    </div>
);

export default MetricBlockEditor;
