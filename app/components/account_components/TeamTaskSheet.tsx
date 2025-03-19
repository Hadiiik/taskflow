"use client";
import React, { useState } from "react";
import ImportantCell from "./ImportantCell";
import { useMediaQuery } from "react-responsive"; // للكشف عن حجم الشاشة

interface Task {
  name: string;
  created_at: string;
  due_date: string;
  currentColumn: number;
  isCompleted?: boolean;
  members?: string[];
}

interface TeamTaskSheetProps {
  team_id?: number;
  table_name?: string;
  columns_array?: string[];
  task_array?: Task[];
  isAdmin: boolean;
}

const TeamTaskSheet: React.FC<TeamTaskSheetProps> = ({
  team_id = 0,
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
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white text-center py-3 rounded-t-lg font-bold text-lg">
        {table_name}
      </div>

      {isMobile ? (
        // عرض الهاتف
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0">
                <table className="w-full table-auto border-collapse text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1 bg-blue-100">المهمات</th>
                      {getColumnsForPage(pageIndex).map((column, index) => (
                        <th key={index} className="border px-2 py-1">
                          {column}
                        </th>
                      ))}
                      {pageIndex === totalPages - 1 && (
                        <th className="border px-2 py-1 bg-blue-100">إنهاء المهمة</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task, index) => (
                      <tr key={index}>
                        {/* عمود المهمات (ثابت في جميع الصفحات) */}
                        <td
                          className="border px-2 py-1"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleDrop(0)}
                          style={{ userSelect: "none" }}
                        >
                          {task.currentColumn === 0 && (
                            <ImportantCell
                              task={task}
                              onDragStart={() => handleDragStart(index)}
                              onDelete={() => handleDeleteTask(index)}
                              onPin={() => handlePinTask(index)}
                              onAlert={() => handleAlertTask(index)}
                              isAdmin={isAdmin}
                            />
                          )}
                        </td>
                        {/* الأعمدة الأخرى (تتغير حسب الصفحة) */}
                        {getColumnsForPage(pageIndex).map((_, colIndex) => (
                          <td
                            key={colIndex}
                            className="border px-2 py-1"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(pageIndex * columnsPerPage + colIndex + 1)}
                            style={{ userSelect: "none" }}
                          >
                            {task.currentColumn === pageIndex * columnsPerPage + colIndex + 1 && (
                              <ImportantCell
                                task={task}
                                onDragStart={() => handleDragStart(index)}
                                onDelete={() => handleDeleteTask(index)}
                                onPin={() => handlePinTask(index)}
                                onAlert={() => handleAlertTask(index)}
                                isAdmin={isAdmin}
                              />
                            )}
                          </td>
                        ))}
                        {/* عمود إنهاء المهمة (في الصفحة الأخيرة فقط) */}
                        {pageIndex === totalPages - 1 && (
                          <td
                            className="border px-2 py-1 bg-blue-100"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(columns_array.length + 1)}
                            style={{ userSelect: "none" }}
                          >
                            {task.currentColumn === columns_array.length + 1 && (
                              <ImportantCell
                                task={task}
                                onDragStart={() => handleDragStart(index)}
                                onDelete={() => handleDeleteTask(index)}
                                onPin={() => handlePinTask(index)}
                                onAlert={() => handleAlertTask(index)}
                                isAdmin={isAdmin}
                              />
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {/* أزرار التنقل بين الصفحات */}
          <button
            onClick={() => handlePageChange("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-purple-500 text-white p-2 rounded-full shadow-md hover:bg-purple-600 transition-colors"
            disabled={currentPage === 0}
          >
            {"<"}
          </button>
          <button
            onClick={() => handlePageChange("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-purple-500 text-white p-2 rounded-full shadow-md hover:bg-purple-600 transition-colors"
            disabled={currentPage === totalPages - 1}
          >
            {">"}
          </button>
        </div>
      ) : (
        // عرض سطح المكتب
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
            {tasks.map((task, index) => (
              <tr key={index}>
                <td
                  className="border px-4 py-2"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(0)}
                  style={{ userSelect: "none" }}
                >
                  {task.currentColumn === 0 && (
                    <ImportantCell
                      task={task}
                      onDragStart={() => handleDragStart(index)}
                      onDelete={() => handleDeleteTask(index)}
                      onPin={() => handlePinTask(index)}
                      onAlert={() => handleAlertTask(index)}
                      isAdmin={isAdmin}
                    />
                  )}
                </td>
                {columns_array.map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="border px-4 py-2"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(colIndex + 1)}
                    style={{ userSelect: "none" }}
                  >
                    {task.currentColumn === colIndex + 1 && (
                      <ImportantCell
                        task={task}
                        onDragStart={() => handleDragStart(index)}
                        onDelete={() => handleDeleteTask(index)}
                        onPin={() => handlePinTask(index)}
                        onAlert={() => handleAlertTask(index)}
                        isAdmin={isAdmin}
                      />
                    )}
                  </td>
                ))}
                <td
                  className="border px-4 py-2 bg-blue-100"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(columns_array.length + 1)}
                  style={{ userSelect: "none" }}
                >
                  {task.currentColumn === columns_array.length + 1 && (
                    <ImportantCell
                      task={task}
                      onDragStart={() => handleDragStart(index)}
                      onDelete={() => handleDeleteTask(index)}
                      onPin={() => handlePinTask(index)}
                      onAlert={() => handleAlertTask(index)}
                      isAdmin={isAdmin}
                    />
                  )}
                </td>
              </tr>
            ))}
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
      )}
    </div>
  );
};

export default TeamTaskSheet;