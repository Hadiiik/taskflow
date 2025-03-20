import React, { useState } from "react";
import { FaTrophy, FaUsers } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import TeamList from "./TeamList";
import TopTeams from "./TopTeams";
const TeamManager = () => {
  const [activeTab, setActiveTab] = useState<'best' | 'joined'>('best');

  // بيانات أفضل الفرق
  const bestTeams = [
    {
      id: "1",
      name: "فريق التصميم",
      description: "متخصصون في تصميم الواجهات التفاعلية.",
    },
    {
      id: "2",
      name: "فريق التطوير",
      description: "نطور حلول برمجية مبتكرة وفعالة.",
    },
  ];

  // بيانات الفرق المشتركة
  const joinedTeams = [
    {
      id: "3",
      name: "فريق التسويق",
      description: "نساعدك في الوصول إلى جمهورك المستهدف.",
      completedTasks:12
    },
    {
      id: "4",
      name: "فريق الدعم",
      description: "نقدم الدعم الفني والاستشارات.",
      completedTasks:10
    },
  ];

  // تكوين السحب
  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveTab('joined'),
    onSwipedRight: () => setActiveTab('best'),
    trackMouse: true,
  });

  return (
    <div className="h-screen flex flex-col">
      {/* المحتوى الرئيسي */}
      <div className="flex-1 overflow-y-auto pb-16" {...handlers}>
        {activeTab === 'best' ? (
          <TopTeams teams={joinedTeams} />
        ) : (
          <TeamList teams={bestTeams} />
        )}
      </div>

      {/* تبويبات التبديل بين أفضل الفرق والفرق المشتركة (شريط سفلي) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="flex justify-around border-t">
          <button
            className={`flex items-center px-4 py-3 ${
              activeTab === 'best'
                ? 'text-blue-500 border-t-2 border-blue-500'
                : 'text-gray-500'
            } text-xs sm:text-sm font-medium`}
            onClick={() => setActiveTab('best')}
          >
            <FaTrophy className="mr-2" /> أفضل الفرق
          </button>
          <button
            className={`flex items-center px-4 py-3 ${
              activeTab === 'joined'
                ? 'text-blue-500 border-t-2 border-blue-500'
                : 'text-gray-500'
            } text-xs sm:text-sm font-medium`}
            onClick={() => setActiveTab('joined')}
          >
            <FaUsers className="mr-2" /> الفرق المشتركة
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamManager;