/**
 * 薪資計算規則設定
 * 包含正職與 PT 的計算參數
 */

// 班級類型選項
export const CLASS_TYPES = [
  { value: 5, label: '5 人班' },
  { value: 10, label: '10 人班' },
  { value: 15, label: '15 人班' }
];

// 頻率選項
export const FREQUENCY_OPTIONS = {
  full: { label: '全期', multiplier: 1.0 },
  single: { label: '單日', multiplier: 0.5 }
};

// 正職老師設定
export const FULL_TIME_CONFIG = {
  BASE_SALARY: 30000,
  BONUS_MAP: {
    5:  [0, 1450, 3000, 4800, 6750, 8900],
    10: [0, 1250, 1600, 4200, 6000, 7800, 9800, 12000, 14500, 16800, 19500],
    15: [0, 1000, 2100, 3400, 4800, 6200, 7800, 9600, 11500, 13500, 15600, 17800, 20200, 23000, 25300, 28000]
  }
};

// PT 老師設定
export const PT_CONFIG = {
  BASE_HOURLY_RATE: 200,
  HOURLY_MAP: {
    5:  [200, 400, 600, 683, 844, 972],
    10: [200, 400, 600, 613, 788, 948, 1094, 1225, 1342, 1444, 1531],
    15: [200, 400, 600, 502, 653, 797, 933, 1062, 1182, 1295, 1400, 1497, 1587, 1668, 1742, 1808]
  }
};

// 老師類型
export const TEACHER_TYPES = {
  FULL_TIME: 'FULL_TIME',
  PT: 'PT'
};

// 預設班級設定
export const DEFAULT_CLASS = {
  type: 10,
  count: 0,
  hours: 16,
  frequency: 'full'
};

// 最大班級數量
export const MAX_CLASSES = 5;
