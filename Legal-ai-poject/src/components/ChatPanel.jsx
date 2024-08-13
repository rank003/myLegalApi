import React, { useState, useEffect, useRef } from 'react';
import { Send, HelpCircle } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import TypeWriter from './TypeWriter';

const ChatPanel = () => {
  const { messages, isTyping, sendMessage, error } = useWorkspace();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        An error occurred: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700">
      <div className="flex-1 p-4 overflow-auto">
        {messages.length === 0 && (
          <div className="mb-4 p-4 bg-gray-800/50 border border-gray-700 rounded-lg flex items-start">
            <HelpCircle className="h-4 w-4 text-gray-400 mr-2" />
            <div>
              <h4 className="text-sm font-semibold text-white">Welcome to LegalAI Assistant</h4>
              <p className="text-xs text-gray-300">
                Start by describing your housing law case. I'm here to help analyze and build your legal argument.
              </p>
            </div>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 p-3 rounded-lg ${msg.sender === 'ai' ? 'bg-blue-900/50 text-blue-100' : 'bg-gray-800/50 text-gray-100'}`}>
            <p className="text-xs text-gray-400 mb-1">{msg.sender === 'ai' ? 'AI Assistant' : 'You'}</p>
            <p className="text-sm">
              {msg.sender === 'ai' ? <TypeWriter text={msg.content} /> : msg.content}
            </p>
          </div>
        ))}
        {isTyping && (
          <div className="mb-4 p-3 rounded-lg bg-blue-900/50 text-blue-100">
            <p className="text-xs text-gray-400 mb-1">AI Assistant</p>
            <p className="text-sm">Thinking...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-gray-800/50 backdrop-blur-sm border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the legal situation..."
            className="flex-1 bg-gray-700/50 border border-gray-600 rounded px-2 py-1 text-white"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
