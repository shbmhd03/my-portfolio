import { useState, useRef, useEffect } from 'react';
import { RobotIcon, UserIcon } from './Icons';

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
    'skills': "Mohamed has expertise in:\n• 🌐 Networking: Cisco, Mikrotik, Network Troubleshooting\n• ☁️ Cloud: AWS, Azure basics\n• 💻 Programming: Python, JavaScript, React, Bash\n• 🔐 Security: Cybersecurity, Packet Analysis, Wireshark\n• 🐧 Systems: Linux Administration",
    'projects': "Mohamed has worked on several impressive projects:\n• 🌐 Personal Portfolio Website (React, TypeScript)\n• 📡 Network Packet Analyzer (Python, Scapy)\n• ☁️ Cloud Monitoring Dashboard (AWS, CloudWatch)\n• 🔐 Cybersecurity Toolkit (Security tools & automation)\n\nWould you like to know more about any specific project?",
    'experience': "Mohamed is currently:\n• 🎓 Studying Network Engineering at ESOFT Metro Campus\n• 📚 Pursuing HND in Computing\n• 🚀 Building expertise in cloud computing and cybersecurity\n• 💡 Passionate about solving complex technical problems",
    'contact': "You can reach Mohamed through:\n• 📧 Email: mohamedsuhaib.offl@outlook.com\n• 🌐 Website: mohamedsuhaib.live\n• 💼 LinkedIn: Check the contact section\n• 🐙 GitHub: View his projects\n\nFeel free to download his resume too!",
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
      return "Mohamed is always open to exciting opportunities! He's passionate about network engineering, cloud computing, and cybersecurity. Feel free to reach out via email at mohamedsuhaib.offl@outlook.com or check his resume.";
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
      {/* Chat Trigger Button - Hide when chat is open */}
      {!isOpen && (
        <div className="chat-trigger-wrapper">
          <button
            onClick={() => setIsOpen(true)}
            className="chat-trigger chat-trigger-enhanced"
            aria-label="Open AI Assistant"
          >
            <RobotIcon size={28} />
          </button>
          <div className="chat-tooltip">
            Ask me anything!
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="chat-container chat-container-enhanced">
          <div className="chat-header chat-header-enhanced">
            <div className="chat-header-info">
              <span><RobotIcon size={24} /></span>
              <div>
                <h3>AI Assistant</h3>
                <span>Ask me about Mohamed</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="chat-close">
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.isBot ? 'bot' : 'user'}`}>
                <div className="message-avatar">
                  {message.isBot ? <RobotIcon size={20} /> : <UserIcon size={20} />}
                </div>
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">
                  <RobotIcon size={20} />
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
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIBot;
