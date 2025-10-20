import React, { useRef } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import * as htmlToImage from 'html-to-image';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const FitnessComparisonCard = () => {
    const cardRef = useRef(null);
    const data = {
        labels: ['速度', '力量', '耐力', '协调', '灵敏', '平衡', '柔韧', '核心'],
        datasets: [
            {
                label: '只跑步',
                data: [4, 3, 8, 3, 5, 4, 2, 3],
                backgroundColor: 'rgba(52, 152, 219, 0.4)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(52, 152, 219, 1)',
            },
            {
                label: '全面训练',
                data: [8, 7, 9, 8, 7, 8, 7, 8],
                backgroundColor: 'rgba(241, 196, 15, 0.4)',
                borderColor: 'rgba(241, 196, 15, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(241, 196, 15, 1)',
            },
        ],
    };

    const options: ChartOptions<'radar'> = {
        scales: {
            r: {
                angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                grid: { color: 'rgba(0, 0, 0, 0.1)' },
                pointLabels: { font: { size: 14 } },
                suggestedMin: 0,
                suggestedMax: 10,
                ticks: {
                    stepSize: 2,
                    backdropColor: 'transparent',
                }
            },
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 16,
                    }
                }
            },
        },
        maintainAspectRatio: false,
    };

    const handleExport = () => {
        if (cardRef.current) {
            htmlToImage.toPng(cardRef.current, { backgroundColor: '#FFFFFF', cacheBust: true, pixelRatio: 2 })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = '跑步vs全面体能.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };

    return (
        <div className="card-wrapper">
            <div className="card" ref={cardRef}>
                <div className="header">
                    <h1>跑步 ≠ 全面体能</h1>
                    <p>只练有氧，难补速度/力量/协调</p>
                </div>
                <div className="content">
                    <div className="chart-container">
                        <Radar data={data} options={options} />
                    </div>
                    <div className="info-cards">
                        <div className="info-card"><strong>跑步主要提升有氧耐力</strong>，但其它身体素质刺激不足。</div>
                        <div className="info-card"><strong>儿童期是体能黄金敏感期。</strong>就像只背单词不写作文，基础不全，未来发展的天花板很低。</div>
                    </div>
                </div>
            </div>
            <button onClick={handleExport} className="export-button">测测孩子8项体能短板</button>
        </div>
    );
};

export default FitnessComparisonCard;