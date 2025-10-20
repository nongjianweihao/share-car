import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

const StrengthCard = () => {
    const cardRef = useRef<HTMLDivElement | null>(null);

    const handleExport = () => {
        if (cardRef.current) {
            htmlToImage
                .toPng(cardRef.current, { backgroundColor: '#f0f2f5', cacheBust: true, pixelRatio: 2 })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = '力量速度耐力整合卡.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };

    return (
        <div className="card-wrapper">
            <div className="card strength-speed-card" ref={cardRef}>
                <div className="strength-speed-grid">
                    <section className="grid-block strength-hero">
                        <div className="hero-header">
                            <span className="badge-pill">基础体能三角</span>
                            <h2>力量 · 速度 · 耐力</h2>
                            <p>
                                三大基础体能彼此牵引，决定孩子在运动中的爆发、控制与续航。以力量打底、速度点燃、耐力托举，
                                才能构筑抗压、不易受伤的运动体质。
                            </p>
                            <div className="chip-group">
                                <span>动作控制</span>
                                <span>运动表现</span>
                                <span>健康成长</span>
                            </div>
                        </div>
                        <div className="hero-insights">
                            <h3>力量核心要素</h3>
                            <ul>
                                <li>神经肌肉协同：优先建立稳定与激活路径。</li>
                                <li>核心支撑：躯干稳定决定四肢输出效率。</li>
                                <li>渐进超负荷：通过阻力、次数或节奏循序推进。</li>
                            </ul>
                        </div>
                    </section>

                    <section className="grid-block hero-media">
                        <img
                            src="https://images.unsplash.com/photo-1541537103745-ea3429c65dc4?auto=format&fit=crop&w=600&q=80"
                            alt="孩子们进行多样化的体能训练"
                        />
                        <p>多元运动情境唤醒力量、速度与耐力的协同输出。</p>
                    </section>

                    <section className="grid-block speed-panel">
                        <h3>速度素质</h3>
                        <p>强调反应、动作频率与位移效率，依赖敏捷的神经系统与轻盈的肌肉力量。</p>
                        <ul>
                            <li>反应速度：信号识别与决策的毫秒响应。</li>
                            <li>动作速度：单个动作完成的节奏与协调。</li>
                            <li>位移速度：爆发起跑与加速中的持续推进。</li>
                        </ul>
                        <div className="tip-label">灵敏路线：游戏化追逐、变向与节奏变化。</div>
                    </section>

                    <section className="grid-block endurance-panel">
                        <h3>耐力素质</h3>
                        <p>是能量供应与节奏控制的组合，帮助孩子保持长时间专注与活力。</p>
                        <ul>
                            <li>心肺耐力：氧气输送与心率调控的稳定性。</li>
                            <li>肌肉耐力：重复动作时延缓疲劳的能力。</li>
                            <li>节奏策略：懂得分配体力、合理安排恢复。</li>
                        </ul>
                        <div className="tip-label warm">稳定路线：低强度长时间活动，建立基础。</div>
                    </section>

                    <section className="grid-block training-panel">
                        <h3>每周训练拼图</h3>
                        <div className="training-columns">
                            <div>
                                <h4>力量日</h4>
                                <ul>
                                    <li>动物爬行、悬垂举膝、弹力带深蹲</li>
                                    <li>2-3 组 × 8-12 次，注重动作质量</li>
                                </ul>
                            </div>
                            <div>
                                <h4>速度日</h4>
                                <ul>
                                    <li>信号启动冲刺、敏捷梯节奏</li>
                                    <li>短距离、充分休息，保持爆发感</li>
                                </ul>
                            </div>
                            <div>
                                <h4>耐力日</h4>
                                <ul>
                                    <li>球类循环、间歇慢跑、长时间户外游戏</li>
                                    <li>20-30 分钟，心率维持在轻喘区间</li>
                                </ul>
                            </div>
                        </div>
                        <p className="footnote">穿插柔韧与感统训练，让身体在张弛之间完成恢复。</p>
                    </section>
                </div>
            </div>
            <button onClick={handleExport} className="export-button">获取体能整合方案</button>
        </div>
    );
};

export default StrengthCard;
