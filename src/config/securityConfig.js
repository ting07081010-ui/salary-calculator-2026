/**
 * Security Configuration
 * 安全設定 - 集中管理 PIN 鎖相關參數
 */
export const SECURITY_CONFIG = {
    // PIN 設定
    PIN_LENGTH: Number(import.meta.env.VITE_PIN_LENGTH) || 4,
    PIN_HASH: (import.meta.env.VITE_PIN_HASH || '').toLowerCase(),
    CORRECT_PIN: import.meta.env.VITE_PIN_PLAINTEXT || '8888',

    // 嘗試限制
    MAX_ATTEMPTS: 5,
    LOCKOUT_DURATION: 5 * 60 * 1000, // 5 分鐘鎖定

    // Session 設定
    SESSION_TIMEOUT: 15 * 60 * 1000, // 15 分鐘自動登出

    // Storage Keys
    STORAGE_KEY_PREFIX: 'auth_session_',
    ATTEMPTS_KEY_PREFIX: 'auth_attempts_',
    LOCKOUT_KEY_PREFIX: 'auth_lockout_',
    TIMESTAMP_KEY_PREFIX: 'auth_timestamp_',
};
