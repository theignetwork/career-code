import React, { useState } from 'react';
import { Crown, DollarSign, Star } from 'lucide-react';
import { getCareerCodeDescription, getCareerCodePercentage } from '../utils/calculateCareerCode.js';

const CompactPartialResults = ({ careerCode, topCareer, onEmailCapture }) => {
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Updated button click handler
  const handleGetCompleteResults = () => {
    setShowEmailPopup(true);
    setSubmitError(''); // Clear any previous errors
  };

  // Email submission handler
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      // Validate career code
      if (!careerCode || !careerCode.code || careerCode.code.includes('undefined')) {
        console.error('Invalid career code calculated:', careerCode);
        throw new Error('Invalid career code. Please try the assessment again.');
      }

      // Trigger email capture via parent callback (this is now async)
      if (onEmailCapture) {
        await onEmailCapture(email);
      }

      // Success - close popup and clear email input
      setShowEmailPopup(false);
      setEmail('');

    } catch (error) {
      console.error('Email capture failed:', error);
      setSubmitError(error.message || 'Failed to capture email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const formatSalary = (min, max) => {
    const formatNumber = (num) => {
      if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
      return `$${num.toLocaleString()}`;
    };
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="results-section">

        {/* Header - Compact */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
            🎉 Your Career Code: {careerCode.name}
          </h1>
          <p className="text-lg font-medium text-slate-300">
            You're an <span className="font-bold text-teal-400">{careerCode.code.replace(/-/g, '-')}</span> type ({careerCode.percentage}% of professionals)
          </p>
        </div>

        {/* Factor Cards - Compact Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="premium-card p-4 text-center glow-effect">
            <h4 className="text-xl font-bold text-white mb-1">
              {careerCode.strengths.charAt(0).toUpperCase() + careerCode.strengths.slice(1)}
            </h4>
            <p className="text-slate-400 text-sm">Natural strength</p>
          </div>
          <div className="premium-card p-4 text-center glow-effect">
            <h4 className="text-xl font-bold text-white mb-1">
              {careerCode.energy.charAt(0).toUpperCase() + careerCode.energy.slice(1)}
            </h4>
            <p className="text-slate-400 text-sm">Energy profile</p>
          </div>
          <div className="premium-card p-4 text-center glow-effect">
            <h4 className="text-xl font-bold text-white mb-1">
              Motivated
            </h4>
            <p className="text-slate-400 text-sm">Success driven</p>
          </div>
        </div>

        {/* Career Match - Compact */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">✨ Your #2 Career Match:</h2>
          </div>

          <div className="premium-card p-6 glow-effect">
            <h3 className="text-2xl font-bold text-white mb-3">
              {topCareer.title}
            </h3>
            <div className="flex items-center gap-4 mb-3">
              <span className="text-lg font-bold text-teal-400">
                {formatSalary(topCareer.salaryMin, topCareer.salaryMax)}
              </span>
              <span className="text-sm font-medium text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full">
                {topCareer.matchPercentage}% match
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {topCareer.description}
            </p>
          </div>
        </div>

        {/* CTA Section - Enhanced */}
        <div className="text-center">
          {/* Main CTA Heading */}
          <h2 className="text-2xl font-bold text-white mb-2">
            Curious what your #1 match is?
          </h2>

          {/* Subtext */}
          <p className="text-gray-300 mb-6">
            See all 8 of your ideal careers ranked
          </p>

          {/* Trust Elements Above Button */}
          <div className="flex justify-center items-center gap-6 mb-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              ✓ Free analysis - No credit card required
            </span>
            <span className="flex items-center gap-1">
              ⏱ Limited time insights
            </span>
          </div>

          {/* Enhanced CTA Button */}
          <button
            onClick={handleGetCompleteResults}
            className="group relative w-full max-w-lg mx-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold text-lg py-5 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 animate-pulse hover:animate-none mb-4"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 002 2v6a2 2 0 002 2z" />
              </svg>
              Unlock My #1 Career Match
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>

          {/* Timer Element */}
          <div className="text-xs text-yellow-400 mb-6">
            🔥 Join 127,000+ professionals who discovered their career advantage
          </div>
        </div>

      </div>

      {/* Email Popup Modal */}
      {showEmailPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50 p-4 pt-8 sm:pt-16 pb-16"
          onClick={() => setShowEmailPopup(false)}
        >
          <div
            className="bg-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full h-fit relative border border-slate-600 mt-4 sm:mt-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowEmailPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Popup Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                Unlock Your Complete Career Analysis
              </h2>
              <p className="text-gray-300 text-sm">
                Get your personalized ranking of 8 ideal careers plus detailed insights about your {careerCode.name} code
              </p>
            </div>

            {/* Value Propositions */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                Complete ranking of your top 8 career matches
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                Detailed salary ranges and growth projections
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                Specific action steps for your career code
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                Companies that actively hire your type
              </div>
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {submitError}
              </div>
            )}

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-teal-400 focus:outline-none disabled:opacity-50"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Sending to ActiveCampaign...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 002 2v6a2 2 0 002 2z" />
                    </svg>
                    Get My Complete Results
                  </>
                )}
              </button>
            </form>

            {/* Trust Signals */}
            <div className="text-center mt-4 text-xs text-gray-400">
              ✓ Free • No spam • Unsubscribe anytime
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default CompactPartialResults;