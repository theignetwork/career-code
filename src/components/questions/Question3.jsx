import React from 'react';
import { BarChart, Settings, Rocket } from 'lucide-react';

const Question3 = ({ selectedValue, onSelect }) => {
  const options = [
    {
      value: 'analyze',
      icon: BarChart,
      title: 'Analyze',
      description: 'Deep research, data analysis, and systematic investigation'
    },
    {
      value: 'coordinate',
      icon: Settings,
      title: 'Coordinate',
      description: 'Managing timelines, resources, and team coordination'
    },
    {
      value: 'innovate',
      icon: Rocket,
      title: 'Innovate',
      description: 'Brainstorming, concept development, and creative problem-solving'
    }
  ];

  const handleSelect = (value) => {
    onSelect(value);
    // Auto-advance after selection
    setTimeout(() => {
      // The parent component will handle the advancement
    }, 500);
  };

  return (
    <div className="max-h-[500px] py-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Your ideal project involves:
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {options.map((option) => {
          const IconComponent = option.icon;
          const isSelected = selectedValue === option.value;

          return (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`premium-card p-6 text-center transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? 'selected'
                  : ''
              }`}
            >
              <div className="flex flex-col items-center space-y-3">
                <IconComponent
                  className={`w-8 h-8 ${isSelected ? 'premium-icon selected' : 'premium-icon'}`}
                />
                <h3 className="text-lg font-semibold text-white">
                  {option.title}
                </h3>
                <p className="text-sm text-slate-400 leading-tight">
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question3;