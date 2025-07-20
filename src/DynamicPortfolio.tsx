import { useState, useEffect } from 'react';
import { contentAPI, projectsAPI, blogAPI } from './api';
import { 
  MdEmail, MdPhone, MdLocationOn, MdDownload, MdLaunch,
  MdCode, MdWork, MdSchool, MdCloud, MdDevices
} from 'react-icons/md';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaReact, FaPython, 
  FaAws, FaDocker, FaNodeJs
} from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiTailwindcss } from 'react-icons/si';

interface DynamicPortfolioProps {
  theme: 'light' | 'dark';
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const DynamicPortfolio = ({ theme, activeSection, setActiveSection }: DynamicPortfolioProps) => {
  const [portfolioData, setPortfolioData] = useState<any>({});
  const [projects, setProjects] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all dynamic content
  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        
        // Load all content in parallel
        const [contentResult, projectsResult, blogResult] = await Promise.all([
          contentAPI.getAllContent(),
          projectsAPI.getAll(),
          blogAPI.getAll()
        ]);

        if (contentResult.success) {
          setPortfolioData(contentResult.data);
        }
        
        setProjects(projectsResult);
        setBlogPosts(blogResult);
        
      } catch (err) {
        setError('Failed to load portfolio content');
        console.error('Error loading content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // Contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await contentAPI.submitContactForm(data);
      alert('Message sent successfully!');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-xl">Loading portfolio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Portfolio</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { hero, about, skills, contact } = portfolioData;

  return (
    <div className="dynamic-portfolio">
      {/* Hero Section */}
      <section id="home" className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="hero-content">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              {hero?.name || 'Mohamed Suhaib'}
            </h1>
            <h2 className="text-2xl md:text-3xl mb-4 text-gray-300">
              {hero?.title || 'Full Stack Developer'}
            </h2>
            <h3 className="text-xl md:text-2xl mb-6 text-blue-400">
              {hero?.subtitle || 'Cloud & DevOps Engineer'}
            </h3>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-400 leading-relaxed">
              {hero?.description || 'Passionate about creating scalable solutions and modern web applications.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={() => setActiveSection('contact')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300"
              >
                {hero?.primaryButtonText || 'Get In Touch'}
              </button>
              <a 
                href={`/${hero?.cvFileName || 'resume.pdf'}`}
                download
                className="px-8 py-4 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 flex items-center justify-center gap-2"
              >
                <MdDownload />
                {hero?.secondaryButtonText || 'Download CV'}
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6">
              {hero?.socialLinks?.map((link: any, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-400 hover:text-blue-400 transition duration-300"
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            {about?.title || 'About Me'}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {about?.paragraph1 || 'Default about paragraph 1'}
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {about?.paragraph2 || 'Default about paragraph 2'}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {about?.stats && Object.entries(about.stats).map(([key, stat]: [string, any]) => (
                  <div key={key} className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Skills */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Technical Skills</h3>
              {about?.skills?.map((skill: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-blue-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Categories Section */}
      <section id="skills" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            {skills?.title || 'Skills & Technologies'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills?.categories?.map((category: any, index: number) => (
              <div key={index} className="bg-gray-900 rounded-lg p-8 text-center hover:bg-gray-700 transition duration-300">
                <div className="text-4xl mb-4 text-blue-400">
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{category.name}</h3>
                <ul className="space-y-2">
                  {category.skills?.map((skill: string, skillIndex: number) => (
                    <li key={skillIndex} className="text-gray-300">{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Featured Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition duration-300">
                {project.image && (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech?.map((tech: string, index: number) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Links */}
                  <div className="flex gap-4">
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                      >
                        <FaGithub /> Code
                      </a>
                    )}
                    {project.liveDemo && (
                      <a 
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
                      >
                        <MdLaunch /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {blogPosts.length > 0 && (
        <section id="blog" className="py-20 bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Latest Blog Posts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.filter(post => post.published).map((post: any) => (
                <article key={post.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-700 transition duration-300">
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white">{post.title}</h3>
                    <p className="text-gray-300 mb-4">{post.excerpt}</p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags?.map((tag: string, index: number) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-purple-500 text-white text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            {contact?.title || 'Get In Touch'}
          </h2>
          <p className="text-center text-gray-300 mb-16">
            {contact?.subtitle || "Let's work together on your next project"}
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              
              <div className="space-y-4">
                {contact?.email && (
                  <div className="flex items-center gap-4">
                    <MdEmail className="text-2xl text-blue-400" />
                    <a href={`mailto:${contact.email}`} className="text-gray-300 hover:text-blue-400">
                      {contact.email}
                    </a>
                  </div>
                )}
                
                {contact?.phone && (
                  <div className="flex items-center gap-4">
                    <MdPhone className="text-2xl text-blue-400" />
                    <span className="text-gray-300">{contact.phone}</span>
                  </div>
                )}
                
                {contact?.location && (
                  <div className="flex items-center gap-4">
                    <MdLocationOn className="text-2xl text-blue-400" />
                    <span className="text-gray-300">{contact.location}</span>
                  </div>
                )}
              </div>
              
              {/* Social Links */}
              {contact?.socialLinks && (
                <div className="mt-8">
                  <h4 className="text-xl font-bold mb-4 text-white">Follow Me</h4>
                  <div className="flex gap-4">
                    {contact.socialLinks.map((link: any, index: number) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-gray-400 hover:text-blue-400 transition duration-300"
                      >
                        {getSocialIcon(link.platform)}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Contact Form */}
            {contact?.contactForm?.enabled && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Send Message</h3>
                
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      required
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <textarea
                      name="message"
                      rows={6}
                      placeholder="Your Message"
                      required
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper functions for icons
const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'github': return <FaGithub />;
    case 'linkedin': return <FaLinkedin />;
    case 'twitter': return <FaTwitter />;
    case 'email': return <MdEmail />;
    default: return <MdLaunch />;
  }
};

const getCategoryIcon = (icon: string) => {
  switch (icon) {
    case 'code': return <MdCode />;
    case 'server': return <MdDevices />;
    case 'cloud': return <MdCloud />;
    case 'work': return <MdWork />;
    case 'school': return <MdSchool />;
    default: return <MdCode />;
  }
};

export default DynamicPortfolio;
