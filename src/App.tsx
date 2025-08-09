import { useEffect, useState } from 'react';
import './App.css';
import Projects from './Projects';
import AIBot from './AIBot';
import ContactForm from './ContactForm';
import SkillsVisualization from './SkillsVisualization';
import BlogSection from './BlogSection';
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
  name: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  cvFileName: string;
}

interface AppProps {
  showAdmin?: boolean;
  aboutContent?: AboutContent;
  homePageContent?: HomePageContent;
}

const App = ({ showAdmin = false, aboutContent: propAboutContent, homePageContent: propHomePageContent }: AppProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use provided content or fall back to defaults
  const aboutContent = propAboutContent || {
    title: 'About Me',
    paragraph1: 'I\'m a passionate Network Engineering student at ESOFT Metro Campus, pursuing an HND in Computing. With a deep interest in cloud computing and cybersecurity, I love building innovative solutions and solving complex technical problems.',
    paragraph2: 'My journey in technology started with curiosity about how networks connect the world, and it has evolved into a mission to create secure, scalable, and efficient systems.',
    stats: {
      experience: { value: '2+', label: 'Years of Experience' },
      projects: { value: '10+', label: 'Projects Completed' },
      technologies: { value: '5+', label: 'Technologies Mastered' }
    }
  };

  const homePageContent = propHomePageContent || {
    name: 'Mohamed Suhaib',
    title: 'Hi, I\'m Mohamed Suhaib',
    subtitle: 'Network Engineering Student & Tech Enthusiast',
    description: 'Passionate about cloud computing, cybersecurity, and building innovative solutions that make a difference in the digital world.',
    primaryButtonText: 'Get In Touch',
    secondaryButtonText: 'Download CV',
    cvFileName: 'resume.pdf'
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const navbar = document.querySelector('.navbar');
      const navLinks = document.querySelector('.nav-links');
      
      if (isMobileMenuOpen && 
          navbar && 
          navLinks && 
          !navbar.contains(target) && 
          !navLinks.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 120; // Offset for navbar height

      // Find the current section
      let currentSection = 'home';
      
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      // Special handling for the last section to ensure it gets highlighted at the bottom
      const lastSection = document.getElementById('contact');
      if (lastSection && window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        currentSection = 'contact';
      }

      setActiveSection(currentSection);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    elementsToReveal.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Enhanced particle cursor effect
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      cursor.remove();
    };
  }, []);

  // Enhanced section intersection observer for active states
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-80px 0px -80px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    return () => sectionObserver.disconnect();
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
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
          <ul className={`nav-links-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
            <li><button onClick={() => scrollToSection('home')} className={activeSection === 'home' ? 'active' : ''}>Home</button></li>
            <li><button onClick={() => scrollToSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</button></li>
            <li><button onClick={() => scrollToSection('skills')} className={activeSection === 'skills' ? 'active' : ''}>Skills</button></li>
            <li><button onClick={() => scrollToSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</button></li>
            <li><button onClick={() => scrollToSection('blog')} className={activeSection === 'blog' ? 'active' : ''}>Blog</button></li>
            <li><button onClick={() => scrollToSection('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</button></li>
          </ul>
        </>

        <div className="nav-actions">
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`} 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">Mohamed Suhaib</span>
            </h1>
            <p className="hero-subtitle typewriter">{homePageContent.subtitle}</p>
            <p className="hero-description">
              {homePageContent.description}
            </p>
            <div className="hero-buttons">
              <button onClick={() => scrollToSection('contact')} className="btn-primary btn-modern">
                {homePageContent.primaryButtonText}
              </button>
              <a href={`/${homePageContent.cvFileName}`} download className="btn-secondary btn-modern">
                {homePageContent.secondaryButtonText}
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-elements">
              <div className="floating-card hero-glass-card"><CodeIcon size={32} /></div>
              <div className="floating-card hero-glass-card"><RocketIcon size={32} /></div>
              <div className="floating-card hero-glass-card"><NetworkIcon size={32} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section-enhanced">
        <div className="container">
          <h2 className="section-title section-title-enhanced scroll-reveal">{aboutContent.title}</h2>
          <div className="about-content about-content-enhanced">
            <div className="about-text about-text-enhanced scroll-reveal-left">
              <p>
                {aboutContent.paragraph1}
              </p>
              <p>
                {aboutContent.paragraph2}
              </p>
            </div>
            <div className="about-stats scroll-reveal-right">
              <div className="stat-card stat-card-enhanced">
                <h3>{aboutContent.stats.experience.value}</h3>
                <p>{aboutContent.stats.experience.label}</p>
              </div>
              <div className="stat-card stat-card-enhanced">
                <h3>{aboutContent.stats.projects.value}</h3>
                <p>{aboutContent.stats.projects.label}</p>
              </div>
              <div className="stat-card stat-card-enhanced">
                <h3>{aboutContent.stats.technologies.value}</h3>
                <p>{aboutContent.stats.technologies.label}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills section-enhanced">
        <div className="container">
          <h2 className="section-title section-title-enhanced scroll-reveal">Skills & Expertise</h2>
          <div className="skills-grid">
            <div className="skill-category skill-category-enhanced scroll-reveal">
              <h3><NetworkIcon size={20} /> Networking</h3>
              <div className="skill-tags">
                <span className="skill-tag skill-tag-enhanced"><span>Cisco</span></span>
                <span className="skill-tag skill-tag-enhanced"><span>Mikrotik</span></span>
                <span className="skill-tag skill-tag-enhanced"><span>Network Troubleshooting</span></span>
                <span className="skill-tag skill-tag-enhanced"><span>Wireshark</span></span>
              </div>
            </div>
            <div className="skill-category skill-category-enhanced scroll-reveal">
              <h3><CloudIcon size={20} /> Cloud & DevOps</h3>
              <div className="skill-tags">
                <span className="skill-tag skill-tag-enhanced"><span>AWS</span></span>
                <span className="skill-tag skill-tag-enhanced"><span>Azure</span></span>
                <span className="skill-tag skill-tag-enhanced"><span>Linux Administration</span></span>
                <span className="skill-tag skill-tag-enhanced"><span>Docker</span></span>
              </div>
            </div>
            <div className="skill-category skill-category-enhanced scroll-reveal">
              <h3><CodeIcon size={20} /> Programming</h3>
              <div className="skill-tags">
                <span className="skill-tag skill-tag-enhanced"><span>Python</span></span>
                <span className="skill-tag skill-tag-enhanced"><span>Bash Scripting</span></span>
                <span className="skill-tag skill-tag-enhanced"><span>JavaScript</span></span>
                <span className="skill-tag skill-tag-enhanced"><span>React</span></span>
              </div>
            </div>
            <div className="skill-category skill-category-enhanced scroll-reveal">
              <h3><SecurityIcon size={20} /> Security</h3>
              <div className="skill-tags">
                <span className="skill-tag skill-tag-enhanced"><span>Cybersecurity</span></span>
                <span className="skill-tag skill-tag-enhanced"><span>Packet Analysis</span></span>
                <span className="skill-tag skill-tag-enhanced"><span>Vulnerability Assessment</span></span>
                <span className="skill-tag skill-tag-enhanced"><span>Network Security</span></span>
              </div>
            </div>
          </div>
          
          <div className="scroll-reveal">
            <SkillsVisualization />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section section-enhanced">
        <div className="container">
          <h2 className="section-title section-title-enhanced scroll-reveal">Featured Projects</h2>
          <div className="scroll-reveal">
            <Projects />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="blog-section-wrapper section-enhanced">
        <div className="container">
          <h2 className="section-title section-title-enhanced scroll-reveal">Latest Updates</h2>
          <div className="scroll-reveal">
            <BlogSection />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section-enhanced">
        <div className="container">
          <h2 className="section-title section-title-enhanced scroll-reveal">Let's Work Together</h2>
          <p className="contact-subtitle scroll-reveal">
            Ready to bring your ideas to life? Let's connect and create something amazing!
          </p>
          <div className="contact-content">
            <div className="contact-info scroll-reveal-left">
              <div className="social-links">
                <a href="mailto:mohamedsuhaib.offl@outlook.com" className="contact-link contact-item-enhanced">
                  <div className="contact-icon-enhanced"><EmailIcon size={20} /></div>
                  <div>
                    <h3>Email</h3>
                    <span>Send me a message</span>
                  </div>
                </a>
                <a href="https://mohamedsuhaib.live" target="_blank" rel="noopener noreferrer" className="contact-link contact-item-enhanced">
                  <div className="contact-icon-enhanced"><WebsiteIcon size={20} /></div>
                  <div>
                    <h3>Website</h3>
                    <span>Visit my portfolio</span>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/shbmhmd03" target="_blank" rel="noopener noreferrer" className="contact-link contact-item-enhanced">
                  <div className="contact-icon-enhanced"><LinkedInIcon size={20} /></div>
                  <div>
                    <h3>LinkedIn</h3>
                    <span>Connect with me</span>
                  </div>
                </a>
                <a href="https://github.com/shbmhmd" target="_blank" rel="noopener noreferrer" className="contact-link contact-item-enhanced">
                  <div className="contact-icon-enhanced"><GitHubIcon size={20} /></div>
                  <div>
                    <h3>GitHub</h3>
                    <span>View my projects</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="scroll-reveal-right">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section scroll-reveal">
              <h3 className="footer-title">Mohamed Suhaib</h3>
              <p className="footer-description">
                Network Engineering Student passionate about cloud computing and cybersecurity. 
                Building innovative solutions for tomorrow's challenges.
              </p>
              <div className="footer-social">
                <a href="mailto:mohamedsuhaib.offl@outlook.com" className="social-link" aria-label="Email">
                  <EmailIcon size={20} />
                </a>
                <a href="https://www.linkedin.com/in/shbmhmd03" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon size={20} />
                </a>
                <a href="https://github.com/shbmhmd" className="social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon size={20} />
                </a>
                <a href="https://mohamedsuhaib.live" className="social-link" aria-label="Website" target="_blank" rel="noopener noreferrer">
                  <WebsiteIcon size={20} />
                </a>
              </div>
            </div>
            
            <div className="footer-section scroll-reveal">
              <h4 className="footer-subtitle">Quick Links</h4>
              <ul className="footer-links">
                <li><button onClick={() => scrollToSection('about')} className="footer-nav-btn">About</button></li>
                <li><button onClick={() => scrollToSection('skills')} className="footer-nav-btn">Skills</button></li>
                <li><button onClick={() => scrollToSection('projects')} className="footer-nav-btn">Projects</button></li>
                <li><button onClick={() => scrollToSection('blog')} className="footer-nav-btn">Blog</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="footer-nav-btn">Contact</button></li>
              </ul>
            </div>
            
            <div className="footer-section scroll-reveal">
              <h4 className="footer-subtitle">Services</h4>
              <ul className="footer-links">
                <li>Network Engineering</li>
                <li>Cloud Solutions</li>
                <li>Cybersecurity</li>
                <li>System Administration</li>
                <li>Technical Consulting</li>
              </ul>
            </div>
            
            <div className="footer-section scroll-reveal">
              <h4 className="footer-subtitle">Technologies</h4>
              <div className="footer-tech">
                <span className="tech-badge">Python</span>
                <span className="tech-badge">JavaScript</span>
                <span className="tech-badge">AWS</span>
                <span className="tech-badge">React</span>
                <span className="tech-badge">Cisco</span>
                <span className="tech-badge">Linux</span>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom scroll-reveal">
            <div className="footer-copyright">
              <p>&copy; 2025 Mohamed Suhaib. All rights reserved.</p>
              <p className="footer-made-with">
                Crafted with <span className="heart">💙</span> and lots of dedication
              </p>
            </div>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced AI Bot */}
      <AIBot />
    </div>
  );
};

export default App;
