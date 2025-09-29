import React from 'react';
import { CircuitBoard, Zap, Target, ArrowRight, TrendingUp, Users } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-[500px] py-8">
      <div className="h-full flex flex-col space-y-6">

        {/* Premium Header */}
        <div className="text-center">
          <h1 className="text-3xl tracking-tight text-white mb-4">
            <span className="font-black">The Career Code Assessment:</span>
            <span className="font-light"> Find Your Perfect Career Match in 60 Seconds</span>
          </h1>
        </div>

        {/* Premium Problem Statement */}
        <div className="text-center">
          <p className="text-lg font-light text-gray-300 leading-relaxed max-w-4xl mx-auto">
            Unlike generic personality tests, The Career Code identifies the specific intersection of your abilities, energy patterns, and motivations - revealing careers where you'll thrive and have
            <span className="font-bold text-teal-400"> built-in advantages</span> over other candidates.
          </p>
        </div>

        {/* Premium 3-Factor Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="premium-card p-4 text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <CircuitBoard className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Natural Strengths
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              What you're genuinely gifted at
            </p>
          </div>

          <div className="premium-card p-4 text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Energy Profile
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              What energizes vs drains you
            </p>
          </div>

          <div className="premium-card p-4 text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Success Triggers
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              What motivates peak performance
            </p>
          </div>
        </div>

        {/* Premium Value Proposition */}
        <div className="text-center">
          <p className="premium-text-large text-slate-300 leading-relaxed">
            When all three align, you discover careers where you naturally
            <span className="font-bold text-teal-300"> outperform 90% of people</span>.
          </p>
        </div>

        {/* Premium CTA Button */}
        <div className="text-center flex-grow flex items-center justify-center">
          <div className="space-y-4">
            <button
              onClick={onStart}
              className="premium-button text-xl px-10 py-4 glow-effect transform hover:scale-105 flex items-center font-bold"
            >
              Discover My Career Code
              <ArrowRight className="w-6 h-6 ml-3" />
            </button>

          </div>
        </div>

        {/* Premium Social Proof */}
        <div className="text-center">
          <p className="premium-text-large text-slate-400">
            Built on validated career psychology research and labor market data<br/>
            <span className="font-semibold text-teal-400">Powered by The Interview Guys</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;