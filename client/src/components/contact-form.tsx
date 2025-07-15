
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    toast({
      title: "Message sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          Contact Us
        </CardTitle>
        <CardDescription className="text-slate-400">
          Get in touch with our team for support or inquiries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-slate-300">support@threatintel.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-slate-300">123 Cyber Street, Security City, SC 12345</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-slate-300">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={handleChange}
                className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-slate-300">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your inquiry..."
                value={formData.message}
                onChange={handleChange}
                className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400 min-h-[120px]"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
