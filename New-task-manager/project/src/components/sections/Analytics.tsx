import React from 'react';
import { Task } from '../../types';
import { BarChart, CheckCircle, Clock } from 'lucide-react';

interface AnalyticsProps {
  tasks: Task[];
}

export function Analytics({ tasks }: AnalyticsProps) {
  const completedTasks = tasks.filter(task => task.completed);
  const completionRate = (completedTasks.length / tasks.length) * 100;

  const stats = [
    {
      icon: CheckCircle,
      label: 'Completed Tasks',
      value: completedTasks.length,
      color: 'text-green-500'
    },
    {
      icon: Clock,
      label: 'Pending Tasks',
      value: tasks.length - completedTasks.length,
      color: 'text-yellow-500'
    },
    {
      icon: BarChart,
      label: 'Completion Rate',
      value: `${completionRate.toFixed(1)}%`,
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-[#131642] p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <Icon className={`w-6 h-6 ${color}`} />
              <span className="text-gray-400">{label}</span>
            </div>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#131642] p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Task Progress</h3>
        <div className="h-4 bg-[#181B4B] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#FF00FF] to-[#4169E1] transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}