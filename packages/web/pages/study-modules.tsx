import React, { useEffect, useState } from 'react';
import axios from 'axios';

type StudyModule = {
    id: number;
    name: string;
    description: string;
};

const StudyModules = () => {
    const [modules, setModules] = useState<StudyModule[]>([]);

    useEffect(() => {
        axios.get<StudyModule[]>('/api/study-modules') 
            .then(response => setModules(response.data))
            .catch(error => console.error('Error fetching study modules:', error));
    }, []);

    return (
        <div>
            {modules.map(module => (
                <div key={module.id}>
                    <h2>{module.name}</h2>
                    <p>{module.description}</p>
                </div>
            ))}
        </div>
    );
};

export default StudyModules;
