import { useState, useEffect } from 'react';
import { 
  FaNetworkWired, FaPython, FaReact, FaAws, FaLinux
} from 'react-icons/fa';
import { 
  MdSecurity, MdSettings 
} from 'react-icons/md';

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
  icon: string;
}

// Icon mapping for skill icons
const iconMap: { [key: string]: JSX.Element } = {
  FaNetworkWired: <FaNetworkWired />,
  MdSettings: <MdSettings />,
  FaLinux: <FaLinux />,
  FaPython: <FaPython />,
  FaReact: <FaReact />,
  FaAws: <FaAws />,
  MdSecurity: <MdSecurity />,
  SiWireshark: <MdSecurity />, // Using MdSecurity as fallback
};

const SkillsVisualization = () => {
  const [isVisible, setIsVisible] = useState(false);

  const skills: Skill[] = [
    { name: 'Network Troubleshooting', level: 90, category: 'Networking', color: '#3b82f6', icon: 'FaNetworkWired' },
    { name: 'Cisco Configuration', level: 85, category: 'Networking', color: '#3b82f6', icon: 'MdSettings' },
    { name: 'Linux Administration', level: 88, category: 'Systems', color: '#10b981', icon: 'FaLinux' },
    { name: 'Python Programming', level: 82, category: 'Programming', color: '#f59e0b', icon: 'FaPython' },
    { name: 'JavaScript/React', level: 78, category: 'Programming', color: '#f59e0b', icon: 'FaReact' },
    { name: 'AWS Cloud Services', level: 75, category: 'Cloud', color: '#8b5cf6', icon: 'FaAws' },
    { name: 'Cybersecurity', level: 80, category: 'Security', color: '#ef4444', icon: 'MdSecurity' },
    { name: 'Wireshark Analysis', level: 85, category: 'Security', color: '#ef4444', icon: 'SiWireshark' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getSkillLevel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="skills-visualization skills-visualization-enhanced">
      <h3 className="skills-title">Technical Proficiency</h3>
      <p className="skills-subtitle">My expertise across different technology domains</p>
      <div className="skills-bars">
        {skills.map((skill, index) => (
          <div key={skill.name} className="skill-item skill-item-enhanced">
            <div className="skill-header">
              <div className="skill-info">
                <div className="skill-name-container">
                  <span className="skill-icon">{iconMap[skill.icon] || iconMap['MdSecurity']}</span>
                  <span className="skill-name">{skill.name}</span>
                </div>
                <div className="skill-level-container">
                  <span className="skill-percentage">{skill.level}%</span>
                  <span className="skill-level-text">{getSkillLevel(skill.level)}</span>
                </div>
              </div>
            </div>
            <div className="skill-bar">
              <div className="skill-bar-bg"></div>
              <div 
                className="skill-progress"
                style={{
                  width: isVisible ? `${skill.level}%` : '0%',
                  backgroundColor: skill.color,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                <div className="skill-progress-glow" style={{ backgroundColor: skill.color }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsVisualization;
