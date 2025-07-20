import { useState } from 'react';
import { BriefcaseIcon, HandshakeIcon, NetworkIcon, LightbulbIcon, QuestionMarkIcon, TargetIcon } from './Icons';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // In a real application, you would send this data to your backend
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <div className="contact-form-container contact-form-container-enhanced">
      <div className="contact-form-header">
        <h3>✨ Send me a message</h3>
        <p>Ready to bring your ideas to life? Let's connect and create something amazing together!</p>
      </div>
      <form onSubmit={handleSubmit} className="contact-form contact-form-enhanced">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">What's this about?</label>
          <div className="custom-select-wrapper">
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="custom-select"
            >
              <option value="">Choose a topic...</option>
              <option value="job-opportunity">Job Opportunity</option>
              <option value="project-collaboration">Project Collaboration</option>
              <option value="networking">Professional Networking</option>
              <option value="consultation">Technical Consultation</option>
              <option value="general-inquiry">General Inquiry</option>
              <option value="other">Something Else</option>
            </select>
            <div className="select-icon">
              {formData.subject === 'job-opportunity' && <BriefcaseIcon size={20} />}
              {formData.subject === 'project-collaboration' && <HandshakeIcon size={20} />}
              {formData.subject === 'networking' && <NetworkIcon size={20} />}
              {formData.subject === 'consultation' && <LightbulbIcon size={20} />}
              {formData.subject === 'general-inquiry' && <QuestionMarkIcon size={20} />}
              {formData.subject === 'other' && <TargetIcon size={20} />}
              {!formData.subject && <QuestionMarkIcon size={20} />}
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Your Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Tell me about your project, idea, or opportunity. I'd love to hear from you! 🚀"
            rows={5}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={!isFormValid || isSubmitting}
          className={`submit-btn submit-btn-enhanced ${submitStatus}`}
        >
          {isSubmitting ? (
            <>
              <span className="spinner spinner-enhanced"></span>
              <span>Sending message...</span>
            </>
          ) : submitStatus === 'success' ? (
            <>
              <span>✨</span>
              <span>Message Sent Successfully!</span>
            </>
          ) : submitStatus === 'error' ? (
            <>
              <span>⚠️</span>
              <span>Failed to Send - Try Again</span>
            </>
          ) : (
            <>
              <span>🚀</span>
              <span>Send Message</span>
            </>
          )}
        </button>
        
        {submitStatus === 'success' && (
          <p className="success-message">
            Thanks for your message! I'll get back to you soon.
          </p>
        )}
        
        {submitStatus === 'error' && (
          <p className="error-message">
            Something went wrong. Please try again or email me directly.
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
