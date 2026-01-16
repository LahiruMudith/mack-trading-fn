import { useState } from "react";
import { sendMessageToAI } from "../../services/chat";
import { Button } from "./button";
import { MessageSquare, X, Send } from "lucide-react";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        // 1. Add User Message
        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput("");
        setIsLoading(true);

        try {
            // 2. Get AI Response
            const reply = await sendMessageToAI(userMsg);
            setMessages(prev => [...prev, { role: 'ai', text: reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white border shadow-xl rounded-lg w-80 h-96 flex flex-col mb-4 overflow-hidden">
                    <div className="bg-[#061653] text-white p-3 flex justify-between items-center">
                        <span className="font-bold">Mack Trading Support</span>
                        <X size={18} className="cursor-pointer" onClick={() => setIsOpen(false)} />
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.length === 0 && (
                            <p className="text-xs text-gray-400 text-center mt-4">Ask me anything about our products!</p>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                                    msg.role === 'user'
                                        ? 'bg-[#061653] text-white rounded-br-none'
                                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && <div className="text-xs text-gray-400 italic">Typing...</div>}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t bg-white flex gap-2">
                        <input
                            className="flex-1 text-sm border rounded-md px-2 focus:outline-none"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <Button size="sm" onClick={handleSend} disabled={isLoading} className="h-8 w-8 bg-[#061653]">
                            <Send size={14} />
                        </Button>
                    </div>
                </div>
            )}

            {/* Floating Toggle Button */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full w-14 h-14 shadow-lg bg-[#061653] hover:bg-[#061653]/90 text-white flex items-center justify-center"
                >
                    <MessageSquare size={24} />
                </Button>
            )}
        </div>
    );
}