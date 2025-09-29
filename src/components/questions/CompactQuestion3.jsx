import React from 'react';
import { Award, Target, Crown, Star, DollarSign, Key } from 'lucide-react';

const CompactQuestion3 = ({ selectedValue, onSelect }) => {
  const options = [
    {
      id: 'Mastery',
      icon: Award,
      title: 'Mastery',
      subtitle: 'Expertise recognition'
    },
    {
      id: 'Impact',
      icon: Target,
      title: 'Impact',
      subtitle: 'Meaningful change'
    },
    {
      id: 'Leadership',
      icon: Crown,
      title: 'Leadership',
      subtitle: 'Team influence'
    },
    {
      id: 'Innovation',
      icon: Star,
      title: 'Innovation',
      subtitle: 'Creating solutions'
    },
    {
      id: 'Wealth',
      icon: DollarSign,
      title: 'Wealth',
      subtitle: 'Financial success'
    },
    {
      id: 'Freedom',
      icon: Key,
      title: 'Freedom',
      subtitle: 'Autonomy/flexibility'
    }
  ];

  const handleSelect = (value) => {
    onSelect(value);
  };

  return (
    <div className="h-[450px] bg-gradient-to-br from-dark-bg via-gradient-from to-gradient-to overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-3 py-2 h-full flex flex-col">

        {/* Question Header - 60px */}
        <div className="text-center mb-3">
          <h2 className="text-lg font-bold text-dark-text mb-1">
            Most motivating achievement:
          </h2>
          <p className="text-sm text-dark-text-muted">
            What drives your best performance?
          </p>
        </div>

        {/* Answer Options - 300px */}
        <div className="grid grid-cols-3 gap-2 flex-grow">
          {options.map((option, index) => {
            const Icon = option.icon;
            const isSelected = selectedValue === option.id;

            return (
              <div
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`
                  relative cursor-pointer rounded-lg p-3 transition-all duration-300
                  transform hover:-translate-y-1 hover:scale-105
                  ${isSelected
                    ? 'premium-card border-2 border-accent glow-effect'
                    : 'premium-card hover:border-primary'
                  }
                  flex flex-col items-center text-center
                `}
              >
                {/* Icon */}
                <div className={`
                  w-6 h-6 mb-2 rounded-lg flex items-center justify-center
                  ${isSelected
                    ? 'bg-gradient-to-br from-accent to-success'
                    : 'bg-gradient-to-br from-dark-hover to-dark-border'
                  }
                  transition-all duration-300
                `}>
                  <Icon className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-dark-text-secondary'}`} />
                </div>

                {/* Title */}
                <h3 className="text-xs font-bold text-dark-text mb-1">
                  {option.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs text-dark-text-secondary text-center leading-tight">
                  {option.subtitle}
                </p>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-1 right-1 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Continue Note - 20px */}
        <div className="text-center mt-2">
          <p className="text-xs text-dark-text-muted">
            Auto-advances on selection
          </p>
        </div>

      </div>
    </div>
  );
};

export default CompactQuestion3;