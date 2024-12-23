import React from 'react';

interface StudyModuleProps {
  title: string;
  description: string;
}

export const StudyModule: React.FC<StudyModuleProps> = ({ title, description }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};