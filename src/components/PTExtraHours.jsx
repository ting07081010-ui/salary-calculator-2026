import React, { memo } from 'react';
import { Timer } from 'lucide-react';

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
                    onClick={handleDecrement}
                    aria-label="減少非教學時數"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-amber-600)',
                        fontSize: '1.25rem',
                        fontWeight: '900',
                        cursor: 'pointer',
                        padding: '0 var(--spacing-2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    -
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
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-amber-600)',
                        fontSize: '1.25rem',
                        fontWeight: '900',
                        cursor: 'pointer',
                        padding: '0 var(--spacing-2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    +
                </button>
                <span className="pt-extra-unit">HR</span>
            </div>
        </section>
    );
});

PTExtraHours.displayName = 'PTExtraHours';

export default PTExtraHours;
