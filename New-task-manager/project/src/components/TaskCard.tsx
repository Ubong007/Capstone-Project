import React from 'react';
import { Clock, Flag } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, completed: boolean) => void;
}

export function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const priorityColors = {
    high: 'bg-red-900/60 text-red-200 border-red-700/50 hover:bg-red-800/60',
    medium: 'bg-amber-900/60 text-amber-200 border-amber-700/50 hover:bg-amber-800/60',
    low: 'bg-emerald-900/60 text-emerald-200 border-emerald-700/50 hover:bg-emerald-800/60'
  };

  return (
    <div className="task-card">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onStatusChange(task.id, e.target.checked)}
            className="task-checkbox mt-1"
          />
          <div>
            <h3 className={`text-lg font-medium ${
              task.completed 
                ? 'line-through text-purple-400/60' 
                : 'text-purple-100'
            }`}>
              {task.title}
            </h3>
            <p className={`mt-1 ${
              task.completed ? 'text-purple-400/60' : 'text-purple-300'
            }`}>
              {task.description}
            </p>
          </div>
        </div>
        <span className={`priority-badge border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-3">
        <div className="task-meta">
          <Clock className="h-4 w-4 mr-2 text-purple-300" />
          <span>{new Date(task.deadline).toLocaleDateString()}</span>
        </div>
        <div className="task-meta">
          <Flag className="h-4 w-4 mr-2 text-purple-300" />
          <span>{task.category}</span>
        </div>
      </div>
    </div>
  );
}