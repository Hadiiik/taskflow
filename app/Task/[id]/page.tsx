import React from 'react';


import TaskTimeline from '../components_task/TaskTimeline';
const TaskPage = () => {
  const taskData = {
    taskName: "تطوير النظام الجديد",
    taskId: "TASK-2023-001",
    taskEndDate: "2025-12-31",
    stages: [
      {
        name: "التحليل والتصميم",
        members: ["أحمد محمد", "سارة عبدالله"],
        endDate: "2025-03-15"
      },
      {
        name: "التطوير",
        members: ["علي خالد", "مريم وليد", "يوسف أحمد"],
        endDate: "2025-05-20"
      },
      {
        name: "الاختبار",
        members: ["نورة سعيد", "خالد فاروق"],
        endDate: "2025-5-10"
      },
      {
        name: "التنفيذ",
        members: ["جميع الفريق"],
        endDate: "2025-12-31"
      }
    ]
  }
  return (
    
      <div className="App">
      <TaskTimeline 
        taskName={taskData.taskName}
        taskId={taskData.taskId}
        taskEndDate={taskData.taskEndDate}
        stages={taskData.stages}
      />
    </div>
    
  );
};

export default TaskPage;