import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

const ScientificSportsCard = () => {
    const cardRef = useRef(null);

    const handleExport = () => {
        if (cardRef.current) {
            htmlToImage.toPng(cardRef.current, { backgroundColor: '#fff9e6', cacheBust: true, pixelRatio: 2 })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = '科学运动.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };

    return (
        <div className="card-wrapper">
            <div className="card sports-card-container" ref={cardRef}>
                <div className="sports-main-content">
                    <div className="sports-header">
                        <span className="sports-title">科学运动</span>
                        <p className="sports-quote">“真正的教育是让孩子在运动中学会思考”</p>
                    </div>
                    <div className="sports-centerpiece">
                        <div className="sports-brain-icon">🧠</div>
                        <div className="sports-principle sports-p1">
                            <div className="icon">🤸</div>
                            <div className="text">全面发展</div>
                        </div>
                         <div className="sports-principle sports-p2">
                            <div className="icon">📈</div>
                            <div className="text">尊重规律</div>
                        </div>
                         <div className="sports-principle sports-p3">
                            <div className="icon">🎲</div>
                            <div className="text">趣味优先</div>
                        </div>
                         <div className="sports-principle sports-p4">
                            <div className="icon">🛡️</div>
                            <div className="text">安全第一</div>
                        </div>
                    </div>
                </div>
                <div className="sports-sidebar">
                    <div className="sports-action-item">
                        <div className="sports-action-title">A. 评估先行</div>
                        <div className="sports-action-content">
                           <p>了解孩子当前体能水平，不做“一刀切”训练。</p>
                        </div>
                    </div>
                     <div className="sports-action-item">
                        <div className="sports-action-title">B. 过程 > 结果</div>
                        <div className="sports-action-content">
                           <p>关注运动的乐趣和习惯养成，而非竞技成绩。</p>
                        </div>
                    </div>
                     <div className="sports-action-item">
                        <div className="sports-action-title">C. 长期主义</div>
                        <div className="sports-action-content">
                           <p>体能是终身投资，重在坚持和积累，而非短期速成。</p>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleExport} className="export-button">获取科学运动方案</button>
        </div>
    );
};

export default ScientificSportsCard;
