import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

const NonviolentCommunicationCard = () => {
    const cardRef = useRef(null);

    const handleExport = () => {
        if (cardRef.current) {
            htmlToImage.toPng(cardRef.current, { backgroundColor: '#FFFFFF', cacheBust: true, pixelRatio: 2 })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = '非暴力沟通.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };

    return (
        <div className="card-wrapper">
            <div className="card" ref={cardRef}>
                <div className="nvc-grid-container">
                    <div className="nvc-item nvc-intro">
                        <div className="header" style={{ marginBottom: '10px' }}>
                            <h1 style={{ color: 'white' }}>非暴力沟通 (NVC)</h1>
                            <p style={{ color: '#eee' }}>通往理解与合作的桥梁</p>
                        </div>
                        <p>非暴力沟通是一个强大的沟通模式，它帮助我们在任何情境下都能建立人与人之间真诚的连接，即使在最紧张的时刻也能保持人性化的沟通。</p>
                    </div>

                    <div className="nvc-item nvc-observation">
                        <h4>1. 观察 (Observation) 👁️</h4>
                        <p><strong>做什么：</strong> 客观地描述事实，就像录像机一样记录发生了什么。</p>
                        <p><strong>避免：</strong> 评论、判断或指责。例如，不说“你总是迟到”，而是说“我看到你这次会议迟到了10分钟”。</p>
                    </div>

                    <div className="nvc-item nvc-feelings">
                        <h4>2. 感受 (Feelings) ❤️</h4>
                        <p><strong>做什么：</strong> 清楚地表达自己的情绪。</p>
                        <p><strong>避免：</strong> 将想法或指责伪装成感受。例如，不说“我觉得被你忽略了”，而是说“当你没回复我的信息时，我感到很失落”。</p>
                    </div>

                    <div className="nvc-item nvc-needs">
                        <h4>3. 需要 (Needs) 🌱</h4>
                        <p><strong>做什么：</strong> 说出是哪些内在需求导致了这些感受。</p>
                        <p><strong>例如：</strong> “我感到失落，因为我需要被尊重和被看见。” 需求是普世的，如安全、尊重、理解、爱等。</p>
                    </div>

                    <div className="nvc-item nvc-requests">
                        <h4>4. 请求 (Requests) 🙏</h4>
                        <p><strong>做什么：</strong> 提出一个具体的、可行的、积极的请求，而非命令。</p>
                        <p><strong>例如：</strong> “你是否愿意在下次会议前，如果可能迟到，提前给我发个信息？”</p>
                    </div>

                    <div className="nvc-item nvc-summary">
                        <p><strong>核心公式：</strong> “当我看到/听到... (观察)，我感到... (感受)，因为我需要... (需要)。你是否愿意... (请求)？”</p>
                    </div>
                </div>
            </div>
            <button onClick={handleExport} className="export-button">获取NVC实践清单</button>
        </div>
    );
};

export default NonviolentCommunicationCard;
