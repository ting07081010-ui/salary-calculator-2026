import React, { memo } from 'react';
import { Timer, Minus, Plus } from 'lucide-react';

/**
 * PT 非教學時數輸入元件
 */
const PTExtraHours = memo(({ ptBasicHours, setPtBasicHours }) => {
    const handleChange = (e) => {
        setPtBasicHours(Math.max(0, Number(e.target.value)));
    };

    const handleDecrement = () => {
        setPtBasicHours(Math.max(0, Number(ptBasicHours) - 1));
    };

    const handleIncrement = () => {
        setPtBasicHours(Number(ptBasicHours) + 1);
    };

    return (
        <section className="pt-extra-section">
            <div className="pt-extra-header">
                <div className="pt-extra-icon">
                    <Timer className="icon-sm" aria-hidden="true" />
                </div>
                <div>
                    <h3 className="pt-extra-title">非教學時數</h3>
                    <p className="pt-extra-subtitle">$200/hr 計算</p>
                </div>
            </div>
            <div className="pt-extra-input-wrapper" style={{ gap: '0.5rem' }}>
                <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={Number(ptBasicHours) <= 0}
                    className="toolbar-btn"
                    style={{ padding: '0.25rem' }}
                    aria-label="減少非教學時數"
                >
                    <Minus className="icon-sm" aria-hidden="true" />
                </button>
                <input
                    type="number"
                    min="0"
                    value={ptBasicHours}
                    onChange={handleChange}
                    className="pt-extra-input"
                    aria-label="非教學時數"
                />
                <button
                    type="button"
                    onClick={handleIncrement}
                    className="toolbar-btn"
                    style={{ padding: '0.25rem' }}
                    aria-label="增加非教學時數"
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
