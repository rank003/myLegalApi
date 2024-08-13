import React from 'react';
import { Moon, Sun } from 'lucide-react';
import ChatPanel from './ChatPanel';
import ResearchPanel from './ResearchPanel';
import DynamicCaseBuilder from './DynamicCaseBuilder';
import { useWorkspace } from '../context/WorkspaceContext';

const LegalAIWorkspace = () => {
  const { darkMode, setDarkMode, error } = useWorkspace();

  const handleToggle = () => {
    setDarkMode(prev => !prev);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        An error occurred: {error}
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <header className="bg-blue-600 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">LegalAI Workspace</h1>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-white">Law Student</p>
          <button
            onClick={handleToggle}
            className="flex items-center p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            {darkMode ? (
              <Moon className="h-4 w-4 text-yellow-400" />
            ) : (
              <Sun className="h-4 w-4 text-yellow-400" />
            )}
          </button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r border-gray-700">
          <ChatPanel />
        </div>
        <div className="w-1/2 flex flex-col">
          <div className="h-1/2 border-b border-gray-700">
            <DynamicCaseBuilder />
          </div>
          <div className="h-1/2">
            <ResearchPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalAIWorkspace;
