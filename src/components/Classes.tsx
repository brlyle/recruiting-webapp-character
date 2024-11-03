import React, { useState } from 'react';
import { CLASS_LIST } from '../consts';

interface ClassProps {
    attributeValues: { [key: string]: number };
}

const Classes: React.FC<ClassProps> = ({ attributeValues }) => {
    const [selectedClass, setSelectedClass] = useState<string | null>(null);

    const isRequirementMet = (className: string) => {
        const requirements = CLASS_LIST[className];
        return Object.keys(requirements).every(
            (attr) => attributeValues[attr] >= requirements[attr]
        );
    };

    const handleClassClick = (className: string) => {
        setSelectedClass(selectedClass === className ? null : className);
    };

    return (
        <div className="classes-container">
            <h2>Classes</h2>
            {Object.keys(CLASS_LIST).map((className) => (
                <div
                    key={className}
                    className={`class-item ${isRequirementMet(className) ? 'met' : 'not-met'}`}
                    onClick={() => handleClassClick(className)}
                >
                    <span>{className}</span>
                </div>
            ))}

            {selectedClass && (
                <>
                    <div className="class-requirements">
                        <h3>{selectedClass} Minimum Requirements</h3>
                        {(Object.entries(CLASS_LIST[selectedClass as keyof typeof CLASS_LIST]) as [string, number][]).map(([attr, value]) => (
                            <p key={attr}>
                                {attr}: {value}
                            </p>
                        ))}
                        <button onClick={() => setSelectedClass(null)}>Close Requirement View</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Classes;