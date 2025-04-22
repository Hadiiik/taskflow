import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronDown, FaMapMarkedAlt, FaPlus, FaEdit, FaSave, FaTimes, FaTrash, FaUndo } from 'react-icons/fa';
import { useTasks } from './Context';
import Link from 'next/link';
import TimerComponent from '@/app/team/components_team/TimerComponent';

interface TaskDetail {
  stageName: string;
  stageEndDate: string;
}

interface Task {
  id: string;
  taskName: string;
  creationDate: string;
  endDate: string;
  details: TaskDetail[];
}

interface TaskManagementProps {
  teamId: string;
}

const TaskManagement: React.FC<TaskManagementProps> = ({ teamId }) => {
  console.log(teamId);
  
  const getStageColor = (stageEndDate: string) => {
    try {
      const end = new Date(stageEndDate);
      const now = new Date();
      
      if (isNaN(end.getTime())) {
        return 'text-white';
      }
      
      const diff = end.getTime() - now.getTime();
      
      if (diff <= 0) return 'text-red-900';
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      if (days > 20) return 'text-white';
      if (days > 10) return 'text-green-400';
      if (days > 5) return 'text-orange-500';
      return 'text-red-600';
    } catch {
      return 'text-white';
    }
  };
  const { tasks, setTasks } = useTasks();
  
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [newStageData, setNewStageData] = useState({
    taskId: null as string | null,
    stageName: '',
    stageEndDate: '',
    showForm: false,
  });

  const [editMode, setEditMode] = useState({
    taskId: null as string | null,
    editing: false,
    editedTaskName: '',
    editedEndDate: '',
    editedStages: {} as { [key: number]: { stageName: string; stageEndDate: string } },
    originalTask: null as Task | null
  });

  const [error, setError] = useState<string | null>(null);
  const [deleteState, setDeleteState] = useState({
    show: false,
    type: '', // 'task' or 'stage'
    taskId: '',
    stageIndex: -1
  });
  const [showDateError, setShowDateError] = useState({
    show: false,
    message: ''
  });

  // استخدام useCallback للدوال التي يتم تمريرها كتبعيات
  const cancelEdit = useCallback(() => {
    if (editMode.originalTask) {
      setTasks(tasks => tasks.map(task => 
        task.id === editMode.originalTask?.id ? editMode.originalTask : task
      ));
    }
    
    setEditMode({
      taskId: null,
      editing: false,
      editedTaskName: '',
      editedEndDate: '',
      editedStages: {},
      originalTask: null
    });
    setError(null);
  }, [editMode.originalTask]);

  // دالة حذف المهمة
  const deleteTask = useCallback((taskId: string) => {
    setTasks(tasks => tasks.filter(task => task.id !== taskId));
    if (editMode.taskId === taskId) {
      cancelEdit();
    }
  }, [editMode.taskId, cancelEdit]);

  // دالة حذف المرحلة
  const deleteStage = useCallback((taskId: string, stageIndex: number) => {
    setTasks(tasks => tasks.map(task => {
      if (task.id === taskId) {
        const updatedDetails = [...task.details];
        updatedDetails.splice(stageIndex, 1);
        
        return {
          ...task,
          details: updatedDetails
        };
      }
      return task;
    }));

    if (editMode.editing && editMode.taskId === taskId) {
      const updatedStages = {...editMode.editedStages};
      delete updatedStages[stageIndex];
      
      const renumberedStages: {[key: number]: { stageName: string; stageEndDate: string }} = {};
      Object.entries(updatedStages).forEach(([key, value]) => {
        const oldIndex = parseInt(key);
        if (oldIndex > stageIndex) {
          renumberedStages[oldIndex - 1] = value;
        } else if (oldIndex < stageIndex) {
          renumberedStages[oldIndex] = value;
        }
      });

      setEditMode(editMode => ({
        ...editMode,
        editedStages: renumberedStages
      }));
    }
  }, [editMode.editing, editMode.editedStages, editMode.taskId]);

  // useEffect للتعامل مع حذف المهام والمراحل
  useEffect(() => {
    if (deleteState.show) {
      const handleDelete = () => {
        if (deleteState.type === 'task') {
          deleteTask(deleteState.taskId);
        } else if (deleteState.type === 'stage') {
          deleteStage(deleteState.taskId, deleteState.stageIndex);
        }
        setDeleteState({...deleteState, show: false});
      };

      const handleCancel = () => {
        setDeleteState({...deleteState, show: false});
      };

      // يمكنك استبدال هذا بموودال حقيقي إذا كنت تستخدم مكتبة مثل Material-UI
      const confirmed = window.confirm(
        deleteState.type === 'task' 
          ? 'هل أنت متأكد أنك تريد حذف هذه المهمة؟ لا يمكن التراجع عن هذا الإجراء.'
          : 'هل أنت متأكد أنك تريد حذف هذه المرحلة؟ لا يمكن التراجع عن هذا الإجراء.'
      );

      if (confirmed) {
        handleDelete();
      } else {
        handleCancel();
      }
    }
  }, [deleteState, deleteTask, deleteStage]);

  const toggleExpand = (taskId: string) => {
    if (expandedTaskId === taskId) {
      setExpandedTaskId(null);
      setNewStageData({ ...newStageData, showForm: false });
      cancelEdit();
    } else {
      setExpandedTaskId(taskId);
    }
  };

  const handleAddStageClick = (taskId: string) => {
    setNewStageData({
      taskId,
      stageName: '',
      stageEndDate: '',
      showForm: true,
    });
  };

  const handleStageNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStageData({ ...newStageData, stageName: e.target.value });
  };

  const handleStageDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStageData({ ...newStageData, stageEndDate: e.target.value });
  };

  const validateStageDate = (taskEndDate: string, stageEndDate: string): boolean => {
    const taskEnd = new Date(taskEndDate);
    const stageEnd = new Date(stageEndDate);
    return stageEnd <= taskEnd;
  };

  const handleAddStageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStageData.taskId || !newStageData.stageName || !newStageData.stageEndDate) return;

    const task = tasks.find(t => t.id === newStageData.taskId);
    if (!task) return;

    if (!validateStageDate(task.endDate, newStageData.stageEndDate)) {
      setShowDateError({
        show: true,
        message: 'تاريخ انتهاء المرحلة يجب أن يكون قبل أو يساوي تاريخ انتهاء المهمة'
      });
      return;
    }

    setTasks(tasks.map(task => {
      if (task.id === newStageData.taskId) {
        return {
          ...task,
          details: [
            ...task.details,
            {
              stageName: newStageData.stageName,
              stageEndDate: newStageData.stageEndDate
            }
          ]
        };
      }
      return task;
    }));

    setNewStageData({
      taskId: null,
      stageName: '',
      stageEndDate: '',
      showForm: false,
    });
  };

  const cancelAddStage = () => {
    setNewStageData({
      taskId: null,
      stageName: '',
      stageEndDate: '',
      showForm: false,
    });
  };

  const toggleEditMode = () => {
    const task = tasks.find(t => t.id === expandedTaskId);
    if (task) {
      if (editMode.editing && editMode.taskId === task.id) {
        saveEdit();
      } else {
        setEditMode({
          taskId: task.id,
          editing: true,
          editedTaskName: task.taskName,
          editedEndDate: task.endDate,
          editedStages: task.details.reduce((acc, stage, index) => {
            acc[index] = { stageName: stage.stageName, stageEndDate: stage.stageEndDate };
            return acc;
          }, {} as { [key: number]: { stageName: string; stageEndDate: string } }),
          originalTask: JSON.parse(JSON.stringify(task))
        });
      }
    }
  };

  const handleStageEditChange = (index: number, field: 'stageName' | 'stageEndDate', value: string) => {
    setEditMode({
      ...editMode,
      editedStages: {
        ...editMode.editedStages,
        [index]: {
          ...(editMode.editedStages[index] || {}),
          [field]: value
        }
      }
    });
  };

  const saveEdit = () => {
    if (!editMode.taskId) return;

    if (!editMode.editedTaskName.trim()) {
      setError('اسم المهمة مطلوب');
      return;
    }

    // Validate stage dates
    const taskEndDate = new Date(editMode.editedEndDate);
    for (const [index, stage] of Object.entries(editMode.editedStages)) {
        console.log(index);
      const stageEndDate = new Date(stage.stageEndDate);
      if (stageEndDate > taskEndDate) {
        setShowDateError({
          show: true,
          message: `تاريخ انتهاء المرحلة "${stage.stageName}" يجب أن يكون قبل أو يساوي تاريخ انتهاء المهمة`
        });
        return;
      }
    }

    setError(null);

    setTasks(tasks.map(task => {
      if (task.id === editMode.taskId) {
        return {
          ...task,
          taskName: editMode.editedTaskName,
          endDate: editMode.editedEndDate,
          details: task.details.map((stage, index) => ({
            stageName: editMode.editedStages[index]?.stageName !== undefined 
                      ? editMode.editedStages[index]?.stageName || '' 
                      : stage.stageName,
            stageEndDate: editMode.editedStages[index]?.stageEndDate || stage.stageEndDate,
          }))
        };
      }
      return task;
    }));

    setEditMode({
      taskId: null,
      editing: false,
      editedTaskName: '',
      editedEndDate: '',
      editedStages: {},
      originalTask: null
    });
  };

  const confirmDeleteStage = (taskId: string, stageIndex: number) => {
    setDeleteState({
      show: true,
      type: 'stage',
      taskId,
      stageIndex
    });
  };

  const confirmDeleteTask = (taskId: string) => {
    setDeleteState({
      show: true,
      type: 'task',
      taskId,
      stageIndex: -1
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto p-4 md:p-5">
      {/* Date Validation Error Dialog */}
      {showDateError.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4 text-right">خطأ في تاريخ المرحلة</h3>
            <p className="text-right mb-6">{showDateError.message}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDateError({...showDateError, show: false})}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                حسناً
              </button>
            </div>
          </div>
        </div>
      )}

      {tasks.map((task) => (
        <div key={task.id} className="bg-violet-700 rounded-xl p-3 md:p-4 text-white shadow-md">
          {/* Task Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            {/* Mobile View */}
            <div className="md:hidden w-full flex justify-between items-center">
              {editMode.editing && editMode.taskId === task.id ? (
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={editMode.editedTaskName}
                      onChange={(e) => {
                        setEditMode({...editMode, editedTaskName: e.target.value});
                        setError(null);
                      }}
                      className="text-xs font-bold bg-white bg-opacity-20 rounded p-1 flex-1 text-black w-[120px]"
                      placeholder="اسم المهمة"
                    />
                    <button 
                      onClick={() => confirmDeleteTask(task.id)}
                      className="text-red-500 p-1"
                      aria-label="حذف المهمة"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                  {error && <span className="text-red-400 text-xs">{error}</span>}
                </div>
              ) : (
                <h3 className="text-sm font-bold">{task.taskName}</h3>
              )}
              <button 
                onClick={() => toggleExpand(task.id)}
                className="p-1 text-white"
                aria-label="عرض التفاصيل"
              >
                <FaChevronDown className={`transition-transform ${expandedTaskId === task.id ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Dates and Timer */}
            <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="flex flex-col text-xs md:text-sm gap-1">
                <div> {task.creationDate} :تاريخ الإنشاء</div>
                <div className="flex items-center justify-between">
                  {editMode.editing && editMode.taskId === task.id ? (
                    <input
                      type="date"
                      value={editMode.editedEndDate}
                      onChange={(e) => setEditMode({...editMode, editedEndDate: e.target.value})}
                      className="bg-white bg-opacity-20 rounded p-1 text-black text-xs w-28"
                    />
                  ) : (
                    <span className="text-left">{task.endDate}</span>
                  )}
                  <span className="text-right"> :تاريخ الإنتهاء</span>
                </div>
                {(!editMode.editing || editMode.taskId !== task.id) && (
                <TimerComponent endDate={task.endDate} />
              )}
              </div>
              
            </div>

            {/* Desktop View - Task Name and Buttons */}
            <div className="hidden md:flex items-center gap-3 ml-auto">
              {editMode.editing && editMode.taskId === task.id ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editMode.editedTaskName}
                      onChange={(e) => {
                        setEditMode({...editMode, editedTaskName: e.target.value});
                        setError(null);
                      }}
                      className="text-lg bg-white bg-opacity-20 rounded p-1 text-right flex-1 text-black min-w-0"
                      placeholder="اسم المهمة"
                    />
                    <button 
                      onClick={() => confirmDeleteTask(task.id)}
                      className="text-red-500 p-1"
                      aria-label="حذف المهمة"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  {error && <span className="text-red-400 text-xs text-right">{error}</span>}
                </div>
              ) : (
                <h3 className="text-lg text-right">{task.taskName}</h3>
              )}
              
              <button 
                onClick={() => toggleExpand(task.id)}
                className="p-2 text-white bg-violet-600 rounded-lg hover:bg-violet-800"
                aria-label="عرض التفاصيل"
              >
                <FaChevronDown className={`transition-transform ${expandedTaskId === task.id ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Expanded Task Details */}
          {expandedTaskId === task.id && (
            <div className="mt-4 pt-4 border-t border-white border-opacity-30">
              <div className="font-bold mb-3 text-sm md:text-base text-right">مراحل المهمة:</div>
              
              <ul className="list-none p-0 m-0 mb-4 space-y-2">
                {task.details.map((detail, stageIndex) => (
                  <li key={stageIndex} className="flex justify-between items-center py-1 border-b border-dashed border-white border-opacity-20 text-xs md:text-sm">
                    <div className="flex items-center gap-2">
                      {editMode.editing && editMode.taskId === task.id ? (
                        <>
                          <input
                            type="date"
                            value={editMode.editedStages[stageIndex]?.stageEndDate || detail.stageEndDate}
                            onChange={(e) => handleStageEditChange(stageIndex, 'stageEndDate', e.target.value)}
                            className="bg-white bg-opacity-20 rounded p-1 text-black text-xs w-24"
                          />
                          <button 
                            onClick={() => confirmDeleteStage(task.id, stageIndex)}
                            className="text-red-500 p-1"
                            aria-label="حذف المرحلة"
                          >
                            <FaTimes />
                          </button>
                        </>
                      ) : (
                        <div className={`bg-white bg-opacity-60 md:bg-opacity-20 px-2 py-1 rounded-lg text-center`}>
                          <span className={`text-left ${getStageColor(detail.stageEndDate)}`}>
                            {detail.stageEndDate} :ينتهي في
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {editMode.editing && editMode.taskId === task.id ? (
                      <input
                        type="text"
                        value={editMode.editedStages[stageIndex]?.stageName || ''}
                        onChange={(e) => handleStageEditChange(stageIndex, 'stageName', e.target.value)}
                        className="bg-white bg-opacity-20 rounded p-1 text-right flex-1 text-black text-xs max-w-[120px]"
                        placeholder="اسم المرحلة"
                      />
                    ) : (
                      <span className="text-right">{detail.stageName}</span>
                    )}
                  </li>
                ))}
              </ul>

              {/* Add New Stage Form */}
              {newStageData.showForm && newStageData.taskId === task.id ? (
                <form onSubmit={handleAddStageSubmit} className="mb-4 p-3 bg-violet-600 rounded-lg">
                  <div className="flex flex-col md:flex-row gap-3 mb-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={newStageData.stageName}
                        onChange={handleStageNameChange}
                        placeholder="اسم المرحلة الجديدة"
                        className="w-full p-2 rounded-lg text-black text-sm"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="date"
                        value={newStageData.stageEndDate}
                        onChange={handleStageDateChange}
                        className="w-full p-2 rounded-lg text-black text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors"
                    >
                      إضافة المرحلة
                    </button>
                    <button
                      type="button"
                      onClick={cancelAddStage}
                      className="bg-gray-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-600 transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <Link 
                    href={`/Task/${task.id}`}
                    className="inline-flex items-center gap-2 bg-white text-violet-700 rounded-lg px-3 py-2 font-bold text-xs md:text-sm hover:bg-violet-100"
                  >
                    <FaMapMarkedAlt className="text-sm" />
                    <span>خريطة المهمة</span>
                  </Link>
                  
                  {(!editMode.editing || editMode.taskId !== task.id) && (
                    <button
                      onClick={() => handleAddStageClick(task.id)}
                      className="inline-flex items-center gap-2 bg-green-600 text-white rounded-lg px-3 py-2 font-bold text-xs md:text-sm hover:bg-green-700"
                    >
                      <FaPlus className="text-sm" />
                      <span>إضافة مرحلة</span>
                    </button>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={toggleEditMode}
                      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 font-bold text-xs md:text-sm hover:shadow-md ${
                        editMode.editing && editMode.taskId === task.id
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {editMode.editing && editMode.taskId === task.id ? (
                        <>
                          <FaSave className="text-sm" />
                          <span>حفظ</span>
                        </>
                      ) : (
                        <>
                          <FaEdit className="text-sm" />
                          <span>تعديل</span>
                        </>
                      )}
                    </button>
                    
                    {editMode.editing && editMode.taskId === task.id && (
                      <button
                        onClick={cancelEdit}
                        className="inline-flex items-center gap-2 bg-red-600 text-white rounded-lg px-3 py-2 font-bold text-xs md:text-sm hover:bg-red-700"
                      >
                        <FaUndo className="text-sm" />
                        <span>إلغاء</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskManagement;