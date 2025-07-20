import { useEffect, useState } from 'react';
import './App.css';
import Projects from './Projects';
import AIBot from './AIBot';
import ContactForm from './ContactForm';
import SkillsVisualization from './SkillsVisualization';
import BlogSection from './BlogSection';
import AdminPanel from './AdminPanel';
import { CodeIcon, RocketIcon, NetworkIcon, CloudIcon, SecurityIcon, EmailIcon, WebsiteIcon, LinkedInIcon, GitHubIcon, SunIcon, MoonIcon } from './Icons';

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
  greeting: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  cvFileName: string;
}

// Persistent storage functions
const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadFromStorage = (key: string, defaultValue: any) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

const App = () => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Content state with persistence
  const [aboutContent, setAboutContent] = useState<AboutContent>(() => 
    loadFromStorage('aboutContent', {
      title: "Passionate Network Engineer & Developer",
      paragraph1: "I'm a dedicated Network Engineer with a passion for automation and infrastructure optimization. With extensive experience in Cisco, Mikrotik, and cloud technologies, I specialize in creating robust, scalable network solutions.",
      paragraph2: "My expertise extends beyond traditional networking to include Python automation, cloud infrastructure, and cybersecurity. I believe in continuous learning and staying ahead of technological advances to deliver innovative solutions.",
      stats: {
        experience: { value: "3+", label: "Years Experience" },
        projects: { value: "50+", label: "Projects Completed" },
        technologies: { value: "20+", label: "Technologies Mastered" }
      }
    })
  );

  const [homePageContent, setHomePageContent] = useState<HomePageContent>(() =>
    loadFromStorage('homePageContent', {
      greeting: "Hello, I'm",
      name: "Muhammad Shaban",
      title: "Muhammad Shaban",
      subtitle: "Network Engineer & Python Developer",
      description: "Specializing in network automation and infrastructure solutions with a passion for creating robust, scalable systems.",
      primaryButtonText: "Get In Touch",
      secondaryButtonText: "Download CV",
      cvFileName: "/resume.pdf"
    })
  );

  // Auto-save content changes
  useEffect(() => {
    saveToStorage('aboutContent', aboutContent);
  }, [aboutContent]);

  useEffect(() => {
    saveToStorage('homePageContent', homePageContent);
  }, [homePageContent]);

  // Scroll and navigation functions
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Scroll tracking with throttling
  useEffect(() => {
    let ticking = false;
    
    const updateActiveSection = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    const throttledScroll = handleScroll;
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const elementsToObserve = document.querySelectorAll('.scroll-reveal');
    elementsToObserve.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Enhanced scroll spy for navigation
  useEffect(() => {
    const handleSectionObserver = () => {
      const sections = document.querySelectorAll('section[id]');
      const navHeight = 70;
      
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            if (sectionId) {
              setActiveSection(sectionId);
            }
          }
        });
      }, {
        rootMargin: `-${navHeight}px 0px -50% 0px`,
        threshold: 0
      });

      sections.forEach((section) => {
        sectionObserver.observe(section);
      });

      return () => sectionObserver.disconnect();
    };

    const cleanup = handleSectionObserver();
    return cleanup;
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        const sections = ['home', 'about', 'skills', 'projects', 'blog', 'contact'];
        const currentIndex = sections.indexOf(activeSection);
        
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault();
            if (currentIndex > 0) {
              scrollToSection(sections[currentIndex - 1]);
            }
            break;
          case 'ArrowDown':
            e.preventDefault();
            if (currentIndex < sections.length - 1) {
              scrollToSection(sections[currentIndex + 1]);
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSection]);

  return (
    <Router>
      <Routes>
        <Route path="/web-admin" element={
          <AdminPanel 
            aboutContent={aboutContent}
            setAboutContent={setAboutContent}
            homePageContent={homePageContent}
            setHomePageContent={setHomePageContent}
          />
        } />
        <Route path="/*" element={
          <div className="app">
            {/* Navigation */}
            <nav className="navbar">
              <div className="nav-brand">
                <span className="logo">MS</span>
              </div>
              
              {/* Desktop Navigation */}
              <ul className="nav-links">
                <li><button onClick={() => scrollToSection('home')} className={activeSection === 'home' ? 'active' : ''}>Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</button></li>
                <li><button onClick={() => scrollToSection('skills')} className={activeSection === 'skills' ? 'active' : ''}>Skills</button></li>
                <li><button onClick={() => scrollToSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</button></li>
                <li><button onClick={() => scrollToSection('blog')} className={activeSection === 'blog' ? 'active' : ''}>Blog</button></li>
                <li><button onClick={() => scrollToSection('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</button></li>
              </ul>

              {/* Mobile Navigation */}
              <>
                {isMobileMenuOpen && (
                  <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
                )}
                <div className={`mobile-menu-glass ${isMobileMenuOpen ? 'open' : ''}`}>
                  <nav className="mobile-nav">
                    <button onClick={() => { scrollToSection('home'); setIsMobileMenuOpen(false); }} className={activeSection === 'home' ? 'active' : ''}>Home</button>
                    <button onClick={() => { scrollToSection('about'); setIsMobileMenuOpen(false); }} className={activeSection === 'about' ? 'active' : ''}>About</button>
                    <button onClick={() => { scrollToSection('skills'); setIsMobileMenuOpen(false); }} className={activeSection === 'skills' ? 'active' : ''}>Skills</button>
                    <button onClick={() => { scrollToSection('projects'); setIsMobileMenuOpen(false); }} className={activeSection === 'projects' ? 'active' : ''}>Projects</button>
                    <button onClick={() => { scrollToSection('blog'); setIsMobileMenuOpen(false); }} className={activeSection === 'blog' ? 'active' : ''}>Blog</button>
                    <button onClick={() => { scrollToSection('contact'); setIsMobileMenuOpen(false); }} className={activeSection === 'contact' ? 'active' : ''}>Contact</button>
                  </nav>
                </div>
              </>

              {/* Mobile menu toggle */}
              <button 
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              {/* Theme toggle */}
              <button 
                className="theme-toggle" 
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            </nav>

            {/* Hero Section */}
            <section id="home" className="hero">
              <div className="hero-content">
                <div className="hero-text">
                  <h1>Hello, I'm</h1>
                  <h2>{homePageContent.name}</h2>
                  <p>{homePageContent.subtitle}</p>
                  <div className="hero-buttons">
                    <button onClick={() => scrollToSection('projects')} className="cta-primary">
                      <RocketIcon />
                      View My Work
                    </button>
                    <button onClick={() => scrollToSection('contact')} className="cta-secondary">
                      <EmailIcon />
                      Get In Touch
                    </button>
                  </div>
                </div>
                <div className="hero-image">
                  <div className="floating-card">
                    <div className="card-content">
                      <NetworkIcon />
                      <h3>Network Engineer</h3>
                      <p>Specialized in network infrastructure and automation</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="about">
              <div className="container">
                <h2>About Me</h2>
                <div className="about-content">
                  <div className="about-text">
                    <h3>{aboutContent.title}</h3>
                    <p>{aboutContent.paragraph1}</p>
                    <p>{aboutContent.paragraph2}</p>
                  </div>
                  <div className="about-stats">
                    <div className="stat">
                      <span className="stat-number">{aboutContent.stats.experience.value}</span>
                      <span className="stat-label">{aboutContent.stats.experience.label}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">{aboutContent.stats.projects.value}</span>
                      <span className="stat-label">{aboutContent.stats.projects.label}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">{aboutContent.stats.technologies.value}</span>
                      <span className="stat-label">{aboutContent.stats.technologies.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="skills">
              <div className="container">
                <h2>Skills & Technologies</h2>
                <SkillsVisualization />
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="projects">
              <div className="container">
                <h2>Featured Projects</h2>
                <Projects />
              </div>
            </section>

            {/* Blog Section */}
            <section id="blog" className="blog">
              <div className="container">
                <h2>Latest Blog Posts</h2>
                <BlogSection />
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact">
              <div className="container">
                <h2>Get In Touch</h2>
                <ContactForm />
                <div className="contact-info">
                  <div className="contact-item">
                    <EmailIcon />
                    <span>sbaiqtahir786@gmail.com</span>
                  </div>
                  <div className="contact-item">
                    <WebsiteIcon />
                    <span>mshaban.dev</span>
                  </div>
                  <div className="social-links">
                    <a href="https://github.com/shbmhd03" target="_blank" rel="noopener noreferrer">
                      <GitHubIcon />
                    </a>
                    <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                      <LinkedInIcon />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="footer">
              <div className="container">
                <div className="footer-content">
                  <div className="footer-left">
                    <h3>Muhammad Shaban</h3>
                    <p>Network Engineer & Developer</p>
                  </div>
                  <div className="footer-center">
                    <div className="footer-links">
                      <button onClick={() => scrollToSection('home')}>Home</button>
                      <button onClick={() => scrollToSection('about')}>About</button>
                      <button onClick={() => scrollToSection('skills')}>Skills</button>
                      <button onClick={() => scrollToSection('projects')}>Projects</button>
                      <button onClick={() => scrollToSection('contact')}>Contact</button>
                    </div>
                  </div>
                  <div className="footer-right">
                    <div className="footer-social">
                      <a href="https://github.com/shbmhd03" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon />
                      </a>
                      <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="footer-bottom">
                  <p>&copy; 2025 Muhammad Shaban. All rights reserved.</p>
                </div>
              </div>
            </footer>

            {/* AI Bot */}
            <AIBot />
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
