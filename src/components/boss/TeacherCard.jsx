import React, { memo, useCallback } from 'react';
import { Trash2, Timer, ChevronRight, Plus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { TEACHER_TYPES, BOSS_CONFIG } from '../../config/bossConfig';
import ClassConfig from './ClassConfig';

/**
 * 師資配置卡片
 */
const TeacherCard = memo(({
    teacher,
    onRemove,
    onUpdateField,
    onAddClass,
    onUpdateClass,
    onRemoveClass
}) => {
    const fmt = formatCurrency;
    const isOverloaded = teacher.workload > BOSS_CONFIG.MAX_WORKLOAD_POINTS;

    const handleTypeChange = useCallback((type) => {
        onUpdateField(teacher.id, 'teacherType', type);
    }, [teacher.id, onUpdateField]);

    const handlePtHoursChange = useCallback((e) => {
        const value = e.target.value === '' ? 0 : Number(e.target.value);
        onUpdateField(teacher.id, 'ptBasicHours', value);
    }, [teacher.id, onUpdateField]);

    return (
        <div className={`boss-teacher-card ${isOverloaded ? 'overloaded' : ''}`}>
            {/* Header */}
            <div className={`boss-teacher-header ${isOverloaded ? 'header-warning' : ''}`}>
                <div className="boss-teacher-info">
                    <div className="boss-teacher-title-row">
                        <h3 className={`boss-teacher-name ${isOverloaded ? 'text-rose' : ''}`}>
                            {teacher.name}
                        </h3>
                        <div className="boss-type-toggle">
                            <button
                                onClick={() => handleTypeChange(TEACHER_TYPES.FULL_TIME)}
                                className={`boss-type-btn ${teacher.teacherType === TEACHER_TYPES.FULL_TIME ? 'active-ft' : ''}`}
                            >
                                正職
                            </button>
                            <button
                                onClick={() => handleTypeChange(TEACHER_TYPES.PT)}
                                className={`boss-type-btn ${teacher.teacherType === TEACHER_TYPES.PT ? 'active-pt' : ''}`}
                            >
                                PT
                            </button>
                        </div>
                    </div>

                    <div className="boss-teacher-badges">
                        <span className={`boss-workload-badge ${isOverloaded ? 'badge-warning' : ''}`}>
                            排課負荷: {teacher.workload.toFixed(1)} / {BOSS_CONFIG.MAX_WORKLOAD_POINTS}
                        </span>
                        {teacher.teacherType === TEACHER_TYPES.PT && (
                            <div className="boss-pt-hours">
                                <Timer className="icon-xs" /> 非教學:
                                <input
                                    type="number"
                                    value={teacher.ptBasicHours}
                                    onChange={handlePtHoursChange}
                                    className="boss-pt-hours-input"
                                /> hr
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => onRemove(teacher.id)}
                    className="boss-delete-btn"
                    aria-label={`移除老師 ${teacher.name}`}
                >
                    <Trash2 className="icon-md" aria-hidden="true" />
                </button>
            </div>

            {/* Classes */}
            <div className="boss-teacher-classes">
                {teacher.classList.map(cls => (
                    <ClassConfig
                        key={cls.id}
                        cls={cls}
                        teacherId={teacher.id}
                        teacherType={teacher.teacherType}
                        onUpdate={onUpdateClass}
                        onRemove={onRemoveClass}
                    />
                ))}

                {teacher.classes && teacher.classes.length < BOSS_CONFIG.MAX_CLASSES_PER_TEACHER && (
                    <button
                        onClick={() => onAddClass(teacher.id)}
                        className="boss-add-class-btn"
                    >
                        <Plus className="icon-sm" /> Add Class Config
                    </button>
                )}
            </div>

            {/* Footer */}
            <div className="boss-teacher-footer">
                <div className="boss-cost-row">
                    <span className="boss-cost-label">
                        {teacher.teacherType === TEACHER_TYPES.PT ? 'PT 時薪總額' : '底薪+績效獎金'}
                    </span>
                    <span className="boss-cost-value text-rose">-${fmt(teacher.tCost)}</span>
                </div>
                <div className="boss-profit-row">
                    <span className="boss-profit-label">
                        盈餘貢獻度 <ChevronRight className="icon-xs" />
                    </span>
                    <span className={`boss-profit-value ${teacher.tProfit > 0 ? 'text-emerald' : 'text-rose'}`}>
                        {teacher.tProfit > 0 ? '+' : ''}${fmt(teacher.tProfit)}
                    </span>
                </div>
            </div>
        </div>
    );
});

TeacherCard.displayName = 'TeacherCard';

export default TeacherCard;
