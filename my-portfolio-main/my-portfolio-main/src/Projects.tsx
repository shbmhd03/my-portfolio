import { NetworkIcon, AnalyticsIcon, CloudIcon, SecurityIcon, WebsiteIcon } from './Icons';

interface Project {
  title: string;
  description: string;
  link: string;
  tech: string[];
  icon: JSX.Element;
}

const projects: Project[] = [
  {
    title: "Personal Portfolio Website",
    description: "A responsive portfolio site built with React and TypeScript, featuring modern design and smooth animations.",
    link: "https://mohamedsuhaib.live",
    tech: ["React", "TypeScript", "CSS3", "Vite"],
    icon: <NetworkIcon size={24} />
  },
  {
    title: "Network Packet Analyzer",
    description: "Advanced CLI tool for analyzing network packets using Python and Scapy with real-time monitoring capabilities.",
    link: "https://github.com/yourusername/packet-analyzer",
    tech: ["Python", "Scapy", "CLI", "Networking"],
    icon: <AnalyticsIcon size={24} />
  },
  {
    title: "Cloud Monitoring Dashboard",
    description: "Real-time dashboard for monitoring AWS EC2 and S3 resources using CloudWatch API with custom alerts.",
    link: "https://github.com/yourusername/cloud-monitor",
    tech: ["AWS", "CloudWatch", "JavaScript", "API"],
    icon: <CloudIcon size={24} />
  },
  {
    title: "Cybersecurity Toolkit",
    description: "Collection of security tools for vulnerability assessment and penetration testing with automated reporting.",
    link: "https://github.com/yourusername/security-toolkit",
    tech: ["Python", "Security", "Automation", "Reporting"],
    icon: <SecurityIcon size={24} />
  }
];

const Projects = () => (
  <div className="projects-grid">
    {projects.map((project, index) => (
      <div key={index} className="project-card project-card-enhanced scroll-reveal">
        <div className="project-header">
          <span className="project-icon">{project.icon}</span>
          <h3 className="project-title">{project.title}</h3>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.tech.map((tech, i) => (
            <span key={i} className="tech-tag">{tech}</span>
          ))}
        </div>
        <div className="project-links">
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
            <WebsiteIcon size={16} /> View Project
          </a>
        </div>
      </div>
    ))}
  </div>
);

export default Projects;
