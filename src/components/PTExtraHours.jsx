import React, { memo } from 'react';
import { Timer } from 'lucide-react';

/**
 * PT 非教學時數輸入元件
 */
const PTExtraHours = memo(({ ptBasicHours, setPtBasicHours }) => {
    const handleChange = (e) => {
        setPtBasicHours(Math.max(0, Number(e.target.value)));
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
                <input
                    type="number"
                    min="0"
                    value={ptBasicHours}
                    onChange={handleChange}
                    className="pt-extra-input"
                />
                <span className="pt-extra-unit">HR</span>
            </div>
        </section>
    );
});

PTExtraHours.displayName = 'PTExtraHours';

export default PTExtraHours;
