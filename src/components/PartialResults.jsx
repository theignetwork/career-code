import React from 'react';
import { Sparkles, DollarSign, ArrowRight, Star, TrendingUp, Crown, Target } from 'lucide-react';
import { getCareerCodeDescription } from '../utils/calculateCareerCode.js';

const PartialResults = ({ careerCode, topCareer, onEmailCapture }) => {
  const descriptions = getCareerCodeDescription(careerCode);

  const formatSalary = (min, max) => {
    const formatNumber = (num) => {
      if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
      return `$${num.toLocaleString()}`;
    };
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  };

  // Get the percentage of professionals with this code (simulated)
  const getRarityPercentage = (code) => {
    const rarityMap = {
      "Analyzer-Solo-Mastery": 8,
      "Analyzer-Team-Impact": 12,
      "Builder-Team-Achievement": 15,
      "Innovator-Client-Achievement": 6
    };
    return rarityMap[code.code] || 10;
  };

  const rarity = getRarityPercentage(careerCode);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-gradient-from to-gradient-to">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Celebration Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Crown className="w-16 h-16 text-gold animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-dark-text mb-6">
            🎉 Your Career Code Revealed
          </h1>

          <div className="premium-card p-8 glow-effect inline-block border-2 border-primary">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              {careerCode.name}
            </h2>
            <p className="text-xl text-dark-text-secondary mb-4">
              You're a <span className="font-bold text-accent">{careerCode.code.replace(/-/g, '-')}</span> type
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <span className="text-gold font-semibold">Rarity: {rarity}% of professionals</span>
              <span className="text-dark-text-muted">•</span>
              <span className="text-success font-semibold">Premium earning potential</span>
            </div>
          </div>
        </div>

        {/* Premium Code Explanation */}
        <div className="premium-card p-10 mb-12 glow-effect animate-slide-up">
          <h3 className="text-2xl md:text-3xl font-bold text-dark-text mb-8 text-center">
            Why This Code Commands Premium Salaries
          </h3>
          <p className="text-lg md:text-xl text-dark-text-secondary text-center mb-8 max-w-4xl mx-auto">
            {careerCode.name} professionals represent just <span className="font-bold text-gold">{rarity}% of the workforce</span>.
            You combine {careerCode.strengths.toLowerCase()} depth with {careerCode.energy.toLowerCase()} energy and {careerCode.primaryTrigger.toLowerCase()}-driven motivation—a rare combination that commands premium salaries in today's market.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-dark-text mb-3 text-lg">
                🧠 Your Natural Strength: {careerCode.strengths}
              </h4>
              <p className="text-dark-text-secondary leading-relaxed">{descriptions.strength}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-dark-text mb-3 text-lg">
                ⚡ Your Energy Profile: {careerCode.energy}
              </h4>
              <p className="text-dark-text-secondary leading-relaxed">{descriptions.energy}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-success rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-dark-text mb-3 text-lg">
                🎯 Your Success Trigger: {careerCode.primaryTrigger}
              </h4>
              <p className="text-dark-text-secondary leading-relaxed">{descriptions.trigger}</p>
            </div>
          </div>
        </div>

        {/* Premium Career Match */}
        <div className="premium-card p-10 mb-12 glow-effect animate-slide-up" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-gold to-yellow-400 rounded-full flex items-center justify-center mr-3">
              <Star className="w-6 h-6 text-dark-bg" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-dark-text">
              Your #2 Career Match
            </h3>
          </div>

          <div className="bg-gradient-to-r from-dark-hover to-dark-card rounded-2xl p-8 border border-primary">
            <h4 className="text-3xl md:text-4xl font-bold text-dark-text mb-4">
              {topCareer.title}
            </h4>

            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-success to-emerald-400 rounded-full flex items-center justify-center mr-3">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-success to-emerald-400 bg-clip-text text-transparent">
                {formatSalary(topCareer.salaryMin, topCareer.salaryMax)}
              </span>
              <span className="text-dark-text-muted ml-2">annual</span>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-dark-text-secondary mr-3">Career Code Match:</span>
              <div className="flex-1 bg-dark-bg rounded-full h-3 mr-3">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-3 rounded-full glow-effect"
                  style={{ width: `${topCareer.matchPercentage}%` }}
                />
              </div>
              <span className="text-lg font-bold text-primary whitespace-nowrap">
                {topCareer.matchPercentage}% match
              </span>
            </div>

            <p className="text-lg text-dark-text-secondary mb-6 leading-relaxed">
              {topCareer.description}
            </p>

            <div className="premium-card p-6 border-l-4 border-primary">
              <p className="text-dark-text-secondary leading-relaxed">
                <strong className="text-primary">Why this creates your unfair advantage:</strong> {topCareer.whyMatch}
              </p>
            </div>
          </div>
        </div>

        {/* Premium Email Capture */}
        <div className="premium-card p-10 text-center glow-effect animate-slide-up" style={{animationDelay: '0.5s'}}>
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-dark-text mb-6">
              Curious what your #1 match is?
            </h3>
            <p className="text-xl text-dark-text-secondary max-w-3xl mx-auto mb-6 leading-relaxed">
              Get your complete ranking of <span className="font-bold text-primary">10 ideal careers</span> specifically selected for {careerCode.name} professionals like you.
            </p>

            {/* Premium Value Proposition */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              <div className="premium-card p-6">
                <h4 className="font-bold text-dark-text mb-3">Your Personalized Report Includes:</h4>
                <ul className="text-left text-dark-text-secondary space-y-2">
                  <li>✅ Complete ranking of 10 careers perfect for your code</li>
                  <li>✅ Salary ranges and growth projections for each role</li>
                  <li>✅ Specific companies known for hiring your type</li>
                  <li>✅ Skills roadmap to land your ideal position</li>
                  <li>✅ Interview strategies that highlight your unfair advantages</li>
                </ul>
              </div>
              <div className="premium-card p-6">
                <h4 className="font-bold text-dark-text mb-3">Why This Matters:</h4>
                <p className="text-dark-text-secondary text-left">
                  {careerCode.name} professionals who understand their code earn an average of{' '}
                  <span className="font-bold text-gold">$23,000 more</span> within 18 months by targeting roles that match their natural wiring.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-lg mx-auto">
            <EmailCaptureForm onSubmit={onEmailCapture} />
          </div>

          <p className="text-sm text-dark-text-muted mt-6">
            Join <span className="font-semibold text-primary">127,000+ professionals</span> who discovered their career advantage
          </p>
        </div>

      </div>
    </div>
  );
};

const EmailCaptureForm = ({ onSubmit }) => {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSubmit(email);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your professional email"
          required
          className="premium-input w-full text-center text-lg py-4"
        />
      </div>
      <button
        type="submit"
        disabled={!email || isSubmitting}
        className="w-full premium-button text-xl py-4 glow-effect transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            Generating Your Report...
          </div>
        ) : (
          <>
            Get My Complete Career Intelligence Report
            <ArrowRight className="w-6 h-6 ml-3" />
          </>
        )}
      </button>
    </form>
  );
};

export default PartialResults;