import React, { useEffect, useState } from 'react';

interface TimerProps {
  endDate: string;
  className?: string;
}

const TimerComponent: React.FC<TimerProps> = ({ endDate, className = '' }) => {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    expired: false
  });

  // دالة لتحديد لون النص بناءً على الأيام المتبقية
  const getTimeColor = (days: number) => {
    if (days > 20) return 'text-white'; // أبيض
    if (days > 10) return 'text-green-400'; // أخضر
    if (days > 5) return 'text-orange-400'; // برتقالي
    return 'text-red-500'; // أحمر (لأقل من 5 أيام)
  };

  useEffect(() => {
    const calculateRemainingTime = () => {
      try {
        const end = new Date(endDate);
        const now = new Date();
        
        if (isNaN(end.getTime())) {
          return { days: 0, hours: 0, minutes: 0, expired: true };
        }
        
        const diff = end.getTime() - now.getTime();
        
        if (diff <= 0) {
          return { days: 0, hours: 0, minutes: 0, expired: true };
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        return { days, hours, minutes, expired: false };
      } catch {
        return { days: 0, hours: 0, minutes: 0, expired: true };
      }
    };

    const updateTimer = () => {
      setRemainingTime(calculateRemainingTime());
    };

    // تحديث المؤقت فوراً
    updateTimer();
    
    // تحديث المؤقت كل دقيقة
    const timerId = setInterval(updateTimer, 60000);
    
    return () => clearInterval(timerId);
  }, [endDate]);

  if (remainingTime.expired) {
    return (
      <div className={`bg-white bg-opacity-20 px-2 py-1 rounded-lg text-center ${className}`}>
        <div className="text-[12px] md:text-sm text-red-900">انتهت المهمة</div>
      </div>
    );
  }

  // تحديد لون النص بناءً على الأيام المتبقية
  const textColor = getTimeColor(remainingTime.days);

  return (
    <div className={`bg-white bg-opacity-10 md:bg-opacity-20 px-2 py-1 rounded-lg text-center ${className}`}>
      {/* نص "متبقي" - يظهر بحجم أكبر على أجهزة الكمبيوتر */}
      <div className="text-[0.65rem] md:text-xs mb-1">متبقي:</div>
      
      <div className="flex justify-center gap-1">
        {/* الأيام */}
        <div className="flex flex-col items-center">
          <span className={`font-bold text-[10px] md:text-sm ${textColor}`}>{remainingTime.days}</span>
          <span className="text-[8px] md:text-[10px]">يوم</span>
        </div>
        
        {/* النقطتان الفاصلتان */}
        <span className={`font-bold text-[10px] md:text-sm ${textColor}`}>:</span>
        
        {/* الساعات */}
        <div className="flex flex-col items-center">
          <span className={`font-bold text-[10px] md:text-sm ${textColor}`}>{remainingTime.hours}</span>
          <span className="text-[8px] md:text-[10px]">ساعة</span>
        </div>
        
        {/* النقطتان الفاصلتان */}
        <span className={`font-bold text-[10px] md:text-sm ${textColor}`}>:</span>
        
        {/* الدقائق */}
        <div className="flex flex-col items-center">
          <span className={`font-bold text-[10px] md:text-sm ${textColor}`}>{remainingTime.minutes}</span>
          <span className="text-[8px] md:text-[10px]">دقيقة</span>
        </div>
      </div>
    </div>
  );
};

export default TimerComponent;