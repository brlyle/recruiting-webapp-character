import React from 'react';
import { ATTRIBUTE_LIST } from '../consts';

interface AttributesProps {
    attributeValues: { [key: string]: number };
    onAttributeChange: (name: string, value: number) => void;
    totalAttributePoints: number;
    maxTotal: number;
}

const Attributes: React.FC<AttributesProps> = ({ attributeValues, onAttributeChange, totalAttributePoints, maxTotal }) => {
    const calculateModifier = (value: number) => Math.floor((value - 10) / 2);

    const updateAttributeValue = (name: string, delta: number) => {
        const newValue = (attributeValues[name] || 0) + delta;

        if (delta > 0 && totalAttributePoints + delta > maxTotal) {
            alert('A Character can have up to 70 Delegated Attribute Points');
            return;
        }

        // Ensure no negative values
        if (newValue >= 0) {
            onAttributeChange(name, newValue);
        }
    };

    return (
        <div className="attributes-container">
            <h2>Attributes (Total: {totalAttributePoints}/{maxTotal})</h2>
            {ATTRIBUTE_LIST.map((attr) => (
                <div key={attr} className="attribute-item">
                    <span>
                        {attr}: {attributeValues[attr]} (Modifier: {calculateModifier(attributeValues[attr])})
                    </span>
                    <button
                        onClick={() => updateAttributeValue(attr, 1)}
                        disabled={totalAttributePoints > maxTotal}
                    >
                        +
                    </button>
                    <button onClick={() => updateAttributeValue(attr, -1)}>-</button>
                </div>
            ))}
        </div>
    );
};

export default Attributes;