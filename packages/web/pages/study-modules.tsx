import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StudyModule } from '../components/StudyModule';

const StudyModules = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('/api/study-modules')
      .then(response => setModules(response.data))
      .catch(error => console.error('Error fetching study modules:', error));
  }, []);

  return (
    <div>
      <h1>Study Modules</h1>
      {modules.map(module => (
        <StudyModule key={module.id} title={module.title} description={module.description} />
      ))}
    </div>
  );
};

export default StudyModules;