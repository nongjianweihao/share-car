import React from 'react';
import { TextContentBlock } from '../../../domain/card';
import { BlockEditorProps } from './types';

interface RichTextBlockEditorProps extends BlockEditorProps<TextContentBlock> {
    label?: string;
}

export const RichTextBlockEditor: React.FC<RichTextBlockEditorProps> = ({ block, onChange, label }) => (
    <div className="block-editor block-editor-text">
        <label className="block-editor-label" htmlFor={`block-${block.id}-text`}>
            {label ?? '段落内容'}
        </label>
        <textarea
            id={`block-${block.id}-text`}
            className="block-editor-textarea"
            value={block.text}
            onChange={event => onChange({ ...block, text: event.target.value })}
            rows={4}
        />
        <div className="block-editor-row">
            <label className="block-editor-sub-label" htmlFor={`block-${block.id}-emphasis`}>
                文本样式
            </label>
            <select
                id={`block-${block.id}-emphasis`}
                className="block-editor-select"
                value={block.emphasis ?? 'default'}
                onChange={event =>
                    onChange({ ...block, emphasis: event.target.value as TextContentBlock['emphasis'] })
                }
            >
                <option value="default">默认</option>
                <option value="muted">次要</option>
                <option value="highlight">高亮</option>
            </select>
        </div>
    </div>
);

export default RichTextBlockEditor;
