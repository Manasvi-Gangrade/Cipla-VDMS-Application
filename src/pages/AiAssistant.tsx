import { useState } from "react";
import { Send, Bot, User, HelpCircle, Upload, FileText, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const AiAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your VDMS AI Assistant. I can help you with uploads, explain mapping errors, provide sales insights, and guide you through the platform. How can I assist you today?",
      timestamp: "10:00 AM"
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickActions = [
    { icon: Upload, label: "Guide me through uploading", query: "How do I upload an invoice?" },
    { icon: FileText, label: "Explain mapping error", query: "Why was my SKU mapping rejected?" },
    { icon: TrendingUp, label: "Show sales summary", query: "What's my sales performance this month?" },
    { icon: HelpCircle, label: "Onboarding help", query: "I'm new here, where do I start?" },
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: getAIResponse(inputValue),
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("upload")) {
      return "To upload an invoice, click the 'Upload Data' tab from the sidebar, then choose your preferred method: PDF upload, camera capture, gallery selection, or voice note. Make sure the image is clear and all details are visible for best OCR results.";
    } else if (lowerQuery.includes("mapping") || lowerQuery.includes("sku")) {
      return "SKU mappings use AI to match your input SKUs to standard Cipla codes. If a mapping is rejected, it might be due to low confidence score. You can override the suggestion or manually enter the correct SKU in the reconciliation panel.";
    } else if (lowerQuery.includes("sales") || lowerQuery.includes("performance")) {
      return "Your current visibility score is 87%, with 48 uploads this month. Your data quality stands at 94%. Top performing region is Mumbai with ₹12.5L in secondary sales. Keep up the great work!";
    } else if (lowerQuery.includes("start") || lowerQuery.includes("new")) {
      return "Welcome! Here's how to get started:\n1. Upload your first invoice from the Upload tab\n2. Review the OCR extraction and approve\n3. Check your dashboard for visibility score\n4. Explore analytics to see your sales insights\nNeed help with any specific step?";
    }
    return "I understand you're asking about '" + query + "'. I can help with uploads, mappings, sales insights, and platform guidance. Could you please be more specific about what you'd like to know?";
  };

  const handleQuickAction = (query: string) => {
    setInputValue(query);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Assistant</h1>
        <p className="text-muted-foreground">Get instant help with uploads, insights, and onboarding</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-2 card-shadow">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Chat with AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px] p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "assistant" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-gray-200 text-gray-700"
                    }`}>
                      {message.role === "assistant" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    </div>
                    <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "items-end" : ""}`}>
                      <div className={`p-4 rounded-lg ${
                        message.role === "assistant"
                          ? "bg-gray-50 text-gray-800"
                          : "bg-primary text-primary-foreground"
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 px-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Info */}
        <div className="space-y-6">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleQuickAction(action.query)}
                  >
                    <action.icon className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow bg-blue-light border-blue">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-800 mb-3">What I Can Help With</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Upload guidance and troubleshooting</li>
                <li>• SKU mapping explanations</li>
                <li>• Sales performance summaries</li>
                <li>• Data quality insights</li>
                <li>• Platform navigation</li>
                <li>• Onboarding assistance</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-shadow bg-success-light border-success">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-800 mb-2">💡 Pro Tip</h3>
              <p className="text-sm text-gray-700">
                Ask me "Show me my weekly summary" to get a complete overview of your uploads, visibility score, and top performing SKUs!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
