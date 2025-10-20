// FIX: The file contained placeholder text. This change provides the full implementation for the ReasoningVsEmotionCard component.
import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

const ReasoningVsEmotionCard = () => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const handleExport = () => {
        if (cardRef.current) {
            htmlToImage.toPng(cardRef.current, { backgroundColor: '#FFFFFF', cacheBust: true, pixelRatio: 2 })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = '理智脑vs情绪脑.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };
    
    return (
        <div className="card-wrapper">
            <div className="card" ref={cardRef}>
                <div className="header">
                    <h1>理智脑 vs 情绪脑</h1>
                    <p>了解大脑的“双系统”决策模式</p>
                </div>
                <div className="brain-diagram" style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', padding: '20px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', margin: '20px 0' }}>
                    <div className="brain-half left">
                        <div className="brain-icon" style={{ fontSize: '48px' }}>🧠</div>
                        <h3>情绪脑 (系统1)</h3>
                        <p>边缘系统</p>
                    </div>
                    <div className="brain-half right">
                        <div className="brain-icon" style={{ fontSize: '48px' }}>💡</div>
                        <h3>理智脑 (系统2)</h3>
                        <p>前额叶皮层</p>
                    </div>
                </div>
                <div className="comparison-container">
                    <div className="column risks">
                        <h3>情绪脑特点</h3>
                        <ul>
                            <li>✓ 反应快、自动化</li>
                            <li>✓ 节能、凭直觉</li>
                            <li>✓ 处理日常琐事</li>
                            <li>✗ 易冲动、有偏见</li>
                        </ul>
                    </div>
                    <div className="column gains">
                        <h3>理智脑特点</h3>
                        <ul>
                            <li>✓ 逻辑严谨</li>
                            <li>✓ 深度思考</li>
                            <li>✓ 规划未来</li>
                            <li>✗ 反应慢、耗能大</li>
                        </ul>
                    </div>
                </div>
                 <p className="summary-text" style={{ background: '#f0f2f5', color: '#333' }}>
                    <strong>智慧决策：</strong>不是压抑情绪，而是让理智脑与情绪脑协作，让“骑手”引导好“大象”。
                </p>
            </div>
            <button onClick={handleExport} className="export-button">获取决策优化指南</button>
        </div>
    );
};

export default ReasoningVsEmotionCard;