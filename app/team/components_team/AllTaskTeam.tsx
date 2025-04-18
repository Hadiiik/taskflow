import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaMapMarkedAlt } from 'react-icons/fa';
import Link from 'next/link';
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

interface AllTaskTeamProps {
  teamId: string;
}

const AllTaskTeam: React.FC<AllTaskTeamProps> = ({ teamId }) => {
  // بيانات افتراضية للمهام
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      taskName: 'تطوير واجهة المستخدم',
      creationDate: '2023-05-10',
      endDate: '2024-06-15', // تاريخ مستقبلي للتجربة
      details: [
        { stageName: 'التصميم', stageEndDate: '2023-05-20' },
        { stageName: 'التطوير', stageEndDate: '2023-05-30' },
        { stageName: 'الاختبار', stageEndDate: '2023-06-10' },
      ],
    },
    {
      id: '2',
      taskName: 'تحسين أداء الخادم',
      creationDate: '2023-05-15',
      endDate: '2023-06-01',
      details: [
        { stageName: 'التحليل', stageEndDate: '2023-05-20' },
        { stageName: 'التنفيذ', stageEndDate: '2023-05-25' },
      ],
    },
    {
      id: '3',
      taskName: 'إضافة ميزة الدفع الإلكتروني',
      creationDate: '2023-05-20',
      endDate: '2025-06-30',
      details: [
        { stageName: 'دراسة الجدوى', stageEndDate: '2023-05-25' },
        { stageName: 'التكامل', stageEndDate: '2023-06-10' },
        { stageName: 'التوثيق', stageEndDate: '2023-06-20' },
      ],
    },
  ]);
  console.log(setTasks,teamId);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // تحديث الوقت كل دقيقة
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleExpand = (taskId: string) => {
    if (expandedTaskId === taskId) {
      setExpandedTaskId(null);
    } else {
      setExpandedTaskId(taskId);
    }
  };

  const calculateRemainingTime = (endDate: string) => {
    try {
      const end = new Date(endDate);
      const now = currentTime;
      
      if (isNaN(end.getTime())) {
        return 'تاريخ غير صالح';
      }
      
      const diff = end.getTime() - now.getTime();
      
      if (diff <= 0) return 'انتهت المهمة';
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      return `${days} يوم ${hours} ساعة`;
    } catch  {
      return 'خطأ في التاريخ';
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto p-4 md:p-5">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          className="bg-violet-700 rounded-xl p-3 md:p-4 text-white shadow-md"
        >
          {/* اسم المهمة في الأعلى للهاتف فقط */}
          <div className="md:hidden flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold">{task.taskName}</h3>
            <button 
              className="bg-transparent border-none text-white cursor-pointer p-1"
              onClick={() => toggleExpand(task.id)}
              aria-label="عرض التفاصيل"
            >
              <FaChevronDown 
                className={`transition-transform duration-300 ${
                  expandedTaskId === task.id ? 'rotate-180' : ''
                }`} 
              />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            {/* صف التواريخ والمؤقت للهاتف */}
            <div className="w-full md:w-auto flex flex-row items-start gap-4">
              {/* التواريخ */}
              <div className="flex flex-col text-[9px] md:text-sm gap-1">
                <div>تاريخ الإنشاء: {task.creationDate}</div>
                <div>تاريخ الانتهاء: {task.endDate}</div>
              </div>
              
              {/* المؤقت - يأخذ ارتفاع سطرين */}
              <div className="bg-white bg-opacity-20 px-2 py-1 rounded-lg text-center flex flex-col justify-center h-[3.5rem]">
                <div className="text-[0.65rem]">متبقي:</div>
                <div className="font-bold text-[10px]">
                  {calculateRemainingTime(task.endDate)}
                </div>
              </div>
            </div>
            
            {/* اسم المهمة للأجهزة الكبيرة فقط */}
            <div className="hidden md:flex items-center gap-2 ml-auto">
              <h3 className="text-lg md:text-xl text-right">{task.taskName}</h3>
              <button 
                className="bg-transparent border-none text-white cursor-pointer p-1"
                onClick={() => toggleExpand(task.id)}
                aria-label="عرض التفاصيل"
              >
                <FaChevronDown 
                  className={`transition-transform duration-300 ${
                    expandedTaskId === task.id ? 'rotate-180' : ''
                  }`} 
                />
              </button>
            </div>
          </div>
          
          {expandedTaskId === task.id && (
            <div className="mt-4 pt-4 border-t border-white border-opacity-30">
              <div className="font-bold mb-3 text-sm md:text-base">مراحل المهمة:</div>
              <ul className="list-none p-0 m-0 mb-4 space-y-2">
                {task.details.map((detail, index) => (
                  <li 
                    key={index} 
                    className="flex justify-between items-center py-1 border-b border-dashed border-white border-opacity-20 text-xs md:text-sm"
                  >
                    <span className="text-left">{detail.stageEndDate} :ينتهي في</span>
                    <span className="text-right">{detail.stageName}</span>
                  </li>
                ))}
              </ul>
              <Link 
                    href={`/Task/${task.id}`}
                    className="inline-flex items-center gap-2 bg-white text-violet-700 border-none rounded-lg px-3 py-2 font-bold cursor-pointer mt-2 text-xs md:text-sm transition-all duration-200 hover:bg-violet-100 hover:shadow-md hover:scale-105">
                    <FaMapMarkedAlt className="text-sm" />
                    <span>عرض خريطة المهمة</span>
                    </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllTaskTeam;