import React, { memo, useCallback } from 'react';
import { Trash2, User, Clock, TrendingUp } from 'lucide-react';
import { CLASS_TYPES, TEACHER_TYPES } from '../config/salaryConfig';
import { formatCurrency } from '../utils/formatters';

/**
 * 班級配置卡片
 * 包含班級大小、學生人數、頻率設定
 */
const ClassCard = memo(({
    cls,
    index,
    teacherType,
    updateClass,
    removeClass
}) => {
    const fmt = formatCurrency;
    const isFullTime = teacherType === TEACHER_TYPES.FULL_TIME;

    const handleTypeChange = useCallback((e) => {
        updateClass(cls.id, 'type', e.target.value);
    }, [cls.id, updateClass]);

    const handleCountChange = useCallback((e) => {
        updateClass(cls.id, 'count', e.target.value);
    }, [cls.id, updateClass]);

    const handleHoursChange = useCallback((e) => {
        updateClass(cls.id, 'hours', e.target.value);
    }, [cls.id, updateClass]);

    const handleFrequencyChange = useCallback((freq) => {
        updateClass(cls.id, 'frequency', freq);
    }, [cls.id, updateClass]);

    const handleRemove = useCallback(() => {
        removeClass(cls.id);
    }, [cls.id, removeClass]);

    return (
        <article className="class-card">
            {/* 卡片標題區 */}
            <div className="class-card-header">
                <div className="class-card-title">
                    <div className="class-card-index">{index + 1}</div>
                    <div className="class-card-info">
                        <div className="class-card-controls">
                            <select
                                value={cls.type}
                                onChange={handleTypeChange}
                                className="class-type-select"
                            >
                                {CLASS_TYPES.map(t => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                            <div className="frequency-toggle print-hidden">
                                <button
                                    onClick={() => handleFrequencyChange('full')}
                                    className={`frequency-btn ${cls.frequency === 'full' ? 'frequency-btn-active' : ''}`}
                                >
                                    全期
                                </button>
                                <button
                                    onClick={() => handleFrequencyChange('single')}
                                    className={`frequency-btn ${cls.frequency === 'single' ? 'frequency-btn-single' : ''}`}
                                >
                                    單日
                                </button>
                            </div>
                        </div>
                        <div className="class-card-badges">
                            <span className="stage-badge">{cls.info}</span>
                            {cls.frequency === 'single' && (
                                <span className="discount-badge">[5折]</span>
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={handleRemove} className="delete-btn print-hidden">
                    <Trash2 className="icon-md" />
                </button>
            </div>

            {/* 卡片內容區 */}
            <div className="class-card-body">
                {/* 左側：控制項 */}
                <div className="class-card-controls-section">
                    <div className="student-count-section">
                        <div className="student-count-header">
                            <span className="control-label">
                                <User className="icon-xs" /> 學生人數
                            </span>
                            <span className="student-count-value">
                                {cls.count} <span className="student-count-max">/ {cls.maxStudents}人</span>
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max={cls.maxStudents}
                            step="1"
                            value={cls.count}
                            onChange={handleCountChange}
                            className={`range-slider print-hidden ${isFullTime ? 'accent-indigo' : 'accent-amber'}`}
                        />

                        {/* PT 授課時數 */}
                        {!isFullTime && (
                            <div className="hours-input-section">
                                <span className="control-label">
                                    <Clock className="icon-xs" /> 授課時數
                                </span>
                                <div className="hours-input-wrapper">
                                    <input
                                        type="number"
                                        min="0"
                                        value={cls.hours}
                                        onChange={handleHoursChange}
                                        className="hours-input"
                                    />
                                    <span className="hours-unit">hr</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 右側：結果顯示 */}
                <div className={`class-card-result ${isFullTime ? 'result-indigo' : 'result-emerald'}`}>
                    <div className="result-content">
                        <div>
                            <p className="result-label">
                                {isFullTime ? '此班獎金' : '此班月酬'}
                            </p>
                            <h3 className={`result-value ${isFullTime ? 'text-indigo' : 'text-emerald'}`}>
                                ${fmt(cls.subTotal)}
                            </h3>
                        </div>
                        <TrendingUp className="result-icon" />
                    </div>
                    <div className="result-detail">
                        <p className="result-detail-text">
                            {isFullTime
                                ? `依 ${cls.count}人標準 $${fmt(cls.subTotal / (cls.frequency === 'single' ? 0.5 : 1.0))} 計算權重`
                                : `$${cls.hourlyRate}/hr × ${cls.hours}hr${cls.frequency === 'single' ? ' × 0.5' : ''}`}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
});

ClassCard.displayName = 'ClassCard';

export default ClassCard;
