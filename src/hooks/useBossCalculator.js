import { useState, useMemo, useCallback } from 'react';
import {
    BOSS_CONFIG,
    TUITION_FEES,
    DEFAULT_OPS_COSTS,
    DEFAULT_BOSS_CLASS,
    FULL_TIME_CONFIG,
    PT_CONFIG,
    FREQUENCY_OPTIONS,
    TEACHER_TYPES
} from '../config/bossConfig';
import { generateId } from '../utils/formatters';

/**
 * Boss 損益計算 Hook
 * 使用與薪資試算 2026 一致的計算邏輯
 */
export const useBossCalculator = () => {
    // --- 狀態 ---
    const [opsCosts, setOpsCosts] = useState(DEFAULT_OPS_COSTS);
    const [teachers, setTeachers] = useState([
        {
            id: generateId(),
            name: '老師 A',
            teacherType: TEACHER_TYPES.FULL_TIME,
            ptBasicHours: 0,
            classes: [{ id: generateId(), type: 10, level: 'standard', frequency: 'full', count: 8, hours: 16 }]
        },
        {
            id: generateId(),
            name: '老師 B',
            teacherType: TEACHER_TYPES.PT,
            ptBasicHours: 4,
            classes: [{ id: generateId(), type: 5, level: 'advanced', frequency: 'full', count: 5, hours: 16 }]
        }
    ]);

    // --- 計算輔助函數（與薪資試算 2026 一致） ---

    /**
     * 計算正職老師獎金
     * 使用 salaryConfig.js 的 BONUS_MAP
     */
    const calculateFullTimeBonus = useCallback((classType, studentCount) => {
        const bonusArr = FULL_TIME_CONFIG.BONUS_MAP[classType];
        if (!bonusArr) return 0;
        const count = Math.min(studentCount, classType);
        return bonusArr[count] || 0;
    }, []);

    /**
     * 計算 PT 老師時薪
     * 使用 salaryConfig.js 的 HOURLY_MAP
     */
    const calculatePTHourlyRate = useCallback((classType, studentCount) => {
        const hourlyArr = PT_CONFIG.HOURLY_MAP[classType];
        if (!hourlyArr) return PT_CONFIG.BASE_HOURLY_RATE;
        const count = Math.min(studentCount, classType);
        return hourlyArr[count] || PT_CONFIG.BASE_HOURLY_RATE;
    }, []);

    // --- 操作方法 ---
    const addTeacher = useCallback(() => {
        setTeachers(prev => {
            if (prev.length >= BOSS_CONFIG.MAX_TEACHERS) return prev;
            const letterIndex = prev.length % 26;
            return [...prev, {
                id: generateId(),
                name: `老師 ${String.fromCharCode(65 + letterIndex)}`,
                teacherType: TEACHER_TYPES.FULL_TIME,
                ptBasicHours: 0,
                classes: [{ id: generateId(), ...DEFAULT_BOSS_CLASS }]
            }];
        });
    }, []);

    const removeTeacher = useCallback((teacherId) => {
        setTeachers(prev => prev.filter(t => t.id !== teacherId));
    }, []);

    const updateTeacherField = useCallback((teacherId, field, value) => {
        setTeachers(prev => prev.map(t =>
            t.id === teacherId ? { ...t, [field]: value } : t
        ));
    }, []);

    const addClassToTeacher = useCallback((teacherId) => {
        setTeachers(prev => prev.map(t => {
            if (t.id === teacherId && t.classes.length < BOSS_CONFIG.MAX_CLASSES_PER_TEACHER) {
                return {
                    ...t,
                    classes: [...t.classes, { id: generateId(), ...DEFAULT_BOSS_CLASS }]
                };
            }
            return t;
        }));
    }, []);

    const updateClass = useCallback((teacherId, classId, field, value) => {
        setTeachers(prev => prev.map(t => {
            if (t.id !== teacherId) return t;

            return {
                ...t,
                classes: t.classes.map(c => {
                    if (c.id !== classId) return c;

                    let newVal = value;
                    if (['type', 'count', 'hours'].includes(field)) {
                        newVal = value === '' ? 0 : Number(value);
                    }

                    const updated = { ...c, [field]: newVal };

                    // 確保人數不超過班級上限
                    if (field === 'type' || field === 'count') {
                        updated.count = Math.max(0, Math.min(updated.count, Number(updated.type)));
                    }

                    // 確保時數非負
                    if (field === 'hours') {
                        updated.hours = Math.max(0, newVal);
                    }

                    return updated;
                })
            };
        }));
    }, []);

    const removeClass = useCallback((teacherId, classId) => {
        setTeachers(prev => prev.map(t =>
            t.id === teacherId
                ? { ...t, classes: t.classes.filter(c => c.id !== classId) }
                : t
        ));
    }, []);

    const updateOpsCost = useCallback((field, value) => {
        setOpsCosts(prev => ({
            ...prev,
            [field]: value === '' ? 0 : Number(value)
        }));
    }, []);

    // --- 核心損益計算 ---
    const financial = useMemo(() => {
        let totalRev = 0, totalSal = 0, totalStud = 0;

        const teacherData = teachers.map(t => {
            let tRev = 0, tPay = 0, points = 0;

            const classList = t.classes.map(c => {
                // 頻率係數
                const freqMultiplier = FREQUENCY_OPTIONS[c.frequency]?.multiplier || 1.0;
                points += freqMultiplier;

                const typeNum = Number(c.type);
                const count = Math.min(c.count, typeNum);

                // 學費計算
                const tuition = TUITION_FEES[c.level]?.[typeNum] || 0;
                const monthlyRev = (tuition * count * freqMultiplier) / BOSS_CONFIG.TERM_MONTHS;
                tRev += monthlyRev;
                totalStud += count;

                let pay = 0;
                let hourlyRate = 0;

                if (t.teacherType === TEACHER_TYPES.FULL_TIME) {
                    // 正職：使用與薪資試算 2026 一致的獎金計算
                    if (count > 0) {
                        const rawBonus = calculateFullTimeBonus(typeNum, count);
                        pay = rawBonus * freqMultiplier;
                    }
                } else {
                    // PT：使用與薪資試算 2026 一致的時薪計算
                    hourlyRate = calculatePTHourlyRate(typeNum, count);
                    pay = (hourlyRate * c.hours) * freqMultiplier;
                }

                tPay += pay;

                return {
                    ...c,
                    monthlyRev,
                    pay,
                    hourlyRate,
                    freqMultiplier,
                    maxStudents: typeNum
                };
            });

            // 計算教師總成本
            const tCost = t.teacherType === TEACHER_TYPES.FULL_TIME
                ? FULL_TIME_CONFIG.BASE_SALARY + tPay
                : (t.ptBasicHours * PT_CONFIG.BASE_HOURLY_RATE) + tPay;

            totalRev += tRev;
            totalSal += tCost;

            return {
                ...t,
                classList,
                workload: points,
                tRev,
                tCost,
                tProfit: tRev - tCost
            };
        });

        // 營運費用計算
        const ptCost = Math.ceil(totalStud / 30) * opsCosts.ptSupportBase;
        const misc = totalStud * opsCosts.miscPerStudent;
        const extraRent = Math.min(35000, totalStud > 30 ? (totalStud - 30) * 1000 : 0);
        const totalOps = opsCosts.rent + opsCosts.loan + opsCosts.marketing + ptCost + misc + extraRent;

        // 最終損益
        const net = totalRev - totalSal - totalOps;
        const margin = totalRev > 0 ? (net / totalRev) * 100 : 0;
        const progress = (totalStud / BOSS_CONFIG.GOAL_STUDENTS) * 100;

        // 策略建議
        let advice = {
            title: '穩定觀察',
            content: '數據尚在累積中。建議優先填充現有班級人數，發揮規模效應。',
            type: 'neutral'
        };

        if (net < 0) {
            advice = {
                title: '虧損警訊',
                content: '當前處於虧損。正職底薪壓力較大，需檢視是否過多班級處於「預備期」。',
                type: 'warning'
            };
        } else if (margin < 15) {
            advice = {
                title: '利潤偏低',
                content: '邊際利潤薄弱。建議增加進階班招生比例，或將支援性質班級轉為 PT。',
                type: 'info'
            };
        } else {
            advice = {
                title: '經營卓越',
                content: '獲利結構非常穩健，每增加一位學員都是純利貢獻。',
                type: 'success'
            };
        }

        return {
            teacherData,
            totalStud,
            totalRev,
            totalSal,
            totalOps,
            ptCost,
            misc,
            extraRent,
            net,
            progress,
            margin,
            advice
        };
    }, [teachers, opsCosts, calculateFullTimeBonus, calculatePTHourlyRate]);

    return {
        // 狀態
        teachers,
        opsCosts,

        // 計算結果
        financial,

        // 教師操作
        addTeacher,
        removeTeacher,
        updateTeacherField,

        // 班級操作
        addClassToTeacher,
        updateClass,
        removeClass,

        // 營運成本操作
        updateOpsCost,
        setOpsCosts,

        // 常數
        canAddTeacher: teachers.length < BOSS_CONFIG.MAX_TEACHERS,
        teacherCount: teachers.length
    };
};
