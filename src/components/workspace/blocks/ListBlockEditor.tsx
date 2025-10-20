import React from 'react';
import { ListContentBlock } from '../../../domain/card';
import { BlockEditorProps } from './types';

export const ListBlockEditor: React.FC<BlockEditorProps<ListContentBlock>> = ({ block, onChange }) => {
    const handleItemsChange = (value: string) => {
        const items = value.split('\n').map(item => item.trim()).filter(item => item.length > 0);
        onChange({ ...block, items });
    };

    return (
        <div className="block-editor block-editor-list">
            <label className="block-editor-label" htmlFor={`block-${block.id}-items`}>
                要点列表
            </label>
            <textarea
                id={`block-${block.id}-items`}
                className="block-editor-textarea"
                placeholder="每行代表一个要点"
                value={block.items.join('\n')}
                rows={4}
                onChange={event => handleItemsChange(event.target.value)}
            />
            <label className="block-editor-checkbox">
                <input
                    type="checkbox"
                    checked={Boolean(block.ordered)}
                    onChange={event => onChange({ ...block, ordered: event.target.checked })}
                />
                使用有序编号
            </label>
        </div>
    );
};

export default ListBlockEditor;
