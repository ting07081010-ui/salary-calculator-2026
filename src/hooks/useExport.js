import { useState, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { formatCurrency } from '../utils/formatters';

/**
 * 匯出功能 Hook
 * 包含 CSV、圖片匯出功能
 */
export const useExport = ({ calculatedData, teacherType, totals, ptBasicHours }) => {
    const [isExporting, setIsExporting] = useState(false);

    // 匯出 CSV
    const exportToCSV = useCallback(() => {
        const headers = ["項目", "類型", "人數/時數", "頻率", "小計"];
        const rows = calculatedData.map((c, i) => [
            `班級 ${i + 1}`,
            `${c.type}人班`,
            `${c.count}人 (${c.hours}hr)`,
            c.frequency === 'full' ? '全期' : '單日',
            Math.round(c.subTotal)
        ]);

        if (teacherType === 'FULL_TIME') {
            rows.push(["固定底薪", "-", "-", "-", totals.totalBase]);
        }

        if (ptBasicHours > 0) {
            rows.push(["額外酬勞", "-", `${ptBasicHours}hr`, "-", totals.ptExtraPay]);
        }

        rows.push(["總計", "-", "-", "-", Math.round(totals.grandTotal)]);

        // BOM 標記確保 Excel 正確顯示中文
        const csvContent = "\uFEFF" + [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `薪資試算_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }, [calculatedData, teacherType, totals, ptBasicHours]);

    // 匯出圖片
    const exportAsImage = useCallback(async (captureRef) => {
        if (isExporting || !captureRef?.current) return;

        setIsExporting(true);
        try {
            const canvas = await html2canvas(captureRef.current, {
                backgroundColor: '#f8fafc',
                scale: 2,
                useCORS: true
            });

            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = `SalaryReport_${Date.now()}.png`;
            link.click();
        } catch (e) {
            console.error('Export failed:', e);
        } finally {
            setIsExporting(false);
        }
    }, [isExporting]);

    // 列印
    const printReport = useCallback(() => {
        window.print();
    }, []);

    return {
        exportToCSV,
        exportAsImage,
        printReport,
        isExporting
    };
};
