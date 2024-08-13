import React from 'react';
import { useWorkspace } from '../context/WorkspaceContext.jsx';

const MessageDisplay = () => {
  const { messages, isTyping, error } = useWorkspace();

  if (error) {
    return <div className="text-red-500 bg-red-100 border border-red-400 p-4 rounded">{error}</div>;
  }

  return (
    <div className="p-4 space-y-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg ${
            msg.sender === 'ai' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          {msg.content}
        </div>
      ))}
      {isTyping && <div className="text-blue-500">AI is typing...</div>}
    </div>
  );
};

export default MessageDisplay;