import { useState, useEffect } from 'react';
import { 
  FaTools, 
  FaCog, 
  FaWrench, 
  FaHammer, 
  FaCogs, 
  FaCode, 
  FaPaintBrush, 
  FaLaptopCode,
  FaClock,
  FaEnvelope,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaLock,
  FaUser,
  FaDesktop,
  FaMobile,
  FaTablet,
  FaRocket,
  FaBolt
} from 'react-icons/fa';
import './MaintenancePage.css';

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

interface MaintenancePageProps {
  maintenanceMode: MaintenanceMode;
  onAdminAccess: () => void;
}

const MaintenancePage = ({ maintenanceMode, onAdminAccess }: MaintenancePageProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    if (maintenanceMode.showCountdown && maintenanceMode.endDate) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const endTime = new Date(maintenanceMode.endDate).getTime();
        const distance = endTime - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          if (days > 0) {
            setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
          } else if (hours > 0) {
            setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
          } else {
            setTimeRemaining(`${minutes}m ${seconds}s`);
          }
        } else {
          setTimeRemaining('Almost ready!');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [maintenanceMode.showCountdown, maintenanceMode.endDate]);

  return (
    <div className="maintenance-page">
      <div className="maintenance-background">
        {/* Professional maintenance animation sequence */}
        <div className="maintenance-final-animation">
          
          {/* Central development hub */}
          <div className="development-hub">
            <div className="hub-core">
              <div className="core-circle">
                <FaCogs className="core-icon" />
                <div className="energy-rings">
                  <div className="ring ring-1"></div>
                  <div className="ring ring-2"></div>
                  <div className="ring ring-3"></div>
                </div>
              </div>
            </div>
            
            {/* Orbiting development elements */}
            <div className="orbit-container">
              <div className="orbit orbit-1">
                <div className="orbit-item item-1">
                  <FaCode />
                  <div className="item-trail"></div>
                </div>
              </div>
              <div className="orbit orbit-2">
                <div className="orbit-item item-2">
                  <FaPaintBrush />
                  <div className="item-trail"></div>
                </div>
              </div>
              <div className="orbit orbit-3">
                <div className="orbit-item item-3">
                  <FaRocket />
                  <div className="item-trail"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Matrix-style code rain */}
          <div className="code-matrix">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`matrix-column column-${i + 1}`}>
                {[...Array(8)].map((_, j) => (
                  <span key={j} className={`matrix-char char-${j + 1}`}>
                    {['<', '>', '{', '}', '(', ')', ';', '='][j]}
                  </span>
                ))}
              </div>
            ))}
          </div>
          
          {/* Floating workspace elements */}
          <div className="workspace-constellation">
            <div className="workspace-node node-1">
              <FaDesktop />
              <div className="node-pulse"></div>
              <div className="connection-line line-to-2"></div>
            </div>
            <div className="workspace-node node-2">
              <FaTablet />
              <div className="node-pulse"></div>
              <div className="connection-line line-to-3"></div>
            </div>
            <div className="workspace-node node-3">
              <FaMobile />
              <div className="node-pulse"></div>
              <div className="connection-line line-to-1"></div>
            </div>
          </div>
          
          {/* Animated progress bars */}
          <div className="progress-constellation">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`progress-line line-${i + 1}`}>
                <div className="progress-fill"></div>
                <div className="progress-spark"></div>
              </div>
            ))}
          </div>
          
          {/* Energy waves */}
          <div className="energy-waves">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`wave wave-${i + 1}`}></div>
            ))}
          </div>
          
          {/* Holographic grid */}
          <div className="holographic-grid">
            <div className="grid-lines vertical">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`grid-line v-line-${i + 1}`}></div>
              ))}
            </div>
            <div className="grid-lines horizontal">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`grid-line h-line-${i + 1}`}></div>
              ))}
            </div>
          </div>
          
          {/* Floating tech icons with trails */}
          <div className="tech-constellation">
            {[
              { icon: FaBolt, class: 'tech-1' },
              { icon: FaLaptopCode, class: 'tech-2' },
              { icon: FaHammer, class: 'tech-3' },
              { icon: FaWrench, class: 'tech-4' },
              { icon: FaTools, class: 'tech-5' },
              { icon: FaCog, class: 'tech-6' }
            ].map((item, i) => (
              <div key={i} className={`floating-tech ${item.class}`}>
                <item.icon />
                <div className="tech-trail"></div>
                <div className="tech-glow"></div>
              </div>
            ))}
          </div>
          
        </div>
      </div>

      <div className="maintenance-container">
        <div className="maintenance-content">
          <div className="glossy-overlay"></div>
          {/* Main maintenance icon */}
          <div className="maintenance-icon-container">
            <div className="maintenance-icon">
              <div className="icon-bg">
                <FaTools />
              </div>
              <div className="icon-pulse"></div>
              <div className="progress-ring">
                <svg className="progress-circle" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="progress-track" />
                  <circle cx="50" cy="50" r="40" className="progress-fill" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="maintenance-title">
            <FaLaptopCode className="title-icon" />
            Crafting Something Amazing
          </h1>
          
          <h2 className="maintenance-subtitle">
            Our Developer is Hard at Work
          </h2>

          {/* Maintenance message */}
          <p className="maintenance-message">
            {maintenanceMode.message || 
             "I'm currently designing and coding new features to enhance your experience. Every line of code is being carefully crafted!"}
          </p>

          {/* Estimated duration */}
          {maintenanceMode.estimatedDuration && (
            <div className="maintenance-duration">
              <div className="duration-icon"><FaClock /></div>
              <div className="duration-text">
                <strong>Estimated Completion:</strong> {maintenanceMode.estimatedDuration}
              </div>
            </div>
          )}

          {/* Countdown timer */}
          {maintenanceMode.showCountdown && maintenanceMode.endDate && timeRemaining && (
            <div className="maintenance-countdown">
              <div className="countdown-label">Back online in:</div>
              <div className="countdown-timer">
                <span className="countdown-time">{timeRemaining}</span>
              </div>
              <div className="countdown-progress">
                <div className="progress-bar"></div>
              </div>
            </div>
          )}

          {/* Contact information */}
          <div className="maintenance-contact">
            <div className="contact-text">
              Need immediate assistance?
            </div>
            <button 
              className="contact-button"
              title="Contact Support"
            >
              <FaEnvelope /> Contact Me
            </button>
          </div>

          {/* Social links */}
          <div className="maintenance-social">
            <div className="social-text">Stay updated:</div>
            <div className="social-links">
              <a href="#" className="social-link" title="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-link" title="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" className="social-link" title="Facebook">
                <FaFacebook />
              </a>
            </div>
          </div>

          {/* Admin access */}
          {maintenanceMode.allowAdminAccess && (
            <div className="maintenance-admin">
              <button 
                className="admin-access-btn"
                onClick={() => setShowAdminLogin(!showAdminLogin)}
              >
                <FaLock /> Admin Access
              </button>
              
              {showAdminLogin && (
                <div className="admin-login-form">
                  <input 
                    type="password" 
                    placeholder="Admin password"
                    className="admin-password-input"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value === 'admin123') {
                        onAdminAccess();
                      }
                    }}
                  />
                  <button 
                    className="admin-login-btn"
                    onClick={onAdminAccess}
                  >
                    Access
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="maintenance-footer">
            <p>Thank you for your patience while I craft something special!</p>
            <div className="footer-animation">
              <div className="progress-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
