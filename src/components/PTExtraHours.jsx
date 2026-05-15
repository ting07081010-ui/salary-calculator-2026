import React, { memo } from 'react';
import { Timer, Plus, Minus } from 'lucide-react';

/**
 * PT 非教學時數輸入元件
 */
const PTExtraHours = memo(({ ptBasicHours, setPtBasicHours }) => {
    const handleChange = (e) => {
        setPtBasicHours(Math.max(0, Number(e.target.value)));
    };

    const handleIncrement = () => {
        setPtBasicHours(Number(ptBasicHours) + 1);
    };

    const handleDecrement = () => {
        setPtBasicHours(Math.max(0, Number(ptBasicHours) - 1));
    };

    const btnStyle = {
        padding: 'var(--spacing-1)',
        background: 'transparent',
        border: '1px solid var(--color-amber-200)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-amber-600)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s'
    };

    const btnDisabledStyle = {
        ...btnStyle,
        color: 'var(--color-slate-300)',
        borderColor: 'var(--color-slate-200)',
        cursor: 'not-allowed'
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
            <div className="pt-extra-input-wrapper">
                <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={ptBasicHours <= 0}
                    style={ptBasicHours <= 0 ? btnDisabledStyle : btnStyle}
                    aria-label="減少非教學時數"
                    title="減少非教學時數"
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
                <span className="pt-extra-unit">HR</span>

                <button
                    type="button"
                    onClick={handleIncrement}
                    style={btnStyle}
                    aria-label="增加非教學時數"
                    title="增加非教學時數"
                >
                    <Plus className="icon-sm" aria-hidden="true" />
                </button>
            </div>
        </section>
    );
});

PTExtraHours.displayName = 'PTExtraHours';

export default PTExtraHours;
