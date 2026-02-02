/**
 * 獎金/時薪表格編輯器
 * 支援可視化編輯陣列型的薪資級距
 */
import React, { memo, useCallback } from 'react';

const BonusTableEditor = memo(({
    title,
    data,           // { 5: [...], 10: [...], 15: [...] }
    onChange,
    valuePrefix = '$',
    valueLabel = '金額'
}) => {
    const classTypes = [5, 10, 15];

    const handleCellChange = useCallback((classType, index, newValue) => {
        const numValue = parseInt(newValue, 10) || 0;
        const newData = { ...data };
        newData[classType] = [...data[classType]];
        newData[classType][index] = numValue;
        onChange(newData);
    }, [data, onChange]);

    // 找出最長的陣列長度
    const maxLength = Math.max(...classTypes.map(t => data[t]?.length || 0));

    return (
        <div className="bonus-table-editor">
            <h4 className="bonus-table-title">{title}</h4>

            <div className="bonus-table-container">
                <table className="bonus-table">
                    <thead>
                        <tr>
                            <th className="bonus-th-corner">人數</th>
                            {Array.from({ length: maxLength }, (_, i) => (
                                <th key={i} className="bonus-th-index">{i}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {classTypes.map(classType => (
                            <tr key={classType}>
                                <td className="bonus-td-label">{classType}人班</td>
                                {Array.from({ length: maxLength }, (_, index) => {
                                    const value = data[classType]?.[index];
                                    const isDisabled = index >= (data[classType]?.length || 0);

                                    return (
                                        <td key={index} className={`bonus-td-cell ${isDisabled ? 'disabled' : ''}`}>
                                            {!isDisabled && (
                                                <div className="bonus-input-wrapper">
                                                    <span className="bonus-prefix">{valuePrefix}</span>
                                                    <input
                                                        type="number"
                                                        value={value || 0}
                                                        onChange={(e) => handleCellChange(classType, index, e.target.value)}
                                                        className="bonus-input"
                                                    />
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="bonus-table-hint">
                提示：表格中的 index 0 代表 0 人時的{valueLabel}，依此類推
            </p>
        </div>
    );
});

BonusTableEditor.displayName = 'BonusTableEditor';

export default BonusTableEditor;
