export type Priority = 'low' | 'medium' | 'high';
export type Category = 'Business' | 'Personal' | 'Health' | 'Learning';

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: Priority;
  category: Category;
  completed: boolean;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setTaskStatus: (id: string, completed: boolean) => void;
}