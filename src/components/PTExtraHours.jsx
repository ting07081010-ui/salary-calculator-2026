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
        setPtBasicHours(Math.max(0, ptBasicHours - 1));
    };

    const handleIncrement = () => {
        setPtBasicHours(ptBasicHours + 1);
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
                    aria-label="減少非教學時數"
                    style={{
                        padding: 'var(--spacing-1)',
                        color: 'var(--color-amber-600)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
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
                    aria-label="增加非教學時數"
                    style={{
                        padding: 'var(--spacing-1)',
                        color: 'var(--color-amber-600)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Plus className="icon-sm" aria-hidden="true" />
                </button>
                <span className="pt-extra-unit" style={{ marginLeft: 'var(--spacing-1)' }}>HR</span>
            </div>
        </section>
    );
});

PTExtraHours.displayName = 'PTExtraHours';

export default PTExtraHours;
