/**
 * 全域設定 Context
 * 管理所有可調整的計算參數，支援 localStorage 持久化
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// 預設設定值（與原始 config 相同）
export const DEFAULT_SETTINGS = {
    // === 核心財務參數 ===
    fullTimeBaseSalary: 30000,
    ptBaseHourlyRate: 200,
    termMonths: 4.5,

    // === 學費設定 ===
    tuitionFees: {
        standard: { 5: 42000, 10: 38000, 15: 35000 },
        advanced: { 5: 60000, 10: 54300, 15: 50000 }
    },

    // === 正職獎金表 ===
    fullTimeBonusMap: {
        5: [0, 1450, 3000, 4800, 6750, 8900],
        10: [0, 1250, 1600, 4200, 6000, 7800, 9800, 12000, 14500, 16800, 19500],
        15: [0, 1000, 2100, 3400, 4800, 6200, 7800, 9600, 11500, 13500, 15600, 17800, 20200, 23000, 25300, 28000]
    },

    // === PT 時薪表 ===
    ptHourlyMap: {
        5: [200, 400, 600, 683, 844, 972],
        10: [200, 400, 600, 613, 788, 948, 1094, 1225, 1342, 1444, 1531],
        15: [200, 400, 600, 502, 653, 797, 933, 1062, 1182, 1295, 1400, 1497, 1587, 1668, 1742, 1808]
    },

    // === 營運成本 ===
    opsCosts: {
        rent: 30000,
        loan: 10000,
        marketing: 3000,
        ptSupportBase: 15000,
        miscPerStudent: 500
    },

    // === 系統限制 ===
    maxTeachers: 10,
    maxClassesPerTeacher: 6,
    maxWorkloadPoints: 3.0,
    goalStudents: 180,

    // === 頻率係數 ===
    frequencyMultiplier: {
        full: 1.0,
        single: 0.5
    }
};

const STORAGE_KEY = 'salary_calculator_settings';

// 建立 Context
const SettingsContext = createContext(null);

/**
 * Settings Provider
 */
export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => {
        // 嘗試從 localStorage 讀取
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // 深度合併以確保新增的預設值被包含
                return deepMerge(DEFAULT_SETTINGS, parsed);
            }
        } catch (e) {
            console.warn('Failed to load settings from localStorage:', e);
        }
        return DEFAULT_SETTINGS;
    });

    const [isDirty, setIsDirty] = useState(false);

    // 儲存到 localStorage
    const saveSettings = useCallback(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
            setIsDirty(false);
            return true;
        } catch (e) {
            console.error('Failed to save settings:', e);
            return false;
        }
    }, [settings]);

    // 更新單一設定值
    const updateSetting = useCallback((key, value) => {
        setSettings(prev => {
            const newSettings = { ...prev, [key]: value };
            return newSettings;
        });
        setIsDirty(true);
    }, []);

    // 更新巢狀設定值
    const updateNestedSetting = useCallback((path, value) => {
        setSettings(prev => {
            const newSettings = { ...prev };
            const keys = path.split('.');
            let current = newSettings;

            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = { ...current[keys[i]] };
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;

            return newSettings;
        });
        setIsDirty(true);
    }, []);

    // 重設為預設值
    const resetToDefaults = useCallback(() => {
        setSettings(DEFAULT_SETTINGS);
        localStorage.removeItem(STORAGE_KEY);
        setIsDirty(false);
    }, []);

    // 匯出設定
    const exportSettings = useCallback(() => {
        const dataStr = JSON.stringify(settings, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `salary_settings_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }, [settings]);

    // 匯入設定
    const importSettings = useCallback((file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const imported = JSON.parse(e.target.result);
                    const merged = deepMerge(DEFAULT_SETTINGS, imported);
                    setSettings(merged);
                    setIsDirty(true);
                    resolve(true);
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }, []);

    // 自動儲存（每次設定變更後）
    useEffect(() => {
        if (isDirty) {
            const timer = setTimeout(() => {
                saveSettings();
            }, 1000); // 防抖 1 秒
            return () => clearTimeout(timer);
        }
    }, [settings, isDirty, saveSettings]);

    const value = {
        settings,
        isDirty,
        updateSetting,
        updateNestedSetting,
        saveSettings,
        resetToDefaults,
        exportSettings,
        importSettings
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

/**
 * 使用設定的 Hook
 */
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

/**
 * 深度合併物件
 */
function deepMerge(target, source) {
    const result = { ...target };

    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(target[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }

    return result;
}

export default SettingsContext;
