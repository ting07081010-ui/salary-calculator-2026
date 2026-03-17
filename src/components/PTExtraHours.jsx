import React, { memo } from 'react';
import { Timer, Plus, Minus } from 'lucide-react';

/**
 * PT 非教學時數輸入元件
 */
const PTExtraHours = memo(({ ptBasicHours, setPtBasicHours }) => {
    const handleChange = (e) => {
        setPtBasicHours(Math.max(0, Number(e.target.value)));
    };

    const incrementHours = () => {
        setPtBasicHours(Number(ptBasicHours) + 1);
    };

    const decrementHours = () => {
        setPtBasicHours(Math.max(0, Number(ptBasicHours) - 1));
    };

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
            <div className="pt-extra-input-wrapper" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                <button
                    type="button"
                    onClick={decrementHours}
                    aria-label="減少非教學時數"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '4px', background: 'var(--color-amber-50)', color: 'var(--color-amber-600)', border: 'none', cursor: 'pointer' }}
                >
                    <Minus className="icon-sm" aria-hidden="true" />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)' }}>
                    <input
                        type="number"
                        min="0"
                        value={ptBasicHours}
                        onChange={handleChange}
                        className="pt-extra-input"
                        aria-label="非教學時數"
                    />
                    <span className="pt-extra-unit">HR</span>
                </div>
                <button
                    type="button"
                    onClick={incrementHours}
                    aria-label="增加非教學時數"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '4px', background: 'var(--color-amber-50)', color: 'var(--color-amber-600)', border: 'none', cursor: 'pointer' }}
                >
                    <Plus className="icon-sm" aria-hidden="true" />
                </button>
            </div>
        </section>
    );
});

PTExtraHours.displayName = 'PTExtraHours';

export default PTExtraHours;
