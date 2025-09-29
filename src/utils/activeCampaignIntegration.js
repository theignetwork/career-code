// ActiveCampaign Integration via n8n Webhook
// Webhook URL: https://jerandjamesai.app.n8n.cloud/webhook/career-code

const N8N_WEBHOOK_URL = 'https://jerandjamesai.app.n8n.cloud/webhook/career-code';

/**
 * Send career assessment data to n8n webhook which processes it into ActiveCampaign
 * @param {Object} assessmentData - The assessment results data
 * @param {string} assessmentData.email - User's email address (required)
 * @param {string} assessmentData.career_code - Career code like "analyzer-team" (required)
 * @param {string} assessmentData.career_code_name - Career name like "The Strategic Consultant" (required)
 * @param {string} assessmentData.assessment_date - ISO date string (optional, defaults to today)
 * @param {string} assessmentData.lead_source - Lead source (optional, defaults to "Career Code Assessment")
 * @returns {Promise<Object>} Response from n8n webhook
 */
export const sendToActiveCampaign = async (assessmentData) => {
  // Validate required fields
  if (!assessmentData.email) {
    throw new Error('Email is required for ActiveCampaign integration');
  }

  if (!assessmentData.career_code) {
    throw new Error('Career code is required for ActiveCampaign integration');
  }

  if (!assessmentData.career_code_name) {
    throw new Error('Career code name is required for ActiveCampaign integration');
  }

  // Prepare payload with defaults
  const payload = {
    email: assessmentData.email.trim().toLowerCase(),
    career_code: assessmentData.career_code,
    career_code_name: assessmentData.career_code_name,
    assessment_date: assessmentData.assessment_date || new Date().toISOString().split('T')[0],
    lead_source: assessmentData.lead_source || 'Career Code Assessment'
  };

  console.log('Sending to ActiveCampaign via n8n:', payload);

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`n8n webhook error: ${response.status} ${response.statusText}`);
    }

    // Handle empty response bodies from n8n webhook
    let result;
    const responseText = await response.text();

    if (responseText.trim()) {
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.warn('Response body is not valid JSON:', responseText);
        result = { message: responseText };
      }
    } else {
      result = { message: 'Webhook executed successfully (empty response)' };
    }

    console.log('ActiveCampaign integration successful:', result);

    return {
      success: true,
      data: result,
      payload: payload
    };

  } catch (error) {
    console.error('ActiveCampaign integration failed:', error);

    // Re-throw with more context
    throw new Error(`Failed to send data to ActiveCampaign: ${error.message}`);
  }
};

/**
 * Send assessment data with retry logic for better reliability
 * @param {Object} assessmentData - The assessment results data
 * @param {number} maxRetries - Maximum number of retry attempts (default: 3)
 * @param {number} retryDelay - Delay between retries in milliseconds (default: 1000)
 * @returns {Promise<Object>} Response from successful submission
 */
export const sendToActiveCampaignWithRetry = async (assessmentData, maxRetries = 3, retryDelay = 1000) => {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`ActiveCampaign integration attempt ${attempt}/${maxRetries}`);

      const result = await sendToActiveCampaign(assessmentData);

      // Success on this attempt
      console.log(`ActiveCampaign integration succeeded on attempt ${attempt}`);
      return result;

    } catch (error) {
      lastError = error;
      console.warn(`ActiveCampaign integration attempt ${attempt} failed:`, error.message);

      // If this wasn't the last attempt, wait before retrying
      if (attempt < maxRetries) {
        console.log(`Retrying in ${retryDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        retryDelay *= 2; // Exponential backoff
      }
    }
  }

  // All attempts failed
  console.error(`ActiveCampaign integration failed after ${maxRetries} attempts`);
  throw lastError;
};

/**
 * Test the n8n webhook connection
 * @returns {Promise<boolean>} True if webhook is accessible
 */
export const testWebhookConnection = async () => {
  try {
    // Send a test payload
    const testPayload = {
      email: 'test@example.com',
      career_code: 'test-connection',
      career_code_name: 'Test Connection',
      assessment_date: new Date().toISOString().split('T')[0],
      lead_source: 'Connection Test'
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload)
    });

    console.log('Webhook test response status:', response.status);
    return response.ok;

  } catch (error) {
    console.error('Webhook connection test failed:', error);
    return false;
  }
};

/**
 * Helper function to format career assessment data for ActiveCampaign
 * @param {string} email - User's email
 * @param {Object} careerCode - Career code object from assessment
 * @returns {Object} Formatted data for ActiveCampaign
 */
export const formatAssessmentData = (email, careerCode) => {
  return {
    email: email,
    career_code: careerCode.code,
    career_code_name: careerCode.name,
    assessment_date: new Date().toISOString().split('T')[0],
    lead_source: 'Career Code Assessment'
  };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email format is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default {
  sendToActiveCampaign,
  sendToActiveCampaignWithRetry,
  testWebhookConnection,
  formatAssessmentData,
  validateEmail
};