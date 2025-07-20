import { useState, useRef, useEffect } from 'react';

// Custom SVG Icons
const BotIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9C7.9 1 7 1.9 7 3V9C7 11.2 8.8 13 11 13V15L12.5 13.5C13.3 13.8 14.2 14 15 14H19C20.1 14 21 13.1 21 12V9ZM11 11C10.4 11 10 10.6 10 10S10.4 9 11 9 12 9.4 12 10 11.6 11 11 11ZM15 11C14.4 11 14 10.6 14 10S14.4 9 15 9 16 9.4 16 10 15.6 11 15 11Z"/>
  </svg>
);

const UserIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
  </svg>
);

const CloseIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
  </svg>
);

const SendIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"/>
  </svg>
);

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AIBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Mohamed's AI assistant. I can help you learn more about his skills, projects, and experience. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses: { [key: string]: string } = {
    'skills': "Mohamed has expertise in:\n• Network Engineering: Cisco, Mikrotik, Network Troubleshooting\n• Cloud Computing: AWS, Azure basics\n• Programming: Python, JavaScript, React, Bash\n• Cybersecurity: Security Analysis, Packet Analysis, Wireshark\n• System Administration: Linux Administration",
    'projects': "Mohamed has worked on several impressive projects:\n• Personal Portfolio Website (React, TypeScript)\n• Network Packet Analyzer (Python, Scapy)\n• Cloud Monitoring Dashboard (AWS, CloudWatch)\n• Cybersecurity Toolkit (Security tools & automation)\n\nWould you like to know more about any specific project?",
    'experience': "Mohamed is currently:\n• Studying Network Engineering at ESOFT Metro Campus\n• Pursuing HND in Computing\n• Building expertise in cloud computing and cybersecurity\n• Passionate about solving complex technical problems",
    'contact': "You can reach Mohamed through:\n• Email: <a href='mailto:mohamedsuhaib.offl@outlook.com' target='_blank' style='color: var(--accent); text-decoration: underline;'>mohamedsuhaib.offl@outlook.com</a>\n• Website: <a href='https://mohamedsuhaib.live' target='_blank' style='color: var(--accent); text-decoration: underline;'>mohamedsuhaib.live</a>\n• LinkedIn: <a href='https://linkedin.com/in/yourprofile' target='_blank' style='color: var(--accent); text-decoration: underline;'>LinkedIn Profile</a>\n• GitHub: <a href='https://github.com/yourusername' target='_blank' style='color: var(--accent); text-decoration: underline;'>GitHub Profile</a>\n\nFeel free to download his resume too!",
    'education': "Mohamed is pursuing his HND in Computing at ESOFT Metro Campus, specializing in Network Engineering. He's passionate about cloud computing and cybersecurity.",
    'about': "Mohamed is a passionate Network Engineering student with deep interests in cloud computing and cybersecurity. He loves building innovative solutions and solving complex technical problems. His journey started with curiosity about network connections and has evolved into creating secure, scalable systems."
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check for keywords in user input
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (input.includes(keyword)) {
        return response;
      }
    }

    // Additional keyword matching
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! Great to meet you! I'm here to help you learn more about Mohamed. You can ask me about his skills, projects, experience, or how to contact him.";
    }
    
    if (input.includes('python') || input.includes('programming')) {
      return "Mohamed is proficient in Python and uses it for various projects including network packet analysis and automation scripts. He also knows JavaScript, React, and Bash scripting.";
    }
    
    if (input.includes('network') || input.includes('cisco') || input.includes('mikrotik')) {
      return "Mohamed specializes in network engineering! He has experience with Cisco and Mikrotik equipment, network troubleshooting, and packet analysis using Wireshark.";
    }
    
    if (input.includes('cloud') || input.includes('aws') || input.includes('azure')) {
      return "Mohamed is expanding his cloud expertise with AWS and Azure. He's built cloud monitoring dashboards and is passionate about cloud computing technologies.";
    }
    
    if (input.includes('security') || input.includes('cybersecurity')) {
      return "Cybersecurity is one of Mohamed's key interests! He works with security tools, vulnerability assessment, and has built a cybersecurity toolkit with automated reporting features.";
    }

    if (input.includes('hire') || input.includes('work') || input.includes('job')) {
      return "Mohamed is always open to exciting opportunities! He's passionate about network engineering, cloud computing, and cybersecurity. Feel free to reach out via email at <a href='mailto:mohamedsuhaib.offl@outlook.com' target='_blank' style='color: var(--accent); text-decoration: underline;'>mohamedsuhaib.offl@outlook.com</a> or check his resume.";
    }

    // Default response
    return "I'd be happy to help! You can ask me about Mohamed's skills, projects, experience, education, or how to contact him. What interests you most?";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Tell me about Mohamed's skills",
    "What projects has he worked on?",
    "How can I contact him?",
    "What's his experience?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Trigger Button - Only show when chat is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="chat-trigger"
          aria-label="Open AI Assistant"
        >
          <BotIcon size={32} />
        </button>
      )}

      {/* Chat Interface - Show when opened */}
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-header-info">
              <BotIcon size={28} />
              <div>
                <h3>AI Assistant</h3>
                <span>Ask me about Mohamed</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="chat-close">
              <CloseIcon size={24} />
            </button>
          </div>

          <div className={`chat-messages ${messages.length === 1 ? 'with-quick-questions' : ''}`}>
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.isBot ? 'bot' : 'user'}`}>
                <div className="message-avatar">
                  {message.isBot ? <BotIcon size={20} /> : <UserIcon size={20} />}
                </div>
                <div className="message-content">
                  <div 
                    className="message-text"
                    dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }}
                  />
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">
                  <BotIcon size={20} />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="quick-questions">
              <p>Quick questions:</p>
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="quick-question-btn"
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Mohamed..."
              rows={1}
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="send-button"
            >
              <SendIcon size={22} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIBot;
