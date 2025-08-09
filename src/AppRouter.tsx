import { useState, useEffect } from 'react';
import App from './App';
import AdminPanel from './AdminPanel';
import LoginPage from './LoginPage';

interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'editor';
  createdAt: string;
  lastLogin?: string;
}

// Content interfaces
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

const AppRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Content state for dynamic content management
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: 'About Me',
    paragraph1: 'I\'m a passionate Network Engineering student at ESOFT Metro Campus, pursuing an HND in Computing. With a deep interest in cloud computing and cybersecurity, I love building innovative solutions and solving complex technical problems.',
    paragraph2: 'My journey in technology started with curiosity about how networks connect the world, and it has evolved into a mission to create secure, scalable, and efficient systems.',
    stats: {
      experience: { value: '2+', label: 'Years of Experience' },
      projects: { value: '10+', label: 'Projects Completed' },
      technologies: { value: '5+', label: 'Technologies Mastered' }
    }
  });

  const [homePageContent, setHomePageContent] = useState<HomePageContent>({
    name: 'Mohamed Suhaib',
    title: 'Network Engineering Student',
    subtitle: 'Cloud Computing & Cybersecurity Enthusiast',
    description: 'Building the future of secure, connected systems through innovative network solutions and cloud technologies.',
    primaryButtonText: 'View My Work',
    secondaryButtonText: 'Download CV',
    cvFileName: 'Mohamed_Suhaib_CV.pdf'
  });

  // Demo users
  const users: User[] = [
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
  ];

  // Handle authentication
  const handleLogin = (username: string, password: string): boolean => {
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      // Update last login in a real app, this would be saved to backend
      user.lastLogin = new Date().toISOString();
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    // Redirect to home page after logout
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
  };

  // Listen for navigation changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check if user is accessing admin route
  const isAdminRoute = currentPath === '/web-admin' || currentPath === '/admin';

  // If accessing /web-admin route
  if (isAdminRoute) {
    // If not authenticated, show login page
    if (!isAuthenticated) {
      return (
        <LoginPage onLogin={handleLogin} />
      );
    }
    
    // If authenticated, show admin panel
    return (
      <AdminPanel
        aboutContent={aboutContent}
        setAboutContent={setAboutContent}
        homePageContent={homePageContent}
        setHomePageContent={setHomePageContent}
        currentUser={currentUser!}
        onLogout={handleLogout}
      />
    );
  }

  // For all other routes, show the main portfolio
  return (
    <App 
      aboutContent={aboutContent}
      homePageContent={homePageContent}
    />
  );
};

export default AppRouter;
