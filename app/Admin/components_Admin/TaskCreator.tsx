import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiSave, FiCalendar, FiUser, FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface Member {
  id: number;
  name: string;
}

interface TaskStage {
  name: string;
  startDate: string;
  dueDate: string;
  assignedMembers: number[];
}

interface Task {
  name: string;
  startDate: string;
  dueDate: string;
  stages: TaskStage[];
}

interface TaskCreatorProps {
  members: Member[];
  onSaveTask: (task: Task) => void;
}

const TaskCreator = ({ members, onSaveTask }: TaskCreatorProps) => {
  const [creationDate] = useState(new Date().toISOString().split('T')[0]);
  const [task, setTask] = useState<Task>({
    name: '',
    startDate: '',
    dueDate: '',
    stages: []
  });

  const [newStage, setNewStage] = useState<TaskStage>({
    name: '',
    startDate: '',
    dueDate: '',
    assignedMembers: []
  });

  const [isAddingStage, setIsAddingStage] = useState(false);
  const [isTaskCreatorVisible, setIsTaskCreatorVisible] = useState(false);

  const resetForm = () => {
    setTask({
      name: '',
      startDate: '',
      dueDate: '',
      stages: []
    });
    setNewStage({
      name: '',
      startDate: '',
      dueDate: '',
      assignedMembers: []
    });
    setIsAddingStage(false);
  };

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleStageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStage(prev => ({ ...prev, [name]: value }));
  };

  const toggleMemberSelection = (memberId: number) => {
    setNewStage(prev => {
      const assigned = prev.assignedMembers.includes(memberId)
        ? prev.assignedMembers.filter(id => id !== memberId)
        : [...prev.assignedMembers, memberId];
      return { ...prev, assignedMembers: assigned };
    });
  };

  const validateStageDates = () => {
    const { startDate, dueDate } = newStage;
    if (!startDate || !dueDate || !task.startDate || !task.dueDate) return true;

    const stageStart = new Date(startDate);
    const stageDue = new Date(dueDate);
    const taskStart = new Date(task.startDate);
    const taskDue = new Date(task.dueDate);

    return (
      stageStart >= taskStart &&
      stageDue <= taskDue &&
      stageStart <= stageDue
    );
  };

  const addStage = () => {
    if (!newStage.name || !newStage.startDate || !newStage.dueDate || newStage.assignedMembers.length === 0) {
      alert('الرجاء إكمال جميع بيانات المرحلة');
      return;
    }

    if (!validateStageDates()) {
      alert('تواريخ المرحلة غير صحيحة');
      return;
    }

    setTask(prev => ({
      ...prev,
      stages: [...prev.stages, newStage]
    }));

    setNewStage({
      name: '',
      startDate: '',
      dueDate: '',
      assignedMembers: []
    });
    setIsAddingStage(false);
  };

  const removeStage = (index: number) => {
    setTask(prev => ({
      ...prev,
      stages: prev.stages.filter((_, i) => i !== index)
    }));
  };

  const saveTask = () => {
    if (!task.name || !task.startDate || !task.dueDate || task.stages.length === 0) {
      alert('الرجاء إكمال جميع بيانات المهمة');
      return;
    }

    onSaveTask(task);
    resetForm();
    setIsTaskCreatorVisible(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div
        className="w-full py-3 text-lg font-medium flex items-center justify-between bg-violet-700 text-white px-6 cursor-pointer hover:bg-violet-800 transition-colors"
        onClick={() => setIsTaskCreatorVisible(!isTaskCreatorVisible)}
      >
        <span>{isTaskCreatorVisible ? 'إغلاق' : 'إنشاء مهمة جديدة'}</span>
        {isTaskCreatorVisible ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </div>

      <div className={`transition-all duration-300 ease-in-out ${isTaskCreatorVisible ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 space-y-6">
          {/* Task Info */}
          <div className="space-y-4 p-4 border border-violet-200 rounded-lg bg-violet-50">
            <h3 className="text-lg font-semibold text-violet-800">معلومات المهمة الأساسية</h3>

            <div>
              <label className="block text-violet-700 font-medium mb-2">اسم المهمة</label>
              <input
                type="text"
                name="name"
                value={task.name}
                onChange={handleTaskChange}
                className="w-full px-4 py-2 border border-violet-300 rounded-lg"
                placeholder="أدخل اسم المهمة"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-violet-700 font-medium mb-2">تاريخ بداية المهمة</label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-3 text-violet-500" />
                  <input
                    type="date"
                    name="startDate"
                    value={task.startDate}
                    min={creationDate}
                    onChange={handleTaskChange}
                    className="w-full pl-10 px-4 py-2 border border-violet-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-violet-700 font-medium mb-2">تاريخ انتهاء المهمة</label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-3 text-violet-500" />
                  <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    min={task.startDate || creationDate}
                    onChange={handleTaskChange}
                    className="w-full pl-10 px-4 py-2 border border-violet-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stages List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-violet-800">مراحل المهمة</h3>
              <span className="text-sm text-violet-600 bg-violet-100 px-3 py-1 rounded-full">
                {task.stages.length} مراحل
              </span>
            </div>

            <div className="border border-violet-200 rounded-lg max-h-64 overflow-y-auto p-2">
              {task.stages.length > 0 ? (
                task.stages.map((stage, index) => (
                  <div key={index} className="p-3 border border-violet-100 rounded-lg bg-white hover:bg-violet-50 transition-colors mb-2">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-violet-800 flex items-center">
                        <span className="bg-violet-100 text-violet-700 w-6 h-6 flex items-center justify-center rounded-full text-sm mr-2">
                          {index + 1}
                        </span>
                        {stage.name}
                      </h4>
                      <button onClick={() => removeStage(index)} className="text-red-500 hover:text-red-700 p-1 rounded-full">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <div className="text-sm text-violet-600 flex flex-col gap-1">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2" size={14} />
                        يبدأ في: {stage.startDate}
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="mr-2" size={14} />
                        ينتهي في: {stage.dueDate}
                      </div>
                      <div className="flex items-center">
                        <FiUser className="mr-2" size={14} />
                        المكلفون: {stage.assignedMembers.map(id => members.find(m => m.id === id)?.name).filter(Boolean).join('، ')}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-violet-500">لا توجد مراحل مضافة بعد</div>
              )}
            </div>

            {/* Add Stage */}
            {isAddingStage ? (
              <div className="p-4 border border-violet-200 rounded-lg bg-white shadow-sm">
                <h4 className="font-medium text-violet-800 mb-4 flex items-center">
                  <FiPlus className="mr-2" /> إضافة مرحلة جديدة
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-violet-700 font-medium mb-2">اسم المرحلة</label>
                    <input
                      type="text"
                      name="name"
                      value={newStage.name}
                      onChange={handleStageChange}
                      className="w-full px-4 py-2 border border-violet-300 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-violet-700 font-medium mb-2">تاريخ بداية المرحلة</label>
                      <input
                        type="date"
                        name="startDate"
                        value={newStage.startDate}
                        min={task.startDate}
                        max={task.dueDate}
                        onChange={handleStageChange}
                        className="w-full px-4 py-2 pl-10 border border-violet-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-violet-700 font-medium mb-2">تاريخ انتهاء المرحلة</label>
                      <input
                        type="date"
                        name="dueDate"
                        value={newStage.dueDate}
                        min={task.startDate}
                        max={task.dueDate}
                        onChange={handleStageChange}
                        className="w-full px-4 py-2 pl-10 border border-violet-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-violet-700 font-medium mb-2">اختر الأعضاء المكلفين</label>
                    <div className="max-h-40 overflow-y-auto border border-violet-200 rounded-lg p-2">
                      {members.map(member => (
                        <div
                          key={member.id}
                          onClick={() => toggleMemberSelection(member.id)}
                          className={`flex items-center p-2 mb-1 rounded cursor-pointer ${
                            newStage.assignedMembers.includes(member.id)
                              ? 'bg-violet-100 text-violet-800'
                              : 'hover:bg-violet-50'
                          }`}
                        >
                          {newStage.assignedMembers.includes(member.id) ? (
                            <FiCheck className="mr-2 text-violet-600" />
                          ) : (
                            <div className="w-5 mr-2" />
                          )}
                          <span>{member.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button onClick={() => setIsAddingStage(false)} className="px-4 py-2 text-violet-700 border border-violet-300 rounded-lg">
                      إلغاء
                    </button>
                    <button onClick={addStage} className="px-4 py-2 bg-violet-600 text-white rounded-lg flex items-center">
                      <FiSave className="mr-2" />
                      حفظ المرحلة
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => setIsAddingStage(true)} className="w-full py-2.5 bg-violet-100 text-violet-700 rounded-lg flex items-center justify-center">
                <FiPlus className="mr-2" /> إضافة مرحلة جديدة
              </button>
            )}
          </div>

          {/* Save Task */}
          <button
            onClick={saveTask}
            disabled={task.stages.length === 0}
            className={`w-full py-3 text-white rounded-lg font-medium text-lg flex items-center justify-center ${
              task.stages.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-violet-700 hover:bg-violet-800'
            }`}
          >
            <FiSave className="mr-2" />
            حفظ المهمة
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCreator;