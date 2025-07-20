// API service for Netlify Functions communication
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Netlify will serve from same domain
  : 'http://localhost:8888'; // Netlify Dev default port

export const maintenanceAPI = {
  // Get current maintenance status
  getStatus: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/maintenance`);
      if (!response.ok) {
        throw new Error('Failed to fetch maintenance status');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching maintenance status:', error);
      // Fallback to localStorage if server is unavailable
      const localStatus = localStorage.getItem('maintenanceMode');
      return localStatus ? JSON.parse(localStatus) : { isGloballyActive: false };
    }
  },

  // Update maintenance status (Admin only)
  updateStatus: async (config) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/maintenance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update maintenance status');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating maintenance status:', error);
      // Fallback to localStorage if server is unavailable
      localStorage.setItem('maintenanceMode', JSON.stringify(config));
      return { success: true, config };
    }
  }
};

export const contentAPI = {
  // Get content for a specific section
  getContent: async (section) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/content?section=${section}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${section} content`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${section} content:`, error);
      // Fallback to localStorage
      const localContent = localStorage.getItem(`${section}Content`);
      return localContent ? JSON.parse(localContent) : null;
    }
  },

  // Update content for a specific section
  updateContent: async (section, content) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/content?section=${section}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update ${section} content`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating ${section} content:`, error);
      // Fallback to localStorage
      localStorage.setItem(`${section}Content`, JSON.stringify(content));
      return { success: true };
    }
  }
};
