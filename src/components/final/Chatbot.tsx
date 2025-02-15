"use client";

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'model';
    text: string;
    id: string;
}

const ChatBot: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isThinking, setIsThinking] = useState<boolean>(false);
    const chatBodyRef = useRef<HTMLDivElement | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    const generateBotResponse = async (userMessage: string) => {
        setIsThinking(true);
        setIsTyping(true);
        const updatedHistory = [...messages, { role: 'user', text: userMessage, id: Date.now().toString() }].map(({ role, text }) => ({
            role,
            parts: [{ text }],
        }));

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAHygzhpSGaLo2ZiqkoLeORfa_a9iugEf0`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents: updatedHistory }),
                }
            );

            if (!response.ok) throw new Error("API request failed");

            const data = await response.json();
            const botReply: string =
                data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Sorry, I couldn't process that.";

            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'model', text: botReply, id: Date.now().toString() }]);
                setIsTyping(false);
            }, 500);
        } catch (error) {
            console.error("Error fetching bot response:", error);
            setMessages(prev => [...prev, { 
                role: 'model', 
                text: "Error: Unable to process your request.", 
                id: Date.now().toString() 
            }]);
            setIsTyping(false);
        } finally {
            setIsThinking(false);
        }
    };

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim()) {
            const userMessage = query;
            setMessages(prev => [...prev, { role: 'user', text: query, id: Date.now().toString() }]);
            setQuery('');
            setTimeout(() => {
                generateBotResponse(userMessage);
            }, 600);
        }
    };

    const TypingIndicator = () => (
        <motion.div 
            className="flex gap-1 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="w-1 h-1 bg-[#DA0046] rounded-full"
                    animate={{
                        y: ["0%", "-100%", "0%"],
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}
        </motion.div>
    );

    return (
        <div className="fixed bottom-8 right-10">
            <Drawer>
                <DrawerTrigger asChild>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button className="bg-[#DA0046] text-white rounded-full w-16 h-16 flex items-center justify-center">
                            <MessageCircle className="h-10 w-10" />
                        </Button>
                    </motion.div>
                </DrawerTrigger>

                <DrawerContent className="h-2/3 w-1/4 right-4 left-auto fixed rounded-3xl p-4">
                    <motion.div 
                        className="flex flex-col h-full dark:bg-[#232323] rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <DrawerHeader className="border-b px-3 py-2">
                            <div className="flex items-center justify-between">
                                <DrawerTitle className="text-base font-semibold flex items-center gap-2">
                                    Chat Assistant
                                    <AnimatePresence>
                                        {isTyping && <TypingIndicator />}
                                    </AnimatePresence>
                                </DrawerTitle>
                                <DrawerClose asChild>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#232323] rounded-xl">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                </DrawerClose>
                            </div>
                        </DrawerHeader>

                        <div ref={chatBodyRef} className="flex-1 overflow-y-auto p-3 space-y-3">
                            <AnimatePresence initial={false}>
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        layout
                                        initial={{ 
                                            opacity: 0,
                                            x: message.role === 'user' ? 20 : -20,
                                            scale: 0.95
                                        }}
                                        animate={{ 
                                            opacity: 1,
                                            x: 0,
                                            scale: 1
                                        }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className={`max-w-[80%] rounded-lg px-3 py-1.5 text-sm 
                                                ${message.role === 'user' 
                                                    ? 'bg-[#232323] rounded-xl text-white' 
                                                    : 'bg-[#232323] rounded-xl text-white'
                                                }
                                            `}
                                        >
                                            {message.text}
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            
                            <AnimatePresence>
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="flex justify-start"
                                    >
                                        <div className="max-w-[80%]  px-3 py-1.5 text-sm bg-[#232323] rounded-xl text-white">
                                            <TypingIndicator />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <DrawerFooter className="border-t p-3">
                            <form onSubmit={handleSubmit}>
                                <div className='flex bg-[#232323] rounded-xl px-2 py-1'>
                                <motion.div 
                                    className='bg-[#232323] rounded-lg flex-1 flex items-center px-2 py-1'
                                    whileFocus={{ scale: 1.02 }}
                                >
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Ask anything..."
                                        className="flex-1 h-9 text-sm bg-transparent outline-none text-white border-none placeholder-gray-400"
                                    />
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button 
                                        type="submit" 
                                        size="sm" 
                                        className="transition-all duration-300 text-white bg-[#DA0046] rounded-xl h-10 w-10 p-0 disabled:opacity-50"
                                        disabled={isThinking || !query.trim()}
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </motion.div>
                                </div>
                            </form>
                        </DrawerFooter>
                    </motion.div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default ChatBot;