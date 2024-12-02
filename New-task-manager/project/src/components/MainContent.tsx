import React, { useState } from 'react';
import { Search, Bell, Plus, Menu } from 'lucide-react';
import { Templates } from './sections/Templates';
import { Categories } from './sections/Categories';
import { Analytics } from './sections/Analytics';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { useTaskContext } from '../context/TaskContext';

interface MainContentProps {
  onToggleSidebar: () => void;
  activeSection: string;
}

export function MainContent({ onToggleSidebar, activeSection }: MainContentProps) {
  const { tasks } = useTaskContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'templates':
        return <Templates />;
      case 'categories':
        return <Categories />;
      case 'analytics':
        return <Analytics tasks={tasks} />;
      default:
        return (
          <>
            <section className="mb-12">
              <h2 className="text-gray-400 mb-4">TODAY'S TASKS</h2>
              <TaskList 
                tasks={searchQuery ? tasks.filter(task => 
                  task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  task.description.toLowerCase().includes(searchQuery.toLowerCase())
                ) : tasks}
              />
            </section>
          </>
        );
    }
  };

  return (
    <main className="main-content">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <button 
            className="lg:hidden p-2 hover:bg-[#181B4B] rounded-lg transition-colors"
            onClick={onToggleSidebar}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">What's up, Ubong!</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            {showSearch && (
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="absolute right-0 top-0 w-64 px-4 py-2 bg-[#181B4B] rounded-lg text-white 
                         focus:outline-none focus:ring-2 focus:ring-[#FF00FF] transition-all duration-300"
              />
            )}
            <button 
              className="p-2 hover:bg-[#181B4B] rounded-lg transition-colors relative z-10"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
          <button className="p-2 hover:bg-[#181B4B] rounded-lg transition-colors">
            <Bell className="w-6 h-6" />
          </button>
        </div>
      </div>

      {renderSection()}

      <button 
        className="add-button"
        onClick={() => setShowTaskForm(true)}
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}
    </main>
  );
}