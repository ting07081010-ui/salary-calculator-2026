import React, { memo } from 'react';
import { Timer, Plus, Minus } from 'lucide-react';

/**
 * PT 非教學時數輸入元件
 */
const PTExtraHours = memo(({ ptBasicHours, setPtBasicHours }) => {
    const handleChange = (e) => {
        setPtBasicHours(Math.max(0, Number(e.target.value)));
    };

    const handleIncrement = () => setPtBasicHours(prev => prev + 1);
    const handleDecrement = () => setPtBasicHours(prev => Math.max(0, prev - 1));

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
                    aria-label="減少 PT 非教學時數"
                    style={{ padding: '0.5rem', color: 'var(--color-amber-600)' }}
                >
                    <Minus className="icon-xs" aria-hidden="true" />
                </button>
                <input
                    type="number"
                    min="0"
                    value={ptBasicHours}
                    onChange={handleChange}
                    className="pt-extra-input"
                    aria-label="PT 非教學時數"
                />
                <span className="pt-extra-unit">HR</span>
                <button
                    type="button"
                    onClick={handleIncrement}
                    aria-label="增加 PT 非教學時數"
                    style={{ padding: '0.5rem', color: 'var(--color-amber-600)' }}
                >
                    <Plus className="icon-xs" aria-hidden="true" />
                </button>
            </div>
        </section>
    );
});

PTExtraHours.displayName = 'PTExtraHours';

export default PTExtraHours;
