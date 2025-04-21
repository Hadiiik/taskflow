import React from 'react';
import TeamTabs from '@/app/team/components_team/TeamTabs';

const page = () => {
  return (
    <div className="text-center p-4">
      <header className="bg-violet-600 text-white p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold">إدارة الفريق</h1>
        <p className="text-sm opacity-90 mt-1">لوحة التحكم لإدارة أعضاء الفريق وإعداداته</p>
      </header>
      <TeamTabs/>
    </div>
  );
};

export default page;