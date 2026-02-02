import React, { memo } from 'react';
import { Award } from 'lucide-react';
import { TEACHER_TYPES } from '../config/salaryConfig';
import { formatCurrency } from '../utils/formatters';

/**
 * 核心看板面板
 * 顯示底薪、績效獎金、總額
 */
const DashboardPanel = memo(({
    teacherType,
    totalBase,
    ptTotalHours,
    totalTeachingSub,
    ptExtraPay,
    grandTotal
}) => {
    const isFullTime = teacherType === TEACHER_TYPES.FULL_TIME;
    const fmt = formatCurrency;

    return (
        <section className="dashboard">
            {/* 底薪/時數卡片 */}
            <div className="dashboard-card">
                <p className="dashboard-label">
                    {isFullTime ? '固定本薪' : 'PT 總時數'}
                </p>
                <div className="dashboard-value">
                    <span className="dashboard-number">
                        {isFullTime ? `$${fmt(totalBase)}` : ptTotalHours}
                    </span>
                    <span className="dashboard-unit">
                        {isFullTime ? '/月' : 'hr'}
                    </span>
                </div>
            </div>

            {/* 績效獎金卡片 */}
            <div className="dashboard-card">
                <p className="dashboard-label">績效獎金 / 酬勞</p>
                <div className="dashboard-value">
                    <span className={`dashboard-number ${isFullTime ? 'text-indigo' : 'text-emerald'}`}>
                        +${fmt(totalTeachingSub + ptExtraPay)}
                    </span>
                    <span className="dashboard-unit">/月</span>
                </div>
            </div>

            {/* 總額卡片 */}
            <div className={`dashboard-card-highlight ${isFullTime ? 'bg-indigo-gradient' : 'bg-amber-gradient'}`}>
                <div className="dashboard-highlight-content">
                    <p className="dashboard-highlight-label">單月預估總額</p>
                    <div className="dashboard-highlight-value">
                        <span>${fmt(grandTotal)}</span>
                    </div>
                </div>
                <Award className="dashboard-highlight-icon" />
            </div>
        </section>
    );
});

DashboardPanel.displayName = 'DashboardPanel';

export default DashboardPanel;
