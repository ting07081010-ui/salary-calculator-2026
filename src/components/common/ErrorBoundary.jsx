import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Error Boundary 元件
 * 捕捉 Lazy Loading 失敗或其他渲染錯誤
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 bg-slate-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
                        <div className="mx-auto bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <AlertTriangle className="w-8 h-8 text-rose-600" />
                        </div>

                        <h2 className="text-2xl font-bold text-slate-800 mb-2">載入失敗</h2>
                        <p className="text-slate-500 text-sm mb-6">
                            應用程式發生錯誤，可能是網路問題或暫時性故障。
                        </p>

                        <button
                            onClick={this.handleReload}
                            className="w-full bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-black active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            重新載入
                        </button>

                        <p className="mt-4 text-xs text-slate-400">
                            若問題持續，請稍後再試或聯繫系統管理員。
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
