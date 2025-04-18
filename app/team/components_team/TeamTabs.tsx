"use client";
import React, { useState } from "react";
import { FaTasks, FaUsers, FaComments } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import { useTabAnimation, TabUnderline, animationStyles } from '../../Animation/TabAnimations';
import AllTaskTeam from "./AllTaskTeam";
const TeamTabs = () => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'members' | 'chats'>('tasks');
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right');
  const { contentRef, underlineRef } = useTabAnimation(activeTab);

  // بيانات المهام
  // const teamTasks = [
  //   { id: "1", title: "إنشاء واجهة المستخدم", status: "مكتمل" },
  //   { id: "2", title: "تطوير نظام الدفع", status: "قيد العمل" },
  // ];

  // بيانات الأعضاء
  const teamMembers = [
    { id: "1", name: "أحمد محمد", role: "مصمم واجهات" },
    { id: "2", name: "سارة علي", role: "مطورة الواجهة الأمامية" },
  ];

  // بيانات المحادثات
  const teamChats = [
    { id: "1", sender: "أحمد محمد", message: "هل انتهيت من التصميم؟", time: "10:30 ص" },
    { id: "2", sender: "سارة علي", message: "نعم، سأرسله الآن", time: "10:35 ص" },
  ];

  const changeTab = (newTab: 'tasks' | 'members' | 'chats') => {
    const tabsOrder = ['tasks', 'members', 'chats'];
    const currentIndex = tabsOrder.indexOf(activeTab);
    const newIndex = tabsOrder.indexOf(newTab);
    
    if (newTab !== activeTab) {
      setTransitionDirection(newIndex > currentIndex ? 'left' : 'right');
      setActiveTab(newTab);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const tabsOrder = ['tasks', 'members', 'chats'];
      const currentIndex = tabsOrder.indexOf(activeTab);
      if (currentIndex < tabsOrder.length - 1) {
        changeTab(tabsOrder[currentIndex + 1] as 'tasks' | 'members' | 'chats');
      }
    },
    onSwipedRight: () => {
      const tabsOrder = ['tasks', 'members', 'chats'];
      const currentIndex = tabsOrder.indexOf(activeTab);
      if (currentIndex > 0) {
        changeTab(tabsOrder[currentIndex - 1] as 'tasks' | 'members' | 'chats');
      }
    },
    trackMouse: true,
  });

  return (
    <div className="h-screen flex flex-col">
      {/* المحتوى الرئيسي */}
      <div 
        className={`flex-1 overflow-y-auto pb-16 ${transitionDirection}-transition`}
        {...handlers}
        ref={contentRef}
      >
        <div className={`content-wrapper ${activeTab === 'tasks' ? 'active' : ''}`}>
        {activeTab === 'tasks' && (
          <div className="mt-6">
            <AllTaskTeam teamId="2" />
          </div>
        )}
          
          {activeTab === 'members' && (
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">أعضاء الفريق</h2>
              <ul className="space-y-3">
                {teamMembers.map(member => (
                  <li key={member.id} className="p-3 border rounded-lg">
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === 'chats' && (
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">محادثات الفريق</h2>
              <ul className="space-y-3">
                {teamChats.map(chat => (
                  <li key={chat.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{chat.sender}</h3>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm mt-1">{chat.message}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* تبويبات التبديل مع الخط المتحرك */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="flex justify-around border-t relative">
          <button
            className={`flex items-center px-4 py-3 ${
              activeTab === 'tasks' ? 'text-blue-500' : 'text-gray-500'
            } text-xs sm:text-sm font-medium`}
            onClick={() => changeTab('tasks')}
          >
            <FaTasks className="mr-2" /> مهام الفريق
          </button>
          
          <button
            className={`flex items-center px-4 py-3 ${
              activeTab === 'members' ? 'text-blue-500' : 'text-gray-500'
            } text-xs sm:text-sm font-medium`}
            onClick={() => changeTab('members')}
          >
            <FaUsers className="mr-2" /> الأعضاء
          </button>
          
          <button
            className={`flex items-center px-4 py-3 ${
              activeTab === 'chats' ? 'text-blue-500' : 'text-gray-500'
            } text-xs sm:text-sm font-medium`}
            onClick={() => changeTab('chats')}
          >
            <FaComments className="mr-2" /> المحادثات
          </button>
          
          <TabUnderline activeTab={activeTab} underlineRef={underlineRef} tabCount={3} />
        </div>
      </div>

      {/* إضافة أنماط CSS */}
      <style jsx>{animationStyles}</style>
    </div>
  );
};

export default TeamTabs;