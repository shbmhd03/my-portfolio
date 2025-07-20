import { useEffect, useState } from 'react';
import Projects from './Projects';
import AIBot from './AIBot';
import ContactForm from './ContactForm';
import SkillsVisualization from './SkillsVisualization';
import BlogSection from './BlogSection';
import { CodeIcon, RocketIcon, NetworkIcon, CloudIcon, SecurityIcon, EmailIcon, WebsiteIcon, LinkedInIcon, GitHubIcon, SunIcon, MoonIcon } from './Icons';

// Simple Typing Effect Component
const SimpleTypingEffect = ({ text, speed = 50, restartDelay = 15000 }: {
  text: string;
  speed?: number;
  restartDelay?: number;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let timeout: number;
    
    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeout = window.setTimeout(typeText, speed);
      } else {
        setIsTyping(false);
        // Restart after delay
        timeout = window.setTimeout(() => {
          setDisplayText('');
          currentIndex = 0;
          setIsTyping(true);
          typeText();
        }, restartDelay);
      }
    };

    typeText();

    return () => clearTimeout(timeout);
  }, [text, speed, restartDelay]);

  return <span>{displayText}{isTyping && '|'}</span>;
};

interface PortfolioProps {
  aboutContent: any;
  homePageContent: any;
  theme: string;
  toggleTheme: () => void;
  activeSection: string;
  scrollToSection: (section: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

const Portfolio = ({ 
  aboutContent, 
  homePageContent, 
  theme, 
  toggleTheme, 
  activeSection, 
  scrollToSection, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  toggleMobileMenu 
}: PortfolioProps) => {
  
  // Scroll reveal animation setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const scrollElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    scrollElements.forEach((el) => observer.observe(el));

    return () => {
      scrollElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

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
            <h1 className="hero-title" style={{ textAlign: 'center' }}>
              <span className="gradient-text">
                <SimpleTypingEffect 
                  text="Hi, I'm Mohamed Suhaib" 
                  speed={80}
                  restartDelay={15000}
                />
              </span>
            </h1>
            <p className="hero-subtitle" style={{ textAlign: 'center', fontSize: '1.4rem', marginTop: '1rem' }}>
              <SimpleTypingEffect 
                text="Network Engineering Student & Tech Enthusiast" 
                speed={40}
                restartDelay={15000}
              />
            </p>
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

export default Portfolio;
