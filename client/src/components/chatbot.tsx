
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Bot, 
  User, 
  X, 
  Send,
  Phone,
  Mail,
  HelpCircle
} from "lucide-react";

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface FAQ {
  question: string;
  answer: string;
  keywords: string[];
}

const faqs: FAQ[] = [
  {
    question: "What is CyberTrack Pro?",
    answer: "CyberTrack Pro is a cybersecurity SaaS tool that provides advanced geolocation tracking, analytics, and threat intelligence through shortened URLs. It helps you monitor visitor locations, detect suspicious activities, and gather comprehensive data about link interactions.",
    keywords: ["what", "cybertrack", "about", "tool", "platform"]
  },
  {
    question: "How does geolocation tracking work?",
    answer: "When someone clicks your tracking link, we capture their IP address, browser information, device details, and approximate location coordinates. This data is then displayed on our interactive map with detailed analytics.",
    keywords: ["geolocation", "tracking", "location", "how", "work", "gps", "coordinates"]
  },
  {
    question: "Is the location data accurate?",
    answer: "We provide IP-based geolocation which is typically accurate to city-level. For more precise tracking, users can grant location permissions in their browser for GPS-accurate coordinates.",
    keywords: ["accurate", "accuracy", "precise", "gps", "ip", "location"]
  },
  {
    question: "What analytics are available?",
    answer: "Our platform provides comprehensive analytics including click counts, geographic distribution, device information, browser details, ISP data, time zones, and threat risk assessments.",
    keywords: ["analytics", "stats", "data", "information", "metrics", "reports"]
  },
  {
    question: "Can I export the data?",
    answer: "Yes, you can export all tracking data, analytics reports, and geolocation information in various formats including CSV, JSON, and PDF reports.",
    keywords: ["export", "download", "data", "csv", "pdf", "report"]
  },
  {
    question: "Is this tool secure and legal?",
    answer: "Yes, CyberTrack Pro operates within legal boundaries for cybersecurity purposes. We only collect publicly available information and comply with privacy regulations. Use responsibly and ensure compliance with local laws.",
    keywords: ["secure", "legal", "privacy", "safe", "compliance", "gdpr"]
  },
  {
    question: "How do I create tracking links?",
    answer: "Go to the 'Tracking Links' section in your dashboard, enter the target URL you want to track, and we'll generate a shortened tracking link for you to share.",
    keywords: ["create", "make", "generate", "link", "tracking", "shorten"]
  },
  {
    question: "Can I customize tracking links?",
    answer: "Currently, we auto-generate unique slugs for tracking links. Custom domains and branded links are planned for future releases.",
    keywords: ["custom", "customize", "domain", "brand", "slug", "personalize"]
  }
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm here to help you with CyberTrack Pro. Ask me anything about our geolocation tracking, analytics, or how to use the platform!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const findBestAnswer = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase();
    
    for (const faq of faqs) {
      if (faq.keywords.some(keyword => lowercaseInput.includes(keyword))) {
        return faq.answer;
      }
    }
    
    return "I'm not sure about that specific question. Here are some things I can help you with:\n\n• Geolocation tracking features\n• Analytics and reporting\n• Creating tracking links\n• Data security and privacy\n• Platform functionality\n\nYou can also use our contact form if you need direct support!";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    const botResponse: Message = {
      id: messages.length + 2,
      type: 'bot',
      content: findBestAnswer(inputValue),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputValue("");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const botResponse: Message = {
      id: messages.length + 1,
      type: 'bot',
      content: `Thank you ${contactForm.name}! Your message has been received. We'll get back to you at ${contactForm.email} within 24 hours.`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botResponse]);
    setContactForm({ name: "", email: "", subject: "", message: "" });
    setShowContactForm(false);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px]">
      <Card className="bg-slate-800/95 backdrop-blur-sm border-slate-700/50 h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center text-lg">
              <Bot className="mr-2 h-5 w-5 text-blue-400" />
              CyberTrack Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4">
          {!showContactForm ? (
            <>
              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === 'bot' && (
                            <Bot className="h-4 w-4 mt-0.5 text-blue-400 flex-shrink-0" />
                          )}
                          {message.type === 'user' && (
                            <User className="h-4 w-4 mt-0.5 text-white flex-shrink-0" />
                          )}
                          <div className="text-sm whitespace-pre-line">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about CyberTrack Pro..."
                    className="bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowContactForm(true)}
                    className="flex-1 text-xs border-slate-600 text-slate-300 hover:text-white"
                  >
                    <HelpCircle className="h-3 w-3 mr-1" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-auto">
              <div className="mb-4">
                <h3 className="text-white font-medium mb-2">Contact Support</h3>
                <p className="text-slate-400 text-sm">Need direct help? Send us a message!</p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-3">
                <Input
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
                
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
                
                <Input
                  placeholder="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
                
                <Textarea
                  placeholder="Your message..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white resize-none"
                  rows={4}
                  required
                />
                
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 border-slate-600 text-slate-300"
                  >
                    Back to Chat
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                  >
                    Send Message
                  </Button>
                </div>
              </form>

              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="text-slate-400 text-xs space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-3 w-3 mr-2" />
                    support@cybertrack.pro
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-3 w-3 mr-2" />
                    24/7 Support Available
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
