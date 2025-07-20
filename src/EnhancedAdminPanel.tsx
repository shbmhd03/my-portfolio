import { useState, useEffect } from 'react';
import { 
  MdDashboard, MdEdit, MdSave, MdCancel, MdAdd, MdDelete,
  MdSettings, MdContent, MdPeople, MdArticle, MdWork,
  MdHome, MdInfo, MdCode, MdEmail, MdBuild
} from 'react-icons/md';
import { contentAPI, projectsAPI, blogAPI, maintenanceAPI } from './api';

interface EnhancedAdminPanelProps {
  maintenanceMode: any;
  setMaintenanceMode: (mode: any) => void;
}

const EnhancedAdminPanel = ({ maintenanceMode, setMaintenanceMode }: EnhancedAdminPanelProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [portfolioData, setPortfolioData] = useState<any>({});
  const [projects, setProjects] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [contentResult, projectsResult, blogResult] = await Promise.all([
        contentAPI.getAllContent(),
        projectsAPI.getAll(),
        blogAPI.getAll()
      ]);

      if (contentResult.success) {
        setPortfolioData(contentResult.data);
      }
      setProjects(projectsResult);
      setBlogPosts(blogResult);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication (in production, use proper authentication)
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const updateContent = async (section: string, content: any) => {
    try {
      await contentAPI.updateContent(section, content);
      setPortfolioData(prev => ({ ...prev, [section]: content }));
      alert(`${section} updated successfully!`);
    } catch (error) {
      alert(`Failed to update ${section}`);
    }
  };

  const toggleMaintenanceMode = async () => {
    const newMode = { ...maintenanceMode, isActive: !maintenanceMode.isActive };
    try {
      const result = await maintenanceAPI.updateStatus({
        isGloballyActive: newMode.isActive,
        message: newMode.message,
        estimatedTime: newMode.estimatedDuration
      });
      
      if (result.success) {
        setMaintenanceMode(newMode);
        alert(`Maintenance mode ${newMode.isActive ? 'enabled' : 'disabled'} globally!`);
      }
    } catch (error) {
      console.error('Error updating maintenance mode:', error);
      setMaintenanceMode(newMode);
      alert(`Maintenance mode ${newMode.isActive ? 'enabled' : 'disabled'} locally!`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={loginForm.username}
                onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>Demo Credentials:</p>
            <p>Username: admin | Password: admin123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Portfolio Admin Panel</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 min-h-screen p-6">
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <MdDashboard /> },
              { id: 'hero', label: 'Hero Section', icon: <MdHome /> },
              { id: 'about', label: 'About Section', icon: <MdInfo /> },
              { id: 'skills', label: 'Skills Section', icon: <MdCode /> },
              { id: 'projects', label: 'Projects', icon: <MdWork /> },
              { id: 'blog', label: 'Blog Posts', icon: <MdArticle /> },
              { id: 'contact', label: 'Contact Info', icon: <MdEmail /> },
              { id: 'maintenance', label: 'Maintenance', icon: <MdBuild /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <span className="ml-4">Loading...</span>
            </div>
          )}

          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Total Projects</h3>
                  <p className="text-3xl font-bold text-blue-400">{projects.length}</p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Blog Posts</h3>
                  <p className="text-3xl font-bold text-green-400">{blogPosts.length}</p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Maintenance Mode</h3>
                  <p className={`text-3xl font-bold ${maintenanceMode.isActive ? 'text-red-400' : 'text-green-400'}`}>
                    {maintenanceMode.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Site Status</h3>
                  <p className="text-3xl font-bold text-green-400">Online</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={toggleMaintenanceMode}
                    className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                      maintenanceMode.isActive
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {maintenanceMode.isActive ? 'Disable' : 'Enable'} Maintenance
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Add New Project
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('blog')}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                  >
                    Write Blog Post
                  </button>
                  
                  <button
                    onClick={loadAllData}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
                  >
                    Refresh Data
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Hero Section Editor */}
          {activeTab === 'hero' && (
            <HeroEditor
              data={portfolioData.hero || {}}
              onSave={(data) => updateContent('hero', data)}
            />
          )}

          {/* About Section Editor */}
          {activeTab === 'about' && (
            <AboutEditor
              data={portfolioData.about || {}}
              onSave={(data) => updateContent('about', data)}
            />
          )}

          {/* Skills Section Editor */}
          {activeTab === 'skills' && (
            <SkillsEditor
              data={portfolioData.skills || {}}
              onSave={(data) => updateContent('skills', data)}
            />
          )}

          {/* Projects Manager */}
          {activeTab === 'projects' && (
            <ProjectsManager
              projects={projects}
              onRefresh={loadAllData}
              editingProject={editingProject}
              setEditingProject={setEditingProject}
            />
          )}

          {/* Blog Manager */}
          {activeTab === 'blog' && (
            <BlogManager
              posts={blogPosts}
              onRefresh={loadAllData}
              editingPost={editingPost}
              setEditingPost={setEditingPost}
            />
          )}

          {/* Contact Editor */}
          {activeTab === 'contact' && (
            <ContactEditor
              data={portfolioData.contact || {}}
              onSave={(data) => updateContent('contact', data)}
            />
          )}

          {/* Maintenance Settings */}
          {activeTab === 'maintenance' && (
            <MaintenanceSettings
              maintenanceMode={maintenanceMode}
              setMaintenanceMode={setMaintenanceMode}
              toggleMaintenanceMode={toggleMaintenanceMode}
            />
          )}
        </main>
      </div>
    </div>
  );
};

// Component editors (simplified versions)
const HeroEditor = ({ data, onSave }: any) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Hero Section</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            rows={4}
            value={formData.description || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

// Add more component editors as needed...
const AboutEditor = ({ data, onSave }: any) => <div>About Editor (implement as needed)</div>;
const SkillsEditor = ({ data, onSave }: any) => <div>Skills Editor (implement as needed)</div>;
const ProjectsManager = ({ projects, onRefresh }: any) => <div>Projects Manager (implement as needed)</div>;
const BlogManager = ({ posts, onRefresh }: any) => <div>Blog Manager (implement as needed)</div>;
const ContactEditor = ({ data, onSave }: any) => <div>Contact Editor (implement as needed)</div>;
const MaintenanceSettings = ({ maintenanceMode, toggleMaintenanceMode }: any) => (
  <div>
    <h2 className="text-3xl font-bold mb-6">Maintenance Settings</h2>
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-semibold">Maintenance Mode</span>
        <button
          onClick={toggleMaintenanceMode}
          className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
            maintenanceMode.isActive
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {maintenanceMode.isActive ? 'Disable' : 'Enable'}
        </button>
      </div>
      <p className="text-gray-300">
        Status: {maintenanceMode.isActive ? 'Active' : 'Inactive'}
      </p>
    </div>
  </div>
);

export default EnhancedAdminPanel;
