import React, { useState } from 'react';
import { FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import { useTasks } from './Context';

const AddTaskButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const { addTask } = useTasks();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setError('');
    if (isOpen) {
      setTaskName('');
      setEndDate('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskName.trim()) {
      setError('اسم المهمة مطلوب');
      return;
    }
    
    if (!endDate) {
      setError('تاريخ الانتهاء مطلوب');
      return;
    }
    
    addTask({
      id: Date.now().toString(),
      taskName,
      creationDate: new Date().toISOString().split('T')[0],
      endDate,
      details: []
    });
    
    setTaskName('');
    setEndDate('');
    setIsOpen(false);
    setError('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 md:p-4">
      {isOpen ? (
        <div className="bg-violet-700 rounded-xl p-3 md:p-4 text-white shadow-md">
          <form onSubmit={handleSubmit}>
            {/* Mobile Layout (vertical) */}
            <div className="md:hidden flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-right">اسم المهمة</label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => {
                    setTaskName(e.target.value);
                    setError('');
                  }}
                  className="text-base bg-white bg-opacity-20 rounded p-2 text-right w-full text-black"
                  placeholder="أدخل اسم المهمة"
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-sm text-right">تاريخ الإنتهاء</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-white bg-opacity-20 rounded p-2 text-black text-base w-full"
                  required
                />
              </div>
            </div>

            {/* Desktop Layout (horizontal) */}
            <div className="hidden md:flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div className="flex flex-col text-sm gap-1 w-full md:w-auto">
                <div className="flex items-center justify-between">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-white bg-opacity-20 rounded p-1 text-black text-sm w-36"
                    required
                  />
                  <span className="text-right ml-2">تاريخ الإنتهاء:</span>
                </div>
              </div>

              <div className="flex items-center gap-3 ml-auto w-full md:w-64">
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={taskName}
                      onChange={(e) => {
                        setTaskName(e.target.value);
                        setError('');
                      }}
                      className="text-lg bg-white bg-opacity-20 rounded p-2 text-right flex-1 text-black min-w-0"
                      placeholder="اسم المهمة الجديدة"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-2 text-red-300 text-sm text-center md:text-right">
                {error}
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-white border-opacity-30">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 font-bold text-sm hover:bg-green-700"
                >
                  <FaSave className="text-sm" />
                  <span>حفظ المهمة</span>
                </button>
                
                <button
                  type="button"
                  onClick={toggleOpen}
                  className="inline-flex items-center gap-2 bg-red-600 text-white rounded-lg px-4 py-2 font-bold text-sm hover:bg-red-700"
                >
                  <FaTimes className="text-sm" />
                  <span>إلغاء</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={toggleOpen}
          className="w-full bg-violet-700 hover:bg-violet-800 text-white rounded-xl p-3 md:p-4 flex items-center justify-center gap-2 shadow-md text-sm md:text-base"
        >
          <FaPlus />
          <span>إضافة مهمة جديدة</span>
        </button>
      )}
    </div>
  );
};

export default AddTaskButton;