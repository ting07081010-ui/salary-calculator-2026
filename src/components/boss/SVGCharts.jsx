import React, { memo } from 'react';
import { formatCurrency } from '../../utils/formatters';

/**
 * SVG 圖表元件
 */
const SVGCharts = memo(({ financial, opsCosts }) => {
    const fmt = formatCurrency;

    const data = [
        { name: '薪資總額', val: financial.totalSal, color: '#f43f5e' },
        { name: '營運費用', val: financial.totalOps, color: '#6366f1' },
        { name: '預估淨利', val: Math.max(0, financial.net), color: '#10b981' }
    ];

    const total = data.reduce((s, i) => s + i.val, 0);
    let cumulative = 0;

    const barData = [
        { label: '老師薪資總計', val: financial.totalSal, color: 'bg-rose' },
        { label: '房租與固定費', val: opsCosts.rent + opsCosts.loan, color: 'bg-indigo' },
        { label: '支援 PT 基數', val: financial.ptCost, color: 'bg-amber' },
        { label: '超額租金/雜費', val: financial.extraRent + financial.misc, color: 'bg-orange' }
    ];

    const maxBarVal = Math.max(...barData.map(b => b.val), 1);

    return (
        <div className="boss-charts-grid">
            {/* Pie Chart */}
            <div className="boss-chart-card">
                <h4 className="boss-chart-title">營收結構分佈</h4>
                <svg viewBox="0 0 100 100" className="boss-pie-chart">
                    {data.map((item, idx) => {
                        if (item.val <= 0 || total === 0) return null;
                        const angle = (item.val / total) * 360;
                        const start = cumulative;
                        cumulative += angle;
                        const x1 = 50 + 40 * Math.cos((start * Math.PI) / 180);
                        const y1 = 50 + 40 * Math.sin((start * Math.PI) / 180);
                        const x2 = 50 + 40 * Math.cos(((start + angle) * Math.PI) / 180);
                        const y2 = 50 + 40 * Math.sin(((start + angle) * Math.PI) / 180);
                        return (
                            <path
                                key={idx}
                                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2} Z`}
                                fill={item.color}
                                className="boss-pie-segment"
                            />
                        );
                    })}
                    <circle cx="50" cy="50" r="25" fill="#0f172a" />
                </svg>
                <div className="boss-pie-legend">
                    {data.map((item, i) => (
                        <div key={i} className="boss-legend-item">
                            <div className="boss-legend-label">
                                <div className="boss-legend-dot" style={{ backgroundColor: item.color }} />
                                <span>{item.name}</span>
                            </div>
                            <span className="boss-legend-percent">
                                {total > 0 ? ((item.val / total) * 100).toFixed(1) : 0}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bar Chart */}
            <div className="boss-chart-card">
                <h4 className="boss-chart-title">損益平衡細節</h4>
                <div className="boss-bar-chart">
                    {barData.map((bar, i) => (
                        <div key={i} className="boss-bar-item">
                            <div className="boss-bar-header">
                                <span>{bar.label}</span>
                                <span>${fmt(bar.val)}</span>
                            </div>
                            <div className="boss-bar-track">
                                <div
                                    className={`boss-bar-fill ${bar.color}`}
                                    style={{ width: `${(bar.val / maxBarVal) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

SVGCharts.displayName = 'SVGCharts';

export default SVGCharts;
