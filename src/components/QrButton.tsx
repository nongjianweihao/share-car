import { useState } from 'react';
import QRCode from 'qrcode';

interface QrButtonProps {
  url: string;
  filename?: string;
}

const QrButton = ({ url, filename = 'knowledge-card.png' }: QrButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      const dataUrl = await QRCode.toDataURL(url, {
        margin: 1,
        errorCorrectionLevel: 'M',
        scale: 8,
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      link.click();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button type="button" className="primary-button" onClick={handleGenerate} disabled={isGenerating}>
      {isGenerating ? '生成中…' : '下载二维码'}
    </button>
  );
};

export default QrButton;
