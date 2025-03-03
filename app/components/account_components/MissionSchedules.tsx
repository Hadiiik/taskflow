"use client";
import React from "react";

interface MissionSchedule {
  id: number;
  table_name: string;
}

interface MissionSchedulesProps {
  schedules: MissionSchedule[]|[]|null;
}

const MissionSchedules: React.FC<MissionSchedulesProps> = ({ schedules }) => {
  // تحقق مما إذا كانت المصفوفة فارغة
  if (!schedules || schedules.length === 0) {
    return <p className="text-center text-gray-500 mt-4 text-lg">لا توجد جداول متاحة</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-4 mb-6">
        <h2 className="text-lg md:text-2xl font-bold text-white text-center">
          جداول المهام
        </h2>
      </div>

      <div className="mt-4 space-y-4">
        {schedules.map((schedule) => (
          <a
            key={schedule.id} // تأكد من استخدام مفتاح فريد
            href={`/schedule/${schedule.id}`}
            className="block bg-white rounded-3xl shadow-md py-3 text-center text-lg md:text-xl font-semibold transition hover:shadow-lg border-2 border-purple-600"
            style={{
              borderRadius: "12px",
              color: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              backgroundImage: "linear-gradient(to right, #8B5CF6, #6D28D9)",
            }}
          >
            {schedule.table_name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MissionSchedules;
