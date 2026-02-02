import React, { memo } from 'react';
import { Settings, Home, CreditCard, Megaphone, UserPlus, Package } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

/**
 * 營運成本設定面板
 */
const OpsCostConfig = memo(({
    opsCosts,
    financial,
    showConfig,
    setShowConfig,
    onUpdateCost
}) => {
    const fmt = formatCurrency;

    const configItems = [
        { label: '每月房租', key: 'rent', icon: <Home className="icon-xs" /> },
        { label: '貸款償還', key: 'loan', icon: <CreditCard className="icon-xs" /> },
        { label: '行銷推廣', key: 'marketing', icon: <Megaphone className="icon-xs" /> },
        { label: 'PT支援基數', key: 'ptSupportBase', icon: <UserPlus className="icon-xs" /> },
        { label: '學員雜費/人', key: 'miscPerStudent', icon: <Package className="icon-xs" /> }
    ];

    return (
        <section className="boss-ops-section">
            <div className="boss-ops-header">
                <h2 className="boss-ops-title">
                    <Settings className="icon-sm" /> 營運成本核心參數
                </h2>
                <button
                    onClick={() => setShowConfig(!showConfig)}
                    className="boss-ops-toggle"
                >
                    {showConfig ? '完成調整' : '展開參數調整'}
                </button>
            </div>

            {showConfig ? (
                <div className="boss-ops-grid">
                    {configItems.map(item => (
                        <div key={item.key} className="boss-ops-input-card">
                            <label className="boss-ops-label">
                                {item.icon} {item.label}
                            </label>
                            <input
                                type="number"
                                value={opsCosts[item.key]}
                                onChange={(e) => onUpdateCost(item.key, e.target.value)}
                                className="boss-ops-input"
                                placeholder="0"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="boss-ops-summary">
                    <div className="boss-ops-summary-item">
                        <span className="boss-ops-summary-label">PT支援費:</span>
                        <span className="boss-ops-summary-value">${fmt(financial.ptCost)}</span>
                    </div>
                    <div className="boss-ops-summary-item">
                        <span className="boss-ops-summary-label">行政雜費:</span>
                        <span className="boss-ops-summary-value">${fmt(financial.misc)}</span>
                    </div>
                    <div className="boss-ops-summary-item">
                        <span className="boss-ops-summary-label">超額房租:</span>
                        <span className={`boss-ops-summary-value ${financial.extraRent >= 35000 ? 'text-rose' : ''}`}>
                            ${fmt(financial.extraRent)}
                        </span>
                    </div>
                    <div className="boss-ops-summary-item">
                        <span className="boss-ops-summary-label">Students:</span>
                        <span className="boss-ops-summary-value text-blue">{financial.totalStud} / 180</span>
                    </div>
                </div>
            )}
        </section>
    );
});

OpsCostConfig.displayName = 'OpsCostConfig';

export default OpsCostConfig;
