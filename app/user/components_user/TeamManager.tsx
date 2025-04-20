import React, { useState } from "react";
import { FaTrophy, FaUsers } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import TeamList from "./TeamList";
import TopTeams from "./TopTeams";
import { useTabAnimation, TabUnderline, animationStyles } from '../../Animation/TabAnimations';

const TeamManager = () => {
  const [activeTab, setActiveTab] = useState<'best' | 'joined'>('best');
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right');
  const { contentRef, underlineRef } = useTabAnimation(activeTab);


  const joinedTeams = [
    { id: "3", name: "فريق التسويق", description: "نساعدك في الوصول إلى جمهورك المستهدف.", completedTasks: 12 },
    { id: "4", name: "فريق الدعم", description: "نقدم الدعم الفني والاستشارات.", completedTasks: 10 },
  ];

  const changeTab = (newTab: 'best' | 'joined') => {
    if (newTab !== activeTab) {
      setTransitionDirection(newTab === 'joined' ? 'left' : 'right');
      setActiveTab(newTab);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => changeTab('joined'),
    onSwipedRight: () => changeTab('best'),
    trackMouse: true,
  });
  console.log(contentRef);
  return (
    <div className="h-screen flex flex-col">
      {/* المحتوى الرئيسي */}
      <div 
        className={`flex-1 overflow-y-auto pb-16 ${transitionDirection}-transition`}
        {...handlers}
      >
        <div className={`content-wrapper ${activeTab === 'best' ? 'active' : ''}`}>
          {activeTab === 'best' ? (
            <TopTeams teams={joinedTeams} />
          ) : (
            <TeamList/>
          )}
        </div>
      </div>

      {/* تبويبات التبديل مع الخط المتحرك */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="flex justify-around border-t relative">
          <button
            className={`flex items-center px-4 py-3 ${
              activeTab === 'best' ? 'text-blue-500' : 'text-gray-500'
            } text-xs sm:text-sm font-medium`}
            onClick={() => changeTab('best')}
          >
            <FaTrophy className="mr-2" /> أفضل الفرق
          </button>
          <button
            className={`flex items-center px-4 py-3 ${
              activeTab === 'joined' ? 'text-blue-500' : 'text-gray-500'
            } text-xs sm:text-sm font-medium`}
            onClick={() => changeTab('joined')}
          >
            <FaUsers className="mr-2" /> الفرق المشتركة
          </button>
          
          <TabUnderline activeTab={activeTab} underlineRef={underlineRef} />
        </div>
      </div>

      {/* إضافة أنماط CSS */}
      <style jsx>{animationStyles}</style>
    </div>
  );
};

export default TeamManager;