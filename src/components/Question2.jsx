import React from 'react';
import { Monitor, Users, Presentation } from 'lucide-react';

const Question2 = ({ selectedValue, onSelect }) => {
  const options = [
    {
      id: 'Solo',
      icon: Monitor,
      title: 'Solo Focus',
      description: 'Deep focus time, independent projects, minimal interruptions',
      visual: 'Clean desk setup, single person silhouette'
    },
    {
      id: 'Team',
      icon: Users,
      title: 'Team Collaboration',
      description: 'Brainstorming sessions, team projects, regular interaction',
      visual: 'Meeting room scene with people around table'
    },
    {
      id: 'Client',
      icon: Presentation,
      title: 'Client Interaction',
      description: 'Client meetings, presentations, relationship building',
      visual: 'Professional meeting/presentation setup'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">

        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Energy Profile
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Which work environment energizes you most?
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
                  relative cursor-pointer rounded-xl transition-all duration-300
                  transform hover:-translate-y-2 hover:shadow-2xl animate-slide-up
                  ${isSelected
                    ? 'bg-white border-2 border-primary shadow-xl scale-105'
                    : 'bg-white border border-gray-200 shadow-lg hover:border-gray-300'
                  }
                  overflow-hidden
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Visual Scene */}
                <div className={`
                  h-32 flex items-center justify-center relative
                  ${isSelected ? 'bg-blue-50' : 'bg-gray-50'}
                  transition-colors duration-300
                `}>
                  {/* Scene Background */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full bg-gradient-to-r from-blue-100 to-purple-100"></div>
                  </div>

                  {/* Main Icon */}
                  <Icon className={`
                    w-12 h-12 z-10
                    ${isSelected ? 'text-primary' : 'text-gray-400'}
                    transition-colors duration-300
                  `} />

                  {/* Additional Visual Elements */}
                  {option.id === 'Solo' && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-1 bg-gray-300 rounded"></div>
                    </div>
                  )}

                  {option.id === 'Team' && (
                    <>
                      <div className="absolute top-4 left-4 w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="absolute top-4 right-4 w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="absolute bottom-4 left-6 w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="absolute bottom-4 right-6 w-2 h-2 bg-gray-300 rounded-full"></div>
                    </>
                  )}

                  {option.id === 'Client' && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-2 bg-gray-300 rounded"></div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {option.title}
                  </h3>

                  <p className="text-gray-700 text-center leading-relaxed">
                    {option.description}
                  </p>
                </div>

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
            Think about when you feel most productive and motivated
          </p>
        </div>

      </div>
    </div>
  );
};

export default Question2;