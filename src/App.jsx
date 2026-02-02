import React, { useRef, useEffect } from 'react';
import { Plus, Users } from 'lucide-react';

// Components
import {
  Header,
  DashboardPanel,
  ClassCard,
  PTExtraHours,
  PrintReport
} from './components';

// Hooks
import { useSalaryCalculator } from './hooks/useSalaryCalculator';
import { useShareLink } from './hooks/useShareLink';
import { useExport } from './hooks/useExport';

// Config
import { TEACHER_TYPES, MAX_CLASSES } from './config/salaryConfig';

// Styles
import './index.css';

/**
 * 老師薪資試算系統 v4.0
 * 模組化優化版
 */
const App = () => {
  const captureRef = useRef(null);

  // 核心計算 Hook
  const {
    teacherType,
    setTeacherType,
    classes,
    ptBasicHours,
    setPtBasicHours,
    calculatedData,
    totalBase,
    ptExtraPay,
    totalTeachingSub,
    ptTotalHours,
    grandTotal,
    updateClass,
    addClass,
    removeClass,
    loadFromUrl,
    canAddClass,
    classCount
  } = useSalaryCalculator();

  // 分享連結 Hook
  const { copyShareLink, copySuccess } = useShareLink({
    teacherType,
    classes,
    ptBasicHours
  });

  // 匯出功能 Hook
  const { exportToCSV, exportAsImage, printReport, isExporting } = useExport({
    calculatedData,
    teacherType,
    totals: { totalBase, ptExtraPay, grandTotal },
    ptBasicHours
  });

  // 從 URL 載入分享資料
  useEffect(() => {
    loadFromUrl();
  }, [loadFromUrl]);

  const handleExportAsImage = () => exportAsImage(captureRef);

  return (
    <div className="app-container">
      {/* 導覽列 */}
      <Header
        teacherType={teacherType}
        setTeacherType={setTeacherType}
        copyShareLink={copyShareLink}
        copySuccess={copySuccess}
        exportAsImage={handleExportAsImage}
        exportToCSV={exportToCSV}
        printReport={printReport}
        isExporting={isExporting}
      />

      <main ref={captureRef} className="main-content">
        {/* 核心看板 */}
        <DashboardPanel
          teacherType={teacherType}
          totalBase={totalBase}
          ptTotalHours={ptTotalHours}
          totalTeachingSub={totalTeachingSub}
          ptExtraPay={ptExtraPay}
          grandTotal={grandTotal}
        />

        {/* 配置區 */}
        <div className="config-section">
          <div className="config-header print-hidden">
            <h2 className="config-title">
              <Users className="icon-sm text-indigo" />
              配置概覽
              <span className="config-count">({classCount}/{MAX_CLASSES})</span>
            </h2>
            <button
              onClick={addClass}
              disabled={!canAddClass}
              className="add-class-btn"
            >
              <Plus className="icon-sm" />
              <span className="add-class-text">新增班級</span>
            </button>
          </div>

          {/* PT 非教學時數 */}
          {teacherType === TEACHER_TYPES.PT && (
            <PTExtraHours
              ptBasicHours={ptBasicHours}
              setPtBasicHours={setPtBasicHours}
            />
          )}

          {/* 班級卡片列表 */}
          <div className="class-list">
            {calculatedData.map((cls, index) => (
              <ClassCard
                key={cls.id}
                cls={cls}
                index={index}
                teacherType={teacherType}
                updateClass={updateClass}
                removeClass={removeClass}
              />
            ))}
          </div>
        </div>

        {/* 列印報表 */}
        <PrintReport
          calculatedData={calculatedData}
          teacherType={teacherType}
          totalBase={totalBase}
          ptBasicHours={ptBasicHours}
          ptExtraPay={ptExtraPay}
          grandTotal={grandTotal}
        />
      </main>

      {/* 頁尾 */}
      <footer className="app-footer print-hidden">
        <span>v4.0 • Modular & Optimized</span>
      </footer>
    </div>
  );
};

export default App;
