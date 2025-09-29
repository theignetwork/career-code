import React from 'react';
import { Target, Users, MessageSquare } from 'lucide-react';

const CompactQuestion2 = ({ selectedValue, onSelect }) => {
  const options = [
    {
      id: 'Solo',
      icon: Target,
      title: 'Deep Focus',
      subtitle: 'Extended solo work'
    },
    {
      id: 'Team',
      icon: Users,
      title: 'Team Dynamics',
      subtitle: 'Collaborative energy'
    },
    {
      id: 'Client',
      icon: MessageSquare,
      title: 'External Interaction',
      subtitle: 'Client engagement'
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
            You perform best when:
          </h2>
          <p className="text-sm text-dark-text-muted">
            Think about your most productive moments
          </p>
        </div>

        {/* Answer Options - 300px */}
        <div className="grid grid-cols-3 gap-3 flex-grow">
          {options.map((option, index) => {
            const Icon = option.icon;
            const isSelected = selectedValue === option.id;

            return (
              <div
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`
                  relative cursor-pointer rounded-xl p-4 transition-all duration-300
                  transform hover:-translate-y-1 hover:scale-105
                  ${isSelected
                    ? 'premium-card border-2 border-secondary glow-effect'
                    : 'premium-card hover:border-accent'
                  }
                  flex flex-col items-center text-center
                `}
              >
                {/* Icon */}
                <div className={`
                  w-8 h-8 mb-3 rounded-lg flex items-center justify-center
                  ${isSelected
                    ? 'bg-gradient-to-br from-secondary to-accent'
                    : 'bg-gradient-to-br from-dark-hover to-dark-border'
                  }
                  transition-all duration-300
                `}>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-dark-text-secondary'}`} />
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-dark-text mb-2">
                  {option.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs text-dark-text-secondary text-center leading-tight">
                  {option.subtitle}
                </p>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
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

export default CompactQuestion2;