/**
 * 後台設定面板主元件
 * 提供完整的參數管理介面
 */
import React, { useRef } from 'react';
import {
    Settings, DollarSign, Users, Building2, Target,
    Save, RotateCcw, Download, Upload, AlertTriangle,
    Clock, TrendingUp, Home
} from 'lucide-react';

import { useSettings, DEFAULT_SETTINGS } from '../../context/SettingsContext';
import SettingsSection from './SettingsSection';
import BonusTableEditor from './BonusTableEditor';
import './AdminSettings.css';

const AdminSettingsPanel = () => {
    const {
        settings,
        isDirty,
        updateSetting,
        updateNestedSetting,
        saveSettings,
        resetToDefaults,
        exportSettings,
        importSettings
    } = useSettings();

    const fileInputRef = useRef(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                await importSettings(file);
                alert('設定匯入成功！');
            } catch (err) {
                alert('匯入失敗：' + err.message);
            }
        }
        e.target.value = '';
    };

    const handleReset = () => {
        if (confirm('確定要重設所有設定為預設值嗎？此操作無法復原。')) {
            resetToDefaults();
        }
    };

    const fmt = (n) => n?.toLocaleString('zh-TW') || '0';

    return (
        <div className="admin-container">
            {/* Header */}
            <header className="admin-header">
                <div className="admin-header-content">
                    <div className="admin-header-title">
                        <a href="/" className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center mr-2" title="回首頁">
                            <Home className="icon-md" />
                        </a>
                        <div className="admin-header-icon">
                            <Settings className="icon-md" />
                        </div>
                        <div>
                            <h1>系統設定</h1>
                            <p className="admin-header-subtitle">
                                調整計算參數，變更將即時影響所有頁面
                            </p>
                        </div>
                    </div>

                    <div className="admin-header-actions">
                        {isDirty && (
                            <span className="admin-dirty-badge">
                                <AlertTriangle className="icon-xs" /> 未儲存
                            </span>
                        )}
                        <button onClick={saveSettings} className="admin-btn primary">
                            <Save className="icon-sm" /> 儲存
                        </button>
                        <button onClick={exportSettings} className="admin-btn">
                            <Download className="icon-sm" /> 匯出
                        </button>
                        <button onClick={handleImportClick} className="admin-btn">
                            <Upload className="icon-sm" /> 匯入
                        </button>
                        <button onClick={handleReset} className="admin-btn danger">
                            <RotateCcw className="icon-sm" /> 重設
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".json"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
            </header>

            <main className="admin-main">
                {/* 核心財務設定 */}
                <SettingsSection title="核心財務參數" icon={DollarSign} badge="高重要性">
                    <div className="admin-grid cols-2">
                        <div className="admin-field">
                            <label>正職底薪</label>
                            <div className="admin-input-group">
                                <span className="admin-input-prefix">$</span>
                                <input
                                    type="number"
                                    value={settings.fullTimeBaseSalary}
                                    onChange={(e) => updateSetting('fullTimeBaseSalary', parseInt(e.target.value) || 0)}
                                />
                            </div>
                            <span className="admin-field-hint">預設: ${fmt(DEFAULT_SETTINGS.fullTimeBaseSalary)}</span>
                        </div>

                        <div className="admin-field">
                            <label>PT 基本時薪</label>
                            <div className="admin-input-group">
                                <span className="admin-input-prefix">$</span>
                                <input
                                    type="number"
                                    value={settings.ptBaseHourlyRate}
                                    onChange={(e) => updateSetting('ptBaseHourlyRate', parseInt(e.target.value) || 0)}
                                />
                            </div>
                            <span className="admin-field-hint">預設: ${fmt(DEFAULT_SETTINGS.ptBaseHourlyRate)}</span>
                        </div>

                        <div className="admin-field">
                            <label>課程期數 (月)</label>
                            <input
                                type="number"
                                step="0.5"
                                value={settings.termMonths}
                                onChange={(e) => updateSetting('termMonths', parseFloat(e.target.value) || 4.5)}
                            />
                            <span className="admin-field-hint">預設: {DEFAULT_SETTINGS.termMonths} 個月</span>
                        </div>

                        <div className="admin-field">
                            <label>目標學員數</label>
                            <div className="admin-input-group">
                                <input
                                    type="number"
                                    value={settings.goalStudents}
                                    onChange={(e) => updateSetting('goalStudents', parseInt(e.target.value) || 180)}
                                />
                                <span className="admin-input-suffix">人</span>
                            </div>
                            <span className="admin-field-hint">預設: {DEFAULT_SETTINGS.goalStudents} 人</span>
                        </div>
                    </div>
                </SettingsSection>

                {/* 學費設定 */}
                <SettingsSection title="學費設定 (一期)" icon={TrendingUp} badge="高重要性">
                    <div className="admin-tuition-grid">
                        <div className="admin-tuition-section">
                            <h4>標準班</h4>
                            <div className="admin-grid cols-3">
                                {[5, 10, 15].map(type => (
                                    <div key={type} className="admin-field">
                                        <label>{type}人班</label>
                                        <div className="admin-input-group">
                                            <span className="admin-input-prefix">$</span>
                                            <input
                                                type="number"
                                                value={settings.tuitionFees?.standard?.[type] || 0}
                                                onChange={(e) => updateNestedSetting(
                                                    `tuitionFees.standard.${type}`,
                                                    parseInt(e.target.value) || 0
                                                )}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="admin-tuition-section">
                            <h4>進階班</h4>
                            <div className="admin-grid cols-3">
                                {[5, 10, 15].map(type => (
                                    <div key={type} className="admin-field">
                                        <label>{type}人班</label>
                                        <div className="admin-input-group">
                                            <span className="admin-input-prefix">$</span>
                                            <input
                                                type="number"
                                                value={settings.tuitionFees?.advanced?.[type] || 0}
                                                onChange={(e) => updateNestedSetting(
                                                    `tuitionFees.advanced.${type}`,
                                                    parseInt(e.target.value) || 0
                                                )}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </SettingsSection>

                {/* 正職獎金表 */}
                <SettingsSection title="正職獎金級距" icon={TrendingUp} badge="中重要性" defaultOpen={false}>
                    <BonusTableEditor
                        title="依學生人數對應的額外獎金"
                        data={settings.fullTimeBonusMap}
                        onChange={(newData) => updateSetting('fullTimeBonusMap', newData)}
                        valueLabel="獎金"
                    />
                </SettingsSection>

                {/* PT 時薪表 */}
                <SettingsSection title="PT 時薪級距" icon={Clock} badge="中重要性" defaultOpen={false}>
                    <BonusTableEditor
                        title="依學生人數對應的動態時薪"
                        data={settings.ptHourlyMap}
                        onChange={(newData) => updateSetting('ptHourlyMap', newData)}
                        valueLabel="時薪"
                    />
                </SettingsSection>

                {/* 營運成本 */}
                <SettingsSection title="營運成本" icon={Building2} badge="高重要性">
                    <div className="admin-grid cols-3">
                        <div className="admin-field">
                            <label>每月房租</label>
                            <div className="admin-input-group">
                                <span className="admin-input-prefix">$</span>
                                <input
                                    type="number"
                                    value={settings.opsCosts?.rent || 0}
                                    onChange={(e) => updateNestedSetting('opsCosts.rent', parseInt(e.target.value) || 0)}
                                />
                            </div>
                        </div>

                        <div className="admin-field">
                            <label>貸款償還</label>
                            <div className="admin-input-group">
                                <span className="admin-input-prefix">$</span>
                                <input
                                    type="number"
                                    value={settings.opsCosts?.loan || 0}
                                    onChange={(e) => updateNestedSetting('opsCosts.loan', parseInt(e.target.value) || 0)}
                                />
                            </div>
                        </div>

                        <div className="admin-field">
                            <label>行銷預算</label>
                            <div className="admin-input-group">
                                <span className="admin-input-prefix">$</span>
                                <input
                                    type="number"
                                    value={settings.opsCosts?.marketing || 0}
                                    onChange={(e) => updateNestedSetting('opsCosts.marketing', parseInt(e.target.value) || 0)}
                                />
                            </div>
                        </div>

                        <div className="admin-field">
                            <label>PT 支援基數</label>
                            <div className="admin-input-group">
                                <span className="admin-input-prefix">$</span>
                                <input
                                    type="number"
                                    value={settings.opsCosts?.ptSupportBase || 0}
                                    onChange={(e) => updateNestedSetting('opsCosts.ptSupportBase', parseInt(e.target.value) || 0)}
                                />
                            </div>
                            <span className="admin-field-hint">每滿 30 人增加一位</span>
                        </div>

                        <div className="admin-field">
                            <label>學員雜費/人</label>
                            <div className="admin-input-group">
                                <span className="admin-input-prefix">$</span>
                                <input
                                    type="number"
                                    value={settings.opsCosts?.miscPerStudent || 0}
                                    onChange={(e) => updateNestedSetting('opsCosts.miscPerStudent', parseInt(e.target.value) || 0)}
                                />
                            </div>
                        </div>
                    </div>
                </SettingsSection>

                {/* 系統限制 */}
                <SettingsSection title="系統限制" icon={Target} badge="低重要性" defaultOpen={false}>
                    <div className="admin-grid cols-3">
                        <div className="admin-field">
                            <label>最大教師數</label>
                            <div className="admin-input-group">
                                <input
                                    type="number"
                                    value={settings.maxTeachers}
                                    onChange={(e) => updateSetting('maxTeachers', parseInt(e.target.value) || 10)}
                                />
                                <span className="admin-input-suffix">位</span>
                            </div>
                        </div>

                        <div className="admin-field">
                            <label>單師班級上限</label>
                            <div className="admin-input-group">
                                <input
                                    type="number"
                                    value={settings.maxClassesPerTeacher}
                                    onChange={(e) => updateSetting('maxClassesPerTeacher', parseInt(e.target.value) || 6)}
                                />
                                <span className="admin-input-suffix">班</span>
                            </div>
                        </div>

                        <div className="admin-field">
                            <label>工作負荷上限</label>
                            <div className="admin-input-group">
                                <input
                                    type="number"
                                    step="0.5"
                                    value={settings.maxWorkloadPoints}
                                    onChange={(e) => updateSetting('maxWorkloadPoints', parseFloat(e.target.value) || 3.0)}
                                />
                                <span className="admin-input-suffix">點</span>
                            </div>
                        </div>

                        <div className="admin-field">
                            <label>單日班係數</label>
                            <input
                                type="number"
                                step="0.1"
                                value={settings.frequencyMultiplier?.single || 0.5}
                                onChange={(e) => updateNestedSetting('frequencyMultiplier.single', parseFloat(e.target.value) || 0.5)}
                            />
                            <span className="admin-field-hint">全期班 = 1.0</span>
                        </div>
                    </div>
                </SettingsSection>

                {/* 導航連結 */}
                <div className="admin-nav-links">
                    <a href="?" className="admin-nav-link">
                        <Users className="icon-sm" /> 薪資計算器
                    </a>
                    <a href="?boss" className="admin-nav-link">
                        <Building2 className="icon-sm" /> Boss Dashboard
                    </a>
                </div>
            </main>

            {/* Footer */}
            <footer className="admin-footer">
                <span>System Configuration Panel • v1.0 • localStorage persistence enabled</span>
            </footer>
        </div>
    );
};

export default AdminSettingsPanel;
