import { useState, useEffect } from 'react';
import { 
  MdAdd, MdEdit, MdDelete, MdSave, MdCancel, MdDashboard, 
  MdWork, MdArticle, MdCode, MdEmail, MdSettings, MdPeople,
  MdLock, MdDelete as MdTrash, MdCheck, MdClose, MdKey,
  MdRocket, MdPsychology, MdCloud, MdSecurity, MdDevices,
  MdComputer, MdTerminal, MdBuild, MdMenu, MdLogout, MdVisibility,
  MdTrendingUp, MdSpeed, MdUpdate
} from 'react-icons/md';
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
}

const AdminPanel = ({ aboutContent, setAboutContent, homePageContent, setHomePageContent }: AdminPanelProps) => {
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

  // User management functions
  const addUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      username: 'newuser',
      password: 'password123',
      role: 'editor',
      createdAt: new Date().toISOString()
    };
    setUsers([...users, newUser]);
    setEditingUser(newUser);
  };

  const saveUser = (user: User) => {
    setUsers(users.map(u => u.id === user.id ? user : u));
    setEditingUser(null);
  };

  const deleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
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
          
          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.8rem', textAlign: 'center' }}>
              <strong>Demo Credentials:</strong><br />
              Username: admin | Password: admin123<br />
              Username: editor | Password: editor123
            </p>
          </div>
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

          {/* Add a simple loading state for other tabs */}
          {!['dashboard', 'homepage'].includes(activeTab) && (
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
