import React, { useEffect, useState } from 'react';
import { useAssessment } from './hooks/useAssessment.js';
import LandingPage from './components/LandingPage.jsx';
import Question1 from './components/questions/Question1.jsx';
import Question2 from './components/questions/Question2.jsx';
import Question3 from './components/questions/Question3.jsx';
import Question4 from './components/questions/Question4.jsx';
import Question5 from './components/questions/Question5.jsx';
import Question6 from './components/questions/Question6.jsx';
import Question7 from './components/questions/Question7.jsx';
import Question8 from './components/questions/Question8.jsx';
import Question9 from './components/questions/Question9.jsx';
import Question10 from './components/questions/Question10.jsx';
import CompactPartialResults from './components/CompactPartialResults.jsx';
import CompleteResults from './components/CompleteResults.jsx';
import ResultsModal from './components/ResultsModal.jsx';
import ProgressIndicator from './components/ProgressIndicator.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { iframeOptimizer } from './utils/iframeOptimizer.js';

function App() {
  const {
    currentStep,
    responses,
    careerCode,
    rankedCareers,
    updateResponse,
    nextStep,
    previousStep,
    calculateResults,
    captureEmail,
    resetAssessment
  } = useAssessment();

  // Modal state management
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [modalResults, setModalResults] = useState(null);

  // Enhanced email capture with modal display
  const handleEmailCapture = async (email) => {
    try {
      // Call original email capture logic
      await captureEmail(email);

      // Set up modal results
      setModalResults(careerCode);
      setShowResultsModal(true);

      // Track event
      iframeOptimizer.sendEventToParent('email-captured', {
        email,
        careerCode: careerCode.code
      });
    } catch (error) {
      console.error('Email capture failed:', error);
    }
  };

  // Close modal handler
  const handleCloseModal = () => {
    setShowResultsModal(false);
    setModalResults(null);
  };

  // Initialize iframe optimizations
  useEffect(() => {
    // Track page views and events for analytics
    iframeOptimizer.sendEventToParent('assessment-loaded');
  }, []);

  // Track step changes for analytics
  useEffect(() => {
    iframeOptimizer.sendEventToParent('step-changed', {
      step: currentStep,
      stepName: getStepName(currentStep)
    });
  }, [currentStep]);

  const getStepName = (step) => {
    const stepNames = {
      0: 'landing',
      1: 'strength-approach',
      2: 'strength-performance',
      3: 'strength-natural',
      4: 'energy-environment',
      5: 'energy-recharge',
      6: 'energy-productivity',
      7: 'trigger-achievement',
      8: 'trigger-success',
      9: 'trigger-motivation',
      10: 'trigger-legacy',
      11: 'partial-results',
      12: 'complete-results'
    };
    return stepNames[step] || 'unknown';
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <LandingPage onStart={nextStep} />;

      // Questions 1-3: Natural Strengths
      case 1:
        return (
          <Question1
            selectedValue={responses.q1}
            onSelect={(value) => updateResponse('q1', value)}
          />
        );

      case 2:
        return (
          <Question2
            selectedValue={responses.q2}
            onSelect={(value) => updateResponse('q2', value)}
          />
        );

      case 3:
        return (
          <Question3
            selectedValue={responses.q3}
            onSelect={(value) => updateResponse('q3', value)}
          />
        );

      // Questions 4-6: Energy Profile
      case 4:
        return (
          <Question4
            selectedValue={responses.q4}
            onSelect={(value) => updateResponse('q4', value)}
          />
        );

      case 5:
        return (
          <Question5
            selectedValue={responses.q5}
            onSelect={(value) => updateResponse('q5', value)}
          />
        );

      case 6:
        return (
          <Question6
            selectedValue={responses.q6}
            onSelect={(value) => updateResponse('q6', value)}
          />
        );

      // Questions 7-10: Success Triggers
      case 7:
        return (
          <Question7
            selectedValue={responses.q7}
            onSelect={(value) => updateResponse('q7', value)}
          />
        );

      case 8:
        return (
          <Question8
            selectedValue={responses.q8}
            onSelect={(value) => updateResponse('q8', value)}
          />
        );

      case 9:
        return (
          <Question9
            selectedValue={responses.q9}
            onSelect={(value) => updateResponse('q9', value)}
          />
        );

      case 10:
        return (
          <Question10
            selectedValue={responses.q10}
            onSelect={(value) => updateResponse('q10', value)}
          />
        );

      case 11:
        return (
          <CompactPartialResults
            careerCode={careerCode}
            topCareer={rankedCareers[1]} // Show #2 career as teaser
            onEmailCapture={handleEmailCapture}
          />
        );

      case 12:
        return (
          <CompleteResults
            careerCode={careerCode}
            rankedCareers={rankedCareers}
            onRestart={resetAssessment}
          />
        );

      default:
        return <LandingPage onStart={nextStep} />;
    }
  };

  const showProgress = currentStep > 0 && currentStep < 11;

  return (
    <ErrorBoundary>
      <div className="page-background">
        <div className="career-tool-container">
          {showProgress && (
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={10}
              onBack={previousStep}
              canGoBack={true}
            />
          )}

          <main className={showProgress ? 'pt-4' : ''}>
            {renderCurrentStep()}
          </main>

          {/* Analytics Tracking */}
          <div id="analytics-events" style={{ display: 'none' }}>
            <div data-event="step-completed" data-step={currentStep}></div>
            <div data-event="assessment-progress" data-progress={Math.round((currentStep / 10) * 100)}></div>
          </div>
        </div>

        {/* Results Modal */}
        <ResultsModal
          isOpen={showResultsModal}
          onClose={handleCloseModal}
          results={modalResults}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;