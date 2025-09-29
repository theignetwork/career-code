import React from 'react';
import { Microscope, Settings, Rocket } from 'lucide-react';

const QuestionDeepDive2 = ({ selectedValue, onSelect }) => {
  const options = [
    {
      id: 'Analyzer',
      icon: Microscope,
      title: 'Deep Thinking',
      subtitle: 'Researching, analyzing, solving complex puzzles independently',
      description: 'You thrive when you can dive deep without interruption',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'Builder',
      icon: Settings,
      title: 'Building & Executing',
      subtitle: 'Creating systems, managing projects, making things happen',
      description: 'You excel at turning ideas into concrete results',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'Innovator',
      icon: Rocket,
      title: 'Innovating & Influencing',
      subtitle: 'Generating ideas, persuading others, driving change',
      description: 'You energize by creating something new and inspiring others',
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-gradient-from to-gradient-to flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-4 py-8">

        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full mb-6">
            <span className="text-2xl font-bold text-white">2</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-text mb-6">
            Work Environment Preference
          </h2>
          <p className="text-xl md:text-2xl text-dark-text-secondary max-w-4xl mx-auto leading-relaxed">
            In your <span className="text-secondary font-semibold">ideal work scenario</span>, you'd spend most of your time:
          </p>
          <p className="text-lg text-dark-text-muted mt-4">
            Think about when you feel most productive and engaged
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {options.map((option, index) => {
            const Icon = option.icon;
            const isSelected = selectedValue === option.id;

            return (
              <div
                key={option.id}
                onClick={() => onSelect(option.id)}
                className={`
                  relative cursor-pointer rounded-2xl p-8 transition-all duration-500
                  transform hover:-translate-y-3 hover:scale-[1.02] animate-slide-up
                  ${isSelected
                    ? 'premium-card border-2 border-secondary glow-effect scale-105'
                    : 'premium-card hover:border-primary'
                  }
                  group
                `}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-current to-transparent"></div>
                  {/* Decorative dots */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-current rounded-full"></div>
                  <div className="absolute top-8 right-8 w-1 h-1 bg-current rounded-full"></div>
                  <div className="absolute bottom-8 left-4 w-1.5 h-1.5 bg-current rounded-full"></div>
                </div>

                {/* Icon with Dynamic Gradient */}
                <div className={`
                  w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center
                  bg-gradient-to-br ${option.gradient}
                  transition-all duration-300 transform group-hover:scale-110
                  ${isSelected ? 'scale-110 shadow-lg' : ''}
                `}>
                  <Icon className="w-10 h-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-dark-text mb-4 text-center">
                  {option.title}
                </h3>

                {/* Subtitle */}
                <p className="text-dark-text-secondary text-center mb-6 leading-relaxed text-lg">
                  {option.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-dark-text-muted text-center italic leading-relaxed">
                  {option.description}
                </p>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center animate-scale-in">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                )}

                {/* Interactive Hover Border */}
                <div className={`
                  absolute inset-0 rounded-2xl border-2 border-transparent
                  ${isSelected
                    ? 'border-secondary shadow-lg shadow-secondary/25'
                    : 'group-hover:border-primary/50'
                  }
                  transition-all duration-300
                `}></div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Helper Text */}
        <div className="text-center mt-12">
          <div className="premium-card p-6 max-w-2xl mx-auto">
            <p className="text-dark-text-secondary mb-2">
              This identifies your natural work style and optimal environment
            </p>
            <p className="text-sm text-dark-text-muted">
              Each approach leads to different career paths and compensation levels
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuestionDeepDive2;