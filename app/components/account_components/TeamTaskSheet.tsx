"use client";
import React, { useState } from "react";

interface Task {
  name: string;
  created_at: string;
  due_date: string;
  currentColumn: number;
  isCompleted?: boolean;
  members?: string[];
}

interface TeamTaskSheetProps {
  team_id: number;
  table_name: string;
  columns_array: string[];
  task_array: Task[];
}

const TeamTaskSheet: React.FC<TeamTaskSheetProps> = ({
  table_id = 0,
  table_name = "جدول بدون اسم",
  columns_array = [],
  task_array = [],
  isAdmin,
}) => {
  const [tasks, setTasks] = useState<Task[]>([...task_array].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
  const [draggingTaskIndex, setDraggingTaskIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0); // الصفحة الحالية للهواتف
  const isMobile = useMediaQuery({ maxWidth: 768 }); // الكشف عن الهواتف

  const handleDragStart = (taskIndex: number) => {
    setDraggingTaskIndex(taskIndex);
    console.log(table_id)
  };

  const handleDrop = (columnIndex: number) => {
    if (draggingTaskIndex !== null) {
      const updatedTasks = [...tasks];
      const task = updatedTasks[draggingTaskIndex];

      task.currentColumn = columnIndex;
      task.isCompleted = columnIndex === columns_array.length;

      setTasks(updatedTasks);
      setDraggingTaskIndex(null);
    }
  };

  const handleDeleteTask = (taskIndex: number) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
  };

  const handlePinTask = (taskIndex: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].isCompleted = !updatedTasks[taskIndex].isCompleted;
    setTasks(updatedTasks);
  };

  const handleAlertTask = (taskIndex: number) => {
    console.log("تنبيه للمهمة:", tasks[taskIndex].name);
  };

  // تقسيم الأعمدة إلى صفحات (كل صفحة تحتوي على 3 أعمدة)
  const columnsPerPage = 3;
  const totalPages = Math.ceil(columns_array.length / columnsPerPage);

  const getColumnsForPage = (page: number) => {
    const start = page * columnsPerPage;
    const end = start + columnsPerPage;
    return columns_array.slice(start, end);
  };

  const handlePageChange = (direction: "left" | "right") => {
    if (direction === "left" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "right" && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
    {/* <PopUpCreateTask team_id={0} id={0}/> */}
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white text-center py-3 rounded-t-lg font-bold text-lg">
        {table_name}
      </div>
      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-blue-100">المهمات</th>
            {columns_array.map((column, index) => (
              <th key={index} className="border px-4 py-2">
                {column}
              </th>
            ))}
            <th className="border px-4 py-2 bg-blue-100">إنهاء المهمة</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            if (!task || !task.name || !task.due_date) return null;
            return (
              <React.Fragment key={index}>
                {/* عرض المهمة في العمود الحالي */}
                <tr>
                  <td
                    className={`border px-4 py-2 rounded-lg ${
                      task.currentColumn === 0 ? getRemainingTimeColor(task.due_date) : "bg-transparent"
                    }`}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    style={{ userSelect: "none" }} // منع تحديد النص
                  >
                    {task.currentColumn === 0 && (
                      <div>
                        <span className="font-bold">{task.name}</span>
                        <br />
                        <span className="text-gray-600 text-xs">
                          {formatRemainingTime(task.due_date)}
                        </span>
                      </div>
                    )}
                  </td>
                  {columns_array.map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="border px-4 py-2"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(colIndex + 1)} // +1 لأن العمود الأول هو عمود المهام
                      style={{ userSelect: "none" }} // منع تحديد النص
                    >
                      {task.currentColumn === colIndex + 1 && (
                        <div
                          className={`p-2 rounded-lg ${getRemainingTimeColor(task.due_date)}`}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                        >
                          <span className="font-bold">{task.name}</span>
                          <br />
                          <span className="text-gray-600 text-xs">
                            {formatRemainingTime(task.due_date)}
                          </span>
                        </div>
                      )}
                    </td>
                  ))}
                  <td
                    className="border px-4 py-2 bg-blue-100"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(columns_array.length + 1)} // +1 لأن العمود الأول هو عمود المهام
                    style={{ userSelect: "none" }} // منع تحديد النص
                  >
                    {task.currentColumn === columns_array.length + 1 && (
                      <div
                        className={`p-2 rounded-lg ${getRemainingTimeColor(task.due_date)}`}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                      >
                        <span className="font-bold">{task.name}</span>
                        <br />
                        <span className="text-gray-600 text-xs">
                          {formatRemainingTime(task.due_date)}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
          <tr>
            <td colSpan={columns_array.length + 2} className="border px-4 py-2">
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-lg mx-auto">
                <span className="w-5 h-5 font-bold">+</span>
                <span>إضافة مهمة</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
};

export default TeamTaskSheet;