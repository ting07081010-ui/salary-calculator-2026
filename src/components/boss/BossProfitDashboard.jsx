import React, { useState } from 'react';
import { Users, Plus, Target, Download, Printer, BarChart2 } from 'lucide-react';

// Hooks
import { useBossCalculator } from '../../hooks/useBossCalculator';
import { useBossExport } from '../../hooks/useBossExport';

// Components
import TeacherCard from './TeacherCard';
import OpsCostConfig from './OpsCostConfig';
import AnalysisPanel from './AnalysisPanel';
import StrategyAdvice from './StrategyAdvice';
import BossPrintReport from './BossPrintReport';

// Config
import { BOSS_CONFIG } from '../../config/bossConfig';
import { formatCurrency } from '../../utils/formatters';

// Styles
import './BossDashboard.css';

/**
 * Boss 損益分析儀表板
 * 模組化重構版 - 整合薪資試算 2026 計算邏輯
 */
const BossProfitDashboard = () => {
    const [currentTab, setCurrentTab] = useState('dashboard');
    const [showConfig, setShowConfig] = useState(false);

    // 核心計算 Hook
    const {
        teachers,
        opsCosts,
        financial,
        addTeacher,
        removeTeacher,
        updateTeacherField,
        addClassToTeacher,
        updateClass,
        removeClass,
        updateOpsCost,
        setOpsCosts,
        canAddTeacher
    } = useBossCalculator();

    // 匯出功能 Hook
    const { exportCSV, printReport } = useBossExport({ financial, opsCosts });

    const fmt = formatCurrency;

    return (
        <div className="boss-container">
            {/* Header */}
            <header className="boss-header no-print">
                <div className="boss-header-content">
                    <div className="boss-header-title">
                        <div className="boss-header-icon">
                            <Target className="icon-md" />
                        </div>
                        <div>
                            <h1>Business Intelligence</h1>
                            <div className="boss-progress-bar">
                                <div className="boss-progress-track">
                                    <div
                                        className="boss-progress-fill"
                                        style={{ width: `${Math.min(100, financial.progress)}%` }}
                                    />
                                </div>
                                <span className="boss-progress-text">
                                    目標進度: {financial.progress.toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="boss-header-actions">
                        <div className="boss-net-preview">
                            <p className="boss-net-label">當前預估淨利</p>
                            <p className={`boss-net-value ${financial.net >= 0 ? 'text-emerald' : 'text-rose'}`}>
                                ${fmt(financial.net)}
                            </p>
                        </div>
                        <button onClick={exportCSV} className="boss-action-btn" title="匯出 CSV">
                            <Download className="icon-md" />
                        </button>
                        <button onClick={printReport} className="boss-action-btn primary" title="列印 PDF">
                            <Printer className="icon-md" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Print Report (hidden on screen) */}
            <BossPrintReport financial={financial} opsCosts={opsCosts} />

            <main className="boss-main no-print">
                {/* Tab Navigation */}
                <div className="boss-tabs">
                    <div className="boss-tab-group">
                        <button
                            onClick={() => setCurrentTab('dashboard')}
                            className={`boss-tab ${currentTab === 'dashboard' ? 'active' : ''}`}
                        >
                            <Users className="icon-sm" /> 營運看板
                        </button>
                        <button
                            onClick={() => setCurrentTab('analysis')}
                            className={`boss-tab ${currentTab === 'analysis' ? 'active' : ''}`}
                        >
                            <BarChart2 className="icon-sm" /> 數據分析
                        </button>
                    </div>
                </div>

                {currentTab === 'dashboard' ? (
                    <div className="boss-dashboard-content">
                        {/* Ops Cost Config */}
                        <OpsCostConfig
                            opsCosts={opsCosts}
                            financial={financial}
                            showConfig={showConfig}
                            setShowConfig={setShowConfig}
                            onUpdateCost={updateOpsCost}
                        />

                        {/* Faculty Matrix */}
                        <section className="boss-faculty-section">
                            <div className="boss-faculty-header">
                                <div>
                                    <h2 className="boss-faculty-title">
                                        <Users className="icon-md text-indigo" /> Faculty matrix
                                    </h2>
                                    <p className="boss-faculty-subtitle">
                                        Ideal capacity: {BOSS_CONFIG.MAX_WORKLOAD_POINTS} points. RED alerts triggered on overload.
                                    </p>
                                </div>
                                <button
                                    onClick={addTeacher}
                                    disabled={!canAddTeacher}
                                    className="boss-add-teacher-btn"
                                >
                                    <Plus className="icon-sm" /> 新聘師資
                                </button>
                            </div>

                            <div className="boss-teacher-grid">
                                {financial.teacherData.map(t => (
                                    <TeacherCard
                                        key={t.id}
                                        teacher={t}
                                        onRemove={removeTeacher}
                                        onUpdateField={updateTeacherField}
                                        onAddClass={addClassToTeacher}
                                        onUpdateClass={updateClass}
                                        onRemoveClass={removeClass}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                ) : (
                    <AnalysisPanel financial={financial} opsCosts={opsCosts} />
                )}

                {/* Strategy Advice */}
                <StrategyAdvice financial={financial} />
            </main>

            {/* Footer */}
            <footer className="boss-footer no-print">
                <span>
                    Operation Intelligence System • Enterprise Deployment v3.5 • data logic validated • CSV & PDF enabled
                </span>
            </footer>
        </div>
    );
};

export default BossProfitDashboard;
