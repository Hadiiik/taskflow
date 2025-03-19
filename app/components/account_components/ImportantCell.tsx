import React, { useState } from "react";
import OptionImportCell from "./OptionImportCell"; // استيراد المكون الجديد

interface ImportantCellProps {
  task: {
    name: string;
    created_at: string;
    due_date: string;
    currentColumn: number;
    isCompleted?: boolean;
    members?: string[]; // مصفوفة أسماء الأعضاء
  };
  onDragStart: () => void;
  onDelete: () => void;
  onPin: () => void;
  onAlert: () => void;
  isAdmin: boolean; // إضافة البراميتر الجديد
}

const getRemainingTimeColor = (due_date: string) => {
  if (!due_date) return "bg-gray-200";
  const now = new Date();
  const taskDueDate = new Date(due_date);
  if (isNaN(taskDueDate.getTime())) return "bg-gray-200";
  const remainingTime = taskDueDate.getTime() - now.getTime();
  const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

  if (remainingDays > 3) return "bg-green-300"; // لون أخضر فاتح
  if (remainingDays <= 3 && remainingDays > 1) return "bg-yellow-300"; // لون أصفر
  return "bg-red-400"; // لون أحمر داكن
};

const formatRemainingTime = (due_date: string) => {
  if (!due_date) return "غير محدد";
  const now = new Date();
  const taskDueDate = new Date(due_date);
  if (isNaN(taskDueDate.getTime())) return "تاريخ غير صالح";
  const remainingTime = taskDueDate.getTime() - now.getTime();
  const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

  if (remainingDays > 0) return `بعد ${remainingDays} يوم`;
  if (remainingDays === 0) return "اليوم";
  return "منتهي";
};

const ImportantCell: React.FC<ImportantCellProps> = ({
  task,
  onDragStart,
  onDelete,
  onPin,
  onAlert,
  isAdmin,
}) => {
  const [showMembers, setShowMembers] = useState(false); // حالة إظهار الأعضاء

  const handleAlertClick = () => {
    setShowMembers(true); // إظهار النافذة المنبثقة
    onAlert(); // استدعاء الدالة الممررة
  };

  const closePopup = () => {
    setShowMembers(false); // إخفاء النافذة المنبثقة
  };

  return (
    <>
      <div
        className={`p-2 rounded-lg cursor-pointer shadow-md ${getRemainingTimeColor(
          task.due_date
        )}`}
        draggable
        onDragStart={onDragStart}
        style={{ userSelect: "none" }}
      >
        <span className="font-bold">{task.name}</span>
        <br />
        <span className="text-gray-700 text-xs">
          {formatRemainingTime(task.due_date)}
        </span>
        <OptionImportCell
          onDelete={onDelete}
          onPin={onPin}
          onAlert={handleAlertClick}
          isAdmin={isAdmin}
        />
      </div>

      {/* نافذة منبثقة لعرض الأعضاء */}
      {showMembers && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg mb-2">الأعضاء المشتركون في المهمة:</h3>
            <ul>
              {task.members && task.members.length > 0 ? (
                task.members.map((member, index) => (
                  <li key={index} className="text-gray-700">
                    {member}
                  </li>
                ))
              ) : (
                <li className="text-gray-700">لا يوجد أعضاء</li>
              )}
            </ul>
            <button
              onClick={closePopup}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImportantCell;