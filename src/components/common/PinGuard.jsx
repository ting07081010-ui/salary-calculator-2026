import React, { useState, useEffect, useCallback } from 'react';
import { Lock, Unlock, AlertTriangle, Clock } from 'lucide-react';
import { SECURITY_CONFIG } from '../../config/securityConfig';

/**
 * 強化版 PIN 碼保護元件
 * 包含：嘗試次數限制、鎖定機制、Session 超時
 * 注意：此僅為前端防護，非資安等級加密
 */
const PinGuard = ({ children, target }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [lockoutRemaining, setLockoutRemaining] = useState(0);

    const {
        CORRECT_PIN,
        MAX_ATTEMPTS,
        LOCKOUT_DURATION,
        SESSION_TIMEOUT,
        STORAGE_KEY_PREFIX,
        ATTEMPTS_KEY_PREFIX,
        LOCKOUT_KEY_PREFIX,
        TIMESTAMP_KEY_PREFIX,
    } = SECURITY_CONFIG;

    const STORAGE_KEY = `${STORAGE_KEY_PREFIX}${target}`;
    const ATTEMPTS_KEY = `${ATTEMPTS_KEY_PREFIX}${target}`;
    const LOCKOUT_KEY = `${LOCKOUT_KEY_PREFIX}${target}`;
    const TIMESTAMP_KEY = `${TIMESTAMP_KEY_PREFIX}${target}`;

    // 檢查 Session 是否過期
    const isSessionValid = useCallback(() => {
        const timestamp = sessionStorage.getItem(TIMESTAMP_KEY);
        if (!timestamp) return false;
        const elapsed = Date.now() - parseInt(timestamp, 10);
        return elapsed < SESSION_TIMEOUT;
    }, [TIMESTAMP_KEY, SESSION_TIMEOUT]);

    // 初始化：檢查驗證狀態、鎖定狀態、嘗試次數
    useEffect(() => {
        // 檢查 Session
        const isAuth = sessionStorage.getItem(STORAGE_KEY);
        if (isAuth === 'true' && isSessionValid()) {
            setIsAuthenticated(true);
            return;
        } else if (isAuth === 'true') {
            // Session 過期，清除
            sessionStorage.removeItem(STORAGE_KEY);
            sessionStorage.removeItem(TIMESTAMP_KEY);
        }

        // 檢查鎖定狀態
        const lockoutEnd = localStorage.getItem(LOCKOUT_KEY);
        if (lockoutEnd) {
            const remaining = parseInt(lockoutEnd, 10) - Date.now();
            if (remaining > 0) {
                setIsLocked(true);
                setLockoutRemaining(remaining);
            } else {
                localStorage.removeItem(LOCKOUT_KEY);
                localStorage.removeItem(ATTEMPTS_KEY);
            }
        }

        // 檢查嘗試次數
        const storedAttempts = localStorage.getItem(ATTEMPTS_KEY);
        if (storedAttempts) {
            setAttempts(parseInt(storedAttempts, 10));
        }
    }, [target, STORAGE_KEY, TIMESTAMP_KEY, LOCKOUT_KEY, ATTEMPTS_KEY, isSessionValid]);

    // 鎖定倒計時
    useEffect(() => {
        if (!isLocked || lockoutRemaining <= 0) return;

        const timer = setInterval(() => {
            setLockoutRemaining(prev => {
                if (prev <= 1000) {
                    setIsLocked(false);
                    setAttempts(0);
                    localStorage.removeItem(LOCKOUT_KEY);
                    localStorage.removeItem(ATTEMPTS_KEY);
                    return 0;
                }
                return prev - 1000;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isLocked, lockoutRemaining, LOCKOUT_KEY, ATTEMPTS_KEY]);

    // Session 活動監聽（重設超時計時器）
    useEffect(() => {
        if (!isAuthenticated) return;

        const resetTimer = () => {
            sessionStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
        };

        // 監聽使用者活動
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
        events.forEach(event => window.addEventListener(event, resetTimer));

        // 定期檢查 Session 是否過期
        const checkSession = setInterval(() => {
            if (!isSessionValid()) {
                setIsAuthenticated(false);
                sessionStorage.removeItem(STORAGE_KEY);
                sessionStorage.removeItem(TIMESTAMP_KEY);
            }
        }, 60000); // 每分鐘檢查

        return () => {
            events.forEach(event => window.removeEventListener(event, resetTimer));
            clearInterval(checkSession);
        };
    }, [isAuthenticated, STORAGE_KEY, TIMESTAMP_KEY, isSessionValid]);

    const handleUnlock = (e) => {
        e.preventDefault();

        if (isLocked) return;

        if (pin === CORRECT_PIN) {
            // 成功解鎖
            sessionStorage.setItem(STORAGE_KEY, 'true');
            sessionStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
            localStorage.removeItem(ATTEMPTS_KEY);
            setIsAuthenticated(true);
            setError(false);
            setAttempts(0);
        } else {
            // 失敗
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            localStorage.setItem(ATTEMPTS_KEY, newAttempts.toString());
            setError(true);
            setPin('');

            // 達到嘗試上限，鎖定
            if (newAttempts >= MAX_ATTEMPTS) {
                const lockoutEnd = Date.now() + LOCKOUT_DURATION;
                localStorage.setItem(LOCKOUT_KEY, lockoutEnd.toString());
                setIsLocked(true);
                setLockoutRemaining(LOCKOUT_DURATION);
            }
        }
    };

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-auto text-center transform transition-all">
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 ${isLocked ? 'bg-rose-100' : 'bg-indigo-100'}`}>
                    {isLocked ? (
                        <Clock className="w-8 h-8 text-rose-600" />
                    ) : (
                        <Lock className="w-8 h-8 text-indigo-600" />
                    )}
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {isLocked ? '暫時鎖定' : '安全鎖定'}
                </h2>

                {isLocked ? (
                    <div className="space-y-4">
                        <p className="text-slate-500 text-sm">
                            嘗試次數過多，請稍後再試。
                        </p>
                        <div className="text-3xl font-bold text-rose-600 font-mono">
                            {formatTime(lockoutRemaining)}
                        </div>
                        <div className="pt-4 border-t border-slate-100">
                            <a href="/" className="text-xs text-slate-400 hover:text-slate-600 font-bold">
                                返回首頁
                            </a>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="text-slate-500 text-sm mb-6">
                            請輸入 PIN 碼以存取
                            <span className="font-bold text-indigo-600 mx-1 uppercase">{target}</span>
                            頁面
                        </p>

                        <form onSubmit={handleUnlock} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="password"
                                    value={pin}
                                    onChange={(e) => {
                                        setPin(e.target.value);
                                        setError(false);
                                    }}
                                    className={`w-full text-center text-2xl font-bold tracking-widest py-3 border-2 rounded-xl outline-none transition-all
                                        ${error
                                            ? 'border-rose-300 bg-rose-50 text-rose-600 focus:border-rose-500'
                                            : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20'
                                        }
                                    `}
                                    placeholder="••••"
                                    maxLength={4}
                                    autoFocus
                                    aria-label="PIN 碼輸入"
                                    aria-describedby={error ? 'pin-error' : undefined}
                                    aria-invalid={error}
                                />
                            </div>

                            {error && (
                                <div
                                    id="pin-error"
                                    role="alert"
                                    className="flex items-center justify-center gap-2 text-rose-500 text-sm font-bold animate-pulse"
                                >
                                    <AlertTriangle className="w-4 h-4" />
                                    <span>密碼錯誤 ({MAX_ATTEMPTS - attempts} 次機會)</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-black active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                <Unlock className="w-4 h-4" />
                                解鎖
                            </button>

                            <div className="pt-4 border-t border-slate-100">
                                <a href="/" className="text-xs text-slate-400 hover:text-slate-600 font-bold">
                                    返回首頁
                                </a>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default PinGuard;
