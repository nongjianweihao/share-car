import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

const DoseEffectCard = () => {
    const cardRef = useRef<HTMLDivElement | null>(null);

    const handleExport = () => {
        if (cardRef.current) {
            htmlToImage.toPng(cardRef.current, { backgroundColor: '#f0f2f5', cacheBust: true, pixelRatio: 2 })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = 'DOSE效应.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };

    return (
        <div className="card-wrapper">
             <div className="card" ref={cardRef} style={{ background: '#f0f2f5', padding: '20px' }}>
                <div className="dose-grid-container">
                    <div className="dose-item dose-intro">
                        <h2>DOSE效应</h2>
                        <h3>优化你的大脑和身体</h3>
                        <p>DOSE是指多巴胺(Dopamine)、催产素(Oxytocin)、血清素(Serotonin)和内啡肽(Endorphin)。我们的大脑不是由理性或情绪单独驱动的，而是由一套精密的神经调节系统掌控。</p>
                        <p>DOSE不是理性，也不是情绪，而是介于情绪和理性之间的一个中间调控层，可以称为「神经调节」。现在科学家已经逐渐阐明了神经调节的机制，和优化DOSE的方法。</p>
                        <div className="dose-tags">
                            <span>神经科学</span>
                            <span>大脑优化</span>
                            <span>幸福感</span>
                        </div>
                    </div>
                    <div className="dose-item dose-tiers">
                         <h4>大脑决策系统的三个层级</h4>
                         <ul>
                            <li><span>⚡️</span> 第一层：情绪反应 (边缘系统)</li>
                            <li><span>🎯</span> 第二层：神经调节 (DOSE)</li>
                            <li><span>💡</span> 第三层：理性思维</li>
                         </ul>
                         <p>理性是一种硬约束机制，直接压制情绪，会让人很难受。而神经调节系统能自动调节情绪，根据平时的经验引导你做正确的事情。</p>
                    </div>
                    <div className="dose-item dose-crisis">
                        <h4>现代生活的神经科学危机</h4>
                        <p>原始大脑遭遇数字时代：大脑这套系统是为非洲草原上的生活环境准备的，不太适应现代生活。今天，糖、酒精和短视频以极高的频率轻易调动你的多巴胺。网上的点赞和评论取代了完整的人际关系。我们大部分时间待在室内，缺少阳光、作息紊乱，导致血清素水平下降。</p>
                    </div>
                    <div className="dose-item dose-dopamine">
                         <h4>📍 多巴胺 (D)</h4>
                         <p>多巴胺让你识别目标，并且产生对目标达成后的奖赏的预期。它不是奖励物质，而是激励。</p>
                         <div className="dose-quote">成功者最大的秘密是「乐」在其中，这个乐，主要来自多巴胺。</div>
                    </div>
                    <div className="dose-item dose-comparison">
                        <h4>快多巴胺 vs 慢多巴胺</h4>
                        <ul>
                            <li><b>快多巴胺：</b>高起点、小波动、快消退，容易上瘾</li>
                            <li><b>慢多巴胺：</b>低起点、慢上升、慢消退，能激励</li>
                        </ul>
                        <p>快多巴胺让你上瘾，慢多巴胺给你赋能。我们应该防止沉溺于快多巴胺，多来点慢多巴胺。</p>
                    </div>
                    <div className="dose-item dose-oxytocin">
                        <h4>❤️ 催产素 (O)</h4>
                        <p>催产素帮助建立人与人之间的信任感和亲密感。它是一种促使人与人之间建立联结的神经物质。</p>
                         <div className="dose-quote">对健康伤害最大的，不是抽烟也不是喝酒，而是孤独感。</div>
                    </div>
                    <div className="dose-item dose-oxytocin-howto">
                        <h4>提升催产素的方法</h4>
                        <ul>
                            <li>参与社交活动</li>
                            <li>身体接触，特别是拥抱</li>
                            <li>为别人做点什么</li>
                        </ul>
                        <p>提升催产素更深刻的方式，是真正在“为别人做点什么”。当你为别人付出时，你会生出一种温暖和平静的感觉。</p>
                    </div>
                </div>
            </div>
            <button onClick={handleExport} className="export-button">导出分享图片</button>
        </div>
    );
};

export default DoseEffectCard;