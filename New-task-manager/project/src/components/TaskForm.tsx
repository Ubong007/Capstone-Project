import React, { useState } from 'react';
import { Category, Priority } from '../types';
import { useTaskContext } from '../context/TaskContext';
import { X } from 'lucide-react';

interface TaskFormProps {
  onClose: () => void;
  initialCategory?: Category;
}

export function TaskForm({ onClose, initialCategory }: TaskFormProps) {
  const { addTask } = useTaskContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium' as Priority,
    category: initialCategory || 'Personal' as Category
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#131642] rounded-xl p-6 w-full max-w-md animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add New Task</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#181B4B] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 bg-[#181B4B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF00FF]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 bg-[#181B4B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF00FF] h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Deadline</label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={e => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                className="w-full px-4 py-2 bg-[#181B4B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF00FF]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={e => setFormData(prev => ({ ...prev, priority: e.target.value as Priority }))}
                className="w-full px-4 py-2 bg-[#181B4B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF00FF]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as Category }))}
              className="w-full px-4 py-2 bg-[#181B4B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF00FF]"
            >
              <option value="Business">Business</option>
              <option value="Personal">Personal</option>
              <option value="Health">Health</option>
              <option value="Learning">Learning</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#FF00FF] hover:bg-[#FF40FF] rounded-lg font-medium transition-colors"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}