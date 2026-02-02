import React, { memo } from 'react';
import { Activity, AlertTriangle, Lightbulb, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

/**
 * 策略建議卡片元件
 */
const StrategyAdvice = memo(({ financial }) => {
    const fmt = formatCurrency;

    const getAdviceIcon = (type) => {
        switch (type) {
            case 'warning': return <AlertTriangle className="icon-md text-rose" />;
            case 'info': return <Lightbulb className="icon-md text-amber" />;
            case 'success': return <CheckCircle className="icon-md text-emerald" />;
            default: return <Activity className="icon-md text-slate" />;
        }
    };

    return (
        <div className="boss-strategy-card">
            <div className="boss-strategy-glow" />

            <div className="boss-strategy-content">
                {/* Left: Progress */}
                <div className="boss-strategy-progress">
                    <p className="boss-strategy-label">Goal completion progress</p>
                    <h3 className="boss-strategy-percent">
                        {financial.progress.toFixed(0)}
                        <span className="boss-strategy-percent-sign">%</span>
                    </h3>
                    <div className="boss-strategy-students">
                        <Activity className="icon-sm text-emerald animate-pulse" />
                        School Scale: {financial.totalStud} students
                    </div>
                </div>

                {/* Right: Advice & Stats */}
                <div className="boss-strategy-details">
                    <div className="boss-advice-box">
                        <div className="boss-advice-header">
                            {getAdviceIcon(financial.advice.type)}
                            <h4>Operation intelligence guidance</h4>
                        </div>
                        <p className="boss-advice-content">
                            「{financial.advice.content}」
                        </p>
                    </div>

                    <div className="boss-stats-row">
                        <div className="boss-stat-item">
                            <p className="boss-stat-label">Total Salary</p>
                            <p className="boss-stat-value">-${fmt(financial.totalSal)}</p>
                        </div>
                        <div className="boss-stat-item bordered">
                            <p className="boss-stat-label">Op Expenses</p>
                            <p className="boss-stat-value">-${fmt(financial.totalOps)}</p>
                        </div>
                        <div className="boss-stat-item bordered">
                            <p className="boss-stat-label">Margin rate</p>
                            <p className="boss-stat-value text-indigo">{financial.margin.toFixed(1)}%</p>
                        </div>
                        <div className="boss-stat-highlight">
                            <p className="boss-stat-label">Net Profit</p>
                            <p className="boss-stat-value">${fmt(financial.net)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

StrategyAdvice.displayName = 'StrategyAdvice';

export default StrategyAdvice;
