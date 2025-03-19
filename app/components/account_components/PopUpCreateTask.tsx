"use client"
import React, { useState } from "react";

interface PopUpCreateTaskProps {
  team_id: number;
  id: number;
}

const PopUpCreateTask: React.FC<PopUpCreateTaskProps> = ({ id }) => {
  const [taskName, setTaskName] = useState<string>(""); // حالة اسم المهمة
  const [taskDateTime, setTaskDateTime] = useState<string>(""); // حالة تاريخ ووقت المهمة

  // دالة لوضع التاريخ والوقت الحالي في الحقل
  const handleSetCurrentDateTime = () => {
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 16); // تنسيق التاريخ والوقت (YYYY-MM-DDTHH:MM)
    setTaskDateTime(formattedDateTime);
  };

  // دالة لإنشاء المهمة
  const handleCreateTask = () => {
    if (!taskName || !taskDateTime) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    // هنا يمكنك إرسال البيانات إلى الخادم أو إجراء أي عملية أخرى
    console.log("تم إنشاء المهمة:", {
      
      id,
      taskName,
      taskDateTime,
    });

    // إعادة تعيين الحقول بعد الإنشاء
    setTaskName("");
    setTaskDateTime("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        {/* شريط العنوان */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white text-center py-3 rounded-t-lg font-bold text-lg">
          إنشاء مهمة
        </div>

        {/* محتوى النافذة */}
        <div className="p-4">
          {/* حقل إدخال اسم المهمة */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              اسم المهمة
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="أدخل اسم المهمة"
            />
          </div>

          {/* حقل إدخال تاريخ ووقت المهمة */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              تاريخ ووقت المهمة
            </label>
            <div className="flex items-center gap-2">
              <input
                type="datetime-local"
                value={taskDateTime}
                onChange={(e) => setTaskDateTime(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                onClick={handleSetCurrentDateTime}
                className="mt-1 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                الآن
              </button>
            </div>
          </div>

          {/* زر إنشاء المهمة */}
          <button
            onClick={handleCreateTask}
            className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            إنشاء مهمة
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpCreateTask;