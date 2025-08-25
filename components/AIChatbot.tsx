
import React, { useState, FormEvent } from 'react';
import { generateChmodCommand, explainChmodCommand } from '../services/geminiService';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const AIChatbot: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    let aiResponseText = '';
    // Simple check if user input is likely a command or natural language
    if (/^[0-7]{3}$/.test(input.trim()) || /^[rwx-]{9}$/.test(input.trim())) {
      aiResponseText = await explainChmodCommand(input.trim());
    } else {
      aiResponseText = await generateChmodCommand(input.trim());
    }

    const aiMessage: Message = { sender: 'ai', text: aiResponseText };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[70vh] max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">AI Chatbot ช่วยเหลือ</h2>
      <div className="flex-grow bg-gray-800 rounded-t-xl p-4 overflow-y-auto space-y-4 border border-b-0 border-gray-700">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 h-full flex flex-col justify-center items-center">
             <p className="text-lg">ลองถาม AI ดูสิ!</p>
             <p className="text-sm mt-2">ตัวอย่าง:</p>
             <ul className="text-sm list-disc list-inside mt-1">
                <li>"กำหนดให้เจ้าของอ่าน เขียน รันได้ นอกนั้นไม่อนุญาต"</li>
                <li>"755"</li>
                <li>"rw-r--r--"</li>
             </ul>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-lg p-3 rounded-2xl bg-gray-700 text-gray-200 rounded-bl-none">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-b-xl border border-t-0 border-gray-700">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-gray-700 border border-gray-600 text-white text-md rounded-l-lg focus:ring-cyan-500 focus:border-cyan-500 block p-3"
            placeholder="ถามเกี่ยวกับ chmod..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-5 rounded-r-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? '...' : 'ส่ง'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChatbot;
