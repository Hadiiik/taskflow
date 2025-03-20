"use client"
import React, { useState } from "react";


interface Task {
  name: string;
  created_at: string;
  due_date: string; // تاريخ ووقت انتهاء المهمة
  currentColumn: number;
  isCompleted?: boolean;
  editedBy_id ?: number|string;
}

interface TeamTaskSheetProps {
  table_id: number|string;
  table_name: string;
  columns_array: string[];
  task_array: Task[];
  admin_id : string|number;
}

const TeamTaskSheet: React.FC<TeamTaskSheetProps> = ({
  table_id = 0,
  table_name = "جدول بدون اسم",
  columns_array = [],
  task_array = [],
  admin_id = 0
}) => {
  const [tasks, setTasks] = useState<Task[]>(task_array);
  const [draggingTaskIndex, setDraggingTaskIndex] = useState<number | null>(null);

  const handleDragStart = (taskIndex: number) => {
    setDraggingTaskIndex(taskIndex);
    console.log(table_id)
  };

  const handleDrop = (columnIndex: number) => {
    if (draggingTaskIndex !== null) {
      const updatedTasks = [...tasks];
      const task = updatedTasks[draggingTaskIndex];

      // تحديث العمود الحالي للمهمة
      task.currentColumn = columnIndex;

      // إذا تم نقل المهمة إلى عمود "إنهاء المهمة"، قم بتحديدها كمكتملة
      if (columnIndex === columns_array.length+1) {
        task.isCompleted = true;
      } else {
        task.isCompleted = false;
      }

      setTasks(updatedTasks);
      setDraggingTaskIndex(null);
    }
  };

  const getRemainingTimeColor = (due_date: string) => {
    if (!due_date) return "bg-gray-200"; // إذا كان التاريخ غير موجود
    const now = new Date();
    const taskDueDate = new Date(due_date);
    if (isNaN(taskDueDate.getTime())) return "bg-gray-200"; // إذا كان التاريخ غير صالح
    const remainingTime = taskDueDate.getTime() - now.getTime();
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

    if (remainingDays > 3) return "bg-green-200";
    if (remainingDays <= 3 && remainingDays > 1) return "bg-orange-200";
    return "bg-red-200";
  };

  const formatRemainingTime = (due_date: string) => {
    if (!due_date) return "غير محدد";
    const now = new Date();
    const taskDueDate = new Date(due_date);
    if (isNaN(taskDueDate.getTime())) return "تاريخ غير صالح";
    const remainingTime = taskDueDate.getTime() - now.getTime();
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

    if (remainingDays > 0) {
      return `بعد ${remainingDays} يوم`;
    } else if (remainingDays === 0) {
      return "اليوم";
    } else {
      return "منتهي";
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
                        {/* approve or dinye buttons */}
                        { (task.editedBy_id != admin_id)&&
                          <div>
                            <button
                        className=" bg-green-500 mx-3 text-white rounded-lg hover:bg-green-600 transition"
                        >
                        ✅
                        </button>

                        <button
                        className=" bg-red-200 mx-3 text-white rounded-lg hover:bg-red-600 transition"
                        >
                        ❌
                        </button>
                          </div>
                        }

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
                        {/* approve or dinye buttons */}
                        { (task.editedBy_id != admin_id)&&
                          <div>
                            <button
                        className=" bg-green-500 mx-3 text-white rounded-lg hover:bg-green-600 transition"
                        >
                        ✅
                        </button>

                        <button
                        className=" bg-red-200 mx-3 text-white rounded-lg hover:bg-red-600 transition"
                        >
                        ❌
                        </button>
                          </div>
                        }
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
                       {/* approve or dinye buttons */}
                       { (task.editedBy_id != admin_id)&&
                          <div>
                            <button
                        className=" bg-green-500 mx-3 text-white rounded-lg hover:bg-green-600 transition"
                        >
                        ✅
                        </button>

                        <button
                        className=" bg-red-200 mx-3 text-white rounded-lg hover:bg-red-600 transition"
                        >
                        ❌
                        </button>
                          </div>
                        }
                      </div>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
          <tr>
            <td colSpan={columns_array.length + 2} className="border px-4 py-2">
              <button 
                
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-lg mx-auto">
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