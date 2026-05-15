import React, { memo, useCallback } from 'react';
import { Timer, Minus, Plus } from 'lucide-react';

/**
 * PT 非教學時數輸入元件
 */
const PTExtraHours = memo(({ ptBasicHours, setPtBasicHours }) => {
    const handleChange = useCallback((e) => {
        setPtBasicHours(Math.max(0, Number(e.target.value)));
    }, [setPtBasicHours]);

    const handleDecrement = useCallback(() => {
        setPtBasicHours((prev) => Math.max(0, prev - 1));
    }, [setPtBasicHours]);

    const handleIncrement = useCallback(() => {
        setPtBasicHours((prev) => prev + 1);
    }, [setPtBasicHours]);

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
                    onClick={handleDecrement}
                    aria-label="減少非教學時數"
                    className="frequency-btn"
                    style={{ color: 'var(--color-amber-600)', padding: '0.25rem' }}
                    type="button"
                >
                    <Minus className="icon-sm" aria-hidden="true" />
                </button>
                <input
                    type="number"
                    min="0"
                    value={ptBasicHours}
                    onChange={handleChange}
                    className="pt-extra-input"
                    aria-label="非教學時數輸入"
                />
                <button
                    onClick={handleIncrement}
                    aria-label="增加非教學時數"
                    className="frequency-btn"
                    style={{ color: 'var(--color-amber-600)', padding: '0.25rem' }}
                    type="button"
                >
                    <Plus className="icon-sm" aria-hidden="true" />
                </button>
                <span className="pt-extra-unit">HR</span>
            </div>
        </section>
    );
});

PTExtraHours.displayName = 'PTExtraHours';

export default PTExtraHours;
