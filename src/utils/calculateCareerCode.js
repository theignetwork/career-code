import { careerDatabase } from '../data/careerDatabase.js';

export const calculateCareerCode = (answers) => {
  console.log('Calculating career code from answers:', answers);

  // Ensure answers exist
  if (!answers || Object.keys(answers).length === 0) {
    console.error('No answers found for career code calculation');
    return {
      code: 'analyzer-team',
      name: 'The Strategic Consultant',
      strengths: 'analyzer',
      energy: 'team',
      percentage: 12
    };
  }

  // Count responses for Natural Strengths (Questions 1-3)
  const strengthCounts = { analyze: 0, coordinate: 0, innovate: 0 };

  // Questions 1-3 assess Natural Strengths
  [answers.q1, answers.q2, answers.q3].forEach(answer => {
    if (answer === 'analyze') {
      strengthCounts.analyze++;
    } else if (answer === 'coordinate') {
      strengthCounts.coordinate++;
    } else if (answer === 'innovate') {
      strengthCounts.innovate++;
    }
  });

  // Count responses for Energy Profile (Questions 4-6)
  const energyCounts = { solo: 0, team: 0, client: 0 };

  // Questions 4-6 assess Energy Profile
  [answers.q4, answers.q5, answers.q6].forEach(answer => {
    if (answer === 'solo') {
      energyCounts.solo++;
    } else if (answer === 'team') {
      energyCounts.team++;
    } else if (answer === 'client') {
      energyCounts.client++;
    }
  });

  // Questions 7-10 provide validation (weighted more heavily for strengths)
  [answers.q7, answers.q8, answers.q9, answers.q10].forEach(answer => {
    if (answer === 'analyze') {
      strengthCounts.analyze += 1.5; // Higher weight for validation questions
    } else if (answer === 'coordinate') {
      strengthCounts.coordinate += 1.5;
    } else if (answer === 'innovate') {
      strengthCounts.innovate += 1.5;
    }
  });

  console.log('Strength counts:', strengthCounts);
  console.log('Energy counts:', energyCounts);

  // Determine dominant types with fallbacks
  const dominantStrength = Object.keys(strengthCounts).reduce((a, b) =>
    strengthCounts[a] > strengthCounts[b] ? a : b
  ) || 'analyze';
  const dominantEnergy = Object.keys(energyCounts).reduce((a, b) =>
    energyCounts[a] > energyCounts[b] ? a : b
  ) || 'team';

  console.log('Dominant strength:', dominantStrength);
  console.log('Dominant energy:', dominantEnergy);

  // Map to career code components
  const strengthMap = {
    analyze: 'analyzer',
    coordinate: 'builder',
    innovate: 'innovator'
  };
  const energyMap = {
    solo: 'solo',
    team: 'team',
    client: 'client'
  };

  const careerCodeString = `${strengthMap[dominantStrength]}-${energyMap[dominantEnergy]}`;
  console.log('Generated career code string:', careerCodeString);

  // Get career code names
  const careerCodeNames = {
    'analyzer-solo': 'The Research Specialist',
    'analyzer-team': 'The Strategic Consultant',
    'analyzer-client': 'The Solutions Architect',
    'builder-solo': 'The Systems Engineer',
    'builder-team': 'The Operations Leader',
    'builder-client': 'The Implementation Manager',
    'innovator-solo': 'The Creative Strategist',
    'innovator-team': 'The Innovation Catalyst',
    'innovator-client': 'The Business Developer'
  };

  const finalResult = {
    code: careerCodeString,
    name: careerCodeNames[careerCodeString] || 'The Professional',
    strengths: strengthMap[dominantStrength],
    energy: energyMap[dominantEnergy],
    percentage: getCareerCodePercentage(careerCodeString)
  };

  console.log('Final career code result:', finalResult);
  return finalResult;
};

export const getCareerCodePercentage = (careerCode) => {
  // Realistic distribution percentages based on career psychology research
  const percentages = {
    'analyzer-solo': 8,      // Research specialists are rare
    'analyzer-team': 12,     // Strategic consultants more common
    'analyzer-client': 10,   // Solutions architects niche but valuable
    'builder-solo': 15,      // Systems engineers common in tech
    'builder-team': 18,      // Operations leaders very common
    'builder-client': 14,    // Implementation managers needed everywhere
    'innovator-solo': 6,     // Creative strategists quite rare
    'innovator-team': 9,     // Innovation catalysts valuable but rare
    'innovator-client': 8    // Business developers specialized role
  };

  return percentages[careerCode] || 10;
};

