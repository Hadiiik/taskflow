// contexts/TaskContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface TaskDetail {
  stageName: string;
  stageEndDate: string;
}

interface Task {
  id: string;
  taskName: string;
  creationDate: string;
  endDate: string;
  details: TaskDetail[];
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      taskName: 'تطوير واجهة المستخدم',
      creationDate: '2023-05-10',
      endDate: '2025-04-24',
      details: [
        { stageName: 'التصميم', stageEndDate: '2025-05-20' },
        { stageName: 'التطوير', stageEndDate: '2025-04-30' },
        { stageName: 'الاختبار', stageEndDate: '2023-06-10' },
      ],
    },
    // ... المهام الأخرى ...
  ]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};