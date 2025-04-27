"use client";
import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiCalendar, FiUsers } from 'react-icons/fi';

interface Stage {
  name: string;
  members: string[];
  endDate: string;
}

interface AdvancedTaskTimelineProps {
  taskName: string;
  taskEndDate: string;
  taskId: string;
  stages: Stage[];
}

const AdvancedTaskTimeline: React.FC<AdvancedTaskTimelineProps> = ({ 
  taskName, 
  taskEndDate, 
  taskId, 
  stages 
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeStage, setActiveStage] = useState<number | null>(null);

  // تحديث التاريخ والتقدم
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // حساب التقدم الزمني
  useEffect(() => {
    if (!stages || stages.length === 0 || !taskEndDate) return;

    const firstStageDate = new Date(stages[0].endDate);
    const startDate = firstStageDate > new Date() ? new Date() : firstStageDate;
    const endDate = new Date(taskEndDate);
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = currentDate.getTime() - startDate.getTime();

    const percentage = Math.min(100, Math.max(0, (elapsedDuration / totalDuration) * 100));
    setProgressPercentage(percentage);

    // تحديد المرحلة النشطة
    const active = stages.findIndex(stage => new Date(stage.endDate) > currentDate);
    setActiveStage(active >= 0 ? active : stages.length - 1);
  }, [currentDate, stages, taskEndDate]);

  // تأثير حركة الشريط الزمني
  const getTimelinePosition = (): number => {
    if (activeStage === null || stages.length === 0) return 0;
    
    const stageStart = activeStage === 0 ? new Date() : new Date(stages[activeStage - 1].endDate);
    const stageEnd = new Date(stages[activeStage].endDate);
    const stageDuration = stageEnd.getTime() - stageStart.getTime();
    const stageElapsed = currentDate.getTime() - stageStart.getTime();
    
    return Math.min(100, Math.max(0, (stageElapsed / stageDuration) * 100));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* زر تبديل اللوحة الجانبية (للأجهزة المحمولة) */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-purple-600 text-white shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>

      {/* اللوحة الجانبية - معلومات المهمة */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transform transition-transform duration-300 fixed lg:static inset-y-0 left-0 z-40 lg:w-1/4 p-6 bg-purple-900 text-white overflow-y-auto`}>
        <div className="sticky top-6">
          <h1 className="text-2xl font-bold mb-2">{taskName}</h1>
          <div className="text-purple-200 mb-6">ID: {taskId}</div>
          
          <div className="flex items-center mb-4 text-sm">
            <FiCalendar className="mr-2" />
            <span>تاريخ اليوم: {currentDate.toLocaleDateString()}</span>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm mb-1">
              <span>بداية المهمة</span>
              <span>{new Date(stages[0].endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>نهاية المهمة</span>
              <span>{new Date(taskEndDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold mb-3">التقدم الزمني</h3>
            <div className="w-full bg-purple-700 rounded-full h-2.5">
              <div 
                className="bg-purple-300 h-2.5 rounded-full transition-all duration-1000 ease-in-out" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-purple-200 text-sm">
              <span>بداية</span>
              <span>{Math.round(progressPercentage)}%</span>
              <span>نهاية</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <FiUsers className="mr-2" />
              حالة المراحل
            </h3>
            <div className="space-y-2">
              {stages.map((stage, index) => {
                const stageEndDate = new Date(stage.endDate);
                const isCompleted = stageEndDate < currentDate;
                const isCurrent = index === activeStage;

                return (
                  <div 
                    key={index} 
                    className={`p-2 rounded-lg cursor-pointer transition-colors ${isCurrent ? 'bg-purple-700' : ''}`}
                    onClick={() => {
                      const element = document.getElementById(`stage-${index}`);
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        isCompleted ? 'bg-green-400' : isCurrent ? 'bg-yellow-400' : 'bg-gray-400'
                      }`}></div>
                      <span className="text-sm">{stage.name}</span>
                    </div>
                    {isCurrent && (
                      <div className="mt-1 ml-5 text-xs text-purple-200">
                        {stage.members.length} أعضاء
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="lg:w-3/4 p-6 lg:p-8">
        {/* الشريط الزمني العلوي */}
        <div className="relative mb-8 bg-purple-50 rounded-xl p-4">
          <div className="flex justify-between text-sm text-purple-800 mb-2">
            <span>بداية المشروع</span>
            <span>نهاية المشروع</span>
          </div>
          <div className="relative h-4 bg-purple-100 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-purple-300 transition-all duration-1000 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
            
            {/* مؤشر المرحلة الحالية */}
            {activeStage !== null && (
              <div 
                className="absolute top-0 h-full w-1 bg-white shadow-md transform -translate-x-1/2"
                style={{ 
                  left: `${(activeStage / (stages.length - 1)) * 100}%`,
                  animation: 'pulse 2s infinite'
                }}
              ></div>
            )}
          </div>
          
          {/* العلامات الزمنية */}
          <div className="flex justify-between mt-2">
            {stages.map((stage, index) => (
              <div 
                key={index}
                className={`text-xs text-center ${index === activeStage ? 'text-purple-600 font-bold' : 'text-purple-400'}`}
                style={{ width: `${100 / (stages.length - 1)}%` }}
              >
                {new Date(stage.endDate).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })}
              </div>
            ))}
          </div>
        </div>

        {/* الخط الزمني التفصيلي */}
        <div className="relative">
          {/* الخط المركزي */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-100"></div>
          
          {stages.map((stage, index) => {
            const stageEndDate = new Date(stage.endDate);
            const isCompleted = stageEndDate < currentDate;
            const isCurrent = index === activeStage;
            const isUpcoming = index > (activeStage || 0);

            return (
              <div 
                id={`stage-${index}`}
                key={index} 
                className="relative mb-10 pl-16 transition-all duration-300"
              >
                {/* نقطة المرحلة */}
                <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-purple-600' : 
                  isCurrent ? 'bg-purple-400 animate-pulse' : 
                  'bg-gray-300'
                }`}>
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>

                {/* شريط تقدم المرحلة */}
                {isCurrent && (
                  <div className="absolute left-8 top-1/2 transform -translate-y-1/2 h-0.5 bg-purple-200 w-full">
                    <div 
                      className="h-full bg-purple-400 transition-all duration-1000 ease-in-out"
                      style={{ width: `${getTimelinePosition()}%` }}
                    ></div>
                  </div>
                )}

                {/* بطاقة المرحلة */}
                <div className={`p-6 rounded-xl shadow-md transition-all duration-300 ${
                  isCompleted ? 'border-l-4 border-purple-600' : 
                  isCurrent ? 'border-l-4 border-purple-400 shadow-lg' : 
                  'border-l-4 border-gray-200'
                } ${
                  isCurrent ? 'bg-purple-50 scale-105' : 
                  isUpcoming ? 'bg-white opacity-90' : 
                  'bg-white opacity-100'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h3 className={`text-lg font-semibold ${
                        isCompleted ? 'text-purple-800' : 
                        isCurrent ? 'text-purple-700' : 
                        'text-gray-600'
                      }`}>
                        {stage.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {stageEndDate.toLocaleDateString('ar-EG', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <span className={`mt-2 sm:mt-0 px-3 py-1 text-xs rounded-full ${
                      isCompleted ? 'bg-green-100 text-green-800' : 
                      isCurrent ? 'bg-purple-100 text-purple-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {isCompleted ? 'مكتملة' : isCurrent ? 'جارية الآن' : 'قادمة'}
                    </span>
                  </div>

                  {/* الأعضاء المسؤولون */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-xs font-medium text-gray-500 mb-3">الفريق المسؤول</h4>
                    <div className="flex flex-wrap gap-3">
                      {stage.members.map((member, memberIndex) => (
                        <div 
                          key={memberIndex} 
                          className={`flex items-center px-3 py-2 rounded-lg shadow-xs transition-all ${
                            isCurrent ? 'bg-white border border-purple-200' : 'bg-gray-50'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            isCompleted ? 'bg-green-400' : 
                            isCurrent ? 'bg-purple-400' : 
                            'bg-gray-300'
                          }`}></div>
                          <span className="text-sm text-gray-700">{member}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* أنيميشن للنبض */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AdvancedTaskTimeline;