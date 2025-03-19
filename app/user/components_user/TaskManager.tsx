import React, { useState } from "react";
import { FaList, FaUserCheck, FaPlus } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import Tasks from "./Tasks";
import TasksTeam from "@/app/user/components_user/TasksTeame";
interface Task {
  name: string;
  dueDate: string;
}

const TaskManager = () => {
  const [activeTab, setActiveTab] = useState<'personal' | 'team'>('personal');
  const [showModal, setShowModal] = useState(false); // حالة فتح/إغلاق المودال
  const [newTaskName, setNewTaskName] = useState(""); // اسم المهمة الجديدة
  const [newTaskDueDate, setNewTaskDueDate] = useState(""); // تاريخ انتهاء المهمة الجديدة
  const [personalTasks, setPersonalTasks] = useState<Task[]>([
    { name: "تسوق", dueDate: "2023-10-25" },
    { name: "قراءة كتاب", dueDate: "2023-10-20" },
  ]);


  const tasks = [
    { name: "تطوير واجهة المستخدم", dueDate: "2023-12-01", teamId: "1" },
    { name: "تحسين الأداء", dueDate: "2023-11-15", teamId: "2" },
  ];
  
  const teams = [
    { id: "1", name: "فريق التصميم", link: "https://example.com/team1" },
    { id: "2", name: "فريق التطوير", link: "https://example.com/team2" },
  ];
  // تكوين السحب
  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveTab('team'),
    onSwipedRight: () => setActiveTab('personal'),
    trackMouse: true,
  });

  // فتح المودال
  const openModal = () => setShowModal(true);

  // إغلاق المودال
  const closeModal = () => setShowModal(false);

  // إضافة مهمة جديدة
  const addTask = () => {
    if (newTaskName && newTaskDueDate) {
      const newTask: Task = {
        name: newTaskName,
        dueDate: newTaskDueDate,
      };
      setPersonalTasks([...personalTasks, newTask]); // تحديث قائمة المهام الشخصية
      setNewTaskName(""); // إعادة تعيين اسم المهمة
      setNewTaskDueDate(""); // إعادة تعيين تاريخ الانتهاء
      closeModal(); // إغلاق المودال
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* المحتوى الرئيسي */}
      <div className="flex-1 overflow-y-auto pb-16" {...handlers}>
        {activeTab === 'personal' ? (
          <Tasks tasks={personalTasks} />
        ) : (
            <TasksTeam tasks={tasks} teams={teams} />
        )}
      </div>

      {/* تبويبات التبديل بين المهام الشخصية ومهام الفريق (شريط سفلي) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="flex justify-around border-t">
          <button
            className={`flex items-center px-4 py-3 ${
              activeTab === 'personal'
                ? 'text-blue-500 border-t-2 border-blue-500'
                : 'text-gray-500'
            } text-xs sm:text-sm font-medium`}
            onClick={() => setActiveTab('personal')}
          >
            <FaList className="mr-2" /> المهام الشخصية
          </button>
          <button
            className={`flex items-center px-4 py-3 ${
              activeTab === 'team'
                ? 'text-blue-500 border-t-2 border-blue-500'
                : 'text-gray-500'
            } text-xs sm:text-sm font-medium`}
            onClick={() => setActiveTab('team')}
          >
            <FaUserCheck className="mr-2" /> مهام الفرق
          </button>
        </div>
      </div>

      {/* زر إضافة مهمة (يظهر فقط مع المهام الشخصية) */}
      {activeTab === 'personal' && (
        <button
          className="fixed bottom-20 right-4 bg-violet-500 text-white p-4 rounded-full shadow-lg hover:bg-violet-600 transition"
          onClick={openModal}
        >
          <FaPlus className="w-6 h-6" />
        </button>
      )}

      {/* مودال إضافة مهمة */}
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
    <div className="bg-white p-4 rounded-lg w-full max-w-xs">
      <h2 className="text-lg font-bold mb-3">إضافة مهمة جديدة</h2>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="اسم المهمة"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
        />
        <input
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="px-3 py-1.5 bg-gray-300 rounded-lg mr-2 hover:bg-gray-400 text-sm"
          onClick={closeModal}
        >
          إلغاء
        </button>
        <button
          className="px-3 py-1.5 bg-violet-500 text-white rounded-lg hover:bg-violet-600 text-sm"
          onClick={addTask}
        >
          إضافة
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default TaskManager;