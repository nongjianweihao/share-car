import { ContentBlock } from '../../../domain/card';

export interface BlockEditorProps<T extends ContentBlock> {
    block: T;
    onChange: (block: T) => void;
}

export interface AdvancedBlockEditorProps<T extends ContentBlock> extends BlockEditorProps<T> {
    onRemove: (blockId: string) => void;
}

export type AnyBlockEditorProps = AdvancedBlockEditorProps<ContentBlock>;
