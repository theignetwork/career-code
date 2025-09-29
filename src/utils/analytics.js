// GA4 Analytics Utility for Career Code Assessment
// Measurement ID: G-Z6WS2VE8K9
// Stream ID: 10405848421
// Stream URL: https://blog.theinterviewguys.com

const GA4_MEASUREMENT_ID = 'G-Z6WS2VE8K9';
const GA4_STREAM_ID = '10405848421';

// Initialize GA4 tracking
export const initGA4 = () => {
  // Check if already initialized
  if (window.gtag || document.querySelector(`script[src*="${GA4_MEASUREMENT_ID}"]`)) {
    console.log('GA4 already initialized');
    return;
  }

  try {
    // Create and append GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
      // Enhanced measurement settings
      send_page_view: true,
      page_title: document.title || 'Career Code Assessment',
      page_location: window.location.href,
      stream_id: GA4_STREAM_ID,
      // Enhanced iframe tracking
      allow_enhanced_conversions: true,
      allow_google_signals: true,
      cookie_flags: 'SameSite=None;Secure'
    });

    // Make gtag globally available
    window.gtag = gtag;

    console.log('GA4 initialized successfully');
  } catch (error) {
    console.error('GA4 initialization error:', error);
  }
};

// Track custom events with GA4
export const trackEvent = (eventName, eventParams = {}) => {
  if (!window.gtag) {
    console.warn('GA4 not initialized, event not tracked:', eventName);
    return;
  }

  try {
    const baseParams = {
      stream_id: GA4_STREAM_ID,
      page_title: document.title || 'Career Code Assessment',
      page_location: window.location.href,
      timestamp: new Date().toISOString()
    };

    window.gtag('event', eventName, {
      ...baseParams,
      ...eventParams
    });

    console.log(`GA4 Event tracked: ${eventName}`, { ...baseParams, ...eventParams });
  } catch (error) {
    console.error('GA4 event tracking error:', error, eventName);
  }
};

// Specific tracking functions for Career Code Assessment
export const trackAssessmentStarted = (source = 'landing_page') => {
  trackEvent('assessment_started', {
    source,
    event_category: 'engagement',
    event_label: 'career_assessment_begin'
  });
};

export const trackQuestionAnswered = (questionNumber, questionText, answer) => {
  trackEvent('question_answered', {
    question_number: questionNumber,
    question_text: questionText,
    answer: answer,
    event_category: 'engagement',
    event_label: `question_${questionNumber}`
  });
};

export const trackAssessmentCompleted = (careerCode, careerName, totalQuestions = 10) => {
  trackEvent('assessment_completed', {
    career_code: careerCode,
    career_name: careerName,
    total_questions: totalQuestions,
    event_category: 'conversion',
    event_label: 'assessment_finished'
  });
};

export const trackEmailCaptured = (email, careerCode) => {
  trackEvent('email_captured', {
    career_code: careerCode,
    event_category: 'conversion',
    event_label: 'lead_generation',
    value: 1 // Conversion value
  });
};

export const trackResultsModalOpened = (careerCode, careerName) => {
  trackEvent('results_modal_opened', {
    career_code: careerCode,
    career_name: careerName,
    event_category: 'engagement',
    event_label: 'results_view'
  });
};

export const trackResultsModalClosed = (careerCode) => {
  trackEvent('results_modal_closed', {
    career_code: careerCode,
    event_category: 'engagement',
    event_label: 'results_close'
  });
};

export const trackCareerClicked = (careerTitle, careerCode, position) => {
  trackEvent('career_clicked', {
    career_title: careerTitle,
    career_code: careerCode,
    position: position, // '1st', '2nd', '3rd', etc.
    event_category: 'engagement',
    event_label: 'career_interest'
  });
};

export const trackIGNetworkClicked = (careerCode) => {
  trackEvent('ig_network_clicked', {
    career_code: careerCode,
    event_category: 'conversion',
    event_label: 'external_link',
    value: 5 // High value conversion
  });
};

export const trackAssessmentRetaken = (previousCareerCode) => {
  trackEvent('assessment_retaken', {
    previous_career_code: previousCareerCode,
    event_category: 'engagement',
    event_label: 'repeat_user'
  });
};

// Track page views manually (useful for SPA routing)
export const trackPageView = (pageTitle, pagePath) => {
  if (!window.gtag) return;

  window.gtag('config', GA4_MEASUREMENT_ID, {
    page_title: pageTitle,
    page_location: `${window.location.origin}${pagePath}`,
    stream_id: GA4_STREAM_ID
  });
};

// Enhanced conversion tracking for high-value events
export const trackConversion = (conversionName, careerCode, conversionValue = 1) => {
  trackEvent('conversion', {
    conversion_name: conversionName,
    career_code: careerCode,
    event_category: 'conversion',
    value: conversionValue
  });
};

export default {
  initGA4,
  trackEvent,
  trackAssessmentStarted,
  trackQuestionAnswered,
  trackAssessmentCompleted,
  trackEmailCaptured,
  trackResultsModalOpened,
  trackResultsModalClosed,
  trackCareerClicked,
  trackIGNetworkClicked,
  trackAssessmentRetaken,
  trackPageView,
  trackConversion
};