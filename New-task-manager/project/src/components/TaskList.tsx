import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const { setTaskStatus, deleteTask } = useTaskContext();

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="task-item group">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => setTaskStatus(task.id, e.target.checked)}
            className="task-checkbox"
          />
          <div className="flex-1">
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>
              {task.title}
            </h3>
            <p className={`text-sm ${task.completed ? 'text-gray-500' : 'text-gray-400'}`}>
              {task.description}
            </p>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-2 hover:bg-[#232856] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-red-400"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}