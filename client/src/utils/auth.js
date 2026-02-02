// Helper function to get authentication token from localStorage
export const getAuthToken = () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        return userInfo?.token || null;
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
};
