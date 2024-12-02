import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { TaskProvider } from './context/TaskContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('tasks');

  return (
    <TaskProvider>
      <div className="flex min-h-screen bg-[#0A0B1E]">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <MainContent 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          activeSection={activeSection}
        />
      </div>
    </TaskProvider>
  );
}

export default App;