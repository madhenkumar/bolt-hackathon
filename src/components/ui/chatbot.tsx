"use client"

import React, { useState } from 'react';
import { api } from '~/trpc/react';
interface Message {
    role: "assistant" | "user";
    content: string;
}
const Chatbot = () => {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hello, I'm IntelChat, how can I help you today?"
        }
    ]);
    const sendMessage = api.chat.sendMessage.useMutation();

    const handleMessageSubmit = async () => {
        if (inputMessage.trim() !== '') {
            setMessages(prevMessages => [
                ...prevMessages,
                { role: "user", content: inputMessage }
            ]);
            setInputMessage('');
            const response = await sendMessage.mutateAsync([...messages, { role: "user", content: inputMessage }])
            setMessages(prevMessages => [
                ...prevMessages,
                { role: "assistant", content: response! }
            ])
            // Here you would typically send the user's message to the server or perform any necessary actions
        }
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleMessageSubmit();
        }
    };

    return (
        <div className="fixed bottom-5 right-5 h-[30rem] w-[30rem] bg-slate-100 flex flex-col">
            <div className="w-full bg-black text-white p-3">IntelChat</div>
            <div className="flex flex-col items-end p-3 space-y-3 overflow-y-auto flex-grow">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-3 ${message.role === "user" ? 'bg-black text-white rounded-lg ml-auto' : 'bg-white text-black rounded-lg mr-auto'}`}
                        style={{ maxWidth: '70%' }} // Added to limit the width of the messages
                    >
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="p-3 flex">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-grow bg-white text-black p-2 rounded-l-lg"
                    placeholder="Type your message..."
                    style={{ paddingBottom: '0', paddingTop: '0' }}
                />
                <button
                    onClick={handleMessageSubmit}
                    className="bg-black text-white p-2 rounded-r-lg"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
