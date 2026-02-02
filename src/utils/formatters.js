/**
 * 格式化工具函式
 */

// 數字格式化（台灣格式，千分位）
export const formatCurrency = (num) => {
    return new Intl.NumberFormat('zh-TW').format(Math.round(num || 0));
};

// 生成唯一 ID
export const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// 獲取班級階段描述
export const getClassStage = (count, maxStudents) => {
    const ratio = count / maxStudents;
    if (ratio > 0.8) return '完全體';
    if (ratio > 0.5) return '成熟期';
    if (ratio > 0) return '成長期';
    return '招生中';
};
