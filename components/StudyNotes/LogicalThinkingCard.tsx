import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

const LogicalThinkingCard = () => {
    const cardRef = useRef(null);

    const handleExport = () => {
        if (cardRef.current) {
            htmlToImage.toPng(cardRef.current, { backgroundColor: '#fdfdfb', cacheBust: true, pixelRatio: 2 })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = '逻辑思考力.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };

    return (
        <div className="card-wrapper">
            <div className="card logical-thinking-card" ref={cardRef}>
                <div className="lt-header">
                    <div className="lt-title-wrapper">
                         <h1 className="lt-title">赢在逻辑思考力</h1>
                    </div>
                    <p className="lt-quote">“逻辑思考，其实就是理解他人的过程。”</p>
                </div>

                <div className="lt-grid">
                    <div className="lt-main">
                        <img src="https://img.icons8.com/plasticine/100/000000/lightbulb-idea.png" alt="Lightbulb" className="lt-lightbulb" />
                        
                        <div className="lt-section">
                            <h2 className="lt-section-title">01. 4大核心思维</h2>
                            <p>从结论到要点 → 多问</p>
                            <p>从未说到已知 → 好奇心</p>
                            <p>从狭隘到无限 → 成长心</p>
                        </div>
                         <div className="lt-section">
                            <h2 className="lt-section-title">02. 内化心法</h2>
                            <p>结论先行 → 聚焦</p>
                            <p>由上到下 → 发散</p>
                            <p>归类分组 → 收敛</p>
                        </div>

                    </div>
                    <div className="lt-sidebar">
                        <div className="lt-sidebar-section">
                            <h3 className="lt-sidebar-title">A. 扩大认知边界</h3>
                            <div className="lt-rocket-diagram">
                                <span>已知 → 🚀 → 未知边界</span>
                            </div>
                        </div>
                        <div className="lt-sidebar-section">
                            <h3 className="lt-sidebar-title">B. 增加逻辑递进</h3>
                             <div className="lt-bulbs-diagram">
                                <span>💡 → 💡💡 → 💡💡💡</span>
                                <p>资讯少 → 归纳法 → 逻辑宽度</p>
                            </div>
                        </div>
                        <div className="lt-sidebar-section">
                            <h3 className="lt-sidebar-title">C. 持续行动</h3>
                             <div className="lt-pyramid-diagram">
                                <p>▲ 增加行动力</p>
                                <p>▲▲ 增加思考深度</p>
                                <p>▲▲▲ 增加知识储备</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleExport} className="export-button">导出逻辑导图</button>
        </div>
    );
};

export default LogicalThinkingCard;