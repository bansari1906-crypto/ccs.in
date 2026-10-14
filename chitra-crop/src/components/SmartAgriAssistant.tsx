
import React, { useState, useCallback } from "react";
import { Leaf, Droplets, Sun, Snowflake, Sparkles, Bot, User, Bug, Trees, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { searchAndRecommendProducts } from "@/lib/aiAssistant";
import { resolveAsset } from "@/lib/assetMap";

const CROPS = ["Cotton", "Paddy", "Wheat", "Chilli", "Tomato", "Grapes", "Vegetables", "Fruits"];
const PESTS = ["Sucking Pest", "Larva", "Stem Borer", "White Fly", "Aphid", "Thrips", "Mealybug"];
const DISEASES = ["Powdery Mildew", "Downy Mildew", "Blight", "Leaf Spot", "Fungal Disease", "Root Rot"];

const SmartAgriAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I am your Smart Agri AI Assistant from Chitra Crop Science. Ask me anything about crop protection, pests, diseases, or products!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback((text, filters) => {
    if (!text.trim()) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const result = searchAndRecommendProducts(text, filters);
      const { products: recommended, explanation } = result;
      
      const assistantMessage = {
        role: "assistant",
        content: explanation,
        products: recommended
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 700);
  }, []);

  const handleQuickSelect = (type, value) => {
    let message = "";
    let filters = {};
    if (type === "crop") {
      message = "What products do you recommend for " + value + " crop?";
      filters = { crop: value };
    } else if (type === "pest") {
      message = "I need products to control " + value;
      filters = { pest: value };
    } else if (type === "disease") {
      message = "Recommend products for " + value + " treatment";
      filters = { disease: value };
    } else if (type === "season") {
      message = "What are the best products for " + value + " season?";
      filters = { season: value };
    }
    sendMessage(message, filters);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2 mb-4">
          <Sparkles className="text-yellow-500" /> Smart Agri AI Assistant
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get personalized product recommendations for your crops, seasons, and pest problems
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Tabs defaultValue="crop" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="crop"><Leaf size={14} /></TabsTrigger>
              <TabsTrigger value="pest"><Bug size={14} /></TabsTrigger>
              <TabsTrigger value="disease"><Trees size={14} /></TabsTrigger>
              <TabsTrigger value="season"><Sun size={14} /></TabsTrigger>
            </TabsList>
            
            <TabsContent value="crop" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Leaf size={16} /> Crop-Based
                  </CardTitle>
                  <CardDescription>Select crop for recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {CROPS.map((crop, i) => (
                    <Button 
                      key={i} 
                      variant="secondary" 
                      className="w-full justify-start text-left"
                      onClick={() => handleQuickSelect("crop", crop)}
                    >
                      {crop}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pest" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bug size={16} /> Pest-Based
                  </CardTitle>
                  <CardDescription>Select pest for recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {PESTS.map((pest, i) => (
                    <Button 
                      key={i} 
                      variant="secondary" 
                      className="w-full justify-start text-left"
                      onClick={() => handleQuickSelect("pest", pest)}
                    >
                      {pest}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="disease" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trees size={16} /> Disease-Based
                  </CardTitle>
                  <CardDescription>Select disease for recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {DISEASES.map((disease, i) => (
                    <Button 
                      key={i} 
                      variant="secondary" 
                      className="w-full justify-start text-left"
                      onClick={() => handleQuickSelect("disease", disease)}
                    >
                      {disease}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="season" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sun size={16} /> Seasonal
                  </CardTitle>
                  <CardDescription>Select season for recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { name: "Rainy", icon: Droplets, color: "text-blue-600" },
                    { name: "Summer", icon: Sun, color: "text-yellow-600" },
                    { name: "Winter", icon: Snowflake, color: "text-cyan-600" }
                  ].map((season, i) => (
                    <Button 
                      key={i} 
                      variant="secondary" 
                      className="w-full justify-start text-left"
                      onClick={() => handleQuickSelect("season", season.name.toLowerCase())}
                    >
                      <season.icon className={"mr-2 h-4 w-4 " + season.color} />
                      {season.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-emerald-600" />
                Chitra Agri Assistant
              </CardTitle>
            </CardHeader>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={"flex gap-3 " + (
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="h-8 w-8 shrink-0 bg-emerald-100 text-emerald-700 rounded-full p-1" />
                    ) : (
                      <User className="h-8 w-8 shrink-0 bg-slate-100 text-slate-700 rounded-full p-1" />
                    )}
                    <div
                      className={"max-w-[85%] rounded-2xl px-4 py-3 " + (
                        message.role === "user"
                          ? "bg-emerald-600 text-white rounded-tr-none"
                          : "bg-slate-100 text-slate-900 rounded-tl-none"
                      )}
                    >
                      <p className="whitespace-pre-line mb-3">{message.content}</p>
                      
                      {message.products && message.products.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-slate-200">
                          {message.products.map((product, i) => (
                            <Link 
                              key={i} 
                              to={"/products/" + product.slug}
                              className="block"
                            >
                              <div className="bg-white rounded-lg p-2 border border-slate-200 hover:border-emerald-300 transition flex items-center gap-3">
                                {product.images && product.images.length > 0 && (
                                  <img 
                                    src={resolveAsset(product.images[0])}
                                    alt={product.name}
                                    className="w-10 h-10 object-contain rounded"
                                    loading="lazy"
                                  />
                                )}
                                <div>
                                  <p className="font-medium text-sm">{product.name}</p>
                                  <p className="text-xs text-slate-500">{product.category}</p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <Bot className="h-8 w-8 shrink-0 bg-emerald-100 text-emerald-700 rounded-full p-1" />
                    <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-slate-100">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about crops, pests, or products..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              />
              <Button onClick={() => sendMessage(input)}>
                <Send className="h-4 w-4 mr-2" /> Send
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SmartAgriAssistant;
