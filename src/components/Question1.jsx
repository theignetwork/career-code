import React from 'react';
import { Search, Hammer, Lightbulb } from 'lucide-react';

const Question1 = ({ selectedValue, onSelect }) => {
  const options = [
    {
      id: 'Analyzer',
      icon: Search,
      title: 'Analyzer',
      subtitle: 'Break it down systematically, gather data, find patterns',
      description: 'You naturally dive deep into problems'
    },
    {
      id: 'Builder',
      icon: Hammer,
      title: 'Builder',
      subtitle: 'Bring people together, create solutions, execute plans',
      description: 'You excel at making things happen'
    },
    {
      id: 'Innovator',
      icon: Lightbulb,
      title: 'Innovator',
      subtitle: 'Generate new ideas, influence others, drive change',
      description: 'You naturally think outside the box'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">

        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Natural Strengths
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            When facing a complex challenge, which approach feels most natural to you?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {options.map((option, index) => {
            const Icon = option.icon;
            const isSelected = selectedValue === option.id;

            return (
              <div
                key={option.id}
                onClick={() => onSelect(option.id)}
                className={`
                  relative cursor-pointer rounded-xl p-8 transition-all duration-300
                  transform hover:-translate-y-2 hover:shadow-2xl animate-slide-up
                  ${isSelected
                    ? 'bg-white border-2 border-primary shadow-xl scale-105'
                    : 'bg-white border border-gray-200 shadow-lg hover:border-gray-300'
                  }
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`
                  w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center
                  ${isSelected ? 'bg-primary' : 'bg-gray-100'}
                  transition-colors duration-300
                `}>
                  <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {option.title}
                </h3>

                {/* Subtitle */}
                <p className="text-gray-700 text-center mb-4 leading-relaxed">
                  "{option.subtitle}"
                </p>

                {/* Description */}
                <p className="text-sm text-gray-500 text-center italic">
                  {option.description}
                </p>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-scale-in">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Helper Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Choose the approach that feels most instinctive to you
          </p>
        </div>

      </div>
    </div>
  );
};

export default Question1;