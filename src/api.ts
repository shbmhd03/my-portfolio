// Comprehensive API service for dynamic portfolio content
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Netlify will serve from same domain
  : 'http://localhost:8888'; // Netlify Dev default port

// Generic API helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Maintenance API
export const maintenanceAPI = {
  getStatus: async () => {
    try {
      return await apiRequest('/api/maintenance');
    } catch (error) {
      console.error('Error fetching maintenance status:', error);
      const localStatus = localStorage.getItem('maintenanceMode');
      return localStatus ? JSON.parse(localStatus) : { isGloballyActive: false };
    }
  },

  updateStatus: async (config: any) => {
    try {
      return await apiRequest('/api/maintenance', {
        method: 'POST',
        body: JSON.stringify(config),
      });
    } catch (error) {
      console.error('Error updating maintenance status:', error);
      localStorage.setItem('maintenanceMode', JSON.stringify(config));
      return { success: true, config };
    }
  }
};

// Content API for all portfolio sections
export const contentAPI = {
  // Get all portfolio data
  getAllContent: async () => {
    try {
      return await apiRequest('/api/content');
    } catch (error) {
      console.error('Error fetching all content:', error);
      return getLocalContent();
    }
  },

  // Get specific section content
  getContent: async (section: string) => {
    try {
      return await apiRequest(`/api/content?section=${section}`);
    } catch (error) {
      console.error(`Error fetching ${section} content:`, error);
      const localContent = localStorage.getItem(`${section}Content`);
      return localContent ? JSON.parse(localContent) : null;
    }
  },

  // Update section content
  updateContent: async (section: string, content: any) => {
    try {
      const result = await apiRequest(`/api/content?section=${section}`, {
        method: 'PUT',
        body: JSON.stringify(content),
      });
      
      // Update local storage as backup
      localStorage.setItem(`${section}Content`, JSON.stringify(content));
      return result;
    } catch (error) {
      console.error(`Error updating ${section} content:`, error);
      localStorage.setItem(`${section}Content`, JSON.stringify(content));
      return { success: true };
    }
  },

  // Hero/Home Section
  getHeroContent: async () => {
    return await contentAPI.getContent('hero');
  },

  updateHeroContent: async (content: any) => {
    return await contentAPI.updateContent('hero', content);
  },

  // About Section
  getAboutContent: async () => {
    return await contentAPI.getContent('about');
  },

  updateAboutContent: async (content: any) => {
    return await contentAPI.updateContent('about', content);
  },

  // Skills Section
  getSkillsContent: async () => {
    return await contentAPI.getContent('skills');
  },

  updateSkillsContent: async (content: any) => {
    return await contentAPI.updateContent('skills', content);
  },

  // Contact Section
  getContactContent: async () => {
    return await contentAPI.getContent('contact');
  },

  updateContactContent: async (content: any) => {
    return await contentAPI.updateContent('contact', content);
  },

  // Submit contact form
  submitContactForm: async (formData: any) => {
    try {
      return await apiRequest('/api/content?section=contact', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
};

// Projects API
export const projectsAPI = {
  // Get all projects
  getAll: async () => {
    try {
      const result = await apiRequest('/api/content?section=projects');
      return result.data || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      const localProjects = localStorage.getItem('projectsContent');
      return localProjects ? JSON.parse(localProjects) : [];
    }
  },

  // Get specific project
  getById: async (id: string) => {
    try {
      return await apiRequest(`/api/content?section=projects&id=${id}`);
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      return null;
    }
  },

  // Create new project
  create: async (project: any) => {
    try {
      return await apiRequest('/api/content?section=projects', {
        method: 'POST',
        body: JSON.stringify(project),
      });
    } catch (error) {
      console.error('Error creating project:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Update project
  update: async (id: string, project: any) => {
    try {
      return await apiRequest(`/api/content?section=projects&id=${id}`, {
        method: 'PUT',
        body: JSON.stringify(project),
      });
    } catch (error) {
      console.error(`Error updating project ${id}:`, error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Delete project
  delete: async (id: string) => {
    try {
      return await apiRequest(`/api/content?section=projects&id=${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
};

// Blog API
export const blogAPI = {
  // Get all blog posts
  getAll: async () => {
    try {
      const result = await apiRequest('/api/content?section=blog');
      return result.data?.posts || [];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      const localPosts = localStorage.getItem('blogContent');
      return localPosts ? JSON.parse(localPosts) : [];
    }
  },

  // Get specific blog post
  getById: async (id: string) => {
    try {
      return await apiRequest(`/api/content?section=blog&id=${id}`);
    } catch (error) {
      console.error(`Error fetching blog post ${id}:`, error);
      return null;
    }
  },

  // Create new blog post
  create: async (post: any) => {
    try {
      return await apiRequest('/api/content?section=blog', {
        method: 'POST',
        body: JSON.stringify(post),
      });
    } catch (error) {
      console.error('Error creating blog post:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Update blog post
  update: async (id: string, post: any) => {
    try {
      return await apiRequest(`/api/content?section=blog&id=${id}`, {
        method: 'PUT',
        body: JSON.stringify(post),
      });
    } catch (error) {
      console.error(`Error updating blog post ${id}:`, error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Delete blog post
  delete: async (id: string) => {
    try {
      return await apiRequest(`/api/content?section=blog&id=${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Error deleting blog post ${id}:`, error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
};

// Site Configuration API
export const configAPI = {
  get: async () => {
    return await contentAPI.getContent('config');
  },

  update: async (config: any) => {
    return await contentAPI.updateContent('config', config);
  }
};

// Fallback content when API is unavailable
const getLocalContent = () => {
  return {
    hero: JSON.parse(localStorage.getItem('heroContent') || '{}'),
    about: JSON.parse(localStorage.getItem('aboutContent') || '{}'),
    skills: JSON.parse(localStorage.getItem('skillsContent') || '{}'),
    projects: JSON.parse(localStorage.getItem('projectsContent') || '[]'),
    blog: JSON.parse(localStorage.getItem('blogContent') || '{}'),
    contact: JSON.parse(localStorage.getItem('contactContent') || '{}'),
    config: JSON.parse(localStorage.getItem('configContent') || '{}'),
  };
};
