// Iframe optimization utilities
export const iframeOptimizer = {
  // Initialize iframe-specific optimizations
  init() {
    this.setupParentCommunication();
    this.optimizeForEmbedding();
    this.handleResponsiveResize();
  },

  // Set up communication with parent window
  setupParentCommunication() {
    // Send height updates to parent window for dynamic sizing
    const sendHeightUpdate = () => {
      const height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      if (window.parent !== window) {
        window.parent.postMessage({
          type: 'resize',
          height: height
        }, '*');
      }
    };

    // Send initial height
    setTimeout(sendHeightUpdate, 100);

    // Update height on content changes
    const observer = new MutationObserver(sendHeightUpdate);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Update height on window resize
    window.addEventListener('resize', sendHeightUpdate);
  },

  // Optimize for iframe embedding
  optimizeForEmbedding() {
    // Prevent scrollbars in iframe
    document.body.style.overflow = 'hidden';

    // Ensure proper width
    document.body.style.width = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    // Add iframe-specific styles
    document.documentElement.setAttribute('data-iframe', 'true');

    // Handle focus management for accessibility
    this.setupFocusManagement();
  },

  // Setup focus management for iframe
  setupFocusManagement() {
    // Ensure first focusable element gets focus when iframe is activated
    document.addEventListener('click', (e) => {
      if (e.target === document.body || e.target === document.documentElement) {
        const firstFocusable = document.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }
    });
  },

  // Handle responsive behavior in iframe
  handleResponsiveResize() {
    let resizeTimeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Force re-layout for responsive components
        const event = new Event('resize');
        window.dispatchEvent(event);
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    // Initial resize check
    setTimeout(handleResize, 250);
  },

  // Check if running in iframe
  isInIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  },

  // Get parent window origin safely
  getParentOrigin() {
    try {
      return window.parent.location.origin;
    } catch (e) {
      return null;
    }
  },

  // Send events to parent for analytics
  sendEventToParent(eventName, data = {}) {
    if (this.isInIframe() && window.parent !== window) {
      window.parent.postMessage({
        type: 'career-code-event',
        event: eventName,
        data: data,
        timestamp: Date.now()
      }, '*');
    }
  }
};

// Auto-initialize if in iframe
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (iframeOptimizer.isInIframe()) {
        iframeOptimizer.init();
      }
    });
  } else {
    if (iframeOptimizer.isInIframe()) {
      iframeOptimizer.init();
    }
  }
}