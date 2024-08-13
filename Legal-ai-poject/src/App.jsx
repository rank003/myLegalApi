
import React from 'react';
import { WorkspaceProvider } from './context/WorkspaceContext.jsx';
import LegalAIWorkspace from './components/LegalAIWorkspace.jsx';

function App() {
  return (
    <WorkspaceProvider>
      <LegalAIWorkspace />
    </WorkspaceProvider>
  );
}

export default App;
