import { useCallback } from 'react';
import { BOSS_CONFIG, FULL_TIME_CONFIG } from '../config/bossConfig';
import { formatCurrency } from '../utils/formatters';

/**
 * Boss 儀表板匯出功能 Hook
 */
export const useBossExport = ({ financial, opsCosts }) => {
    const fmt = formatCurrency;

    const exportCSV = useCallback(() => {
        // 為了反映真實成本，將正職底薪按班級數量平均分攤
        let csv = '\uFEFF老師,類型,班級級別,規模,頻率,學員數,月產值,薪資加給(獎金/PT),攤提底薪,單班真實成本,單班預估盈餘\n';

        financial.teacherData.forEach(t => {
            const baseSalary = t.teacherType === 'FULL_TIME' ? FULL_TIME_CONFIG.BASE_SALARY : 0;
            const allocatedBase = t.classList.length > 0 ? baseSalary / t.classList.length : 0;

            t.classList.forEach(c => {
                const totalClassCost = c.pay + allocatedBase;
                const profit = c.monthlyRev - totalClassCost;
                csv += `${t.name},${t.teacherType},${c.level === 'advanced' ? '進階' : '標準'},${c.type}人班,${c.frequency === 'full' ? '全期' : '單日'},${c.count},${Math.round(c.monthlyRev)},${Math.round(c.pay)},${Math.round(allocatedBase)},${Math.round(totalClassCost)},${Math.round(profit)}\n`;
            });
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const dateStr = new Date().toISOString().split('T')[0];
        link.download = `營運配置分析_${dateStr}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }, [financial]);

    const printReport = useCallback(() => {
        window.print();
    }, []);

    return {
        exportCSV,
        printReport
    };
};
