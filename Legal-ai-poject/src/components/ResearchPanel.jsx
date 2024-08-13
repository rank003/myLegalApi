import React, { useState } from 'react';
import { Search, Book, Scale } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';

const ResearchPanel = () => {
  const { research, citeResearch, searchResearch } = useWorkspace();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredResearch = research.filter(item =>
    ((item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (filter === 'all' || item.type === filter)
  );

  const handleSearch = () => {
    searchResearch(searchTerm);
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-4 h-full">
      <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
        <Search className="mr-2" size={20} /> Research Panel
      </h3>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search research..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-gray-700/50 border-gray-600 border rounded px-2 py-1 text-white"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
        >
          <Search className="h-4 w-4" />
        </button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-700/50 border-gray-600 border rounded px-2 py-1 text-white"
        >
          <option value="all">Filter</option>
          <option value="all">All</option>
          <option value="case">Cases</option>
          <option value="statute">Statutes</option>
        </select>
      </div>
      <div className="h-[calc(100%-8rem)] overflow-y-auto">
        {filteredResearch.map((item) => (
          <div key={item.id} className="mb-4 p-3 bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm font-medium text-blue-300 mb-1">
                {item.type === 'case' ? <Scale className="mr-2" size={14} /> : <Book className="mr-2" size={14} />}
                {item.title || 'Untitled'}
              </div>
              <button
                className="bg-transparent text-blue-300 hover:text-blue-400 px-2 py-1 rounded text-sm border border-transparent hover:border-blue-300"
                onClick={() => citeResearch(item)}
              >
                Cite
              </button>
            </div>
            <p className="text-xs text-gray-300 mt-1">{item.description || 'No description available.'}</p>
            <p className="text-xs text-green-400 mt-2">Relevance: {item.relevance}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchPanel;
