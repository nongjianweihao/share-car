import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

const ScientificSportsMindmapCard = () => {
    const cardRef = useRef(null);

    const handleExport = () => {
        if (cardRef.current) {
            htmlToImage.toPng(cardRef.current, { backgroundColor: '#FEFEFA', cacheBust: true, pixelRatio: 2 })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = '赢在科学运动力.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };

    return (
        <div className="card-wrapper">
            <div className="card mindmap-card-container" ref={cardRef}>
                <div className="mindmap-header">
                    <h1 className="mindmap-title">赢在科学运动力</h1>
                    <p className="mindmap-quote">“聪明的思考，其实就是理解他人的过程。” —— 爱德华思</p>
                </div>

                <div className="mindmap-grid">
                    <div className="mindmap-main-content">
                        <div className="mindmap-centerpiece">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
                            </svg>
                        </div>
                        <div className="mindmap-quadrants">
                            <div className="mindmap-quadrant">
                                <div className="mindmap-quadrant-header">
                                    <div className="mindmap-icon-circle mindmap-icon-circle-red"><span>🚀</span></div>
                                    <h2 className="mindmap-section-title">01 驱动引擎</h2>
                                </div>
                                <ul>
                                    <li><strong>健壮大脑：</strong>运动促进神经元连接，提升学习效率。</li>
                                    <li><strong>强健体魄：</strong>刺激骨骼和肌肉生长，构建健康基础。</li>
                                    <li><strong>稳定情绪：</strong>释放内啡肽等“快乐激素”，缓解压力。</li>
                                    <li className="mindmap-highlight-box">核心逻辑：身体是革命的本钱</li>
                                </ul>
                            </div>
                            <div className="mindmap-quadrant">
                                <div className="mindmap-quadrant-header">
                                    <div className="mindmap-icon-circle mindmap-icon-circle-blue"><span>💡</span></div>
                                    <h2 className="mindmap-section-title">02 内化心法</h2>
                                </div>
                                <ul>
                                    <li><strong>抓住敏感期：</strong>不同年龄段，有不同的体能发展重点。</li>
                                    <li><strong>趣味性优先：</strong>让孩子爱上运动，是持续的根本。</li>
                                    <li><strong>循序渐进：</strong>科学增加强度，避免运动伤害和厌恶感。</li>
                                    <li className="mindmap-highlight-box">核心逻辑：方向比努力更重要</li>
                                </ul>
                            </div>
                            <div className="mindmap-quadrant">
                                <div className="mindmap-quadrant-header">
                                    <div className="mindmap-icon-circle mindmap-icon-circle-green"><span>🏛️</span></div>
                                    <h2 className="mindmap-section-title">03 重要基石</h2>
                                </div>
                                <ul>
                                    <li><strong>力量：</strong>所有动作的源泉，保护身体的“盔甲”。</li>
                                    <li><strong>耐力：</strong>维持精力的“电池”，专注力的基础。</li>
                                    <li><strong>协调性：</strong>大脑与身体的“通讯网络”，影响灵巧度。</li>
                                    <li className="mindmap-highlight-box">核心逻辑：打好地基才能建高楼</li>
                                </ul>
                            </div>
                            <div className="mindmap-quadrant">
                                <div className="mindmap-quadrant-header">
                                    <div className="mindmap-icon-circle mindmap-icon-circle-purple"><span>🎯</span></div>
                                    <h2 className="mindmap-section-title">04 应用方向</h2>
                                </div>
                                <ul>
                                    <li><strong>提升自信：</strong>在克服挑战中，获得“我能行”的信念。</li>
                                    <li><strong>预防伤害：</strong>一个强壮、灵活的身体更不容易受伤。</li>
                                    <li><strong>增进社交：</strong>在团队运动和游戏中学会合作与竞争。</li>
                                    <li className="mindmap-highlight-box">核心逻辑：收获全面的成长</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mindmap-sidebar">
                        <div className="mindmap-panel">
                            <h3 className="mindmap-panel-red">A. 认知拓展</h3>
                            <p>运动不仅仅是“动身体”，更是在“建大脑”。丰富的感官刺激和肢体活动，能构建更复杂的神经网络，让孩子更聪明。</p>
                        </div>
                        <div className="mindmap-panel">
                            <h3 className="mindmap-panel-blue">B. 效率加速</h3>
                            <p>在对的时间做对的训练，事半功倍。了解6-12岁体能发展的黄金窗口期，针对性地进行力量、速度、协调性训练，效率最高。</p>
                        </div>
                        <div className="mindmap-panel">
                            <h3 className="mindmap-panel-green">C. 持续行动</h3>
                            <div className="mindmap-flow">
                                <div className="mindmap-flow-item">第1步：评估体能短板</div>
                                <div className="mindmap-flow-arrow">↓</div>
                                <div className="mindmap-flow-item">第2步：制定趣味计划</div>
                                <div className="mindmap-flow-arrow">↓</div>
                                <div className="mindmap-flow-item">第3步：形成终身习惯</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleExport} className="export-button">获取科学运动方案</button>
        </div>
    );
};

export default ScientificSportsMindmapCard;
