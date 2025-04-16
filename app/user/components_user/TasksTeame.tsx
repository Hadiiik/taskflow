import React, { useState } from "react";
import { FaCheck, FaInfoCircle } from "react-icons/fa";
import Link from "next/link"; // استيراد مكون Link

interface Task {
  name: string;
  dueDate: string;
  teamId: string;
}

interface Team {
  id: string;
  name: string;
}

interface TasksTeamProps {
  tasks: Task[];
  teams: Team[];
}

const TasksTeam: React.FC<TasksTeamProps> = ({ tasks, teams }) => {
  const [rotatedTask, setRotatedTask] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const getRemainingTime = (dueDate: string): number => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return Math.ceil(diff);
  };

  const getTaskColor = (dueDate: string): string => {
    const remainingTime = getRemainingTime(dueDate);
    if (remainingTime >= 3) return "bg-green-300";
    if (remainingTime >= 1) return "bg-orange-300";
    return "bg-red-300";
  };

  const handleTaskClick = (taskName: string) => {
    setRotatedTask(taskName);
    setTimeout(() => setRotatedTask(null), 500);
  };

  const handleCompleteTask = (taskName: string) => {
    setCompletedTasks((prev) => [...prev, taskName]);
    setTimeout(() => {
      setCompletedTasks((prev) => prev.filter((name) => name !== taskName));
    }, 1000);
  };

  const getTeamName = (teamId: string): string => {
    const team = teams.find((team) => team.id === teamId);
    return team ? team.name : "فريق غير معروف";
  };

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => {
        const isCompleted = completedTasks.includes(task.name);
        if (isCompleted) return null;

        return (
          <div
            key={index}
            className={`p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm transition-all duration-500 ease-in-out ${
              rotatedTask === task.name ? "rotate-x" : ""
            } ${getTaskColor(task.dueDate)} w-full`}
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
                {/* استبدال العنصر a بمكون Link */}
                <Link 
                  href={`/team/${task.teamId}`}
                  className="text-xs sm:text-sm text-blue-600 hover:underline"
                  onClick={(e) => e.stopPropagation()} // منع انتشار الحدث
                >
                  {getTeamName(task.teamId)}
                </Link>
              </div>
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
                  className="p-1 sm:p-2 bg-gray-100 rounded-full text-blue-600 hover:bg-blue-100 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    // سيتم إضافة التعليمات لاحقًا
                  }}
                >
                  <FaInfoCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TasksTeam;