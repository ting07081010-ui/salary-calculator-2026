import React, { memo } from 'react';
import { Calculator, LinkIcon, Camera, Download, Printer, Check, Home } from 'lucide-react';
import { TEACHER_TYPES } from '../config/salaryConfig';

/**
 * 導覽列元件
 * 包含模式切換與匯出工具
 */
const Header = memo(({
    teacherType,
    setTeacherType,
    copyShareLink,
    copySuccess,
    exportAsImage,
    exportToCSV,
    printReport,
    isExporting
}) => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="header-title">
                    <a href="/" className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center" title="回首頁">
                        <Home className="icon-md" />
                    </a>
                    <div className="w-px h-6 bg-slate-200 mx-2" />
                    <div className="header-icon">
                        <Calculator className="icon-sm" />
                    </div>
                    <h1>薪資試算 2026</h1>
                </div>

                <div className="header-controls">
                    {/* 模式切換 */}
                    <div className="mode-toggle">
                        <button
                            onClick={() => setTeacherType(TEACHER_TYPES.FULL_TIME)}
                            className={`mode-btn ${teacherType === TEACHER_TYPES.FULL_TIME ? 'mode-btn-active-ft' : ''}`}
                        >
                            正職
                        </button>
                        <button
                            onClick={() => setTeacherType(TEACHER_TYPES.PT)}
                            className={`mode-btn ${teacherType === TEACHER_TYPES.PT ? 'mode-btn-active-pt' : ''}`}
                        >
                            PT
                        </button>
                    </div>

                    {/* 工具列 */}
                    <div className="toolbar">
                        <button onClick={copyShareLink} className="toolbar-btn" title="複製分享連結">
                            {copySuccess ? <Check className="icon-sm text-emerald" /> : <LinkIcon className="icon-sm" />}
                            <span className="toolbar-btn-text">{copySuccess ? '已複製' : '分享'}</span>
                        </button>
                        <button onClick={exportAsImage} disabled={isExporting} className="toolbar-btn" title="匯出圖片" aria-label="匯出圖片">
                            <Camera className={`icon-sm ${isExporting ? 'animate-pulse' : ''}`} />
                        </button>
                        <button onClick={exportToCSV} className="toolbar-btn" title="匯出 CSV" aria-label="匯出 CSV">
                            <Download className="icon-sm" />
                        </button>
                        <button onClick={printReport} className="toolbar-btn" title="列印" aria-label="列印">
                            <Printer className="icon-sm" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
});

Header.displayName = 'Header';

export default Header;
