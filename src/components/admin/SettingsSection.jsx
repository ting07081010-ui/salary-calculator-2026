/**
 * 可摺疊的設定區塊元件
 */
import React, { useState, memo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const SettingsSection = memo(({
    title,
    icon: Icon,
    children,
    defaultOpen = true,
    badge = null
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="admin-section">
            <button
                className="admin-section-header"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="admin-section-title">
                    {Icon && <Icon className="icon-md" />}
                    <span>{title}</span>
                    {badge && <span className="admin-section-badge">{badge}</span>}
                </div>
                {isOpen ? <ChevronDown className="icon-sm" /> : <ChevronRight className="icon-sm" />}
            </button>

            {isOpen && (
                <div className="admin-section-content">
                    {children}
                </div>
            )}
        </div>
    );
});

SettingsSection.displayName = 'SettingsSection';

export default SettingsSection;
