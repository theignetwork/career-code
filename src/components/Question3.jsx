import React from 'react';
import { Trophy, Target, Award, Key, TrendingUp, Rocket, ArrowRight } from 'lucide-react';

const Question3 = ({ selectedValues, onSelect, onContinue }) => {
  const options = [
    {
      id: 'Mastery',
      icon: Trophy,
      title: 'Mastery',
      description: 'Becoming the expert, mastering complex skills',
      color: 'blue'
    },
    {
      id: 'Impact',
      icon: Target,
      title: 'Impact',
      description: 'Solving important problems, making a difference',
      color: 'green'
    },
    {
      id: 'Recognition',
      icon: Award,
      title: 'Recognition',
      description: 'Being acknowledged, advancing your reputation',
      color: 'purple'
    },
    {
      id: 'Freedom',
      icon: Key,
      title: 'Freedom',
      description: 'Autonomy, flexibility, control over your work',
      color: 'orange'
    },
    {
      id: 'Wealth',
      icon: TrendingUp,
      title: 'Wealth',
      description: 'Financial rewards, building wealth',
      color: 'emerald'
    },
    {
      id: 'Innovation',
      icon: Rocket,
      title: 'Innovation',
      description: 'Creating something new, pioneering change',
      color: 'indigo'
    }
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100',
      bgSelected: 'bg-blue-500',
      text: 'text-blue-600',
      textSelected: 'text-white',
      border: 'border-blue-500'
    },
    green: {
      bg: 'bg-green-100',
      bgSelected: 'bg-green-500',
      text: 'text-green-600',
      textSelected: 'text-white',
      border: 'border-green-500'
    },
    purple: {
      bg: 'bg-purple-100',
      bgSelected: 'bg-purple-500',
      text: 'text-purple-600',
      textSelected: 'text-white',
      border: 'border-purple-500'
    },
    orange: {
      bg: 'bg-orange-100',
      bgSelected: 'bg-orange-500',
      text: 'text-orange-600',
      textSelected: 'text-white',
      border: 'border-orange-500'
    },
    emerald: {
      bg: 'bg-emerald-100',
      bgSelected: 'bg-emerald-500',
      text: 'text-emerald-600',
      textSelected: 'text-white',
      border: 'border-emerald-500'
    },
    indigo: {
      bg: 'bg-indigo-100',
      bgSelected: 'bg-indigo-500',
      text: 'text-indigo-600',
      textSelected: 'text-white',
      border: 'border-indigo-500'
    }
  };

  const handleSelect = (optionId) => {
    let newSelection = [...selectedValues];

    if (newSelection.includes(optionId)) {
      // Remove if already selected
      newSelection = newSelection.filter(id => id !== optionId);
    } else if (newSelection.length < 2) {
      // Add if less than 2 selected
      newSelection.push(optionId);
    } else {
      // Replace the first selection if 2 already selected
      newSelection = [newSelection[1], optionId];
    }

    onSelect(newSelection);
  };

  const canContinue = selectedValues.length === 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto px-4 py-8">

        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Success Triggers
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-4">
            What type of achievement motivates you most?
          </p>
          <p className="text-lg text-primary font-semibold">
            Select your top 2
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
          {options.map((option, index) => {
            const Icon = option.icon;
            const isSelected = selectedValues.includes(option.id);
            const colors = colorClasses[option.color];
            const selectionOrder = selectedValues.indexOf(option.id) + 1;

            return (
              <div
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`
                  relative cursor-pointer rounded-xl p-6 transition-all duration-300
                  transform hover:-translate-y-1 hover:shadow-lg animate-slide-up
                  ${isSelected
                    ? `bg-white border-2 ${colors.border} shadow-lg scale-105`
                    : 'bg-white border border-gray-200 shadow-md hover:border-gray-300'
                  }
                `}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Icon */}
                <div className={`
                  w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center
                  ${isSelected ? colors.bgSelected : colors.bg}
                  transition-colors duration-300
                `}>
                  <Icon className={`w-6 h-6 ${isSelected ? colors.textSelected : colors.text}`} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                  {option.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {option.description}
                </p>

                {/* Selection Badge */}
                {isSelected && (
                  <div className={`
                    absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center
                    ${colors.bgSelected} text-white font-bold text-sm shadow-lg animate-scale-in
                  `}>
                    {selectionOrder}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selection Counter */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500">
            {selectedValues.length === 0 && "Select your top 2 motivators"}
            {selectedValues.length === 1 && "Select 1 more motivator"}
            {selectedValues.length === 2 && "Perfect! You've selected your top 2 motivators"}
          </p>
        </div>

        {/* Continue Button */}
        {canContinue && (
          <div className="text-center animate-fade-in">
            <button
              onClick={onContinue}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary hover:bg-blue-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              Get My Career Code
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Question3;