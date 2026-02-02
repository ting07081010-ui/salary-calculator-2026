import React, { memo } from 'react';
import { FileText } from 'lucide-react';
import { TEACHER_TYPES } from '../config/salaryConfig';
import { formatCurrency } from '../utils/formatters';

/**
 * 列印專用報表元件
 */
const PrintReport = memo(({
    calculatedData,
    teacherType,
    totalBase,
    ptBasicHours,
    ptExtraPay,
    grandTotal
}) => {
    const fmt = formatCurrency;
    const isFullTime = teacherType === TEACHER_TYPES.FULL_TIME;

    return (
        <section className="print-report">
            <div className="print-report-header">
                <h3 className="print-report-title">
                    <FileText className="icon-lg text-indigo" />
                    薪資結算明細
                </h3>
                <div className="print-report-meta">
                    <p>結算：{isFullTime ? '正職教師' : 'PT 教師'}</p>
                    <p>日期：{new Date().toLocaleDateString()}</p>
                </div>
            </div>

            <table className="print-table">
                <thead>
                    <tr className="print-table-header">
                        <th>項目</th>
                        <th>統計</th>
                        <th className="text-right">小計</th>
                    </tr>
                </thead>
                <tbody className="print-table-body">
                    {calculatedData.map((c, i) => (
                        <tr key={c.id}>
                            <td>
                                <div className="print-item-name">{c.type}人班 ({i + 1})</div>
                                <div className="print-item-detail">{c.info}</div>
                            </td>
                            <td className="print-item-stats">
                                {c.count}人 / {c.hours}hr ({c.frequency === 'full' ? '1.0' : '0.5'})
                            </td>
                            <td className="print-item-amount">${fmt(c.subTotal)}</td>
                        </tr>
                    ))}

                    {isFullTime && (
                        <tr className="print-row-highlight-ft">
                            <td className="print-highlight-label">固定底薪保障</td>
                            <td></td>
                            <td className="print-highlight-amount">${fmt(totalBase)}</td>
                        </tr>
                    )}

                    {!isFullTime && ptBasicHours > 0 && (
                        <tr className="print-row-highlight-pt">
                            <td className="print-highlight-label">非教學酬勞</td>
                            <td className="print-item-stats">{ptBasicHours} hr</td>
                            <td className="print-highlight-amount">${fmt(ptExtraPay)}</td>
                        </tr>
                    )}

                    <tr className="print-row-total">
                        <td className="print-total-label">總計應領</td>
                        <td></td>
                        <td className="print-total-amount">${fmt(grandTotal)}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
});

PrintReport.displayName = 'PrintReport';

export default PrintReport;
