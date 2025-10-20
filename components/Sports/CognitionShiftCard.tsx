import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

const CognitionShiftCard = () => {
    const cardRef = useRef(null);
    const qualities = ['速度', '力量', '耐力', '协调', '灵敏', '平衡', '柔韧', '核心'];
    const handleExport = () => {
        if (cardRef.current) {
            htmlToImage.toPng(cardRef.current, { backgroundColor: '#FFFFFF', cacheBust: true, pixelRatio: 2 })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = '科学训练三原则.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };

    return (
        <div className="card-wrapper">
            <div className="card" ref={cardRef}>
                <div className="header">
                    <h1>不是多动，是动得“对”</h1>
                    <p>科学训练三原则</p>
                </div>

                <div className="three-tier-structure">
                    <div className="tier">
                        <div className="qualities-ring">
                            {qualities.map((quality, index) => (
                                <div className="quality-item" key={quality} style={{ transform: `rotate(${index * 45}deg) translate(140px) rotate(-${index * 45}deg)` }}>
                                    {quality}
                                </div>
                            ))}
                        </div>
                        <div className="tier-label">八大素质全面发展</div>
                    </div>
                    <div className="arrow-down">↓</div>
                    <div className="tier">
                         <div className="tier-icon">📅</div>
                         <div className="tier-label">尊重敏感期</div>
                    </div>
                    <div className="arrow-down">↓</div>
                     <div className="tier">
                        <div className="tier-icon">🎯</div>
                        <div className="tier-icon">🏆</div>
                         <div className="tier-label">趣味化设计</div>
                    </div>
                </div>
                
                <p className="summary-text">
                    <strong>多运动≠高效训练；错误方式可能埋隐患。</strong><br/>
                    基础扎实，表现/自信/学习力一起涨。
                </p>
            </div>
            <button onClick={handleExport} className="export-button">预约体验 · 先评估再训练</button>
        </div>
    );
};

export default CognitionShiftCard;