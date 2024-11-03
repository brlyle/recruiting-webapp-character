import React, { useState, useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST } from './consts';
import Attributes from '../src/components/Attributes';
import Classes from '../src/components/Classes';
import Skills from '../src/components/Skills';

const API_BASE_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/brlyle/character';
const MAX_ATTRIBUTE_TOTAL = 70;

function App() {
    const [attributeValues, setAttributeValues] = useState<{ [key: string]: number }>(
        ATTRIBUTE_LIST.reduce((acc, attr) => ({ ...acc, [attr]: 10 }), {})
    );

    const [skillsValues, setSkillsValues] = useState<{ [key: string]: number }>({});
    const [classSelection, setClassSelection] = useState<string | null>(null);
    const [totalAttributePoints, setTotalAttributePoints] = useState<number>(0);

    useEffect(() => {
        const totalPoints = Object.values(attributeValues).reduce((sum, value) => sum + value, 0);
        setTotalAttributePoints(totalPoints);
    }, [attributeValues]);

    const saveCharacterData = async () => {
        const characterData = {
            attributes: attributeValues,
            skills: skillsValues,
            selectedClass: classSelection,
        };

        try {
            await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(characterData),
            });
            console.log('The character data has been saved successfully.');
        } catch (error) {
            console.error('Error occurred while saving character data:', error);
        }
    };

    const loadCharacterData = async () => {
        try {
            const response = await fetch(API_BASE_URL);
            if (response.ok) {
                const data = await response.json();
                setAttributeValues(data.body.attributes || {});
                setSkillsValues(data.body.skills || {});
                setClassSelection(data.body.selectedClass || null);
                console.log('The character data has been loaded successfully.');
            } else {
                console.error('Failed to load character data.');
            }
        } catch (error) {
            console.error('Error occurred while loading character data:', error);
        }
    };

    useEffect(() => {
        loadCharacterData();
    }, []);

    const handleAttributeChange = (name: string, value: number) => {
        setAttributeValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSkillChange = (name: string, value: number) => {
        setSkillsValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>React Coding Exercise - Byoung-Hwa Lee</h1>
            </header>
            <section className="App-section">
                <Attributes
                    onAttributeChange={handleAttributeChange}
                    attributeValues={attributeValues}
                    totalAttributePoints={totalAttributePoints}
                    maxTotal={MAX_ATTRIBUTE_TOTAL}
                />
                <Classes attributeValues={attributeValues} />
                <Skills attributeValues={attributeValues} skillsValues={skillsValues} onSkillChange={handleSkillChange} />
                <button onClick={saveCharacterData}>Save Character</button>
            </section>
        </div>
    );
}

export default App;