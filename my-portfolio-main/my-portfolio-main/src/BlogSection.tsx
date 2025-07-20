import { BookOpenIcon, NewsletterIcon, TrendingUpIcon, BrainIcon, EmailIcon } from './Icons';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  tags: string[];
}

const BlogSection = () => {
  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'Building a Network Monitoring System with Python',
      excerpt: 'Learn how I created an automated network monitoring system using Python, SNMP, and real-time alerting to track network performance and security.',
      date: 'June 25, 2025',
      category: 'Networking',
      readTime: '5 min read',
      tags: ['Python', 'SNMP', 'Monitoring', 'Automation']
    },
    {
      id: '2',
      title: 'My Journey with AWS Cloud Architecture',
      excerpt: 'Exploring cloud computing fundamentals and building scalable applications on AWS. From EC2 to Lambda and everything in between.',
      date: 'June 20, 2025',
      category: 'Cloud Computing',
      readTime: '7 min read',
      tags: ['AWS', 'Cloud', 'Architecture', 'Learning']
    },
    {
      id: '3',
      title: 'Cybersecurity Best Practices for Small Networks',
      excerpt: 'Essential security measures every small business should implement to protect their network infrastructure from common threats.',
      date: 'June 15, 2025',
      category: 'Cybersecurity',
      readTime: '6 min read',
      tags: ['Security', 'Network', 'Best Practices', 'SMB']
    },
    {
      id: '4',
      title: 'React Portfolio Development: Lessons Learned',
      excerpt: 'Sharing my experience building this portfolio website with React, TypeScript, and modern web development practices.',
      date: 'June 10, 2025',
      category: 'Web Development',
      readTime: '4 min read',
      tags: ['React', 'TypeScript', 'Portfolio', 'Frontend']
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Networking': '#3b82f6',
      'Cloud Computing': '#8b5cf6',
      'Cybersecurity': '#ef4444',
      'Web Development': '#10b981'
    };
    return colors[category as keyof typeof colors] || '#64748b';
  };

  return (
    <div className="blog-section">
      <div className="blog-section-header">
        <div className="blog-header-content">
          <div className="blog-icon-wrapper">
            <TrendingUpIcon size={32} />
          </div>
          <h3 className="blog-section-title">Latest Updates & Insights</h3>
        </div>
        <p className="blog-subtitle">
          <BrainIcon size={20} />
          <span>Sharing my learning journey and technical experiences</span>
        </p>
      </div>
      
      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.id} className="blog-card blog-card-enhanced scroll-reveal">
            <div className="blog-header">
              <span 
                className="blog-category"
                style={{ backgroundColor: getCategoryColor(post.category) }}
              >
                {post.category}
              </span>
              <span className="blog-date">{post.date}</span>
            </div>
            
            <h4 className="blog-title">{post.title}</h4>
            <p className="blog-excerpt">{post.excerpt}</p>
            
            <div className="blog-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-tag">#{tag}</span>
              ))}
            </div>
            
            <div className="blog-footer">
              <span className="read-time">
                <BookOpenIcon size={16} />
                {post.readTime}
              </span>
              <button className="read-more-btn">Read More →</button>
            </div>
          </article>
        ))}
      </div>
      
      <div className="blog-cta blog-cta-enhanced">
        <h4 className="newsletter-title">
          <NewsletterIcon size={24} />
          Stay Updated with My Latest Posts
        </h4>
        <p>Get notified when I publish new articles about networking, cloud computing, and cybersecurity!</p>
        <div className="newsletter-signup newsletter-signup-enhanced">
          <input 
            type="email" 
            placeholder="Enter your email address"
            className="newsletter-input newsletter-input-enhanced"
          />
          <button className="newsletter-btn newsletter-btn-enhanced">
            <span>Subscribe</span>
            <span className="btn-icon">
              <EmailIcon size={18} />
            </span>
          </button>
        </div>
        <p className="newsletter-note">No spam, unsubscribe anytime. Usually 1-2 emails per month.</p>
      </div>
    </div>
  );
};

export default BlogSection;
