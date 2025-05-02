import { useState } from 'react';
import TaskCreator from './TaskCreator';
import EditTask from './EditTask';

interface Member {
  id: number;
  name: string;
}

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

const TaskManagement = () => {
  const [members] = useState<Member[]>([
    { id: 1, name: 'علي' },
    { id: 2, name: 'محمد' },
    { id: 3, name: 'أحمد' },
  ]);

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
    // يمكنك إضافة مهام أخرى هنا
  ]);

  interface TaskFromCreator {
    name: string;
    dueDate: string;
    stages: {
      name: string;
      dueDate: string;
      assignedMembers: number[];
    }[];
  }
  
  interface TaskForEditor {
    id: string;
    taskName: string;
    creationDate: string;
    endDate: string;
    details: {
      stageName: string;
      stageEndDate: string;
    }[];
  }
  
  const handleSaveTask = (newTask: TaskFromCreator) => {
    const convertedTask: TaskForEditor = {
      id: Date.now().toString(),
      taskName: newTask.name,
      creationDate: new Date().toISOString().split('T')[0],
      endDate: newTask.dueDate,
      details: newTask.stages.map((stage) => ({
        stageName: stage.name,
        stageEndDate: stage.dueDate,
      })),
    };
  
    setTasks([...tasks, convertedTask]);
  };

  return (
    <div className="container mx-auto p-4">
      <TaskCreator members={members} onSaveTask={handleSaveTask} />
      <div className="mt-8">
        <EditTask teamId="1" tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default TaskManagement;