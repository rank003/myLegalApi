import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [research, setResearch] = useState([]);
  const [caseContent, setCaseContent] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialContent = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        setCaseContent(response.data.body);
      } catch (err) {
        setError('Failed to fetch initial case content');
        console.error(err);
      }
    };
    fetchInitialContent();
  }, []);

  const sendMessage = async (message) => {
    setMessages(prev => [...prev, { sender: 'user', content: message }]);
    setIsTyping(true);
    setError(null);

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: 'Test',
        body: message,
        userId: 1,
      });

      setMessages(prev => [...prev, { sender: 'ai', content: `AI Response to: ${message}` }]);
      setCaseContent(`Updated case content after sending: ${message}`);

      const researchResponse = await axios.get('https://jsonplaceholder.typicode.com/comments?postId=1');
      setResearch(researchResponse.data);
      
    } catch (err) {
      setError('Failed to send message or receive response');
      console.error(err);
      setMessages(prev => [...prev, { sender: 'ai', content: "I'm sorry, I encountered an error while processing your request." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const citeResearch = (item) => {
    try {
      const updatedContent = `${caseContent}\n\nCiting ${item.title}: ${item.body}\n`;
      setCaseContent(updatedContent);
    } catch (err) {
      setError('Failed to update case content');
      console.error(err);
    }
  };

  const searchResearch = async (query) => {
    setError(null);
    try {
      if (isNaN(query)) {
        throw new Error('Invalid query. PostId must be a number.');
      }
      const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${query}`);
      setResearch(response.data);
    } catch (err) {
      setError('Failed to search research');
      console.error(err);
    }
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <WorkspaceContext.Provider value={{
      messages,
      isTyping,
      research,
      caseContent,
      darkMode,
      error,
      sendMessage,
      citeResearch,
      searchResearch,
      toggleDarkMode,
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => useContext(WorkspaceContext);
