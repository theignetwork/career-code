import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DynamicResults from './DynamicResults';
import { getCareerCodePercentage } from '../utils/calculateCareerCode.js';

const ResultsPage = () => {
  const { careerCode } = useParams();
  const [isValidCode, setIsValidCode] = useState(false);
  const [careerData, setCareerData] = useState(null);

  console.log('ResultsPage component loaded');
  console.log('URL careerCode param:', careerCode);
  console.log('Current URL:', window.location.href);

  const validCodes = [
    'analyzer-solo',
    'analyzer-team',
    'analyzer-client',
    'builder-solo',
    'builder-team',
    'builder-client',
    'innovator-solo',
    'innovator-team',
    'innovator-client'
  ];

  const codeNames = {
    'analyzer-solo': 'The Research Specialist',
    'analyzer-team': 'The Strategic Consultant',
    'analyzer-client': 'The Solutions Architect',
    'builder-solo': 'The Systems Engineer',
    'builder-team': 'The Operations Leader',
    'builder-client': 'The Implementation Manager',
    'innovator-solo': 'The Creative Strategist',
    'innovator-team': 'The Innovation Catalyst',
    'innovator-client': 'The Business Developer'
  };

  useEffect(() => {
    console.log('ResultsPage useEffect running with careerCode:', careerCode);
    console.log('Valid codes:', validCodes);
    console.log('Is valid code?', validCodes.includes(careerCode));

    if (careerCode && validCodes.includes(careerCode)) {
      console.log('Setting up valid career code:', careerCode);
      setIsValidCode(true);

      // Parse career code
      const [strength, energy] = careerCode.split('-');
      console.log('Parsed strength:', strength, 'energy:', energy);

      const strengthMap = {
        analyzer: 'analyzer',
        builder: 'builder',
        innovator: 'innovator'
      };

      const data = {
        code: careerCode,
        name: codeNames[careerCode],
        strengths: strengthMap[strength],
        energy: energy,
        percentage: getCareerCodePercentage(careerCode)
      };

      console.log('Setting career data:', data);
      setCareerData(data);
    } else {
      console.log('Invalid career code, setting isValidCode to false');
      setIsValidCode(false);
    }
  }, [careerCode]);

  if (!isValidCode || !careerData) {
    console.log('Invalid state - isValidCode:', isValidCode, 'careerData:', careerData);
    if (careerCode) {
      return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Invalid Career Code</h1>
            <p>Career code "{careerCode}" not found.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-4 bg-teal-500 text-white px-4 py-2 rounded"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <DynamicResults careerCode={careerData} />
    </div>
  );
};

export default ResultsPage;