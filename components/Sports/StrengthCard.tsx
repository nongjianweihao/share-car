import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

const StrengthCard = () => {
    const cardRef = useRef(null);

    const handleExport = () => {
        if (cardRef.current) {
            htmlToImage.toPng(cardRef.current, { backgroundColor: '#f0f2f5', cacheBust: true, pixelRatio: 2 })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = '力量素质.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };

    return (
        <div className="card-wrapper">
            <div className="card" ref={cardRef} style={{ background: '#f0f2f5', padding: '20px' }}>
                <div className="strength-grid-container">
                    <div className="strength-item strength-intro">
                        <h2>力量素质</h2>
                        <h3>所有运动的基础</h3>
                        <p>儿童力量素质并不仅指肌肉发达，而是指神经肌肉系统对抗或克服阻力的能力。它是跑、跳、投等所有动作的基石，对提升运动表现、预防损伤至关重要。</p>
                        <div className="strength-tags">
                            <span>身体素质</span>
                            <span>基础运动</span>
                            <span>健康成长</span>
                        </div>
                    </div>
                    <div className="strength-item strength-types">
                        <h4>力量的三种形态</h4>
                        <ul>
                            <li><span>💪</span> <strong>最大力量:</strong> 一次能举起的最大重量。</li>
                            <li><span>🚀</span> <strong>爆发力:</strong> 瞬间发力的能力，如跳跃。</li>
                            <li><span>⏱️</span> <strong>力量耐力:</strong> 持续用力的能力，如攀爬。</li>
                        </ul>
                    </div>
                    <div className="strength-item strength-crisis">
                        <h4>现代儿童的力量“危机”</h4>
                        <p>久坐、缺乏户外活动导致儿童普遍核心力量不足、含胸驼背。力量基础薄弱，不仅影响体态，也让孩子在参与体育活动时更容易感到挫败和疲劳。</p>
                    </div>
                    <div className="strength-item strength-myths">
                        <h4>常见误区澄清</h4>
                         <ul>
                            <li><strong>误区：</strong>儿童练力量影响长高。</li>
                            <li><strong>事实：</strong>科学、适龄的力量训练能刺激骨骼，促进生长激素分泌，反而对长高有益。</li>
                        </ul>
                    </div>
                    <div className="strength-item strength-benefits">
                         <h4>力量训练的好处</h4>
                         <ul>
                            <li>✓ 促进骨骼健康和生长</li>
                            <li>✓ 提升运动表现和协调性</li>
                            <li>✓ 降低运动损伤风险</li>
                            <li>✓ 塑造健康体态和自信心</li>
                         </ul>
                    </div>
                    <div className="strength-item strength-howto">
                        <h4>如何科学地练力量？</h4>
                        <p>儿童力量训练应以趣味游戏为主，重点发展核心和身体协调控制能力。</p>
                        <ul>
                            <li><strong>初级 (3-6岁):</strong> 动物爬行、攀爬架</li>
                            <li><strong>中级 (7-12岁):</strong> 俯卧撑、深蹲、引体向上</li>
                            <li><strong>高级 (12岁+):</strong> 弹力带、轻重量器械</li>
                        </ul>
                    </div>
                </div>
            </div>
            <button onClick={handleExport} className="export-button">获取力量训练方案</button>
        </div>
    );
};

export default StrengthCard;