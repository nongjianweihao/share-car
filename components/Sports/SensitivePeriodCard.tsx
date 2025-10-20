import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

const SensitivePeriodCard = () => {
    const cardRef = useRef(null);
     const handleExport = () => {
        if (cardRef.current) {
            htmlToImage.toPng(cardRef.current, { backgroundColor: '#FFFFFF', cacheBust: true, pixelRatio: 2 })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = '体能窗口期.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };

    return (
        <div className="card-wrapper">
            <div className="card" ref={cardRef}>
                 <div className="header">
                    <h1>6–12岁体能窗口期</h1>
                    <p>错过很难补，像语言学习一样</p>
                </div>
                <div className="timeline-container">
                    <div className="timeline-axis">
                         {[...Array(8)].map((_, i) => <span key={i}>{i + 5}岁</span>)}
                    </div>
                    <div className="timeline">
                       <div className="golden-window"></div>
                    </div>
                    <div className="skill-bars">
                        <div className="skill-bar speed">速度 (6–9岁)</div>
                        <div className="skill-bar coordination">协调 (7–10岁)</div>
                        <div className="skill-bar balance">平衡 (6–10岁)</div>
                        <div className="skill-bar flexibility">柔韧 (6–12岁)</div>
                    </div>
                     <p className="timeline-note">每项素质有最佳刺激期，课程应按年龄匹配刺激</p>
                </div>
                <div className="info-cards">
                     <div className="info-card" style={{textAlign: 'center'}}><strong>目标：</strong>好体能、少受伤、更自信</div>
                </div>
            </div>
            <button onClick={handleExport} className="export-button">查看年龄段训练清单</button>
        </div>
    );
};

export default SensitivePeriodCard;