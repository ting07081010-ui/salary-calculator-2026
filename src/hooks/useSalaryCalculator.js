import { useState, useMemo, useCallback } from 'react';
import {
    FULL_TIME_CONFIG,
    PT_CONFIG,
    TEACHER_TYPES,
    DEFAULT_CLASS,
    MAX_CLASSES
} from '../config/salaryConfig';
import { generateId } from '../utils/formatters';
import { calculateClassData } from '../utils/calculations';
import { decodeSharePayload } from '../utils/shareLink';

/**
 * 薪資計算自訂 Hook
 * 封裝所有計算邏輯與班級管理
 */
export const useSalaryCalculator = (initialTeacherType = TEACHER_TYPES.FULL_TIME) => {
    const [teacherType, setTeacherType] = useState(initialTeacherType);
    const [classes, setClasses] = useState([
        { id: 'initial-class-1', type: 10, count: 5, hours: 16, frequency: 'full' }
    ]);
    const [ptBasicHours, setPtBasicHours] = useState(0);

    // 更新班級資料
    const updateClass = useCallback((id, field, value) => {
        setClasses(prevClasses => prevClasses.map(c => {
            if (c.id !== id) return c;

            let updatedValue = value;
            if (['type', 'count', 'hours'].includes(field)) {
                updatedValue = Number(value);
                if (isNaN(updatedValue)) updatedValue = 0;
            }

            const updated = { ...c, [field]: updatedValue };

            // 確保人數不超過班級上限
            if (field === 'type' || field === 'count') {
                updated.count = Math.max(0, Math.min(updated.count, Number(updated.type)));
            }

            // 確保時數非負
            if (field === 'hours') {
                updated.hours = Math.max(0, updatedValue);
            }

            return updated;
        }));
    }, []);

    // 新增班級
    const addClass = useCallback(() => {
        setClasses(prev => {
            if (prev.length >= MAX_CLASSES) return prev;
            return [...prev, { ...DEFAULT_CLASS, id: generateId() }];
        });
    }, []);

    // 刪除班級
    const removeClass = useCallback((id) => {
        setClasses(prev => prev.filter(c => c.id !== id));
    }, []);

    // 計算每個班級的數據
    const calculatedData = useMemo(() => {
        return classes.map(cls => calculateClassData(cls, teacherType));
    }, [classes, teacherType]);

    // 計算總計
    const totals = useMemo(() => {
        const totalBase = teacherType === TEACHER_TYPES.FULL_TIME
            ? FULL_TIME_CONFIG.BASE_SALARY
            : 0;

        const ptExtraPay = teacherType === TEACHER_TYPES.PT
            ? ptBasicHours * PT_CONFIG.BASE_HOURLY_RATE
            : 0;

        const totalTeachingSub = calculatedData.reduce((acc, curr) => acc + curr.subTotal, 0);

        const totalTeachingHours = classes.reduce(
            (acc, curr) => acc + (Number(curr.hours) || 0),
            0
        );

        const ptTotalHours = Number(totalTeachingHours) + Number(ptBasicHours);

        const grandTotal = totalBase + totalTeachingSub + ptExtraPay;

        return {
            totalBase,
            ptExtraPay,
            totalTeachingSub,
            totalTeachingHours,
            ptTotalHours,
            grandTotal
        };
    }, [calculatedData, teacherType, ptBasicHours, classes]);

    // 從 URL 參數載入資料
    const loadFromUrl = useCallback(() => {
        const params = new URLSearchParams(window.location.search);
        const dataStr = params.get('s');
        if (!dataStr) return false;

        const decoded = decodeSharePayload(dataStr);
        if (!decoded) return false;

        setTeacherType(decoded.teacherType);
        setClasses(decoded.classes);
        setPtBasicHours(decoded.ptBasicHours);
        return true;
    }, [setTeacherType, setClasses, setPtBasicHours]);

    return {
        // 狀態
        teacherType,
        setTeacherType,
        classes,
        ptBasicHours,
        setPtBasicHours,

        // 計算結果
        calculatedData,
        ...totals,

        // 操作方法
        updateClass,
        addClass,
        removeClass,
        loadFromUrl,

        // 常數
        canAddClass: classes.length < MAX_CLASSES,
        classCount: classes.length
    };
};
