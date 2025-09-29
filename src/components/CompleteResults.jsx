import React from 'react';
import {
  DollarSign,
  TrendingUp,
  Home,
  Star,
  Trophy,
  RefreshCw,
  Share2,
  Download
} from 'lucide-react';

const CompleteResults = ({ careerCode, rankedCareers, onRestart }) => {
  const formatSalary = (min, max) => {
    const formatNumber = (num) => {
      if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
      return `$${num.toLocaleString()}`;
    };
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  };

  const getGrowthIcon = (growth) => {
    switch (growth) {
      case 'high':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'stable':
        return <div className="w-4 h-4 flex items-center justify-center">
          <div className="w-3 h-0.5 bg-blue-600 rounded"></div>
        </div>;
      default:
        return <div className="w-4 h-4 flex items-center justify-center">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        </div>;
    }
  };

  const getGrowthLabel = (growth) => {
    switch (growth) {
      case 'high':
        return 'High Growth';
      case 'stable':
        return 'Stable';
      default:
        return 'Variable';
    }
  };

  const topCareers = rankedCareers.slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Complete Career Code Analysis
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            All 10 careers ranked for your <span className="font-semibold text-primary">{careerCode.name}</span> code
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={onRestart}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Take Again
            </button>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </button>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-700 rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </button>
          </div>
        </div>

        {/* Career Code Summary */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8 animate-slide-up">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Natural Strength</h3>
              <div className="text-2xl font-bold text-primary">{careerCode.strengths}</div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Energy Profile</h3>
              <div className="text-2xl font-bold text-success">{careerCode.energy}</div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Primary Trigger</h3>
              <div className="text-2xl font-bold text-secondary">{careerCode.primaryTrigger}</div>
            </div>
          </div>
        </div>

        {/* Career Rankings */}
        <div className="space-y-4">
          {topCareers.map((career, index) => (
            <div
              key={career.id}
              className={`
                bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl
                animate-slide-up
                ${index === 0 ? 'border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-white' : ''}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

                {/* Left Section - Career Info */}
                <div className="flex-1 lg:mr-6">
                  <div className="flex items-start mb-3">
                    {/* Rank Badge */}
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm mr-4 mt-1
                      ${index === 0
                        ? 'bg-yellow-500 text-white'
                        : index === 1
                        ? 'bg-gray-400 text-white'
                        : index === 2
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                      }
                    `}>
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900 mr-3">
                          {career.title}
                        </h3>
                        {index === 0 && (
                          <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                            <Trophy className="w-3 h-3 mr-1" />
                            Best Match
                          </div>
                        )}
                      </div>

                      <p className="text-gray-700 mb-3">
                        {career.description}
                      </p>

                      <div className="text-sm text-gray-600 italic">
                        <strong>Why this fits:</strong> {career.whyMatch}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section - Stats */}
                <div className="lg:w-80 mt-4 lg:mt-0">
                  <div className="space-y-3">

                    {/* Match Percentage */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Match Score</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${career.matchPercentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-900 w-10">
                          {career.matchPercentage}%
                        </span>
                      </div>
                    </div>

                    {/* Salary Range */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Salary Range</span>
                      <div className="flex items-center text-green-700 font-semibold">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span className="text-sm">
                          {formatSalary(career.salaryMin, career.salaryMax)}
                        </span>
                      </div>
                    </div>

                    {/* Growth & Remote */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getGrowthIcon(career.growth)}
                        <span className="text-sm text-gray-700 ml-1">
                          {getGrowthLabel(career.growth)}
                        </span>
                      </div>
                      {career.remote && (
                        <div className="flex items-center text-blue-600">
                          <Home className="w-4 h-4 mr-1" />
                          <span className="text-sm">Remote OK</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg animate-slide-up" style={{animationDelay: '1s'}}>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Next Steps for Your Career Journey
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Skill Development</h4>
              <p className="text-sm text-gray-600">
                Focus on building skills that align with your top career matches
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Network Building</h4>
              <p className="text-sm text-gray-600">
                Connect with professionals in your target career fields
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Experience Gaining</h4>
              <p className="text-sm text-gray-600">
                Seek opportunities that match your energy profile and success triggers
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CompleteResults;