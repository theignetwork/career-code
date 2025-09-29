import { useState } from 'react';
import { calculateCareerCode, rankCareers } from '../utils/calculateCareerCode.js';

export const useAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({
    // Questions 1-10
    q1: null,  // Natural Strengths: Problem approach
    q2: null,  // Natural Strengths: Performance
    q3: null,  // Natural Strengths: Natural strength
    q4: null,  // Energy Profile: Work environment
    q5: null,  // Energy Profile: Recharge
    q6: null,  // Energy Profile: Productivity
    q7: null,  // Success Triggers: Achievement (select 2)
    q8: null,  // Success Triggers: Career success
    q9: null,  // Success Triggers: Accomplishment
    q10: null  // Success Triggers: Ultimate motivation
  });
  const [careerCode, setCareerCode] = useState(null);
  const [rankedCareers, setRankedCareers] = useState([]);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const updateResponse = (field, value) => {
    const newResponses = { ...responses, [field]: value };
    setResponses(newResponses);

    // Auto-advance after any selection with appropriate delays
    if (field === 'q10') {
      // Final question - calculate results and advance
      setTimeout(() => {
        calculateResultsFromAllQuestions(newResponses);
        nextStep(); // Move to partial results
      }, 800);
    } else {
      // All other questions auto-advance
      setTimeout(() => nextStep(), 500);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const calculateResultsFromAllQuestions = (allResponses) => {
    // Use the new calculateCareerCode function directly with all responses
    const code = calculateCareerCode(allResponses);
    const careers = rankCareers(code);

    setCareerCode(code);
    setRankedCareers(careers);
  };

  const calculateResults = () => {
    // Legacy function for compatibility
    calculateResultsFromAllQuestions(responses);
  };

  // Helper function to get most frequent response
  const getMostFrequent = (arr) => {
    const frequency = {};
    arr.forEach(item => frequency[item] = (frequency[item] || 0) + 1);
    return Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b);
  };

  // Helper function to get second most frequent or fallback
  const getSecondMostFrequent = (arr) => {
    const frequency = {};
    arr.forEach(item => frequency[item] = (frequency[item] || 0) + 1);
    const sorted = Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]);
    return sorted[1] || sorted[0];
  };

  const captureEmail = (email) => {
    setUserEmail(email);
    setEmailCaptured(true);
    nextStep(); // Move to complete results
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setResponses({
      q1: null,
      q2: null,
      q3: null,
      q4: null,
      q5: null,
      q6: null,
      q7: null,
      q8: null,
      q9: null,
      q10: null
    });
    setCareerCode(null);
    setRankedCareers([]);
    setEmailCaptured(false);
    setUserEmail('');
  };

  const getProgress = () => {
    const totalSteps = 13; // Landing, Q1-Q10, Partial Results, Complete Results
    return Math.round((currentStep / totalSteps) * 100);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return responses.q1 !== null;
      case 2: return responses.q2 !== null;
      case 3: return responses.q3 !== null;
      case 4: return responses.q4 !== null;
      case 5: return responses.q5 !== null;
      case 6: return responses.q6 !== null;
      case 7: return responses.q7 !== null;
      case 8: return responses.q8 !== null;
      case 9: return responses.q9 !== null;
      case 10: return responses.q10 !== null;
      default:
        return true;
    }
  };

  return {
    currentStep,
    responses,
    careerCode,
    rankedCareers,
    emailCaptured,
    userEmail,
    updateResponse,
    nextStep,
    previousStep,
    calculateResults,
    captureEmail,
    resetAssessment,
    getProgress,
    canProceed
  };
};