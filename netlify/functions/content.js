// Netlify Function for Portfolio Content Management
// Handles dynamic content for the portfolio site

const portfolioContent = {
  hero: {
    name: "Mohamed Suhaib",
    title: "Full Stack Developer",
    subtitle: "Building Modern Web Applications",
    description: "Passionate developer with expertise in React, Node.js, and modern web technologies. I create responsive, user-friendly applications that solve real-world problems.",
    image: "/images/profile.jpg",
    resumeUrl: "/resume.pdf"
  },
  about: {
    title: "About Me",
    description: "I'm a passionate full-stack developer with experience in modern web technologies. I love creating efficient, scalable, and user-friendly applications.",
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "PostgreSQL", "MongoDB"],
    experience: "3+ years of professional development experience",
    education: "Computer Science Background",
    location: "Available for remote work"
  },
  skills: {
    title: "Technical Skills",
    categories: {
      frontend: {
        title: "Frontend",
        skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vue.js"]
      },
      backend: {
        title: "Backend", 
        skills: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"]
      },
      tools: {
        title: "Tools & Technologies",
        skills: ["Git", "Docker", "AWS", "Netlify", "Vercel", "VS Code", "Figma"]
      }
    }
  },
  projects: [
    {
      id: "1",
      title: "Portfolio Website",
      description: "Modern React portfolio with admin panel and AI chatbot",
      technologies: ["React", "TypeScript", "Vite", "Netlify"],
      image: "/images/portfolio-project.jpg",
      githubUrl: "https://github.com/shbmhd03/my-portfolio",
      liveUrl: "https://mohamedsuhaib.live",
      featured: true
    }
  ],
  contact: {
    title: "Get In Touch",
    description: "I'm always open to discussing new opportunities and interesting projects.",
    email: "contact@mohamedsuhaib.live",
    phone: "+1 (555) 123-4567",
    location: "Available for remote work",
    social: {
      github: "https://github.com/shbmhd03",
      linkedin: "https://linkedin.com/in/mohamedsuhaib",
      twitter: "https://twitter.com/mohamedsuhaib"
    }
  }
};

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { httpMethod, queryStringParameters, body } = event;
    const section = queryStringParameters?.section;
    const id = queryStringParameters?.id;

    switch (httpMethod) {
      case 'GET':
        if (!section) {
          // Return all content
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              data: portfolioContent
            })
          };
        }

        if (section === 'projects' && id) {
          // Get specific project
          const project = portfolioContent.projects.find(p => p.id === id);
          if (!project) {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({
                success: false,
                error: 'Project not found'
              })
            };
          }
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              data: project
            })
          };
        }

        // Get specific section
        const sectionData = portfolioContent[section];
        if (!sectionData) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({
              success: false,
              error: 'Section not found'
            })
          };
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: sectionData
          })
        };

      case 'POST':
        if (section === 'contact') {
          // Handle contact form submission
          const formData = JSON.parse(body);
          
          // Here you would typically send an email or save to database
          console.log('Contact form submission:', formData);
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              message: 'Message sent successfully!'
            })
          };
        }

        if (section === 'projects') {
          // Add new project (admin functionality)
          const projectData = JSON.parse(body);
          const newProject = {
            id: Date.now().toString(),
            ...projectData
          };
          portfolioContent.projects.push(newProject);
          
          return {
            statusCode: 201,
            headers,
            body: JSON.stringify({
              success: true,
              data: newProject
            })
          };
        }

        break;

      case 'PUT':
        if (section && body) {
          // Update content section
          const updateData = JSON.parse(body);
          
          if (section === 'projects' && id) {
            // Update specific project
            const projectIndex = portfolioContent.projects.findIndex(p => p.id === id);
            if (projectIndex === -1) {
              return {
                statusCode: 404,
                headers,
                body: JSON.stringify({
                  success: false,
                  error: 'Project not found'
                })
              };
            }
            portfolioContent.projects[projectIndex] = { ...portfolioContent.projects[projectIndex], ...updateData };
            
            return {
              statusCode: 200,
              headers,
              body: JSON.stringify({
                success: true,
                data: portfolioContent.projects[projectIndex]
              })
            };
          } else {
            // Update section
            portfolioContent[section] = { ...portfolioContent[section], ...updateData };
            
            return {
              statusCode: 200,
              headers,
              body: JSON.stringify({
                success: true,
                data: portfolioContent[section]
              })
            };
          }
        }
        break;

      case 'DELETE':
        if (section === 'projects' && id) {
          // Delete project
          const projectIndex = portfolioContent.projects.findIndex(p => p.id === id);
          if (projectIndex === -1) {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({
                success: false,
                error: 'Project not found'
              })
            };
          }
          
          portfolioContent.projects.splice(projectIndex, 1);
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              message: 'Project deleted successfully'
            })
          };
        }
        break;

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Method not allowed'
          })
        };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Invalid request'
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error'
      })
    };
  }
};
