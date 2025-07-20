import { useState, useEffect } from 'react';
import { 
  MdAdd, MdEdit, MdDelete, MdSave, MdCancel, MdDashboard, 
  MdWork, MdArticle, MdCode, MdEmail, MdSettings, MdPeople,
  MdLock, MdDelete as MdTrash, MdCheck, MdClose, MdKey,
  MdRocket, MdPsychology, MdCloud, MdSecurity, MdDevices,
  MdComputer, MdTerminal, MdBuild, MdMenu, MdLogout, MdVisibility,
  MdTrendingUp, MdSpeed, MdUpdate
} from 'react-icons/md';
import { maintenanceAPI } from './api';
import { 
  FaAws, FaReact, FaPython, FaDocker, FaLinux, FaGithub,
  FaNetworkWired, FaShieldAlt
} from 'react-icons/fa';
import { 
  SiCisco, SiMikrotik, SiWireshark, SiJavascript,
  SiTerraform, SiJenkins
} from 'react-icons/si';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  icon: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  tags: string[];
}

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
  icon: string;
}

interface ContactInfo {
  email: string;
  website: string;
  linkedin: string;
  github: string;
}

interface MaintenanceMode {
  isActive: boolean;
  startDate: string;
  endDate: string;
  message: string;
  estimatedDuration: string;
  contactEmail: string;
  showCountdown: boolean;
  allowAdminAccess: boolean;
}

interface HomePageContent {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  cvFileName: string;
}

interface AboutContent {
  title: string;
  paragraph1: string;
  paragraph2: string;
  stats: {
    experience: { value: string; label: string };
    projects: { value: string; label: string };
    technologies: { value: string; label: string };
  };
}

interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: string[];
}

interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'editor';
  createdAt: string;
  lastLogin?: string;
}

interface AdminPanelProps {
  aboutContent: AboutContent;
  setAboutContent: (content: AboutContent) => void;
  homePageContent: HomePageContent;
  setHomePageContent: (content: HomePageContent) => void;
  maintenanceMode: MaintenanceMode;
  setMaintenanceMode: (mode: MaintenanceMode) => void;
}

