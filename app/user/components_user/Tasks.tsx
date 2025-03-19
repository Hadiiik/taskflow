import React, { useState } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";

interface Task {
  name: string;
  dueDate: string;
}

interface TasksProps {
  tasks: Task[];
}

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  const [rotatedTask, setRotatedTask] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [deletedTasks, setDeletedTasks] = useState<string[]>([]);

  // دالة لحساب الوقت المتبقي بالأيام
  const getRemainingTime = (dueDate: string): number => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return Math.ceil(diff);
  };

  // دالة لتحديد لون المهمة
  const getTaskColor = (dueDate: string): string => {
    const remainingTime = getRemainingTime(dueDate);
    if (remainingTime >= 3) return "bg-green-300";
    if (remainingTime >= 1) return "bg-orange-300";
    return "bg-red-300";
  };

  // دالة لتدوير العنصر عند النقر عليه
  const handleTaskClick = (taskName: string) => {
    setRotatedTask(taskName);
    setTimeout(() => setRotatedTask(null), 500); // إعادة التدوير بعد نصف ثانية
  };

  // دالة لإتمام المهمة
  const handleCompleteTask = (taskName: string) => {
    setCompletedTasks((prev) => [...prev, taskName]);
    setTimeout(() => {
      setCompletedTasks((prev) => prev.filter((name) => name !== taskName));
    }, 1000); // إزالة المهمة من القائمة بعد التأثير
  };

  // دالة لحذف المهمة
  const handleDeleteTask = (taskName: string) => {
    setDeletedTasks((prev) => [...prev, taskName]);
    setTimeout(() => {
      setDeletedTasks((prev) => prev.filter((name) => name !== taskName));
    }, 1000); // إزالة المهمة من القائمة بعد التأثير
  };

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => {
        const isCompleted = completedTasks.includes(task.name);
        const isDeleted = deletedTasks.includes(task.name);

        if (isDeleted) return null; // إخفاء المهمة المحذوفة

        return (
          <div
            key={index}
            className={`p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm transition-all duration-500 ease-in-out ${
              rotatedTask === task.name ? "rotate-x" : ""
            } ${getTaskColor(task.dueDate)} w-full ${
              isCompleted
                ? "bg-green-500 scale-110 opacity-0"
                : isDeleted
                ? "bg-red-500 animate-shake opacity-0"
                : ""
            }`}
            onClick={() => handleTaskClick(task.name)}
            style={{
              transform:
                rotatedTask === task.name ? "rotateX(360deg)" : "rotateX(0deg)",
              transition: "all 0.5s ease-in-out",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                  {task.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  ينتهي في: {task.dueDate}
                </p>
              </div>
              {/* الأزرار في نفس السطر في حالة الهاتف */}
              <div className="flex justify-center sm:justify-end gap-2 mt-2 sm:mt-0">
                <button
                  className="p-1 sm:p-2 bg-gray-100 rounded-full text-green-600 hover:bg-green-100 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCompleteTask(task.name);
                  }}
                >
                  <FaCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  className="p-1 sm:p-2 bg-gray-100 rounded-full text-red-600 hover:bg-red-100 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTask(task.name);
                  }}
                >
                  <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;