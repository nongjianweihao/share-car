import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

const SpecializationTrapCard = () => {
    const cardRef = useRef(null);
    const handleExport = () => {
        if (cardRef.current) {
            htmlToImage.toPng(cardRef.current, { backgroundColor: '#FFFFFF', cacheBust: true, pixelRatio: 2 })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = '专项训练的陷阱.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };
    
    return (
        <div className="card-wrapper">
            <div className="card" ref={cardRef}>
                <div className="header-trap">
                    <div className="title-area">
                        <h1>只练专项＝头重脚轻</h1>
                        <p>速度快了，基础却塌了</p>
                    </div>
                    <div className="badge">金句徽章</div>
                </div>
                <div className="balance-scale-container">
                    <div className="balance-scale">
                        <div className="pivot"></div>
                        <div className="beam"></div>
                        <div className="pan left">
                            专项↑
                            <div className="weight"></div>
                        </div>
                        <div className="pan right">
                            基础↓
                            <div className="weight"></div>
                        </div>
                    </div>
                </div>
                <div className="comparison-container">
                    <div className="column gains">
                        <h3>看得见的提升</h3>
                        <ul>
                            <li>✓ 速度更快</li>
                            <li>✓ 技术更熟</li>
                        </ul>
                    </div>
                    <div className="column risks">
                        <h3>隐蔽的风险</h3>
                        <ul>
                            <li>✗ 柔韧差</li>
                            <li>✗ 力量弱</li>
                            <li>✗ 受伤率升</li>
                        </ul>
                    </div>
                </div>
            </div>
            <button onClick={handleExport} className="export-button">获取“基础打底课”方案</button>
        </div>
    );
};

export default SpecializationTrapCard;