const AdminPanel = ({ aboutContent, setAboutContent, homePageContent, setHomePageContent, maintenanceMode, setMaintenanceMode }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: 'mohamedsuhaib.offl@outlook.com',
    website: 'https://mohamedsuhaib.live',
    linkedin: 'https://www.linkedin.com/in/shbmhmd03',
    github: 'https://github.com/shbmhmd'
  });

  // Editing states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingHomeContent, setEditingHomeContent] = useState(false);
  const [editingAboutContent, setEditingAboutContent] = useState(false);
  const [editingSkillCategory, setEditingSkillCategory] = useState<SkillCategory | null>(null);

  // Load initial data
  useEffect(() => {
    // Load users
    setUsers([
      {
        id: '1',
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        createdAt: '2025-01-01',
        lastLogin: new Date().toISOString()
      },
      {
        id: '2',
        username: 'editor',
        password: 'editor123',
        role: 'editor',
        createdAt: '2025-01-15'
      }
    ]);

    // Load projects
    setProjects([
      {
        id: '1',
        title: 'Network Monitoring Dashboard',
        description: 'Real-time network monitoring system with alerting capabilities',
        tech: ['Python', 'SNMP', 'React', 'WebSocket'],
        link: 'https://github.com/shbmhmd/network-monitor',
        icon: 'MdDevices'
      },
      {
        id: '2',
        title: 'Cloud Infrastructure Automation',
        description: 'Automated AWS infrastructure deployment using Terraform',
        tech: ['Terraform', 'AWS', 'Python', 'Jenkins'],
        link: 'https://github.com/shbmhmd/cloud-automation',
        icon: 'MdCloud'
      }
    ]);

    // Load blog posts
    setBlogPosts([
      {
        id: '1',
        title: 'Building a Network Monitoring System with Python',
        excerpt: 'Learn how I created an automated network monitoring system using Python, SNMP, and real-time alerting.',
        date: 'June 25, 2025',
        category: 'Networking',
        readTime: '5 min read',
        tags: ['Python', 'SNMP', 'Monitoring', 'Automation']
      }
    ]);

    // Load skills
    setSkills([
      { name: 'Python', level: 90, category: 'Programming', color: '#3776ab', icon: 'FaPython' },
      { name: 'JavaScript', level: 85, category: 'Programming', color: '#f7df1e', icon: 'SiJavascript' },
      { name: 'React', level: 80, category: 'Programming', color: '#61dafb', icon: 'FaReact' },
      { name: 'Bash Scripting', level: 75, category: 'Programming', color: '#4eaa25', icon: 'MdTerminal' },
      { name: 'AWS', level: 75, category: 'Cloud & DevOps', color: '#ff9900', icon: 'FaAws' },
      { name: 'Azure', level: 70, category: 'Cloud & DevOps', color: '#0078d4', icon: 'MdCloud' },
      { name: 'Docker', level: 80, category: 'Cloud & DevOps', color: '#2496ed', icon: 'FaDocker' },
      { name: 'Linux Administration', level: 85, category: 'Cloud & DevOps', color: '#fcc624', icon: 'FaLinux' },
      { name: 'Cisco', level: 85, category: 'Networking', color: '#1ba0d7', icon: 'SiCisco' },
      { name: 'Mikrotik', level: 75, category: 'Networking', color: '#293239', icon: 'SiMikrotik' },
      { name: 'Network Troubleshooting', level: 90, category: 'Networking', color: '#3b82f6', icon: 'MdBuild' },
      { name: 'Wireshark', level: 80, category: 'Networking', color: '#1679a7', icon: 'SiWireshark' },
      { name: 'Cybersecurity', level: 85, category: 'Security', color: '#ff6b6b', icon: 'MdSecurity' },
      { name: 'Packet Analysis', level: 80, category: 'Security', color: '#4ecdc4', icon: 'MdDevices' },
      { name: 'Vulnerability Assessment', level: 75, category: 'Security', color: '#ff7675', icon: 'FaShieldAlt' },
      { name: 'Network Security', level: 80, category: 'Security', color: '#6c5ce7', icon: 'MdLock' }
    ]);

    // Load skill categories
    setSkillCategories([
      {
        id: '1',
        name: 'Networking',
        icon: 'FaNetworkWired',
        skills: ['Cisco', 'Mikrotik', 'Network Troubleshooting', 'Wireshark']
      },
      {
        id: '2',
        name: 'Cloud & DevOps',
        icon: 'MdCloud',
        skills: ['AWS', 'Azure', 'Linux Administration', 'Docker']
      },
      {
        id: '3',
        name: 'Programming',
        icon: 'MdCode',
        skills: ['Python', 'Bash Scripting', 'JavaScript', 'React']
      },
      {
        id: '4',
        name: 'Security',
        icon: 'MdSecurity',
        skills: ['Cybersecurity', 'Packet Analysis', 'Vulnerability Assessment', 'Network Security']
      }
    ]);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user with matching username and password
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      setPassword('');
      setUsername('');
      // Update last login
      setUsers(users.map(u => 
        u.id === user.id 
          ? { ...u, lastLogin: new Date().toISOString() }
          : u
      ));
    } else {
      alert('Invalid username or password');
    }
    
    setLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setSidebarOpen(false);
    setActiveTab('dashboard');
  };

  // Project management functions
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description',
      tech: ['Technology'],
      link: 'https://github.com/shbmhmd/new-project',
      icon: 'MdRocket'
    };
    setProjects([...projects, newProject]);
    setEditingProject(newProject);
  };

  const saveProject = (project: Project) => {
    setProjects(projects.map(p => p.id === project.id ? project : p));
    setEditingProject(null);
  };

  const deleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  // Blog management functions
  const addBlogPost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: 'New Blog Post',
      excerpt: 'Post excerpt',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      category: 'Technology',
      readTime: '3 min read',
      tags: ['tag1', 'tag2']
    };
    setBlogPosts([...blogPosts, newPost]);
    setEditingBlog(newPost);
  };

  const saveBlogPost = (post: BlogPost) => {
    setBlogPosts(blogPosts.map(p => p.id === post.id ? post : p));
    setEditingBlog(null);
  };

  const deleteBlogPost = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setBlogPosts(blogPosts.filter(p => p.id !== id));
    }
  };

  // Skill management functions
  const addSkill = () => {
    const newSkill: Skill = {
      name: 'New Skill',
      level: 50,
      category: 'Programming',
      color: '#3b82f6',
      icon: 'MdCode'
    };
    setSkills([...skills, newSkill]);
    setEditingSkill(newSkill);
  };

  const saveSkill = (skill: Skill) => {
    setSkills(skills.map(s => s.name === skill.name ? skill : s));
    setEditingSkill(null);
  };

  const deleteSkill = (name: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      setSkills(skills.filter(s => s.name !== name));
    }
  };

  // Skill category management
  const addSkillCategory = () => {
    const newCategory: SkillCategory = {
      id: Date.now().toString(),
      name: 'New Category',
      icon: 'MdCode',
      skills: []
    };
    setSkillCategories([...skillCategories, newCategory]);
    setEditingSkillCategory(newCategory);
  };

  const saveSkillCategory = (category: SkillCategory) => {
    setSkillCategories(skillCategories.map(c => c.id === category.id ? category : c));
    setEditingSkillCategory(null);
  };

  const deleteSkillCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this skill category?')) {
      setSkillCategories(skillCategories.filter(c => c.id !== id));
    }
  };

  // User management functions (Admin only)
  const addUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      username: 'newuser',
      password: 'password123',
      role: 'editor',
      createdAt: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    setUsers([...users, newUser]);
    setEditingUser(newUser);
  };

  const saveUser = (user: User) => {
    setUsers(users.map(u => u.id === user.id ? user : u));
    setEditingUser(null);
  };

  const deleteUser = (id: string) => {
    if (id === currentUser?.id) {
      alert('Cannot delete your own account');
      return;
    }
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // Content management functions
  const saveHomeContent = () => {
    setEditingHomeContent(false);
    // Home content is already managed through props
  };

  const saveAboutContent = () => {
    setEditingAboutContent(false);
    // About content is already managed through props
  };

  const saveContactInfo = () => {
    // Contact info is managed through state
    alert('Contact information saved successfully!');
  };

  // Form submission handlers
  const handleProjectForm = (e: React.FormEvent, project: Project) => {
    e.preventDefault();
    saveProject(project);
  };

  const handleBlogForm = (e: React.FormEvent, post: BlogPost) => {
    e.preventDefault();
    saveBlogPost(post);
  };

  const handleSkillForm = (e: React.FormEvent, skill: Skill) => {
    e.preventDefault();
    saveSkill(skill);
  };

  const handleUserForm = (e: React.FormEvent, user: User) => {
    e.preventDefault();
    saveUser(user);
  };

  const handleSkillCategoryForm = (e: React.FormEvent, category: SkillCategory) => {
    e.preventDefault();
    saveSkillCategory(category);
  };

  // Utility functions
  const cancelEdit = () => {
    setEditingProject(null);
    setEditingBlog(null);
    setEditingSkill(null);
    setEditingUser(null);
    setEditingSkillCategory(null);
    setEditingHomeContent(false);
    setEditingAboutContent(false);
  };

  const generateUniqueId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Maintenance mode functions
  const toggleMaintenanceMode = async () => {
    const newMode = { ...maintenanceMode, isActive: !maintenanceMode.isActive };
    if (newMode.isActive && !newMode.startDate) {
      newMode.startDate = new Date().toISOString().slice(0, 16);
    }
    
    try {
      // Update maintenance status on server
      const result = await maintenanceAPI.updateStatus({
        isGloballyActive: newMode.isActive,
        message: newMode.message,
        estimatedTime: newMode.estimatedDuration
      });
      
      if (result.success) {
        setMaintenanceMode(newMode);
        alert(`Maintenance mode ${newMode.isActive ? 'enabled' : 'disabled'} globally!`);
      } else {
        throw new Error('Failed to update maintenance status on server');
      }
    } catch (error) {
      console.error('Error updating maintenance mode:', error);
      // Fallback to local update
      setMaintenanceMode(newMode);
      alert(`Maintenance mode ${newMode.isActive ? 'enabled' : 'disabled'} locally (server update failed)`);
    }
  };

  const saveMaintenanceSettings = async () => {
    // Validate dates
    if (maintenanceMode.startDate && maintenanceMode.endDate) {
      if (new Date(maintenanceMode.startDate) >= new Date(maintenanceMode.endDate)) {
        alert('End date must be after start date');
        return;
      }
    }
    
    try {
      // Save maintenance settings to server
      const result = await maintenanceAPI.updateStatus({
        isGloballyActive: maintenanceMode.isActive,
        message: maintenanceMode.message,
        estimatedTime: maintenanceMode.estimatedDuration
      });
      
      if (result.success) {
        alert('Maintenance settings saved successfully and applied globally!');
      } else {
        throw new Error('Failed to save maintenance settings on server');
      }
    } catch (error) {
      console.error('Error saving maintenance settings:', error);
      alert('Maintenance settings saved locally (server update failed)');
    }
  };

  const scheduleMaintenance = (startDate: string, endDate: string) => {
    setMaintenanceMode({
      ...maintenanceMode,
      isActive: true,
      startDate,
      endDate
    });
  };

  const isMaintenanceActive = () => {
    if (!maintenanceMode.isActive) return false;
    
    const now = new Date();
    const start = maintenanceMode.startDate ? new Date(maintenanceMode.startDate) : null;
    const end = maintenanceMode.endDate ? new Date(maintenanceMode.endDate) : null;
    
    if (start && now < start) return false;
    if (end && now > end) return false;
    
    return true;
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-overlay">
        <div className="admin-login-modal">
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <MdLock size={32} style={{ color: 'white' }} />
            </div>
            <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.875rem', fontWeight: '700', textAlign: 'center' }}>
              Admin Access
            </h2>
            <p style={{ margin: '0.75rem 0 0 0', color: 'var(--text-secondary)', fontSize: '1rem', textAlign: 'center', lineHeight: '1.5' }}>
              Enter your credentials to access the admin panel
            </p>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.625rem', 
                color: 'var(--text-primary)', 
                fontSize: '0.875rem',
                fontWeight: '600',
                letterSpacing: '0.025em'
              }}>
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="admin-input"
                style={{
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: loading ? 0.6 : 1
                }}
                required
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.625rem', 
                color: 'var(--text-primary)', 
                fontSize: '0.875rem',
                fontWeight: '600',
                letterSpacing: '0.025em'
              }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="admin-input"
                style={{
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: loading ? 0.6 : 1
                }}
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading || !username || !password}
              className="admin-btn"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.875rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                marginTop: '0.5rem',
                opacity: loading || !username || !password ? 0.6 : 1,
                cursor: loading || !username || !password ? 'not-allowed' : 'pointer',
                position: 'relative'
              }}
            >
              {loading ? (
                <>
                  <div className="admin-loading-spinner" style={{ 
                    width: '20px', 
                    height: '20px', 
                    marginRight: '0.75rem',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid white'
                  }} />
                  Signing In...
                </>
              ) : (
                <>
                  <MdKey size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10000,
            display: window.innerWidth <= 768 ? 'block' : 'none'
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Header */}
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
          <p>Welcome, {currentUser?.username}</p>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: currentUser?.role === 'admin' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)',
            color: currentUser?.role === 'admin' ? 'var(--accent)' : '#8b5cf6',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600',
            border: `1px solid ${currentUser?.role === 'admin' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(139, 92, 246, 0.2)'}`
          }}>
            <MdSecurity size={12} />
            {currentUser?.role?.toUpperCase()}
          </div>
        </div>

        {/* Navigation */}
        <nav className="admin-nav">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: MdDashboard },
            { id: 'homepage', label: 'Home Page', icon: MdRocket },
            { id: 'about', label: 'About Section', icon: MdPsychology },
            { id: 'projects', label: 'Projects', icon: MdWork },
            { id: 'blog', label: 'Blog Posts', icon: MdArticle },
            { id: 'skills', label: 'Skills', icon: MdCode },
            { id: 'contact', label: 'Contact Info', icon: MdEmail },
            ...(currentUser?.role === 'admin' ? [
              { id: 'maintenance', label: 'Maintenance Mode', icon: MdBuild },
              { id: 'users', label: 'User Management', icon: MdPeople },
              { id: 'settings', label: 'Settings', icon: MdSettings }
            ] : [])
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="admin-nav-item">
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth <= 768) setSidebarOpen(false);
                  }}
                  className={`admin-nav-button ${activeTab === item.id ? 'active' : ''}`}
                >
                  <div className="admin-nav-icon">
                    <IconComponent size={18} />
                  </div>
                  {item.label}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button onClick={handleLogout} className="admin-logout">
          <MdLogout size={18} />
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {/* Mobile Header */}
        <div style={{ 
          display: window.innerWidth <= 768 ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MdMenu size={24} />
          </button>
          <h1 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'homepage', label: 'Home Page' },
              { id: 'about', label: 'About Section' },
              { id: 'projects', label: 'Projects' },
              { id: 'blog', label: 'Blog Posts' },
              { id: 'skills', label: 'Skills' },
              { id: 'contact', label: 'Contact Info' },
              { id: 'users', label: 'User Management' },
              { id: 'settings', label: 'Settings' }
            ].find(item => item.id === activeTab)?.label || 'Admin Panel'}
          </h1>
          <div style={{ width: '40px' }} /> {/* Spacer for centering */}
        </div>

        <div className="admin-content-inner">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="admin-header">
                <div className="admin-header-content">
                  <h1>Dashboard</h1>
                  <p>Overview of your portfolio management system</p>
                </div>
              </div>

              {/* Enhanced Stats Cards */}
              <div className="admin-stats">
                <div className="admin-stat-card">
                  <div className="stat-icon">
                    <MdWork size={24} />
                  </div>
                  <h3>{projects.length}</h3>
                  <p>Total Projects</p>
                </div>
                <div className="admin-stat-card">
                  <div className="stat-icon">
                    <MdArticle size={24} />
                  </div>
                  <h3>{blogPosts.length}</h3>
                  <p>Blog Posts</p>
                </div>
                <div className="admin-stat-card">
                  <div className="stat-icon">
                    <MdCode size={24} />
                  </div>
                  <h3>{skills.length}</h3>
                  <p>Skills</p>
                </div>
                <div className="admin-stat-card">
                  <div className="stat-icon">
                    <MdTrendingUp size={24} />
                  </div>
                  <h3>{skillCategories.length}</h3>
                  <p>Skill Categories</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="admin-card">
                <h4>Quick Actions</h4>
                <p>Frequently used actions for content management</p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => setActiveTab('projects')} 
                    className="admin-btn admin-btn-secondary admin-btn-small"
                  >
                    <MdAdd size={16} />
                    Add Project
                  </button>
                  <button 
                    onClick={() => setActiveTab('blog')} 
                    className="admin-btn admin-btn-secondary admin-btn-small"
                  >
                    <MdAdd size={16} />
                    Write Post
                  </button>
                  <button 
                    onClick={() => setActiveTab('skills')} 
                    className="admin-btn admin-btn-secondary admin-btn-small"
                  >
                    <MdAdd size={16} />
                    Add Skill
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="admin-card">
                <h4>Recent Activity</h4>
                <p>Latest updates and changes to your portfolio</p>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <p>• Last login: {currentUser?.lastLogin ? new Date(currentUser.lastLogin).toLocaleString() : 'Never'}</p>
                  <p>• Content updated: Recently</p>
                  <p>• System status: All systems operational</p>
                </div>
              </div>
            </div>
          )}

          {/* Home Page Content */}
          {activeTab === 'homepage' && (
            <div>
              <div className="admin-header">
                <div className="admin-header-content">
                  <h1>Home Page Content</h1>
                  <p>Manage your homepage hero section and introduction</p>
                </div>
                <div className="admin-header-actions">
                  {!editingHomeContent && (
                    <button onClick={() => setEditingHomeContent(true)} className="admin-btn">
                      <MdEdit size={18} />
                      Edit Content
                    </button>
                  )}
                </div>
              </div>

              {editingHomeContent ? (
                <div className="admin-form">
                  <div className="admin-form-grid">
                    <div className="admin-form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={homePageContent.name}
                        onChange={(e) => setHomePageContent({...homePageContent, name: e.target.value})}
                        className="admin-input"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Professional Title</label>
                      <input
                        type="text"
                        value={homePageContent.title}
                        onChange={(e) => setHomePageContent({...homePageContent, title: e.target.value})}
                        className="admin-input"
                        placeholder="e.g. Network Engineer"
                      />
                    </div>
                  </div>
                  
                  <div className="admin-form-group">
                    <label>Subtitle</label>
                    <input
                      type="text"
                      value={homePageContent.subtitle}
                      onChange={(e) => setHomePageContent({...homePageContent, subtitle: e.target.value})}
                      className="admin-input"
                      placeholder="Brief professional tagline"
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label>Description</label>
                    <textarea
                      value={homePageContent.description}
                      onChange={(e) => setHomePageContent({...homePageContent, description: e.target.value})}
                      className="admin-textarea"
                      placeholder="Detailed description of your expertise and experience"
                    />
                  </div>
                  
                  <div className="admin-form-grid">
                    <div className="admin-form-group">
                      <label>Primary Button Text</label>
                      <input
                        type="text"
                        value={homePageContent.primaryButtonText}
                        onChange={(e) => setHomePageContent({...homePageContent, primaryButtonText: e.target.value})}
                        className="admin-input"
                        placeholder="e.g. View My Work"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Secondary Button Text</label>
                      <input
                        type="text"
                        value={homePageContent.secondaryButtonText}
                        onChange={(e) => setHomePageContent({...homePageContent, secondaryButtonText: e.target.value})}
                        className="admin-input"
                        placeholder="e.g. Download CV"
                      />
                    </div>
                  </div>
                  
                  <div className="admin-form-group">
                    <label>CV File Name</label>
                    <input
                      type="text"
                      value={homePageContent.cvFileName}
                      onChange={(e) => setHomePageContent({...homePageContent, cvFileName: e.target.value})}
                      className="admin-input"
                      placeholder="resume.pdf"
                    />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                    <button
                      onClick={() => setEditingHomeContent(false)}
                      className="admin-btn admin-btn-secondary"
                    >
                      <MdCancel size={18} />
                      Cancel
                    </button>
                    <button
                      onClick={() => setEditingHomeContent(false)}
                      className="admin-btn"
                    >
                      <MdSave size={18} />
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="admin-card">
                  <h4>Current Home Page Content</h4>
                  <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                    <div><strong>Name:</strong> {homePageContent.name}</div>
                    <div><strong>Title:</strong> {homePageContent.title}</div>
                    <div><strong>Subtitle:</strong> {homePageContent.subtitle}</div>
                    <div><strong>Description:</strong> {homePageContent.description}</div>
                    <div><strong>Primary Button:</strong> {homePageContent.primaryButtonText}</div>
                    <div><strong>Secondary Button:</strong> {homePageContent.secondaryButtonText}</div>
                    <div><strong>CV File:</strong> {homePageContent.cvFileName}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* About Section Tab */}
          {activeTab === 'about' && (
            <div className="admin-card admin-fade-in">
              <div className="admin-card-header">
                <h2>About Section Content</h2>
                <p>Manage your about section content and statistics</p>
              </div>
              
              <form className="admin-form" onSubmit={(e) => e.preventDefault()}>
                <div className="admin-form-section">
                  <h3 className="admin-form-section-title">
                    <MdPsychology />
                    About Content
                  </h3>
                  
                  <div className="admin-form-group">
                    <label>Section Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={aboutContent.title}
                      onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
                      placeholder="About Me"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>First Paragraph</label>
                    <textarea
                      className="admin-textarea"
                      rows={4}
                      value={aboutContent.paragraph1}
                      onChange={(e) => setAboutContent({...aboutContent, paragraph1: e.target.value})}
                      placeholder="Introduce yourself..."
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Second Paragraph</label>
                    <textarea
                      className="admin-textarea"
                      rows={4}
                      value={aboutContent.paragraph2}
                      onChange={(e) => setAboutContent({...aboutContent, paragraph2: e.target.value})}
                      placeholder="More details about your background..."
                    />
                  </div>
                </div>

                <div className="admin-form-section">
                  <h3 className="admin-form-section-title">
                    <MdTrendingUp />
                    Statistics
                  </h3>
                  
                  <div className="admin-form-grid">
                    <div className="admin-form-group">
                      <label>Experience Value</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={aboutContent.stats.experience.value}
                        onChange={(e) => setAboutContent({
                          ...aboutContent,
                          stats: {
                            ...aboutContent.stats,
                            experience: { ...aboutContent.stats.experience, value: e.target.value }
                          }
                        })}
                        placeholder="3+"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Experience Label</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={aboutContent.stats.experience.label}
                        onChange={(e) => setAboutContent({
                          ...aboutContent,
                          stats: {
                            ...aboutContent.stats,
                            experience: { ...aboutContent.stats.experience, label: e.target.value }
                          }
                        })}
                        placeholder="Years Experience"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Projects Value</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={aboutContent.stats.projects.value}
                        onChange={(e) => setAboutContent({
                          ...aboutContent,
                          stats: {
                            ...aboutContent.stats,
                            projects: { ...aboutContent.stats.projects, value: e.target.value }
                          }
                        })}
                        placeholder="50+"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Projects Label</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={aboutContent.stats.projects.label}
                        onChange={(e) => setAboutContent({
                          ...aboutContent,
                          stats: {
                            ...aboutContent.stats,
                            projects: { ...aboutContent.stats.projects, label: e.target.value }
                          }
                        })}
                        placeholder="Projects Completed"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Technologies Value</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={aboutContent.stats.technologies.value}
                        onChange={(e) => setAboutContent({
                          ...aboutContent,
                          stats: {
                            ...aboutContent.stats,
                            technologies: { ...aboutContent.stats.technologies, value: e.target.value }
                          }
                        })}
                        placeholder="20+"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Technologies Label</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={aboutContent.stats.technologies.label}
                        onChange={(e) => setAboutContent({
                          ...aboutContent,
                          stats: {
                            ...aboutContent.stats,
                            technologies: { ...aboutContent.stats.technologies, label: e.target.value }
                          }
                        })}
                        placeholder="Technologies Mastered"
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-card-actions">
                  <button 
                    type="submit" 
                    className="admin-btn admin-btn-primary"
                    onClick={(e) => { e.preventDefault(); saveAboutContent(); }}
                  >
                    <MdSave />
                    Save About Content
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="admin-card admin-fade-in">
              <div className="admin-card-header">
                <h2>Projects Management</h2>
                <p>Add, edit, and manage your portfolio projects</p>
                <button className="admin-btn admin-btn-primary" onClick={addProject}>
                  <MdAdd />
                  Add New Project
                </button>
              </div>
              
              <div className="admin-projects-grid">
                {projects.map(project => (
                  <div key={project.id} className="admin-project-card">
                    {editingProject?.id === project.id ? (
                      <form onSubmit={(e) => handleProjectForm(e, editingProject)} className="admin-edit-form">
                        <div className="admin-form-group">
                          <label>Project Title</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div className="admin-form-group">
                          <label>Description</label>
                          <textarea
                            className="admin-textarea"
                            rows={3}
                            value={editingProject.description}
                            onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div className="admin-form-group">
                          <label>Technologies (comma-separated)</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingProject.tech.join(', ')}
                            onChange={(e) => setEditingProject({...editingProject, tech: e.target.value.split(', ').map(t => t.trim())})}
                          />
                        </div>
                        
                        <div className="admin-form-group">
                          <label>Project Link</label>
                          <input
                            type="url"
                            className="admin-input"
                            value={editingProject.link}
                            onChange={(e) => setEditingProject({...editingProject, link: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div className="admin-card-actions">
                          <button type="submit" className="admin-btn admin-btn-primary">
                            <MdSave />
                            Save
                          </button>
                          <button type="button" className="admin-btn admin-btn-secondary" onClick={cancelEdit}>
                            <MdCancel />
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="admin-project-header">
                          <h3>{project.title}</h3>
                          <div className="admin-card-actions">
                            <button 
                              className="admin-btn admin-btn-secondary"
                              onClick={() => setEditingProject(project)}
                            >
                              <MdEdit />
                            </button>
                            <button 
                              className="admin-btn admin-btn-danger"
                              onClick={() => deleteProject(project.id)}
                            >
                              <MdDelete />
                            </button>
                          </div>
                        </div>
                        <p>{project.description}</p>
                        <div className="admin-tech-tags">
                          {project.tech.map(tech => (
                            <span key={tech} className="admin-tag">{tech}</span>
                          ))}
                        </div>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="admin-project-link">
                          View Project
                        </a>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Tab */}
          {activeTab === 'blog' && (
            <div className="admin-card admin-fade-in">
              <div className="admin-card-header">
                <h2>Blog Posts Management</h2>
                <p>Create and manage your blog content</p>
                <button className="admin-btn admin-btn-primary" onClick={addBlogPost}>
                  <MdAdd />
                  New Blog Post
                </button>
              </div>
              
              <div className="admin-blog-list">
                {blogPosts.map(post => (
                  <div key={post.id} className="admin-blog-item">
                    {editingBlog?.id === post.id ? (
                      <form onSubmit={(e) => handleBlogForm(e, editingBlog)} className="admin-edit-form" style={{width: '100%'}}>
                        <div className="admin-form-group">
                          <label>Post Title</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingBlog.title}
                            onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div className="admin-form-group">
                          <label>Excerpt</label>
                          <textarea
                            className="admin-textarea"
                            rows={3}
                            value={editingBlog.excerpt}
                            onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div className="admin-form-grid">
                          <div className="admin-form-group">
                            <label>Category</label>
                            <input
                              type="text"
                              className="admin-input"
                              value={editingBlog.category}
                              onChange={(e) => setEditingBlog({...editingBlog, category: e.target.value})}
                              required
                            />
                          </div>
                          
                          <div className="admin-form-group">
                            <label>Read Time</label>
                            <input
                              type="text"
                              className="admin-input"
                              value={editingBlog.readTime}
                              onChange={(e) => setEditingBlog({...editingBlog, readTime: e.target.value})}
                              placeholder="5 min read"
                            />
                          </div>
                        </div>
                        
                        <div className="admin-form-group">
                          <label>Tags (comma-separated)</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingBlog.tags.join(', ')}
                            onChange={(e) => setEditingBlog({...editingBlog, tags: e.target.value.split(', ').map(t => t.trim())})}
                          />
                        </div>
                        
                        <div className="admin-card-actions">
                          <button type="submit" className="admin-btn admin-btn-primary">
                            <MdSave />
                            Save
                          </button>
                          <button type="button" className="admin-btn admin-btn-secondary" onClick={cancelEdit}>
                            <MdCancel />
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="admin-blog-content">
                          <h3>{post.title}</h3>
                          <p>{post.excerpt}</p>
                          <div className="admin-blog-meta">
                            <span className="admin-tag">{post.category}</span>
                            <span>📅 {post.date}</span>
                            <span>⏱️ {post.readTime}</span>
                          </div>
                          <div className="admin-blog-tags">
                            {post.tags.map(tag => (
                              <span key={tag} className="admin-tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="admin-card-actions">
                          <button 
                            className="admin-btn admin-btn-secondary"
                            onClick={() => setEditingBlog(post)}
                          >
                            <MdEdit />
                            Edit
                          </button>
                          <button 
                            className="admin-btn admin-btn-danger"
                            onClick={() => deleteBlogPost(post.id)}
                          >
                            <MdDelete />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="admin-card admin-fade-in">
              <div className="admin-card-header">
                <h2>Skills Management</h2>
                <p>Manage your technical skills and proficiency levels</p>
                <div className="admin-card-actions">
                  <button className="admin-btn admin-btn-primary" onClick={addSkill}>
                    <MdAdd />
                    Add New Skill
                  </button>
                  <button className="admin-btn admin-btn-secondary" onClick={addSkillCategory}>
                    <MdAdd />
                    Add Category
                  </button>
                </div>
              </div>
              
              <div className="admin-skills-categories">
                {skillCategories.map(category => (
                  <div key={category.id} className="admin-skill-category">
                    {editingSkillCategory?.id === category.id ? (
                      <form onSubmit={(e) => handleSkillCategoryForm(e, editingSkillCategory)} className="admin-edit-form">
                        <div className="admin-form-group">
                          <label>Category Name</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingSkillCategory.name}
                            onChange={(e) => setEditingSkillCategory({...editingSkillCategory, name: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div className="admin-form-group">
                          <label>Icon (React Icon name)</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingSkillCategory.icon}
                            onChange={(e) => setEditingSkillCategory({...editingSkillCategory, icon: e.target.value})}
                            placeholder="MdCode"
                          />
                        </div>
                        
                        <div className="admin-card-actions">
                          <button type="submit" className="admin-btn admin-btn-primary">
                            <MdSave />
                            Save
                          </button>
                          <button type="button" className="admin-btn admin-btn-secondary" onClick={cancelEdit}>
                            <MdCancel />
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                          <h3 className="admin-category-title">
                            <span className="admin-category-icon">{category.icon}</span>
                            {category.name}
                          </h3>
                          <div className="admin-card-actions">
                            <button 
                              className="admin-btn admin-btn-secondary"
                              onClick={() => setEditingSkillCategory(category)}
                            >
                              <MdEdit />
                            </button>
                            <button 
                              className="admin-btn admin-btn-danger"
                              onClick={() => deleteSkillCategory(category.id)}
                            >
                              <MdDelete />
                            </button>
                          </div>
                        </div>
                        
                        <div className="admin-skills-grid">
                          {category.skills.map(skillName => {
                            const skill = skills.find(s => s.name === skillName);
                            return skill ? (
                              <div key={skill.name} className="admin-skill-item">
                                {editingSkill?.name === skill.name ? (
                                  <form onSubmit={(e) => handleSkillForm(e, editingSkill)} className="admin-edit-form">
                                    <div className="admin-form-group">
                                      <label>Skill Name</label>
                                      <input
                                        type="text"
                                        className="admin-input"
                                        value={editingSkill.name}
                                        onChange={(e) => setEditingSkill({...editingSkill, name: e.target.value})}
                                        required
                                      />
                                    </div>
                                    
                                    <div className="admin-form-group">
                                      <label>Proficiency Level (%)</label>
                                      <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        className="admin-input"
                                        value={editingSkill.level}
                                        onChange={(e) => setEditingSkill({...editingSkill, level: parseInt(e.target.value)})}
                                        required
                                      />
                                    </div>
                                    
                                    <div className="admin-form-group">
                                      <label>Color</label>
                                      <input
                                        type="color"
                                        className="admin-input"
                                        value={editingSkill.color}
                                        onChange={(e) => setEditingSkill({...editingSkill, color: e.target.value})}
                                      />
                                    </div>
                                    
                                    <div className="admin-card-actions">
                                      <button type="submit" className="admin-btn admin-btn-primary">
                                        <MdSave />
                                      </button>
                                      <button type="button" className="admin-btn admin-btn-secondary" onClick={cancelEdit}>
                                        <MdCancel />
                                      </button>
                                    </div>
                                  </form>
                                ) : (
                                  <>
                                    <div className="admin-skill-header">
                                      <span className="admin-skill-name">{skill.name}</span>
                                      <span className="admin-skill-level">{skill.level}%</span>
                                    </div>
                                    <div className="admin-progress">
                                      <div 
                                        className="admin-progress-bar" 
                                        style={{ width: `${skill.level}%`, background: skill.color }}
                                      />
                                    </div>
                                    <div className="admin-skill-actions">
                                      <button 
                                        className="admin-btn admin-btn-secondary"
                                        onClick={() => setEditingSkill(skill)}
                                      >
                                        <MdEdit />
                                      </button>
                                      <button 
                                        className="admin-btn admin-btn-danger"
                                        onClick={() => deleteSkill(skill.name)}
                                      >
                                        <MdDelete />
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            ) : null;
                          })}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="admin-card admin-fade-in">
              <div className="admin-card-header">
                <h2>Contact Information</h2>
                <p>Update your contact details and social links</p>
              </div>
              
              <form className="admin-form" onSubmit={(e) => { e.preventDefault(); saveContactInfo(); }}>
                <div className="admin-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="admin-input"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Website URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={contactInfo.website}
                    onChange={(e) => setContactInfo({...contactInfo, website: e.target.value})}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div className="admin-form-group">
                  <label>LinkedIn Profile</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={contactInfo.linkedin}
                    onChange={(e) => setContactInfo({...contactInfo, linkedin: e.target.value})}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="admin-form-group">
                  <label>GitHub Profile</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={contactInfo.github}
                    onChange={(e) => setContactInfo({...contactInfo, github: e.target.value})}
                    placeholder="https://github.com/yourusername"
                  />
                </div>

                <div className="admin-card-actions">
                  <button type="submit" className="admin-btn admin-btn-primary">
                    <MdSave />
                    Save Contact Information
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Maintenance Mode Tab (Admin Only) */}
          {activeTab === 'maintenance' && currentUser?.role === 'admin' && (
            <div className="admin-card admin-fade-in">
              <div className="admin-card-header">
                <h2>Maintenance Mode</h2>
                <p>Control website maintenance mode and schedule downtime</p>
                <div className="admin-maintenance-status">
                  <span className={`admin-status-indicator ${maintenanceMode.isActive ? 'active' : 'inactive'}`}>
                    {maintenanceMode.isActive ? '🔧 MAINTENANCE ACTIVE' : '✅ SITE ONLINE'}
                  </span>
                </div>
              </div>
              
              <div className="admin-maintenance-controls">
                <div className="admin-form-section">
                  <h3 className="admin-form-section-title">
                    <MdBuild />
                    Quick Controls
                  </h3>
                  
                  <div className="admin-maintenance-quick-actions">
                    <button 
                      className={`admin-btn ${maintenanceMode.isActive ? 'admin-btn-danger' : 'admin-btn-primary'}`}
                      onClick={toggleMaintenanceMode}
                    >
                      {maintenanceMode.isActive ? (
                        <>
                          <MdClose />
                          Disable Maintenance Mode
                        </>
                      ) : (
                        <>
                          <MdBuild />
                          Enable Maintenance Mode
                        </>
                      )}
                    </button>
                    
                    <div className="admin-quick-schedule">
                      <button 
                        className="admin-btn admin-btn-secondary"
                        onClick={() => scheduleMaintenance(
                          new Date(Date.now() + 5 * 60 * 1000).toISOString().slice(0, 16),
                          new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16)
                        )}
                      >
                        <MdUpdate />
                        Quick: 1 Hour Maintenance
                      </button>
                    </div>
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); saveMaintenanceSettings(); }} className="admin-form">
                  <div className="admin-form-section">
                    <h3 className="admin-form-section-title">
                      <MdSettings />
                      Maintenance Settings
                    </h3>
                    
                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Start Date & Time</label>
                        <input
                          type="datetime-local"
                          className="admin-input"
                          value={maintenanceMode.startDate}
                          onChange={(e) => setMaintenanceMode({...maintenanceMode, startDate: e.target.value})}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>End Date & Time</label>
                        <input
                          type="datetime-local"
                          className="admin-input"
                          value={maintenanceMode.endDate}
                          onChange={(e) => setMaintenanceMode({...maintenanceMode, endDate: e.target.value})}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Estimated Duration</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={maintenanceMode.estimatedDuration}
                          onChange={(e) => setMaintenanceMode({...maintenanceMode, estimatedDuration: e.target.value})}
                          placeholder="2 hours"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Contact Email</label>
                        <input
                          type="email"
                          className="admin-input"
                          value={maintenanceMode.contactEmail}
                          onChange={(e) => setMaintenanceMode({...maintenanceMode, contactEmail: e.target.value})}
                          placeholder="support@example.com"
                        />
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label>Maintenance Message</label>
                      <textarea
                        className="admin-textarea"
                        rows={4}
                        value={maintenanceMode.message}
                        onChange={(e) => setMaintenanceMode({...maintenanceMode, message: e.target.value})}
                        placeholder="We're currently performing scheduled maintenance to improve our services. We'll be back shortly!"
                      />
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label className="admin-checkbox-label">
                          <input
                            type="checkbox"
                            checked={maintenanceMode.showCountdown}
                            onChange={(e) => setMaintenanceMode({...maintenanceMode, showCountdown: e.target.checked})}
                            className="admin-checkbox"
                          />
                          Show countdown timer
                        </label>
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-checkbox-label">
                          <input
                            type="checkbox"
                            checked={maintenanceMode.allowAdminAccess}
                            onChange={(e) => setMaintenanceMode({...maintenanceMode, allowAdminAccess: e.target.checked})}
                            className="admin-checkbox"
                          />
                          Allow admin access during maintenance
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="admin-card-actions">
                    <button type="submit" className="admin-btn admin-btn-primary">
                      <MdSave />
                      Save Maintenance Settings
                    </button>
                  </div>
                </form>

                {/* Maintenance Preview */}
                <div className="admin-form-section">
                  <h3 className="admin-form-section-title">
                    <MdVisibility />
                    Maintenance Page Preview
                  </h3>
                  
                  <div className="admin-maintenance-preview">
                    <div className="maintenance-preview-container">
                      <div className="maintenance-icon">🔧</div>
                      <h2>Site Under Maintenance</h2>
                      <p>{maintenanceMode.message || "We're currently performing scheduled maintenance to improve our services."}</p>
                      
                      {maintenanceMode.estimatedDuration && (
                        <div className="maintenance-duration">
                          <strong>Estimated Duration:</strong> {maintenanceMode.estimatedDuration}
                        </div>
                      )}
                      
                      {maintenanceMode.showCountdown && maintenanceMode.endDate && (
                        <div className="maintenance-countdown">
                          <div className="countdown-timer">
                            <span>Back online in: <strong>2h 30m</strong></span>
                          </div>
                        </div>
                      )}
                      
                      {maintenanceMode.contactEmail && (
                        <div className="maintenance-contact">
                          <p>Need immediate assistance? Contact us at:</p>
                          <a href={`mailto:${maintenanceMode.contactEmail}`}>{maintenanceMode.contactEmail}</a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab (Admin Only) */}
          {activeTab === 'users' && currentUser?.role === 'admin' && (
            <div className="admin-card admin-fade-in">
              <div className="admin-card-header">
                <h2>User Management</h2>
                <p>Manage admin panel users and permissions</p>
                <button className="admin-btn admin-btn-primary" onClick={addUser}>
                  <MdAdd />
                  Add New User
                </button>
              </div>
              
              {editingUser && (
                <div className="admin-form-section" style={{marginBottom: '2rem'}}>
                  <h3 className="admin-form-section-title">
                    <MdEdit />
                    {editingUser.id === 'new' ? 'Add New User' : 'Edit User'}
                  </h3>
                  
                  <form onSubmit={(e) => handleUserForm(e, editingUser)} className="admin-form">
                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Username</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingUser.username}
                          onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="admin-form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="admin-input"
                          value={editingUser.password}
                          onChange={(e) => setEditingUser({...editingUser, password: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="admin-form-group">
                        <label>Role</label>
                        <select
                          className="admin-select"
                          value={editingUser.role}
                          onChange={(e) => setEditingUser({...editingUser, role: e.target.value as 'admin' | 'editor'})}
                          required
                        >
                          <option value="editor">Editor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="admin-card-actions">
                      <button type="submit" className="admin-btn admin-btn-primary">
                        <MdSave />
                        Save User
                      </button>
                      <button type="button" className="admin-btn admin-btn-secondary" onClick={cancelEdit}>
                        <MdCancel />
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              <div className="admin-table">
                <table>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Role</th>
                      <th>Created</th>
                      <th>Last Login</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>
                          <span className={`admin-tag ${user.role === 'admin' ? 'admin-tag-primary' : 'admin-tag-secondary'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{user.createdAt}</td>
                        <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</td>
                        <td>
                          <div className="admin-card-actions">
                            <button 
                              className="admin-btn admin-btn-secondary"
                              onClick={() => setEditingUser(user)}
                              disabled={user.id === currentUser?.id}
                            >
                              <MdEdit />
                            </button>
                            <button 
                              className="admin-btn admin-btn-danger"
                              onClick={() => deleteUser(user.id)}
                              disabled={user.id === currentUser?.id}
                            >
                              <MdDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="admin-card admin-fade-in">
              <div className="admin-card-header">
                <h2>System Settings</h2>
                <p>Configure your portfolio and admin panel settings</p>
              </div>
              
              <div className="admin-settings-sections">
                <div className="admin-form-section">
                  <h3 className="admin-form-section-title">
                    <MdSettings />
                    General Settings
                  </h3>
                  
                  <div className="admin-form-group">
                    <label>Site Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Your Portfolio Title"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Site Description</label>
                    <textarea
                      className="admin-textarea"
                      rows={3}
                      placeholder="Brief description of your portfolio"
                    />
                  </div>
                </div>

                <div className="admin-form-section">
                  <h3 className="admin-form-section-title">
                    <MdSecurity />
                    Security Settings
                  </h3>
                  
                  <div className="admin-form-group">
                    <label>Change Password</label>
                    <input
                      type="password"
                      className="admin-input"
                      placeholder="New password"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className="admin-input"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="admin-card-actions">
                  <button className="admin-btn admin-btn-primary">
                    <MdSave />
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add a simple loading state for other tabs */}
          {!['dashboard', 'homepage', 'about', 'projects', 'blog', 'skills', 'contact', 'maintenance', 'users', 'settings'].includes(activeTab) && (
            <div className="admin-loading">
              <div className="admin-loading-spinner" />
              Content for {activeTab} tab is being prepared...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
