import React from 'react';

interface InfoItemProps {
    label?: string;
    value: string | string[] | undefined;
    className?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, className = '' }) => {
    const displayValue = Array.isArray(value) ? value.join(', ') : value;

    return (
        <p className={`mb-2 ${className}`}>
            {label && <strong>{label}: </strong>}
            {displayValue || 'Nicht angegeben'}
        </p>
    );
};

export default InfoItem;
