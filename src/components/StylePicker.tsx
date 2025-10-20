import { useState } from 'react';
import { CARD_STYLES, CARD_STYLE_MAP } from '../lib/cardStyles';
import type { CardStyleId } from '../types';

interface StylePickerProps {
  value?: CardStyleId;
  onChange: (value?: CardStyleId) => void;
}

const StylePicker = ({ value, onChange }: StylePickerProps) => {
  const [copyTip, setCopyTip] = useState('');

  const style = value ? CARD_STYLE_MAP[value] : undefined;

  const copyPrompt = async () => {
    if (!style) {
      return;
    }
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(style.callPrompt);
        setCopyTip('已复制调用指令');
      } else {
        setCopyTip('浏览器不支持自动复制');
      }
    } catch (error) {
      setCopyTip('复制失败，请手动复制');
    }
    setTimeout(() => setCopyTip(''), 1500);
  };

  return (
    <div className="style-picker">
      <label className="style-picker-label">卡片风格</label>
      <select
        className="style-picker-select"
        value={value ?? ''}
        onChange={(event) => onChange((event.target.value || undefined) as CardStyleId | undefined)}
      >
        <option value="">（不指定风格）</option>
        {CARD_STYLES.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {style ? (
        <div className="style-picker-panel">
          <div className="style-picker-panel-title">{style.name}</div>
          <p className="style-picker-panel-summary">{style.summary}</p>
          <p className="style-picker-panel-best">最佳场景：{style.bestFor.join('、')}</p>
          <button type="button" className="style-picker-copy" onClick={copyPrompt}>
            复制【调用指令】
          </button>
          <div className="style-picker-hint">{copyTip}</div>
        </div>
      ) : null}
    </div>
  );
};

export default StylePicker;

