import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AdminPanel from './AdminPanel';
import EnhancedAdminPanel from './EnhancedAdminPanel';
import DynamicPortfolio from './DynamicPortfolio';
import MaintenancePage from './MaintenancePage';
import { maintenanceAPI } from './api';

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

interface HomePageContent {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  cvFileName: string;
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

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Initialize content state from localStorage or defaults
  const getInitialAboutContent = (): AboutContent => {
    try {
      const saved = localStorage.getItem('portfolioAboutContent');
      if (saved) {
        console.log('Loading saved about content:', saved);
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading saved about content:', error);
    }
    
    return {
      title: 'About Me',
      paragraph1: 'I\'m a passionate Network Engineering student at ESOFT Metro Campus, pursuing an HND in Computing. With a deep interest in cloud computing and cybersecurity, I love building innovative solutions and solving complex technical problems.',
      paragraph2: 'My journey in technology started with curiosity about how networks connect the world, and it has evolved into a mission to create secure, scalable, and efficient systems.',
      stats: {
        experience: { value: '2+', label: 'Years of Experience' },
        projects: { value: '10+', label: 'Projects Completed' },
        technologies: { value: '5+', label: 'Technologies Mastered' }
      }
    };
  };

  const getInitialHomeContent = (): HomePageContent => {
    try {
      const saved = localStorage.getItem('portfolioHomeContent');
      if (saved) {
        console.log('Loading saved home content:', saved);
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading saved home content:', error);
    }
    
    return {
      name: 'Mohamed Suhaib',
      title: 'Hi, I\'m Mohamed Suhaib',
      subtitle: 'Network Engineering Student & Tech Enthusiast',
      description: 'Passionate about cloud computing, cybersecurity, and building innovative solutions that make a difference in the digital world.',
      primaryButtonText: 'Get In Touch',
      secondaryButtonText: 'Download CV',
      cvFileName: 'resume.pdf'
    };
  };

  const getInitialMaintenanceMode = (): MaintenanceMode => {
    return {
      isActive: false,
      startDate: '',
      endDate: '',
      message: 'We\'re currently performing scheduled maintenance to improve our services. We\'ll be back shortly!',
      estimatedDuration: '2 hours',
      contactEmail: '',
      showCountdown: true,
      allowAdminAccess: true
    };
  };

  // Content state for dynamic content management - initialized from localStorage
  const [aboutContent, setAboutContent] = useState<AboutContent>(getInitialAboutContent);
  const [homePageContent, setHomePageContent] = useState<HomePageContent>(getInitialHomeContent);
  const [maintenanceMode, setMaintenanceMode] = useState<MaintenanceMode>(getInitialMaintenanceMode);
  const [bypassMaintenance, setBypassMaintenance] = useState(false);

  // Save content to localStorage whenever it changes
  useEffect(() => {
    console.log('Saving about content to localStorage:', aboutContent);
    localStorage.setItem('portfolioAboutContent', JSON.stringify(aboutContent));
  }, [aboutContent]);

  useEffect(() => {
    console.log('Saving home content to localStorage:', homePageContent);
    localStorage.setItem('portfolioHomeContent', JSON.stringify(homePageContent));
  }, [homePageContent]);

  // Load maintenance status from server on app start
  useEffect(() => {
    const loadMaintenanceStatus = async () => {
      try {
        const serverStatus = await maintenanceAPI.getStatus();
        if (serverStatus.isGloballyActive !== undefined) {
          setMaintenanceMode(prev => ({
            ...prev,
            isActive: serverStatus.isGloballyActive,
            message: serverStatus.message || prev.message,
            estimatedDuration: serverStatus.estimatedTime || prev.estimatedDuration
          }));
        }
      } catch (error) {
        console.error('Failed to load maintenance status from server:', error);
        // Fallback to localStorage
        try {
          const saved = localStorage.getItem('portfolioMaintenanceMode');
          if (saved) {
            console.log('Loading saved maintenance mode from localStorage:', saved);
            setMaintenanceMode(JSON.parse(saved));
          }
        } catch (localError) {
          console.error('Error loading saved maintenance mode:', localError);
        }
      }
    };

    loadMaintenanceStatus();
  }, []);

  // Save maintenance mode to localStorage as backup
  useEffect(() => {
    console.log('Saving maintenance mode to localStorage:', maintenanceMode);
    localStorage.setItem('portfolioMaintenanceMode', JSON.stringify(maintenanceMode));
  }, [maintenanceMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Scroll tracking for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if maintenance mode should be active
  const isMaintenanceActive = () => {
    if (!maintenanceMode.isActive || bypassMaintenance) return false;
    
    const now = new Date();
    const start = maintenanceMode.startDate ? new Date(maintenanceMode.startDate) : null;
    const end = maintenanceMode.endDate ? new Date(maintenanceMode.endDate) : null;
    
    if (start && now < start) return false;
    if (end && now > end) return false;
    
    return true;
  };

  const handleAdminAccess = () => {
    setBypassMaintenance(true);
  };

  // If maintenance is active and it's not an admin route, show maintenance page
  if (isMaintenanceActive() && !window.location.pathname.includes('/web-admin') && !window.location.pathname.includes('/admin')) {
    return (
      <MaintenancePage 
        maintenanceMode={maintenanceMode}
        onAdminAccess={handleAdminAccess}
      />
    );
  }

  return (
    <Routes>
      <Route path="/" element={
        <DynamicPortfolio 
          theme={theme}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      } />
      <Route path="/web-admin" element={
        <AdminPanel 
          aboutContent={aboutContent}
          setAboutContent={setAboutContent}
          homePageContent={homePageContent}
          setHomePageContent={setHomePageContent}
          maintenanceMode={maintenanceMode}
          setMaintenanceMode={setMaintenanceMode}
        />
      } />
      <Route path="/admin" element={
        <EnhancedAdminPanel 
          maintenanceMode={maintenanceMode}
          setMaintenanceMode={setMaintenanceMode}
        />
      } />
    </Routes>
  );
};

export default App;
