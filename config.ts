// API Configuration
export const API_URL = import.meta.env.PROD 
  ? 'https://csa-5yhk.onrender.com' 
  : 'http://localhost:5000';

export const API_ENDPOINTS = {
  health: `${API_URL}/api/health`,
  waitlist: `${API_URL}/api/waitlist`,
  contact: `${API_URL}/api/contact`,
  webinar: `${API_URL}/api/webinar`,
  adminLogin: `${API_URL}/api/admin/login`,
};
