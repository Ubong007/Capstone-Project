import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';
import { TaskForm } from '../TaskForm';
import { Category } from '../../types';

const categoryColors = {
  Business: 'from-purple-500 to-pink-500',
  Personal: 'from-blue-500 to-cyan-500',
  Health: 'from-green-500 to-emerald-500',
  Learning: 'from-orange-500 to-yellow-500'
};

export function Categories() {
  const { tasks } = useTaskContext();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const categories = Object.keys(categoryColors) as Category[];

  const handleAddTask = (category: Category) => {
    setSelectedCategory(category);
    setShowTaskForm(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(category => {
          const categoryTasks = tasks.filter(task => task.category === category);
          const completedTasks = categoryTasks.filter(task => task.completed);
          const progress = categoryTasks.length ? (completedTasks.length / categoryTasks.length) * 100 : 0;

          return (
            <div key={category} className="category-card group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">{categoryTasks.length} tasks</p>
                  <h3 className="text-xl font-bold mt-1">{category}</h3>
                </div>
                <button
                  onClick={() => handleAddTask(category)}
                  className="p-2 hover:bg-[#232856] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="h-1 bg-[#181B4B] rounded-full mt-4 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${categoryColors[category]} transition-all duration-300`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              {categoryTasks.length > 0 && (
                <div className="mt-4 space-y-2">
                  {categoryTasks.slice(0, 2).map(task => (
                    <div 
                      key={task.id}
                      className={`text-sm p-2 rounded bg-[#181B4B]/50 ${
                        task.completed ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {task.title}
                    </div>
                  ))}
                  {categoryTasks.length > 2 && (
                    <p className="text-sm text-gray-400">
                      +{categoryTasks.length - 2} more tasks
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showTaskForm && (
        <TaskForm 
          onClose={() => {
            setShowTaskForm(false);
            setSelectedCategory(null);
          }}
          initialCategory={selectedCategory || undefined}
        />
      )}
    </div>
  );
}