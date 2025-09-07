import Cookies from 'js-cookie';

const WELCOME_COOKIE_NAME = 'paltan_welcome_seen';

export const cookieUtils = {
  // Check if user has seen welcome page
  hasSeenWelcome: (): boolean => {
    return Cookies.get(WELCOME_COOKIE_NAME) === 'true';
  },

  // Set welcome cookie (never expires unless manually cleared)
  setWelcomeSeen: (): void => {
    Cookies.set(WELCOME_COOKIE_NAME, 'true', { 
      expires: 365 * 10, // 10 years - essentially never expires
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });
  },

  // Clear welcome cookie (for testing)
  clearWelcome: (): void => {
    Cookies.remove(WELCOME_COOKIE_NAME);
  }
};
