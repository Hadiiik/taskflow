import React from 'react';
import TeamTabs from '../components_team/TeamTabs';





const TeamPage = () => {
  const teamName =  'الفريق';
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-violet-600 text-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-end">
            <div className="text-right">
              <h1 className="text-2xl font-bold">{teamName}</h1>
              <p className="text-violet-100">إدارة فريقك بكل سهولة</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <TeamTabs />
      </main>
    </div>
  );
};

export default TeamPage;
