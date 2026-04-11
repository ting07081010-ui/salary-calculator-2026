/**
 * 可摺疊的設定區塊元件
 */
import React, { useState, memo, useId } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const SettingsSection = memo(({
    title,
    icon: Icon,
    children,
    defaultOpen = true,
    badge = null
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentId = useId();

    return (
        <div className="admin-section">
            <button
                className="admin-section-header"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={contentId}
            >
                <div className="admin-section-title">
                    {Icon && <Icon className="icon-md" />}
                    <span>{title}</span>
                    {badge && <span className="admin-section-badge">{badge}</span>}
                </div>
                {isOpen ? <ChevronDown className="icon-sm" aria-hidden="true" /> : <ChevronRight className="icon-sm" aria-hidden="true" />}
            </button>

            {isOpen && (
                <div id={contentId} className="admin-section-content">
                    {children}
                </div>
            )}
        </div>
    );
});

SettingsSection.displayName = 'SettingsSection';

export default SettingsSection;
