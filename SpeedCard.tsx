import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

const SpeedCard = () => {
    const cardRef = useRef(null);

    const handleExport = () => {
        if (cardRef.current) {
            htmlToImage.toPng(cardRef.current, { backgroundColor: '#f0f2f5', cacheBust: true, pixelRatio: 2 })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = '速度素质.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };

    return (
        <div className="card-wrapper">
            <div className="card" ref={cardRef} style={{ background: '#f0f2f5', padding: '20px' }}>
                <div className="speed-grid-container">
                    <div className="speed-item speed-intro">
                        <h2>速度素质</h2>
                        <h3>反应与冲刺的艺术</h3>
                        <p>儿童速度素质是指身体快速运动的能力，它不仅是跑得快，更涵盖了反应、变向和动作频率。这是大多数运动项目的核心，能显著提升孩子的运动表现和自信心。</p>
                        <div className="speed-tags">
                            <span>反应能力</span>
                            <span>运动表现</span>
                            <span>敏捷性</span>
                        </div>
                    </div>
                    <div className="speed-item speed-types">
                        <h4>速度的三要素</h4>
                        <ul>
                            <li><span>🧠</span> <strong>反应速度:</strong> 对信号快速做出反应的能力。</li>
                            <li><span>🏃</span> <strong>动作速度:</strong> 完成单个动作的速率。</li>
                            <li><span>💨</span> <strong>位移速度:</strong> 身体从一点移动到另一点的速率。</li>
                        </ul>
                    </div>
                    <div className="speed-item speed-crisis">
                        <h4>现代儿童的速度“危机”</h4>
                        <p>电子产品普及和静态生活方式，使得儿童户外奔跑和游戏时间减少，导致他们的基础速度和敏捷性发展不足，影响综合运动能力。</p>
                    </div>
                    <div className="speed-item speed-myths">
                        <h4>常见误区澄清</h4>
                         <ul>
                            <li><strong>误区：</strong>速度是天生的，练也没用。</li>
                            <li><strong>事实：</strong>天赋有影响，但科学训练可以大幅度提升儿童的反应、频率和奔跑效率，后天努力至关重要。</li>
                        </ul>
                    </div>
                    <div className="speed-item speed-benefits">
                         <h4>速度训练的好处</h4>
                         <ul>
                            <li>✓ 提升各类运动表现</li>
                            <li>✓ 增强神经系统反应能力</li>
                            <li>✓ 改善身体协调性和平衡感</li>
                            <li>✓ 降低运动中意外受伤风险</li>
                         </ul>
                    </div>
                    <div className="speed-item speed-howto">
                        <h4>如何科学地练速度？</h4>
                        <p>儿童速度训练应以游戏和趣味挑战为主，避免枯燥的直线冲刺。重点在于提升动作频率和反应灵敏度。</p>
                        <ul>
                            <li><strong>初级 (3-6岁):</strong> 追逐游戏、信号反应游戏。</li>
                            <li><strong>中级 (7-12岁):</strong> 敏捷梯、变向跑、小栏架。</li>
                            <li><strong>高级 (12岁+):</strong> 短距离冲刺、结合球类的快速反应训练。</li>
                        </ul>
                    </div>
                </div>
            </div>
            <button onClick={handleExport} className="export-button">获取速度训练方案</button>
        </div>
    );
};

export default SpeedCard;