import React, { memo } from 'react';
import { BarChart2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import SVGCharts from './SVGCharts';

/**
 * 數據分析面板
 */
const AnalysisPanel = memo(({ financial, opsCosts }) => {
    const fmt = formatCurrency;

    const perCapitaStats = [
        { label: '人均月產值', val: financial.totalStud > 0 ? financial.totalRev / financial.totalStud : 0, color: 'text-indigo' },
        { label: '人均薪資支', val: financial.totalStud > 0 ? financial.totalSal / financial.totalStud : 0, color: 'text-rose' },
        { label: '人均營運費', val: financial.totalStud > 0 ? financial.totalOps / financial.totalStud : 0, color: 'text-amber' },
        { label: '人均月淨利', val: financial.totalStud > 0 ? financial.net / financial.totalStud : 0, color: 'text-emerald' }
    ];

    return (
        <div className="boss-analysis-panel">
            <div className="boss-analysis-header">
                <div>
                    <h3 className="boss-analysis-title">Visual analytics</h3>
                    <p className="boss-analysis-subtitle">
                        Operation efficiency & revenue breakdown report
                    </p>
                </div>
                <div className="boss-analysis-kpis">
                    <div className="boss-kpi-card emerald">
                        <p className="boss-kpi-label">NET MARGIN</p>
                        <p className="boss-kpi-value">{financial.margin.toFixed(1)}%</p>
                    </div>
                    <div className="boss-kpi-card blue">
                        <p className="boss-kpi-label">TOTAL SIZE</p>
                        <p className="boss-kpi-value">{financial.totalStud} PAX</p>
                    </div>
                </div>
            </div>

            <SVGCharts financial={financial} opsCosts={opsCosts} />

            <div className="boss-per-capita-grid">
                {perCapitaStats.map((stat, i) => (
                    <div key={i} className="boss-per-capita-card">
                        <p className="boss-per-capita-label">{stat.label}</p>
                        <p className={`boss-per-capita-value ${stat.color}`}>${fmt(stat.val)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
});

AnalysisPanel.displayName = 'AnalysisPanel';

export default AnalysisPanel;
