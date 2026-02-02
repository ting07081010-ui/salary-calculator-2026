import React, { useState, useEffect } from 'react';
import { Lock, Unlock, AlertTriangle } from 'lucide-react';

/**
 * 簡易 PIN 碼保護元件
 * 用於防止誤觸敏感頁面 (Admin/Boss)
 * 注意：此僅為前端防護，非資安等級加密
 */
const PinGuard = ({ children, target }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);

    // 簡單的 PIN 碼設定 (實際應用可改為環境變數)
    const CORRECT_PIN = '8888';
    const STORAGE_KEY = `auth_session_${target}`;

    useEffect(() => {
        // 檢查 Session Storage 是否已有驗證紀錄
        const isAuth = sessionStorage.getItem(STORAGE_KEY);
        if (isAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, [target]);

    const handleUnlock = (e) => {
        e.preventDefault();
        if (pin === CORRECT_PIN) {
            sessionStorage.setItem(STORAGE_KEY, 'true');
            setIsAuthenticated(true);
            setError(false);
        } else {
            setError(true);
            setPin('');
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-auto text-center transform transition-all">
                <div className="mx-auto bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Lock className="w-8 h-8 text-indigo-600" />
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mb-2">安全鎖定</h2>
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
                        />
                    </div>

                    {error && (
                        <div className="flex items-center justify-center gap-2 text-rose-500 text-sm font-bold animate-pulse">
                            <AlertTriangle className="w-4 h-4" />
                            <span>密碼錯誤</span>
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
            </div>
        </div>
    );
};

export default PinGuard;
