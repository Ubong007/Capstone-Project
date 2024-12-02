import React, { createContext, useContext, useState } from 'react';
import { Task, TaskContextType } from '../types';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Daily meeting with team',
    description: 'Discuss project progress and blockers',
    deadline: '2024-03-25',
    priority: 'high',
    category: 'Business',
    completed: false
  },
  {
    id: '2',
    title: 'Check emails',
    description: 'Review and respond to important emails',
    deadline: '2024-03-20',
    priority: 'medium',
    category: 'Business',
    completed: false
  },
  {
    id: '3',
    title: 'Lunch with Emma',
    description: 'Discuss new partnership opportunities',
    deadline: '2024-03-22',
    priority: 'low',
    category: 'Personal',
    completed: false
  },
  {
    id: '4',
    title: 'Meditation',
    description: '15 minutes mindfulness session',
    deadline: '2024-03-22',
    priority: 'low',
    category: 'Health',
    completed: false
  }
];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9)
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updatedFields } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const setTaskStatus = (id: string, completed: boolean) => {
    updateTask(id, { completed });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, setTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}