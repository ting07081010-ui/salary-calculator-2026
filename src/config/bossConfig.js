/**
 * Boss 損益分析儀表板設定
 * 整合薪資試算 2026 的計算邏輯
 */

// 從現有薪資設定導入核心規則
import {
    FULL_TIME_CONFIG,
    PT_CONFIG,
    CLASS_TYPES,
    FREQUENCY_OPTIONS,
    TEACHER_TYPES
} from './salaryConfig';

// 重新導出以供使用
export {
    FULL_TIME_CONFIG,
    PT_CONFIG,
    CLASS_TYPES,
    FREQUENCY_OPTIONS,
    TEACHER_TYPES
};

// Boss 儀表板專用設定
export const BOSS_CONFIG = {
    TERM_MONTHS: 4.5,           // 一期4.5個月
    MAX_TEACHERS: 10,           // 最多10位老師
    GOAL_STUDENTS: 180,         // 目標學員數
    MAX_WORKLOAD_POINTS: 3.0,   // 工作負荷上限
    MAX_CLASSES_PER_TEACHER: 6, // 每位老師最多6個班
};

// 學費設定（以期計）
export const TUITION_FEES = {
    standard: { 5: 42000, 10: 38000, 15: 35000 },
    advanced: { 5: 60000, 10: 54300, 15: 50000 }
};

// 預設營運成本
export const DEFAULT_OPS_COSTS = {
    rent: 30000,          // 每月房租
    loan: 10000,          // 貸款償還
    marketing: 3000,      // 行銷推廣
    ptSupportBase: 15000, // PT 支援基數
    miscPerStudent: 500   // 學員雜費/人
};

// 預設教師設定
export const DEFAULT_TEACHER = {
    name: '新老師',
    teacherType: TEACHER_TYPES.FULL_TIME,
    ptBasicHours: 0,
    classes: []
};

// 預設班級設定
export const DEFAULT_BOSS_CLASS = {
    type: 10,
    level: 'standard',
    frequency: 'full',
    count: 0,
    hours: 16
};
