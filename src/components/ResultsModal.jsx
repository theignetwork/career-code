import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import DynamicResults from './DynamicResults.jsx';

const ResultsModal = ({ isOpen, onClose, results }) => {
  // Handle escape key and prevent body scrolling
  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !results) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="results-title"
    >
      <div className="modal-content">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-button"
          aria-label="Close results modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Results Content */}
        <div className="modal-body">
          <DynamicResults careerCode={results} />
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;