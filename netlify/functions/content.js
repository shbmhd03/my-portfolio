// Enhanced Netlify Function for comprehensive content management
// In-memory store for development (replace with database in production)
let portfolioData = {
  // Hero/Home Section
  hero: {
    name: "Mohamed Suhaib",
    title: "Full Stack Developer",
    subtitle: "Cloud & DevOps Engineer",
    description: "Passionate about creating scalable solutions and modern web applications with cutting-edge technologies.",
    primaryButtonText: "Get In Touch",
    secondaryButtonText: "Download CV",
    cvFileName: "resume.pdf",
    backgroundImage: "",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/shbmhmd", icon: "github" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/mohamedsuhaib", icon: "linkedin" },
      { platform: "Twitter", url: "https://twitter.com/mohamedsuhaib", icon: "twitter" }
    ]
  },

  // About Section
  about: {
    title: "About Me",
    paragraph1: "I'm a passionate full-stack developer with expertise in modern web technologies and cloud infrastructure.",
    paragraph2: "I love creating efficient, scalable solutions and staying up-to-date with the latest industry trends.",
    profileImage: "/profile.jpg",
    stats: {
      experience: { value: "3+", label: "Years Experience" },
      projects: { value: "25+", label: "Projects Completed" },
      technologies: { value: "15+", label: "Technologies" }
    },
    skills: [
      { name: "React/TypeScript", level: 90, category: "frontend" },
      { name: "Node.js/Express", level: 85, category: "backend" },
      { name: "AWS/Cloud", level: 80, category: "cloud" },
      { name: "Python", level: 85, category: "backend" },
      { name: "Docker/K8s", level: 75, category: "devops" }
    ]
  },

  // Skills Section
  skills: {
    title: "Skills & Technologies",
    categories: [
      {
        name: "Frontend Development",
        icon: "code",
        skills: ["React", "TypeScript", "Vue.js", "HTML5/CSS3", "Tailwind CSS"]
      },
      {
        name: "Backend Development", 
        icon: "server",
        skills: ["Node.js", "Python", "Express.js", "Django", "REST APIs"]
      },
      {
        name: "Cloud & DevOps",
        icon: "cloud",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"]
      }
    ]
  },

  // Projects Section
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React frontend and Node.js backend, featuring payment integration and admin dashboard.",
      longDescription: "A comprehensive e-commerce platform built with modern technologies...",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      link: "https://github.com/example/ecommerce",
      liveDemo: "https://demo.example.com",
      image: "/projects/ecommerce.jpg",
      featured: true,
      category: "Full Stack",
      status: "completed",
      startDate: "2024-01-01",
      endDate: "2024-03-15"
    }
  ],

  // Blog Section
  blog: {
    title: "Latest Blog Posts",
    posts: [
      {
        id: "1",
        title: "Building Scalable React Applications",
        excerpt: "Learn best practices for building large-scale React applications with TypeScript.",
        content: "Full blog post content here...",
        author: "Mohamed Suhaib",
        publishDate: "2024-07-15",
        readTime: "5 min read",
        tags: ["React", "TypeScript", "Best Practices"],
        image: "/blog/react-scalable.jpg",
        published: true
      }
    ]
  },

  // Contact Section
  contact: {
    title: "Get In Touch",
    subtitle: "Let's work together on your next project",
    email: "contact@mohamedsuhaib.live",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    socialLinks: [
      { platform: "Email", url: "mailto:contact@mohamedsuhaib.live", icon: "email" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/mohamedsuhaib", icon: "linkedin" },
      { platform: "GitHub", url: "https://github.com/shbmhmd", icon: "github" }
    ],
    contactForm: {
      enabled: true,
      fields: ["name", "email", "subject", "message"],
      emailNotifications: true
    }
  },

  // Site Configuration
  config: {
    siteName: "Mohamed Suhaib - Portfolio",
    siteDescription: "Full Stack Developer & Cloud Engineer Portfolio",
    siteUrl: "https://mohamedsuhaib.live",
    theme: "dark",
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    analytics: {
      googleAnalytics: "",
      enabled: false
    },
    seo: {
      keywords: ["Full Stack Developer", "React", "Node.js", "AWS", "Cloud Engineer"],
      ogImage: "/og-image.jpg"
    }
  },

  // Maintenance Mode
  maintenance: {
    isGloballyActive: false,
    message: "We're currently updating our portfolio to serve you better!",
    estimatedTime: "We'll be back online shortly",
    allowedIPs: [],
    scheduleStart: null,
    scheduleEnd: null,
    lastUpdated: new Date().toISOString()
  }
};

export const handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const { section, action, id } = event.queryStringParameters || {};

  try {
    switch (event.httpMethod) {
      case 'GET':
        return await handleGet(section, id, headers);
      
      case 'POST':
        return await handlePost(section, JSON.parse(event.body || '{}'), headers);
      
      case 'PUT':
        return await handlePut(section, id, JSON.parse(event.body || '{}'), headers);
      
      case 'DELETE':
        return await handleDelete(section, id, headers);
      
      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
  } catch (error) {
    console.error('Error in content function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};

// GET handlers
async function handleGet(section, id, headers) {
  if (!section) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: portfolioData
      })
    };
  }

  if (section === 'projects' && id) {
    const project = portfolioData.projects.find(p => p.id === id);
    return {
      statusCode: project ? 200 : 404,
      headers,
      body: JSON.stringify({
        success: !!project,
        data: project || null
      })
    };
  }

  if (section === 'blog' && id) {
    const post = portfolioData.blog.posts.find(p => p.id === id);
    return {
      statusCode: post ? 200 : 404,
      headers,
      body: JSON.stringify({
        success: !!post,
        data: post || null
      })
    };
  }

  const sectionData = portfolioData[section];
  return {
    statusCode: sectionData ? 200 : 404,
    headers,
    body: JSON.stringify({
      success: !!sectionData,
      data: sectionData || null
    })
  };
}

// POST handlers
async function handlePost(section, data, headers) {
  switch (section) {
    case 'projects':
      const newProject = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString()
      };
      portfolioData.projects.push(newProject);
      break;

    case 'blog':
      const newPost = {
        id: Date.now().toString(),
        ...data,
        publishDate: new Date().toISOString()
      };
      portfolioData.blog.posts.push(newPost);
      break;

    case 'contact':
      console.log('Contact form submission:', data);
      break;

    default:
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid section for POST' })
      };
  }

  return {
    statusCode: 201,
    headers,
    body: JSON.stringify({
      success: true,
      message: `${section} created successfully`
    })
  };
}

// PUT handlers
async function handlePut(section, id, data, headers) {
  if (section === 'projects' && id) {
    const projectIndex = portfolioData.projects.findIndex(p => p.id === id);
    if (projectIndex !== -1) {
      portfolioData.projects[projectIndex] = { ...portfolioData.projects[projectIndex], ...data };
    }
  } else if (section === 'blog' && id) {
    const postIndex = portfolioData.blog.posts.findIndex(p => p.id === id);
    if (postIndex !== -1) {
      portfolioData.blog.posts[postIndex] = { ...portfolioData.blog.posts[postIndex], ...data };
    }
  } else {
    portfolioData[section] = { ...portfolioData[section], ...data };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      message: `${section} updated successfully`
    })
  };
}

// DELETE handlers
async function handleDelete(section, id, headers) {
  if (section === 'projects' && id) {
    portfolioData.projects = portfolioData.projects.filter(p => p.id !== id);
  } else if (section === 'blog' && id) {
    portfolioData.blog.posts = portfolioData.blog.posts.filter(p => p.id !== id);
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      message: `${section} deleted successfully`
    })
  };
}
