import React, { memo, useCallback } from 'react';
import { Timer, Plus, Minus } from 'lucide-react';

/**
 * PT 非教學時數輸入元件
 */
const PTExtraHours = memo(({ ptBasicHours, setPtBasicHours }) => {
    const handleChange = useCallback((e) => {
        setPtBasicHours(Math.max(0, Number(e.target.value)));
    }, [setPtBasicHours]);

    const handleIncrement = useCallback(() => {
        setPtBasicHours(Number(ptBasicHours) + 1);
    }, [ptBasicHours, setPtBasicHours]);

    const handleDecrement = useCallback(() => {
        setPtBasicHours(Math.max(0, Number(ptBasicHours) - 1));
    }, [ptBasicHours, setPtBasicHours]);

    return (
        <section className="pt-extra-section">
            <div className="pt-extra-header">
                <div className="pt-extra-icon">
                    <Timer className="icon-sm" />
                </div>
                <div>
                    <h3 className="pt-extra-title">非教學時數</h3>
                    <p className="pt-extra-subtitle">$200/hr 計算</p>
                </div>
            </div>
            <div className="pt-extra-input-wrapper">
                <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={ptBasicHours <= 0}
                    className="toolbar-btn"
                    aria-label="減少非教學時數"
                    style={{ padding: '0.25rem', opacity: ptBasicHours <= 0 ? 0.5 : 1, cursor: ptBasicHours <= 0 ? 'not-allowed' : 'pointer' }}
                >
                    <Minus className="icon-sm" aria-hidden="true" />
                </button>
                <input
                    type="number"
                    min="0"
                    value={ptBasicHours}
                    onChange={handleChange}
                    className="pt-extra-input"
                />
                <button
                    type="button"
                    onClick={handleIncrement}
                    className="toolbar-btn"
                    aria-label="增加非教學時數"
                    style={{ padding: '0.25rem' }}
                >
                    <Plus className="icon-sm" aria-hidden="true" />
                </button>
                <span className="pt-extra-unit" style={{ marginLeft: '0.25rem' }}>HR</span>
            </div>
        </section>
    );
});

PTExtraHours.displayName = 'PTExtraHours';

export default PTExtraHours;
