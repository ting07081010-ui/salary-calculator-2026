import React, { memo, useCallback } from 'react';
import { formatCurrency } from '../../utils/formatters';
import { TEACHER_TYPES } from '../../config/bossConfig';

/**
 * 班級配置元件
 */
const ClassConfig = memo(({
    cls,
    teacherId,
    teacherType,
    onUpdate,
    onRemove
}) => {
    const fmt = formatCurrency;
    const isPT = teacherType === TEACHER_TYPES.PT;

    const handleFrequencyToggle = useCallback(() => {
        onUpdate(teacherId, cls.id, 'frequency', cls.frequency === 'full' ? 'single' : 'full');
    }, [teacherId, cls.id, cls.frequency, onUpdate]);

    const handleLevelToggle = useCallback(() => {
        onUpdate(teacherId, cls.id, 'level', cls.level === 'standard' ? 'advanced' : 'standard');
    }, [teacherId, cls.id, cls.level, onUpdate]);

    const handleTypeChange = useCallback((e) => {
        onUpdate(teacherId, cls.id, 'type', e.target.value);
    }, [teacherId, cls.id, onUpdate]);

    const handleCountChange = useCallback((e) => {
        onUpdate(teacherId, cls.id, 'count', e.target.value);
    }, [teacherId, cls.id, onUpdate]);

    const handleHoursChange = useCallback((e) => {
        onUpdate(teacherId, cls.id, 'hours', e.target.value);
    }, [teacherId, cls.id, onUpdate]);

    return (
        <div className={`boss-class-config ${cls.level === 'advanced' ? 'advanced' : ''}`}>
            {/* Header buttons */}
            <div className="boss-class-header">
                <div className="boss-class-buttons">
                    <button
                        onClick={handleFrequencyToggle}
                        className={`boss-freq-btn ${cls.frequency === 'single' ? 'single' : ''}`}
                    >
                        {cls.frequency === 'full' ? '全期 (1.0)' : '單日 (0.5)'}
                    </button>
                    <button
                        onClick={handleLevelToggle}
                        className={`boss-level-btn ${cls.level === 'advanced' ? 'advanced' : ''}`}
                    >
                        {cls.level === 'standard' ? '標準課程' : '進階課程'}
                    </button>
                </div>
                <span className="boss-class-count-label">
                    {cls.count} / {cls.maxStudents}人
                </span>
            </div>

            {/* Type select & slider */}
            <div className="boss-class-controls">
                <select
                    value={cls.type}
                    onChange={handleTypeChange}
                    className="boss-class-select"
                >
                    <option value={5}>5人精緻班</option>
                    <option value={10}>10人標準班</option>
                    <option value={15}>15人大型班</option>
                </select>
                <input
                    type="range"
                    min="0"
                    max={cls.maxStudents}
                    value={cls.count}
                    onChange={handleCountChange}
                    className="boss-class-slider"
                />
            </div>

            {/* PT hours input */}
            {isPT && (
                <div className="boss-pt-class-hours">
                    <span className="boss-pt-hours-label">
                        每月授課時數:
                        <input
                            type="number"
                            value={cls.hours}
                            onChange={handleHoursChange}
                            className="boss-hours-input"
                        /> hr
                    </span>
                    <span className="boss-hourly-rate">${cls.hourlyRate}/hr</span>
                </div>
            )}

            {/* Footer */}
            <div className="boss-class-footer">
                <span className="boss-monthly-rev">月均產值: ${fmt(cls.monthlyRev)}</span>
                <button
                    onClick={() => onRemove(teacherId, cls.id)}
                    className="boss-remove-class-btn"
                >
                    Remove
                </button>
            </div>
        </div>
    );
});

ClassConfig.displayName = 'ClassConfig';

export default ClassConfig;
