import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

const FamilyEducationCard = () => {
    const cardRef = useRef(null);
    const handleExport = () => {
        if (cardRef.current) {
            htmlToImage.toPng(cardRef.current, { backgroundColor: '#FFFFFF', cacheBust: true, pixelRatio: 2 })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = '家庭教育-鼓励vs惩罚.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };
    
    return (
        <div className="card-wrapper">
            <div className="card" ref={cardRef}>
                <div className="header">
                    <h1>鼓励 vs 惩罚</h1>
                    <p>塑造孩子的内在驱动力</p>
                </div>
                <div className="comparison-container">
                    <div className="column gains">
                        <h3>鼓励式教育</h3>
                        <ul>
                            <li>✓ 培养自信心</li>
                            <li>✓ 激发内在动力</li>
                            <li>✓ 建立亲密关系</li>
                            <li>✓ 促进自主思考</li>
                        </ul>
                    </div>
                    <div className="column risks">
                        <h3>惩罚式教育</h3>
                        <ul>
                            <li>✗ 导致恐惧和焦虑</li>
                            <li>✗ 破坏亲子信任</li>
                            <li>✗ 扼杀创造力</li>
                            <li>✗ 只能获得短期服从</li>
                        </ul>
                    </div>
                </div>
                 <p className="summary-text" style={{ background: '#e9f7ef', color: '#1e8449' }}>
                    <strong>核心：</strong>用激励和引导代替指责和控制，帮助孩子建立积极的自我认知和解决问题的能力。
                </p>
            </div>
            <button onClick={handleExport} className="export-button">获取家庭教育指南</button>
        </div>
    );
};

export default FamilyEducationCard;
