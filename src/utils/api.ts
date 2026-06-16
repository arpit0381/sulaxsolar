
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const submitContactForm = async (formData: ContactFormData): Promise<ApiResponse> => {
  try {
    // Replace this URL with your actual API endpoint
    const API_ENDPOINT = 'https://formspree.io/f/mkgboqqw';
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'portfolio-contact-form'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Form submitted successfully',
      data: result
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

export interface NewsletterSubscriptionData {
  email: string;
}

export const submitNewsletterSubscription = async (formData: NewsletterSubscriptionData): Promise<ApiResponse> => {
  try {
    // Replace this URL with your actual API endpoint for newsletter subscriptions
    const API_ENDPOINT = 'https://formspree.io/f/xdkzaero';
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'portfolio-newsletter-form'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Subscription successful',
      data: result
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};
