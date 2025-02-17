'use client'
import React, { useState, useRef, useEffect } from 'react';

interface InfoItemProps {
    label?: string;
    value: string | string[] | undefined;
    className?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, className = '' }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [shouldShowToggle, setShouldShowToggle] = useState(false);
    const contentRef = useRef<HTMLParagraphElement>(null);

    const displayValue = Array.isArray(value) ? value.join(', ') : value;

    useEffect(() => {
        if (contentRef.current) {
            const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight);
            const maxHeight = lineHeight * 6; // 6 Zeilen
            setShouldShowToggle(contentRef.current.scrollHeight > maxHeight);
        }
    }, [displayValue]);

    return (
        <div className={`mb-2 ${className}`}>
            {label && <strong>{label}: </strong>}
            <div className="relative overflow-hidden transition-all duration-300 ease-in-out"
                 style={{ maxHeight: isExpanded ? '1000px' : '144px' }}>
                <p ref={contentRef}>
                    {displayValue || 'Nicht angegeben'}
                </p>
            </div>
            {shouldShowToggle && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#50cd32] hover:underline mt-1 transition-colors duration-300"
                >
                    {isExpanded ? 'Weniger anzeigen' : 'Mehr anzeigen'}
                </button>
            )}
        </div>
    );
};

export default InfoItem;
