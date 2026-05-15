import {
    FULL_TIME_CONFIG,
    PT_CONFIG,
    FREQUENCY_OPTIONS,
    TEACHER_TYPES
} from '../config/salaryConfig';
import { getClassStage } from './formatters';

/**
 * 計算單一班級的薪資數據
 * @param {Object} cls - 班級資料 (raw class object)
 * @param {string} teacherType - 老師類型 (FULL_TIME | PT)
 * @returns {Object} 包含計算結果的班級資料
 */
export const calculateClassData = (cls, teacherType) => {
    const freqMultiplier = FREQUENCY_OPTIONS[cls.frequency]?.multiplier || 1.0;
    const count = Math.min(cls.count, cls.type);

    if (teacherType === TEACHER_TYPES.FULL_TIME) {
        const bonusArr = FULL_TIME_CONFIG.BONUS_MAP[cls.type];
        const rawBonus = bonusArr ? (bonusArr[count] || 0) : 0;
        const stage = getClassStage(count, cls.type);

        return {
            ...cls,
            freqMultiplier,
            subTotal: rawBonus * freqMultiplier,
            info: stage,
            maxStudents: cls.type
        };
    } else {
        const hourlyArr = PT_CONFIG.HOURLY_MAP[cls.type];
        const hourlyRate = hourlyArr ? (hourlyArr[count] || PT_CONFIG.BASE_HOURLY_RATE) : PT_CONFIG.BASE_HOURLY_RATE;

        return {
            ...cls,
            freqMultiplier,
            hourlyRate,
            subTotal: (hourlyRate * cls.hours) * freqMultiplier,
            info: `時薪 $${hourlyRate}`,
            maxStudents: cls.type
        };
    }
};
