import React from 'react';
import { QuoteContentBlock } from '../../../domain/card';
import { BlockEditorProps } from './types';

export const QuoteBlockEditor: React.FC<BlockEditorProps<QuoteContentBlock>> = ({ block, onChange }) => (
    <div className="block-editor block-editor-quote">
        <label className="block-editor-label" htmlFor={`block-${block.id}-quote`}>
            引用内容
        </label>
        <textarea
            id={`block-${block.id}-quote`}
            className="block-editor-textarea"
            rows={3}
            value={block.quote}
            onChange={event => onChange({ ...block, quote: event.target.value })}
        />
        <label className="block-editor-label" htmlFor={`block-${block.id}-attribution`}>
            引用来源（可选）
        </label>
        <input
            id={`block-${block.id}-attribution`}
            className="block-editor-input"
            type="text"
            value={block.attribution ?? ''}
            onChange={event => onChange({ ...block, attribution: event.target.value })}
        />
    </div>
);

export default QuoteBlockEditor;
