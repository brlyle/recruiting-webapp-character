// Skills.tsx
import React from 'react';
import { SKILL_LIST } from '../consts';

interface SkillsProps {
    attributeValues: { [key: string]: number };
    skillsValues: { [key: string]: number };
    onSkillChange: (name: string, value: number) => void;
}

const Skills: React.FC<SkillsProps> = ({ attributeValues, skillsValues, onSkillChange }) => {
    const calculateModifier = (value: number) => Math.floor((value - 10) / 2);

    const intelligenceModifier = calculateModifier(attributeValues['Intelligence'] || 0);
    const totalSkillPointsAvailable = 10 + (4 * intelligenceModifier);

    const totalSkillPointsUsed = SKILL_LIST.reduce((total, skill) => {
        return total + (skillsValues[skill.name] || 0);
    }, 0);

    const handleSkillPointChange = (skillName: string, delta: number) => {
        const currentPoints = skillsValues[skillName] || 0;
        const newPoints = currentPoints + delta;

        if (newPoints >= 0 && totalSkillPointsUsed + delta <= totalSkillPointsAvailable) {
            onSkillChange(skillName, newPoints);
        }
    };

    return (
        <div className="skills-container">
            <h2>Skills</h2>
            <p>Total skill points available: {totalSkillPointsAvailable - totalSkillPointsUsed}</p>
            {SKILL_LIST.map((skill) => {
                const modifier = calculateModifier(attributeValues[skill.attributeModifier] || 0);
                const skillPoints = skillsValues[skill.name] || 0;
                const totalSkillValue = skillPoints + modifier;

                return (
                    <div key={skill.name} className="skill-item">
                        <span>{skill.name}: {skillPoints}</span>
                        <span> (Modifier: {skill.attributeModifier}): {modifier}</span>
                        <button onClick={() => handleSkillPointChange(skill.name, 1)}>+</button>
                        <button onClick={() => handleSkillPointChange(skill.name, -1)}>-</button>
                        <span> Total: {totalSkillValue}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default Skills;