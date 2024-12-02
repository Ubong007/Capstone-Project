import React from 'react';
import { FileText, Star, Clock } from 'lucide-react';

export function Templates() {
  const templates = [
    { id: 1, title: 'Daily Standup', icon: Clock, color: 'bg-purple-500' },
    { id: 2, title: 'Weekly Review', icon: FileText, color: 'bg-blue-500' },
    { id: 3, title: 'Project Milestone', icon: Star, color: 'bg-pink-500' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Templates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(({ id, title, icon: Icon, color }) => (
          <div 
            key={id}
            className="bg-[#131642] p-6 rounded-xl hover:bg-[#181B4B] transition-colors cursor-pointer"
          >
            <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-400 mt-2">Click to use this template</p>
          </div>
        ))}
      </div>
    </div>
  );
}