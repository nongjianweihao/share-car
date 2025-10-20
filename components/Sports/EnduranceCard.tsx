import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

const EnduranceCard = () => {
    const cardRef = useRef(null);

    const handleExport = () => {
        if (cardRef.current) {
            htmlToImage.toPng(cardRef.current, { backgroundColor: '#f0f2f5', cacheBust: true, pixelRatio: 2 })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = '耐力素质.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };

    return (
        <div className="card-wrapper">
            <div className="card" ref={cardRef} style={{ background: '#f0f2f5', padding: '20px' }}>
                <div className="endurance-grid-container">
                    <div className="endurance-item endurance-intro">
                        <h2>耐力素质</h2>
                        <h3>持久活力的引擎</h3>
                        <p>儿童耐力素质不仅是长跑能力，更是身体持续进行活动、抵抗疲劳的能力。良好的耐力是孩子保持一天精力充沛、课堂注意力集中的基础。</p>
                        <div className="endurance-tags">
                            <span>心肺功能</span>
                            <span>持续运动</span>
                            <span>抗疲劳</span>
                        </div>
                    </div>
                    <div className="endurance-item endurance-types">
                        <h4>耐力的两种形态</h4>
                        <ul>
                            <li><span>❤️</span> <strong>心肺耐力:</strong> 心脏和肺部在持续活动中输送氧气的能力。</li>
                            <li><span>💪</span> <strong>肌肉耐力:</strong> 肌肉在一段时间内反复收缩而不感到疲劳的能力。</li>
                        </ul>
                    </div>
                    <div className="endurance-item endurance-crisis">
                        <h4>现代儿童的耐力“危机”</h4>
                        <p>长时间的静态活动和屏幕时间取代了户外跑跳，导致儿童心肺功能锻炼不足，活动稍久便气喘吁吁，影响参与体育活动的积极性。</p>
                    </div>
                    <div className="endurance-item endurance-myths">
                        <h4>常见误区澄清</h4>
                         <ul>
                            <li><strong>误区：</strong>耐力训练就是枯燥的长跑。</li>
                            <li><strong>事实：</strong>儿童耐力应通过多样化的趣味游戏培养，如球类、游泳、追逐跑，保持高昂兴趣是关键，而非强调距离。</li>
                        </ul>
                    </div>
                    <div className="endurance-item endurance-benefits">
                         <h4>耐力训练的好处</h4>
                         <ul>
                            <li>✓ 强化心肺功能，促进健康发育</li>
                            <li>✓ 提升专注力和学习效率</li>
                            <li>✓ 增强意志品质和抗挫折能力</li>
                            <li>✓ 维持健康的体重</li>
                         </ul>
                    </div>
                    <div className="endurance-item endurance-howto">
                        <h4>如何科学地练耐力？</h4>
                        <p>儿童耐力训练的核心是“长时间、低强度”，在玩乐中不知不觉地提升。重点是延长总的活动时间。</p>
                        <ul>
                            <li><strong>初级 (3-6岁):</strong> 长时间的户外游戏，如捉迷藏、骑小自行车。</li>
                            <li><strong>中级 (7-12岁):</strong> 游泳、足球、篮球等持续性运动。</li>
                            <li><strong>高级 (12岁+):</strong> 间歇跑、循环训练、长距离骑行。</li>
                        </ul>
                    </div>
                </div>
            </div>
            <button onClick={handleExport} className="export-button">获取耐力训练方案</button>
        </div>
    );
};

export default EnduranceCard;