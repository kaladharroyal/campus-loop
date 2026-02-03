// Fallback to Render URL if env var is missing in production
// In development, we keep it empty to use the Vite proxy
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://campus-loop-okw5.onrender.com' : '');

console.log("🚀 [Config] API_BASE_URL:", API_BASE_URL);

export default API_BASE_URL;
