import { useState, useEffect } from 'react';
import { 
  MdAdd, MdEdit, MdDelete, MdSave, MdCancel, MdDashboard, 
  MdWork, MdArticle, MdCode, MdEmail, MdSettings, MdPeople,
  MdLock, MdDelete as MdTrash, MdCheck, MdClose, MdKey,
  MdRocket, MdPsychology, MdCloud, MdSecurity, MdDevices,
  MdComputer, MdTerminal, MdBuild, MdMenu
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
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
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
  
  // Settings states
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  // Mobile responsiveness states
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load initial data (in a real app, this would come from an API)
  useEffect(() => {
    // Load users (in production, this would be from a secure backend)
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

  const handleLogin = () => {
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
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsOpen(false);
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
      category: 'General',
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

  // Home page content management
  const saveHomeContent = (content: HomePageContent) => {
    setHomePageContent(content);
    setEditingHomeContent(false);
  };

  // About content management
  const saveAboutContent = (content: AboutContent) => {
    setAboutContent(content);
    setEditingAboutContent(false);
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
    if (currentUser?.id === id) {
      alert('You cannot delete your own account!');
      return;
    }
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // Password change functionality
  const handlePasswordChange = () => {
    if (!currentUser) return;
    
    if (currentUser.password !== currentPassword) {
      alert('Current password is incorrect');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    // Update current user's password
    const updatedUser = { ...currentUser, password: newPassword };
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
    
    // Clear form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordChange(false);
    
    alert('Password changed successfully!');
  };

  if (!isAuthenticated) {
    return (
      <>
        <button 
          onClick={() => setIsOpen(true)}
          className="admin-trigger"
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
          }}
        >
          <MdSettings size={20} />
        </button>

        {isOpen && (
          <div className="admin-login-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
          }}>
            <div className="admin-login-modal" style={{
              background: 'var(--bg-primary)',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border)',
              minWidth: '300px'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Admin Login</h3>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem'
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem'
                }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={handleLogin} style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  cursor: 'pointer'
                }}>
                  Login
                </button>
                <button onClick={() => setIsOpen(false)} style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="admin-panel" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-primary)',
      zIndex: 10000,
      display: 'flex',
      overflow: 'hidden',
      flexDirection: isMobile ? 'column' : 'row'
    }}>
      {/* Mobile Header */}
      {isMobile && (
        <div style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <h2 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.2rem' }}>
            Admin Panel
          </h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'var(--accent)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MdMenu size={20} />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div className="admin-sidebar" style={{
        width: isMobile ? '100%' : '250px',
        height: isMobile ? (sidebarOpen ? 'auto' : '0') : 'auto',
        maxHeight: isMobile ? (sidebarOpen ? '300px' : '0') : 'none',
        overflow: isMobile ? 'hidden' : 'visible',
        background: 'var(--bg-secondary)',
        borderRight: isMobile ? 'none' : '1px solid var(--border)',
        borderBottom: isMobile ? '1px solid var(--border)' : 'none',
        padding: isMobile ? (sidebarOpen ? '1rem 0' : '0') : '2rem 0',
        display: 'flex',
        flexDirection: 'column',
        transition: isMobile ? 'all 0.3s ease' : 'none',
        position: isMobile ? 'relative' : 'static',
        zIndex: isMobile ? 9 : 'auto'
      }}>
        {!isMobile && (
          <div style={{ padding: '0 2rem', marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Admin Panel</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>
              Welcome, {currentUser?.username} ({currentUser?.role})
            </p>
          </div>
        )}

        <nav style={{ 
          flex: 1,
          display: isMobile ? (sidebarOpen ? 'block' : 'none') : 'block',
          maxHeight: isMobile ? '250px' : 'none',
          overflowY: isMobile ? 'auto' : 'visible'
        }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <MdDashboard size={18} /> },
            { id: 'homepage', label: 'Home Page', icon: <MdRocket size={18} /> },
            { id: 'about', label: 'About Section', icon: <MdPsychology size={18} /> },
            { id: 'projects', label: 'Projects', icon: <MdWork size={18} /> },
            { id: 'blog', label: 'Blog Posts', icon: <MdArticle size={18} /> },
            { id: 'skills', label: 'Skills', icon: <MdCode size={18} /> },
            { id: 'contact', label: 'Contact Info', icon: <MdEmail size={18} /> },
            ...(currentUser?.role === 'admin' ? [
              { id: 'users', label: 'User Management', icon: <MdPeople size={18} /> },
              { id: 'settings', label: 'Settings', icon: <MdSettings size={18} /> }
            ] : [])
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (isMobile) {
                  setSidebarOpen(false);
                }
              }}
              style={{
                width: '100%',
                padding: isMobile ? '0.75rem 1rem' : '1rem 2rem',
                border: 'none',
                background: activeTab === tab.id ? 'var(--accent)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--text-primary)',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: isMobile ? '0.9rem' : '1rem',
                borderRadius: isMobile ? '8px' : '0',
                margin: isMobile ? '0.25rem 0.5rem' : '0',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '0 2rem' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              background: 'transparent',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content" style={{
        flex: 1,
        padding: isMobile ? '1rem' : '2rem',
        overflow: 'auto',
        height: isMobile ? 'calc(100vh - 60px)' : 'auto'
      }}>
        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 8
            }}
          />
        )}
        
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem', fontSize: isMobile ? '1.3rem' : '1.5rem' }}>Dashboard</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: isMobile ? '0.75rem' : '1rem' 
            }}>
              <div className="stat-card" style={{
                background: 'var(--bg-secondary)',
                padding: isMobile ? '1rem' : '1.5rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border)',
                textAlign: 'center'
              }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: isMobile ? '1.5rem' : '2rem', margin: '0 0 0.5rem 0' }}>{projects.length}</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: isMobile ? '0.85rem' : '1rem' }}>Total Projects</p>
              </div>
              <div className="stat-card" style={{
                background: 'var(--bg-secondary)',
                padding: isMobile ? '1rem' : '1.5rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border)',
                textAlign: 'center'
              }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: isMobile ? '1.5rem' : '2rem', margin: '0 0 0.5rem 0' }}>{blogPosts.length}</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: isMobile ? '0.85rem' : '1rem' }}>Blog Posts</p>
              </div>
              <div className="stat-card" style={{
                background: 'var(--bg-secondary)',
                padding: isMobile ? '1rem' : '1.5rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border)',
                textAlign: 'center'
              }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: isMobile ? '1.5rem' : '2rem', margin: '0 0 0.5rem 0' }}>{skills.length}</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: isMobile ? '0.85rem' : '1rem' }}>Skills</p>
              </div>
            </div>
          </div>
        )}

        {/* Home Page Content Management */}
        {activeTab === 'homepage' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Home Page Content</h2>
              {!editingHomeContent && (
                <button onClick={() => setEditingHomeContent(true)} className="admin-btn admin-btn-primary">
                  <MdEdit size={16} />
                  Edit Content
                </button>
              )}
            </div>

            {editingHomeContent ? (
              <div className="admin-form" style={{
                background: 'var(--bg-secondary)',
                padding: '2rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border)'
              }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Name</label>
                    <input
                      type="text"
                      value={homePageContent.name}
                      onChange={(e) => setHomePageContent({...homePageContent, name: e.target.value})}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Title</label>
                    <input
                      type="text"
                      value={homePageContent.title}
                      onChange={(e) => setHomePageContent({...homePageContent, title: e.target.value})}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Subtitle</label>
                    <input
                      type="text"
                      value={homePageContent.subtitle}
                      onChange={(e) => setHomePageContent({...homePageContent, subtitle: e.target.value})}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Description</label>
                    <textarea
                      value={homePageContent.description}
                      onChange={(e) => setHomePageContent({...homePageContent, description: e.target.value})}
                      className="admin-input"
                      rows={4}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Primary Button Text</label>
                      <input
                        type="text"
                        value={homePageContent.primaryButtonText}
                        onChange={(e) => setHomePageContent({...homePageContent, primaryButtonText: e.target.value})}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Secondary Button Text</label>
                      <input
                        type="text"
                        value={homePageContent.secondaryButtonText}
                        onChange={(e) => setHomePageContent({...homePageContent, secondaryButtonText: e.target.value})}
                        className="admin-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>CV File Name</label>
                    <input
                      type="text"
                      value={homePageContent.cvFileName}
                      onChange={(e) => setHomePageContent({...homePageContent, cvFileName: e.target.value})}
                      className="admin-input"
                      placeholder="resume.pdf"
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={() => saveHomeContent(homePageContent)}
                      className="admin-btn admin-btn-primary"
                    >
                      <MdSave size={16} />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingHomeContent(false)}
                      className="admin-btn admin-btn-secondary"
                    >
                      <MdCancel size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="content-preview" style={{
                background: 'var(--bg-secondary)',
                padding: '2rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border)'
              }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ color: 'var(--accent)', margin: '0 0 0.5rem 0' }}>Preview</h3>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>This is how your home page content will appear</div>
                </div>
                <div style={{ border: '1px solid var(--border)', padding: '2rem', borderRadius: '0.5rem', background: 'var(--bg-primary)' }}>
                  <h1 style={{ color: 'var(--text-primary)', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>{homePageContent.title}</h1>
                  <p style={{ color: 'var(--accent)', fontSize: '1.25rem', margin: '0 0 1rem 0' }}>{homePageContent.subtitle}</p>
                  <p style={{ color: 'var(--text-secondary)', margin: '0 0 2rem 0', lineHeight: 1.6 }}>{homePageContent.description}</p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-primary btn-modern" style={{ padding: '0.75rem 1.5rem' }}>{homePageContent.primaryButtonText}</button>
                    <button className="btn-secondary btn-modern" style={{ padding: '0.75rem 1.5rem' }}>{homePageContent.secondaryButtonText}</button>
                  </div>
                  <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    CV File: <strong>{homePageContent.cvFileName}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* About Section Management */}
        {activeTab === 'about' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>About Section Content</h2>
              {!editingAboutContent && (
                <button onClick={() => setEditingAboutContent(true)} className="admin-btn admin-btn-primary">
                  <MdEdit size={16} />
                  Edit Content
                </button>
              )}
            </div>

            {editingAboutContent ? (
              <div className="admin-form" style={{
                background: 'var(--bg-secondary)',
                padding: '2rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border)'
              }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Section Title</label>
                    <input
                      type="text"
                      value={aboutContent.title}
                      onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>First Paragraph</label>
                    <textarea
                      value={aboutContent.paragraph1}
                      onChange={(e) => setAboutContent({...aboutContent, paragraph1: e.target.value})}
                      className="admin-input"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Second Paragraph</label>
                    <textarea
                      value={aboutContent.paragraph2}
                      onChange={(e) => setAboutContent({...aboutContent, paragraph2: e.target.value})}
                      className="admin-input"
                      rows={4}
                    />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', margin: '0 0 1rem 0' }}>Statistics</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Experience Value</label>
                        <input
                          type="text"
                          value={aboutContent.stats.experience.value}
                          onChange={(e) => setAboutContent({
                            ...aboutContent,
                            stats: {
                              ...aboutContent.stats,
                              experience: { ...aboutContent.stats.experience, value: e.target.value }
                            }
                          })}
                          className="admin-input"
                        />
                        <label style={{ display: 'block', marginTop: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Experience Label</label>
                        <input
                          type="text"
                          value={aboutContent.stats.experience.label}
                          onChange={(e) => setAboutContent({
                            ...aboutContent,
                            stats: {
                              ...aboutContent.stats,
                              experience: { ...aboutContent.stats.experience, label: e.target.value }
                            }
                          })}
                          className="admin-input"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Projects Value</label>
                        <input
                          type="text"
                          value={aboutContent.stats.projects.value}
                          onChange={(e) => setAboutContent({
                            ...aboutContent,
                            stats: {
                              ...aboutContent.stats,
                              projects: { ...aboutContent.stats.projects, value: e.target.value }
                            }
                          })}
                          className="admin-input"
                        />
                        <label style={{ display: 'block', marginTop: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Projects Label</label>
                        <input
                          type="text"
                          value={aboutContent.stats.projects.label}
                          onChange={(e) => setAboutContent({
                            ...aboutContent,
                            stats: {
                              ...aboutContent.stats,
                              projects: { ...aboutContent.stats.projects, label: e.target.value }
                            }
                          })}
                          className="admin-input"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Technologies Value</label>
                        <input
                          type="text"
                          value={aboutContent.stats.technologies.value}
                          onChange={(e) => setAboutContent({
                            ...aboutContent,
                            stats: {
                              ...aboutContent.stats,
                              technologies: { ...aboutContent.stats.technologies, value: e.target.value }
                            }
                          })}
                          className="admin-input"
                        />
                        <label style={{ display: 'block', marginTop: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Technologies Label</label>
                        <input
                          type="text"
                          value={aboutContent.stats.technologies.label}
                          onChange={(e) => setAboutContent({
                            ...aboutContent,
                            stats: {
                              ...aboutContent.stats,
                              technologies: { ...aboutContent.stats.technologies, label: e.target.value }
                            }
                          })}
                          className="admin-input"
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={() => saveAboutContent(aboutContent)}
                      className="admin-btn admin-btn-primary"
                    >
                      <MdSave size={16} />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingAboutContent(false)}
                      className="admin-btn admin-btn-secondary"
                    >
                      <MdCancel size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="content-preview" style={{
                background: 'var(--bg-secondary)',
                padding: '2rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border)'
              }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ color: 'var(--accent)', margin: '0 0 0.5rem 0' }}>Preview</h3>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>This is how your about section will appear</div>
                </div>
                <div style={{ border: '1px solid var(--border)', padding: '2rem', borderRadius: '0.5rem', background: 'var(--bg-primary)' }}>
                  <h2 style={{ color: 'var(--text-primary)', margin: '0 0 2rem 0', textAlign: 'center' }}>{aboutContent.title}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
                    <div>
                      <p style={{ color: 'var(--text-secondary)', margin: '0 0 1rem 0', lineHeight: 1.6 }}>{aboutContent.paragraph1}</p>
                      <p style={{ color: 'var(--text-secondary)', margin: '0', lineHeight: 1.6 }}>{aboutContent.paragraph2}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                        <h3 style={{ color: 'var(--accent)', margin: '0', fontSize: '2rem' }}>{aboutContent.stats.experience.value}</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>{aboutContent.stats.experience.label}</p>
                      </div>
                      <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                        <h3 style={{ color: 'var(--accent)', margin: '0', fontSize: '2rem' }}>{aboutContent.stats.projects.value}</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>{aboutContent.stats.projects.label}</p>
                      </div>
                      <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                        <h3 style={{ color: 'var(--accent)', margin: '0', fontSize: '2rem' }}>{aboutContent.stats.technologies.value}</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>{aboutContent.stats.technologies.label}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Projects</h2>
              <button 
                onClick={addProject}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <MdAdd size={16} /> Add Project
              </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {projects.map(project => (
                <div key={project.id} style={{
                  background: 'var(--bg-secondary)',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border)'
                }}>
                  {editingProject?.id === project.id ? (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      <input
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                        style={{
                          padding: '0.5rem',
                          borderRadius: '0.25rem',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)'
                        }}
                      />
                      <textarea
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                        style={{
                          padding: '0.5rem',
                          borderRadius: '0.25rem',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          minHeight: '80px'
                        }}
                      />
                      <input
                        value={editingProject.tech.join(', ')}
                        onChange={(e) => setEditingProject({...editingProject, tech: e.target.value.split(', ')})}
                        placeholder="Technologies (comma separated)"
                        style={{
                          padding: '0.5rem',
                          borderRadius: '0.25rem',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)'
                        }}
                      />
                      <input
                        value={editingProject.link}
                        onChange={(e) => setEditingProject({...editingProject, link: e.target.value})}
                        placeholder="Project link"
                        style={{
                          padding: '0.5rem',
                          borderRadius: '0.25rem',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)'
                        }}
                      />
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => saveProject(editingProject)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.25rem',
                            border: 'none',
                            background: '#10b981',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <MdSave size={14} /> Save
                        </button>
                        <button 
                          onClick={() => setEditingProject(null)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.25rem',
                            border: '1px solid var(--border)',
                            background: 'transparent',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <MdCancel size={14} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                        <div>
                          <h3 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>{project.title}</h3>
                          <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>{project.description}</p>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {project.tech.map(tech => (
                              <span key={tech} style={{
                                background: 'var(--accent)',
                                color: 'white',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                fontSize: '0.75rem'
                              }}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            onClick={() => setEditingProject(project)}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '0.25rem',
                              border: 'none',
                              background: '#f59e0b',
                              color: 'white',
                              cursor: 'pointer'
                            }}
                          >
                            <MdEdit size={14} />
                          </button>
                          <button 
                            onClick={() => deleteProject(project.id)}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '0.25rem',
                              border: 'none',
                              background: '#ef4444',
                              color: 'white',
                              cursor: 'pointer'
                            }}
                          >
                            <MdTrash size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Blog Posts</h2>
              <button 
                onClick={addBlogPost}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <MdAdd size={16} /> Add Post
              </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {blogPosts.map(post => (
                <div key={post.id} style={{
                  background: 'var(--bg-secondary)',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border)'
                }}>
                  {editingBlog?.id === post.id ? (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      <input
                        value={editingBlog.title}
                        onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                        style={{
                          padding: '0.5rem',
                          borderRadius: '0.25rem',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)'
                        }}
                      />
                      <textarea
                        value={editingBlog.excerpt}
                        onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                        style={{
                          padding: '0.5rem',
                          borderRadius: '0.25rem',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          minHeight: '80px'
                        }}
                      />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input
                          value={editingBlog.category}
                          onChange={(e) => setEditingBlog({...editingBlog, category: e.target.value})}
                          placeholder="Category"
                          style={{
                            padding: '0.5rem',
                            borderRadius: '0.25rem',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)'
                          }}
                        />
                        <input
                          value={editingBlog.readTime}
                          onChange={(e) => setEditingBlog({...editingBlog, readTime: e.target.value})}
                          placeholder="Read time"
                          style={{
                            padding: '0.5rem',
                            borderRadius: '0.25rem',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)'
                          }}
                        />
                      </div>
                      <input
                        value={editingBlog.tags.join(', ')}
                        onChange={(e) => setEditingBlog({...editingBlog, tags: e.target.value.split(', ')})}
                        placeholder="Tags (comma separated)"
                        style={{
                          padding: '0.5rem',
                          borderRadius: '0.25rem',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)'
                        }}
                      />
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => saveBlogPost(editingBlog)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.25rem',
                            border: 'none',
                            background: '#10b981',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <MdSave size={14} /> Save
                        </button>
                        <button 
                          onClick={() => setEditingBlog(null)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.25rem',
                            border: '1px solid var(--border)',
                            background: 'transparent',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <MdCancel size={14} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <h3 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>{post.title}</h3>
                          <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>{post.excerpt}</p>
                          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{post.category}</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>•</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{post.readTime}</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>•</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{post.date}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {post.tags.map(tag => (
                              <span key={tag} style={{
                                background: 'var(--accent)',
                                color: 'white',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                fontSize: '0.75rem'
                              }}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            onClick={() => setEditingBlog(post)}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '0.25rem',
                              border: 'none',
                              background: '#f59e0b',
                              color: 'white',
                              cursor: 'pointer'
                            }}
                          >
                            <MdEdit size={14} />
                          </button>
                          <button 
                            onClick={() => deleteBlogPost(post.id)}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '0.25rem',
                              border: 'none',
                              background: '#ef4444',
                              color: 'white',
                              cursor: 'pointer'
                            }}
                          >
                            <MdTrash size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div>
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Skill Categories</h2>
                <button onClick={addSkillCategory} className="admin-btn admin-btn-primary">
                  <MdAdd size={16} />
                  Add Category
                </button>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {skillCategories.map(category => (
                  <div key={category.id} style={{
                    background: 'var(--bg-secondary)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--border)'
                  }}>
                    {editingSkillCategory?.id === category.id ? (
                      <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Category Name</label>
                            <input
                              value={editingSkillCategory.name}
                              onChange={(e) => setEditingSkillCategory({...editingSkillCategory, name: e.target.value})}
                              className="admin-input"
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Icon</label>
                            <select
                              value={editingSkillCategory.icon}
                              onChange={(e) => setEditingSkillCategory({...editingSkillCategory, icon: e.target.value})}
                              className="admin-input"
                            >
                              <option value="NetworkIcon">Network Icon</option>
                              <option value="CloudIcon">Cloud Icon</option>
                              <option value="CodeIcon">Code Icon</option>
                              <option value="SecurityIcon">Security Icon</option>
                              <option value="BrainIcon">Brain Icon</option>
                              <option value="RocketIcon">Rocket Icon</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Skills (comma-separated)</label>
                          <textarea
                            value={editingSkillCategory.skills.join(', ')}
                            onChange={(e) => setEditingSkillCategory({
                              ...editingSkillCategory, 
                              skills: e.target.value.split(', ').filter(s => s.trim())
                            })}
                            className="admin-input"
                            rows={3}
                            placeholder="Python, JavaScript, React, Node.js"
                          />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <button
                            onClick={() => saveSkillCategory(editingSkillCategory)}
                            className="admin-btn admin-btn-primary"
                          >
                            <MdSave size={16} />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingSkillCategory(null)}
                            className="admin-btn admin-btn-secondary"
                          >
                            <MdCancel size={16} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <h3 style={{ color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {category.icon === 'NetworkIcon' && '🌐'}
                            {category.icon === 'CloudIcon' && '☁️'}
                            {category.icon === 'CodeIcon' && '💻'}
                            {category.icon === 'SecurityIcon' && '🔒'}
                            {category.icon === 'BrainIcon' && '🧠'}
                            {category.icon === 'RocketIcon' && '🚀'}
                            {category.name}
                          </h3>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => setEditingSkillCategory(category)}
                              className="admin-btn admin-btn-secondary"
                              style={{ padding: '0.5rem' }}
                            >
                              <MdEdit size={14} />
                            </button>
                            <button
                              onClick={() => deleteSkillCategory(category.id)}
                              className="admin-btn admin-btn-danger"
                              style={{ padding: '0.5rem' }}
                            >
                              <MdDelete size={14} />
                            </button>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {category.skills.map(skill => (
                            <span key={skill} className="admin-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Individual Skills</h2>
                <button onClick={addSkill} className="admin-btn admin-btn-primary">
                  <MdAdd size={16} />
                  Add Skill
                </button>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {skills.map(skill => (
                  <div key={skill.name} style={{
                    background: 'var(--bg-secondary)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--border)'
                  }}>
                    {editingSkill?.name === skill.name ? (
                      <div style={{ display: 'grid', gap: '1rem' }}>
                        <input
                          value={editingSkill.name}
                          onChange={(e) => setEditingSkill({...editingSkill, name: e.target.value})}
                          className="admin-input"
                          placeholder="Skill name"
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '0.875rem' }}>Level (%)</label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={editingSkill.level}
                              onChange={(e) => setEditingSkill({...editingSkill, level: parseInt(e.target.value)})}
                              className="admin-input"
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '0.875rem' }}>Category</label>
                            <select
                              value={editingSkill.category}
                              onChange={(e) => setEditingSkill({...editingSkill, category: e.target.value})}
                              className="admin-input"
                            >
                              <option value="Programming">Programming</option>
                              <option value="Networking">Networking</option>
                              <option value="Cloud & DevOps">Cloud & DevOps</option>
                              <option value="Security">Security</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '0.875rem' }}>Color</label>
                            <input
                              type="color"
                              value={editingSkill.color}
                              onChange={(e) => setEditingSkill({...editingSkill, color: e.target.value})}
                              className="admin-input"
                              style={{ height: '2.5rem' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '0.875rem' }}>Icon</label>
                            <input
                              value={editingSkill.icon}
                              onChange={(e) => setEditingSkill({...editingSkill, icon: e.target.value})}
                              className="admin-input"
                              placeholder="🚀"
                            />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <button
                            onClick={() => saveSkill(editingSkill)}
                            className="admin-btn admin-btn-primary"
                          >
                            <MdSave size={16} />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingSkill(null)}
                            className="admin-btn admin-btn-secondary"
                          >
                            <MdCancel size={16} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ fontSize: '1.5rem' }}>{skill.icon}</span>
                          <div>
                            <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>{skill.name}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                              <span className="admin-tag" style={{ background: skill.color, color: 'white' }}>
                                {skill.category}
                              </span>
                              <div style={{ 
                                background: 'var(--bg-primary)', 
                                borderRadius: '0.5rem', 
                                padding: '0.25rem 0.75rem',
                                border: '1px solid var(--border)'
                              }}>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{skill.level}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => setEditingSkill(skill)}
                            className="admin-btn admin-btn-secondary"
                            style={{ padding: '0.5rem' }}
                          >
                            <MdEdit size={14} />
                          </button>
                          <button
                            onClick={() => deleteSkill(skill.name)}
                            className="admin-btn admin-btn-danger"
                            style={{ padding: '0.5rem' }}
                          >
                            <MdDelete size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>Contact Information</h2>
            <div style={{
              background: 'var(--bg-secondary)',
              padding: '2rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border)',
              display: 'grid',
              gap: '1rem'
            }}>
              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>Email</label>
                <input
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>Website</label>
                <input
                  value={contactInfo.website}
                  onChange={(e) => setContactInfo({...contactInfo, website: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>LinkedIn</label>
                <input
                  value={contactInfo.linkedin}
                  onChange={(e) => setContactInfo({...contactInfo, linkedin: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>GitHub</label>
                <input
                  value={contactInfo.github}
                  onChange={(e) => setContactInfo({...contactInfo, github: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <button
                onClick={() => {
                  alert('Contact information saved!');
                  // In a real app, this would save to a database
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <MdSave size={16} /> Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'users' && currentUser?.role === 'admin' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>User Management</h2>
              <button 
                onClick={addUser}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <MdAdd size={16} /> Add User
              </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {users.map(user => (
                <div key={user.id} style={{
                  background: 'var(--bg-secondary)',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border)'
                }}>
                  {editingUser?.id === user.id ? (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      <input
                        value={editingUser.username}
                        onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                        placeholder="Username"
                        style={{
                          padding: '0.5rem',
                          borderRadius: '0.25rem',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)'
                        }}
                      />
                      <input
                        type="password"
                        value={editingUser.password}
                        onChange={(e) => setEditingUser({...editingUser, password: e.target.value})}
                        placeholder="Password"
                        style={{
                          padding: '0.5rem',
                          borderRadius: '0.25rem',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)'
                        }}
                      />
                      <select
                        value={editingUser.role}
                        onChange={(e) => setEditingUser({...editingUser, role: e.target.value as 'admin' | 'editor'})}
                        style={{
                          padding: '0.5rem',
                          borderRadius: '0.25rem',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </select>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => saveUser(editingUser)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.25rem',
                            border: 'none',
                            background: '#10b981',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <MdSave size={14} /> Save
                        </button>
                        <button 
                          onClick={() => setEditingUser(null)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.25rem',
                            border: '1px solid var(--border)',
                            background: 'transparent',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <MdCancel size={14} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <MdPeople size={16} />
                          {user.username}
                          {currentUser?.id === user.id && <span style={{ color: 'var(--accent)', fontSize: '0.75rem' }}> (You)</span>}
                        </h4>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          <span>Role: <strong style={{ color: user.role === 'admin' ? '#f59e0b' : '#10b981' }}>{user.role}</strong></span>
                          <span>Created: {user.createdAt}</span>
                          {user.lastLogin && <span>Last Login: {new Date(user.lastLogin).toLocaleDateString()}</span>}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>                          <button 
                            onClick={() => setEditingUser(user)}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '0.25rem',
                              border: 'none',
                              background: '#f59e0b',
                              color: 'white',
                              cursor: 'pointer'
                            }}
                          >
                            <MdEdit size={14} />
                          </button>
                          {currentUser?.id !== user.id && (
                            <button 
                              onClick={() => deleteUser(user.id)}
                              style={{
                                padding: '0.5rem',
                                borderRadius: '0.25rem',
                                border: 'none',
                                background: '#ef4444',
                                color: 'white',
                                cursor: 'pointer'
                              }}
                            >
                              <MdTrash size={14} />
                            </button>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>Settings</h2>
            
            {/* Password Change Section */}
            <div style={{
              background: 'var(--bg-secondary)',
              padding: '2rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>Change Password</h3>
                <button
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.25rem',
                    border: '1px solid var(--border)',
                    background: 'var(--accent)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {showPasswordChange ? <MdClose size={14} /> : <MdLock size={14} />}
                  {showPasswordChange ? 'Cancel' : 'Change Password'}
                </button>
              </div>
              
              {showPasswordChange && (
                <div style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)'
                    }}
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)'
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)'
                    }}
                  />
                  <button
                    onClick={handlePasswordChange}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: '#10b981',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <MdSave size={16} /> Update Password
                  </button>
                </div>
              )}
            </div>

            {/* Account Information */}
            <div style={{
              background: 'var(--bg-secondary)',
              padding: '2rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border)'
            }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Account Information</h3>
              <div style={{ display: 'grid', gap: '1rem', color: 'var(--text-secondary)' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Username:</strong> {currentUser?.username}
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Role:</strong> 
                  <span style={{ 
                    color: currentUser?.role === 'admin' ? '#f59e0b' : '#10b981',
                    marginLeft: '0.5rem',
                    fontWeight: 'bold'
                  }}>
                    {currentUser?.role}
                  </span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Account Created:</strong> {currentUser?.createdAt}
                </div>
                {currentUser?.lastLogin && (
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Last Login:</strong> {new Date(currentUser.lastLogin).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
