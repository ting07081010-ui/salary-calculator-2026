import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * 全域載入狀態
 * 用於 Suspense fallback
 */
const Loading = () => {
    return (
        <div className="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center z-50">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
            <p className="text-slate-500 font-bold tracking-widest text-sm uppercase">Loading...</p>
        </div>
    );
};

export default Loading;