export const getCareerCodeDescription = (careerCode) => {
  const descriptions = {
    'analyzer-solo': {
      strength: "You excel at deep, systematic analysis and research. You naturally break down complex problems, identify patterns, and develop thorough understanding before taking action.",
      energy: "You thrive in quiet, focused environments with minimal distractions. You do your best work during extended periods of independent research and analysis.",
      overview: "Research Specialists combine analytical depth with independent focus to become subject matter experts and drive evidence-based decision making."
    },
    'analyzer-team': {
      strength: "You excel at strategic thinking and collaborative analysis. You naturally synthesize complex information and guide teams toward data-driven solutions.",
      energy: "You energize through team discussions and collaborative problem-solving. You thrive when combining analytical rigor with group insights and perspectives.",
      overview: "Strategic Consultants blend analytical expertise with team leadership to solve complex organizational challenges and drive strategic initiatives."
    },
    'analyzer-client': {
      strength: "You excel at understanding complex client needs and architecting comprehensive solutions. You naturally translate analytical insights into practical client applications.",
      energy: "You thrive on client interaction and external relationship building. You energize through presenting solutions and helping clients solve challenging problems.",
      overview: "Solutions Architects combine deep analytical skills with client relationship management to design and implement complex technical and business solutions."
    },
    'builder-team': {
      strength: "You excel at organizing resources, coordinating teams, and executing complex projects. You naturally create systems and processes that drive results.",
      energy: "You thrive in collaborative environments where you can lead teams and coordinate multiple moving parts. Team energy and collective execution fuel your success.",
      overview: "Operations Leaders combine coordination expertise with team leadership to build efficient systems and deliver consistent, high-quality results."
    },
    'builder-solo': {
      strength: "You excel at building systems, managing processes, and executing detailed plans. You naturally create structure and ensure consistent implementation.",
      energy: "You thrive during focused implementation work with clear objectives. You do your best work when you can concentrate on building and optimizing systems independently.",
      overview: "Systems Engineers combine technical coordination skills with independent focus to design, build, and optimize complex systems and processes."
    },
    'builder-client': {
      strength: "You excel at managing implementations and ensuring client success. You naturally coordinate resources and execute plans that deliver tangible client value.",
      energy: "You energize through client interaction and relationship management. You thrive when working directly with clients to implement solutions and drive outcomes.",
      overview: "Implementation Managers combine coordination expertise with client relationship skills to ensure successful project delivery and client satisfaction."
    },
    'innovator-solo': {
      strength: "You excel at generating original ideas and developing creative strategies. You naturally think outside conventional frameworks and pioneer new approaches.",
      energy: "You thrive during independent creative work and strategic thinking time. You do your best innovative work when you have space to explore ideas without interruption.",
      overview: "Creative Strategists combine innovative thinking with strategic focus to develop breakthrough concepts and pioneering approaches to complex challenges."
    },
    'innovator-team': {
      strength: "You excel at inspiring innovation and catalyzing creative breakthroughs in teams. You naturally facilitate ideation and guide groups toward innovative solutions.",
      energy: "You energize through collaborative creativity and team brainstorming. You thrive when sparking innovation and building on collective creative energy.",
      overview: "Innovation Catalysts combine creative leadership with team facilitation to drive breakthrough thinking and foster cultures of innovation."
    },
    'innovator-client': {
      strength: "You excel at identifying market opportunities and developing innovative business solutions. You naturally connect creative ideas with practical client applications.",
      energy: "You thrive on client development and external relationship building. You energize through exploring new opportunities and creating value for clients.",
      overview: "Business Developers combine innovative thinking with client relationship skills to identify opportunities and create breakthrough business solutions."
    }
  };

  return descriptions[careerCode.code] || descriptions['builder-team'];
};

export const rankCareers = (careerCode) => {

  // Get careers specific to this career code
  const relevantCareers = careerDatabase[careerCode.code] || careerDatabase['builder-team'];

  // Return all careers with match percentages (8 available)
  return relevantCareers.map((career, index) => ({
    ...career,
    rank: index + 1,
    matchPercentage: Math.max(95 - (index * 2), 75) // Decreasing match from 95% to 75%
  }));
};