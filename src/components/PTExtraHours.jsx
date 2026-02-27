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
        setPtBasicHours(prev => prev + 1);
    }, [setPtBasicHours]);

    const handleDecrement = useCallback(() => {
        setPtBasicHours(prev => Math.max(0, prev - 1));
    }, [setPtBasicHours]);

    const btnStyle = {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--color-amber-600)',
        padding: 'var(--spacing-1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'background-color 0.2s'
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
                    style={btnStyle}
                    aria-label="減少時數"
                    type="button"
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-amber-100)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <Minus className="icon-sm" />
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
                    onClick={handleIncrement}
                    style={btnStyle}
                    aria-label="增加時數"
                    type="button"
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-amber-100)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <Plus className="icon-sm" />
                </button>
            </div>
        </section>
    );
});

PTExtraHours.displayName = 'PTExtraHours';

export default PTExtraHours;
