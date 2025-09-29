import React from 'react';
import { Star, TrendingUp, Users, Building, DollarSign, Award, ArrowRight, Target, Lightbulb, AlertCircle } from 'lucide-react';
import { getCareerCodeDescription } from '../utils/calculateCareerCode.js';
import { careerDatabase } from '../data/careerDatabase.js';

const DynamicResults = ({ careerCode }) => {
  console.log('DynamicResults component loaded with careerCode:', careerCode);

  // Validate career code exists
  if (!careerCode) {
    console.error('No career code provided to DynamicResults');
    return <div className="text-white p-8">Error: No career code found</div>;
  }

  // Add valid career codes check
  const validCodes = [
    'analyzer-solo', 'analyzer-team', 'analyzer-client',
    'builder-solo', 'builder-team', 'builder-client',
    'innovator-solo', 'innovator-team', 'innovator-client'
  ];

  if (!validCodes.includes(careerCode.code)) {
    console.error('Invalid career code:', careerCode.code);
    return <div className="text-white p-8">Error: Invalid career code: {careerCode.code}</div>;
  }

  const careerData = getCareerCodeDescription(careerCode);
  console.log('Career data loaded:', careerData);

  const topCareers = careerDatabase[careerCode.code] || careerDatabase['builder-team'];
  console.log('Top careers loaded:', topCareers.length, 'careers');

  const formatSalary = (min, max) => {
    const formatNumber = (num) => {
      if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
      return `$${num.toLocaleString()}`;
    };
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  };

  // Get comprehensive career data with advantages and blind spots
  const getCareerAdvantages = (code) => {
    const advantages = {
      'analyzer-solo': [
        'Deep expertise in specialized subjects',
        'Ability to work independently for extended periods',
        'Strong research and analytical skills',
        'Attention to detail and methodical approach'
      ],
      'analyzer-team': [
        'Strategic thinking combined with collaboration',
        'Data-driven decision making in group settings',
        'Ability to synthesize complex information for teams',
        'Strong presentation and consulting skills'
      ],
      'analyzer-client': [
        'Translating complex analysis into business solutions',
        'Building trust through expertise and competence',
        'Problem-solving for diverse client needs',
        'External relationship management skills'
      ],
      'builder-solo': [
        'Independent project management and execution',
        'Systems thinking and process optimization',
        'Self-directed work with clear deliverables',
        'Technical implementation skills'
      ],
      'builder-team': [
        'Coordinating teams and managing workflows',
        'Building consensus around execution plans',
        'Operational excellence and efficiency',
        'Leadership through organization and structure'
      ],
      'builder-client': [
        'Managing client expectations and deliverables',
        'Translating requirements into actionable plans',
        'Building long-term client relationships',
        'Project delivery and account management'
      ],
      'innovator-solo': [
        'Creative problem-solving and ideation',
        'Independent research and development',
        'Original thinking and breakthrough concepts',
        'Self-motivated exploration of new ideas'
      ],
      'innovator-team': [
        'Inspiring creative collaboration',
        'Facilitating brainstorming and innovation sessions',
        'Building on team ideas to create solutions',
        'Leading change and transformation initiatives'
      ],
      'innovator-client': [
        'Identifying market opportunities and trends',
        'Creating innovative solutions for client needs',
        'Business development and new market creation',
        'External networking and partnership building'
      ]
    };
    return advantages[code] || advantages['builder-team'];
  };

  const getCareerBlindSpots = (code) => {
    const blindSpots = {
      'analyzer-solo': [
        'May miss collaborative opportunities',
        'Could become too focused on perfection',
        'Might struggle with ambiguous problems',
        'May need to develop communication skills'
      ],
      'analyzer-team': [
        'Could over-analyze team decisions',
        'May struggle with fast-paced environments',
        'Might find it hard to work with incomplete data',
        'Could be seen as overly critical'
      ],
      'analyzer-client': [
        'May overwhelm clients with too much detail',
        'Could struggle with emotional client needs',
        'Might find sales activities challenging',
        'May need to develop empathy skills'
      ],
      'builder-solo': [
        'Could miss opportunities for collaboration',
        'May struggle with ambiguous requirements',
        'Might become too process-oriented',
        'Could resist changes to established systems'
      ],
      'builder-team': [
        'May focus too much on process over outcomes',
        'Could struggle with highly creative teams',
        'Might resist rapid changes in direction',
        'May need to develop vision-setting skills'
      ],
      'builder-client': [
        'Could over-promise on deliverables',
        'May struggle with scope creep',
        'Might find strategic selling challenging',
        'Could focus too much on execution vs. relationship'
      ],
      'innovator-solo': [
        'May struggle with implementation follow-through',
        'Could become isolated from market needs',
        'Might resist structure and processes',
        'May need to develop practical skills'
      ],
      'innovator-team': [
        'Could dominate brainstorming sessions',
        'May struggle with routine operational work',
        'Might find it hard to finish projects',
        'Could resist traditional team structures'
      ],
      'innovator-client': [
        'May over-promise on innovative solutions',
        'Could struggle with conservative clients',
        'Might find routine client work boring',
        'May need to develop patience for client processes'
      ]
    };
    return blindSpots[code] || blindSpots['builder-team'];
  };

  const advantages = getCareerAdvantages(careerCode.code);
  const blindSpots = getCareerBlindSpots(careerCode.code);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">

      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Your Career Code: {careerCode.name}
        </h1>
        <p className="text-xl text-teal-400 mb-2">
          You're a {careerCode.code.replace('-', '-')} type ({careerCode.percentage}% of professionals)
        </p>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          {careerData.overview}
        </p>
      </div>

      {/* Factor Deep Dive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            {careerCode.strengths.charAt(0).toUpperCase() + careerCode.strengths.slice(1)} (Natural Strength)
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {careerData.strength}
          </p>
        </div>
        <div className="bg-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            {careerCode.energy.charAt(0).toUpperCase() + careerCode.energy.slice(1)} (Energy Profile)
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {careerData.energy}
          </p>
        </div>
      </div>

      {/* Complete Career Rankings */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Your Top 8 Career Matches
        </h2>

        {/* #1 Career (Most Prominent) */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-full text-lg">#1</span>
            <h3 className="text-3xl font-bold text-white">{topCareers[0].title}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">{formatSalary(topCareers[0].salaryMin, topCareers[0].salaryMax)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full font-semibold">
                95% match
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white">High Growth</span>
            </div>
          </div>
          <p className="text-white/90 mb-4 text-lg">
            {topCareers[0].description}
          </p>
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Why this fits you:</h4>
            <p className="text-white/80">
              {topCareers[0].whyItFits}
            </p>
          </div>
        </div>

        {/* Careers #2-8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topCareers.slice(1).map((career, index) => (
            <div key={index} className="bg-slate-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-slate-600 text-white font-bold px-3 py-1 rounded-full">
                  #{index + 2}
                </span>
                <h3 className="text-xl font-bold text-white">{career.title}</h3>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-teal-400 font-semibold">{formatSalary(career.salaryMin, career.salaryMax)}</span>
                <span className="text-sm text-teal-300">{Math.max(92 - (index * 2), 75)}% match</span>
              </div>
              <p className="text-gray-300 mb-3">{career.description}</p>
              <p className="text-gray-400 text-sm">{career.whyItFits}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What This Means for You */}
      <div className="bg-slate-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6">What This Means for You</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-teal-400 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Your Unique Advantages
            </h3>
            <ul className="space-y-2 text-gray-300">
              {advantages.map((advantage, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-teal-400 mt-1">•</span>
                  {advantage}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-orange-400 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Potential Blind Spots
            </h3>
            <ul className="space-y-2 text-gray-300">
              {blindSpots.map((blindSpot, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  {blindSpot}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-slate-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6" />
          Your Action Plan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Immediate (Next 30 Days)
            </h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Research your top 3 career matches</li>
              <li>• Update LinkedIn with relevant skills</li>
              <li>• Network with 5 professionals in target roles</li>
            </ul>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Short-term (3-6 Months)
            </h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Develop 2-3 key skills for your top match</li>
              <li>• Apply to roles that fit your profile</li>
              <li>• Build portfolio showcasing your strengths</li>
            </ul>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Long-term (6-12 Months)
            </h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Secure position in ideal career match</li>
              <li>• Continue developing complementary skills</li>
              <li>• Mentor others with similar career codes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-700 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white mb-2">
            {careerCode.percentage}%
          </div>
          <div className="text-gray-400 text-sm">
            Of professionals share your code
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white mb-2">
            {formatSalary(
              Math.min(...topCareers.slice(0, 3).map(c => c.salaryMin)),
              Math.max(...topCareers.slice(0, 3).map(c => c.salaryMax))
            )}
          </div>
          <div className="text-gray-400 text-sm">
            Typical salary range for your top matches
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white mb-2">
            8
          </div>
          <div className="text-gray-400 text-sm">
            Career matches analyzed for you
          </div>
        </div>
      </div>

      {/* IG Network CTA Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Land Your Ideal Career?
        </h2>

        <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto">
          You know your Career Code and ideal matches. Now get the tactical job search system that turns {careerCode.name}s like you into hired candidates.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">🕵️ Hidden Job Boards</h3>
            <p className="text-white/80 text-sm">Access exclusive job boards where 80% of positions are never posted publicly.</p>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">🤖 AI Interview Prep</h3>
            <p className="text-white/80 text-sm">Practice with our AI interview coach trained on 50,000+ successful interviews.</p>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">📄 ATS Resume Analysis</h3>
            <p className="text-white/80 text-sm">Optimize your resume to beat applicant tracking systems and land interviews.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <a
            href="https://members.theinterviewguys.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-teal-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Start Your Free 7-Day Trial →
          </a>

          <button
            onClick={() => window.location.href = '/'}
            className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-teal-600 transition-colors"
          >
            Retake Assessment
          </button>
        </div>

        <p className="text-white/70 text-sm mt-4">
          7-day free trial • Cancel anytime
        </p>
      </div>

    </div>
  );
};

export default DynamicResults;