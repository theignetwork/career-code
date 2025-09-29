// Performance optimization utilities
export const performanceOptimizer = {
  // Initialize performance monitoring
  init() {
    this.setupVitalMetrics();
    this.optimizeImageLoading();
    this.setupLazyLoading();
    this.preloadCriticalResources();
  },

  // Setup Core Web Vitals monitoring
  setupVitalMetrics() {
    // Monitor Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];

          // Log LCP for analytics
          console.log('LCP:', lastEntry.startTime);

          // Send to parent window if in iframe
          if (window.parent !== window) {
            window.parent.postMessage({
              type: 'performance-metric',
              metric: 'LCP',
              value: lastEntry.startTime
            }, '*');
          }
        });

        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('Performance monitoring not supported');
      }
    }
  },

  // Optimize image loading
  optimizeImageLoading() {
    // Add loading="lazy" to images dynamically
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      img.loading = 'lazy';
    });

    // Use Intersection Observer for custom lazy loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  },

  // Setup lazy loading for components
  setupLazyLoading() {
    // Preload next step content based on current progress
    const currentStep = this.getCurrentStep();
    this.preloadNextStep(currentStep);
  },

  // Preload critical resources
  preloadCriticalResources() {
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    fontLink.onload = function() {
      this.onload = null;
      this.rel = 'stylesheet';
    };
    document.head.appendChild(fontLink);

    // Preload critical icons
    const iconPreload = document.createElement('link');
    iconPreload.rel = 'modulepreload';
    iconPreload.href = '/src/components/icons.js';
    document.head.appendChild(iconPreload);
  },

  // Get current assessment step
  getCurrentStep() {
    // Try to get from URL or local storage
    const urlParams = new URLSearchParams(window.location.search);
    const step = urlParams.get('step') || localStorage.getItem('career-code-step') || '0';
    return parseInt(step, 10);
  },

  // Preload next step resources
  preloadNextStep(currentStep) {
    const nextStep = currentStep + 1;

    // Preload next component based on step
    const preloadMap = {
      0: () => import('../components/Question1.jsx'),
      1: () => import('../components/Question2.jsx'),
      2: () => import('../components/Question3.jsx'),
      3: () => import('../components/PartialResults.jsx'),
      4: () => import('../components/CompleteResults.jsx')
    };

    if (preloadMap[nextStep]) {
      // Preload with a small delay to avoid blocking current rendering
      setTimeout(() => {
        preloadMap[nextStep]().catch(() => {
          // Ignore preload errors
        });
      }, 100);
    }
  },

  // Optimize bundle size by code splitting
  setupCodeSplitting() {
    // Dynamic imports for heavy components
    const loadHeavyComponent = (componentName) => {
      return import(`../components/${componentName}.jsx`);
    };

    return { loadHeavyComponent };
  },

  // Debounce function for performance
  debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Measure and report performance metrics
  measurePerformance(label, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();

    console.log(`${label} took ${end - start} milliseconds`);

    // Send to analytics if needed
    if (window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: label,
        value: Math.round(end - start)
      });
    }

    return result;
  }
};

// Auto-initialize on DOM ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      performanceOptimizer.init();
    });
  } else {
    performanceOptimizer.init();
  }
}