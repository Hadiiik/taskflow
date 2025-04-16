import React from 'react';
import TeamTabs from '../components_team/TeamTabs';

interface TeamPageProps {
  params: {
    id: string;
  };
}

const teamsData: Record<string, {name: string}> = {
  '1': {name: 'فريق التصميم'},
  '2': {name: 'فريق التطوير'},
  '3': {name: 'فريق التسويق'},
};

const TeamPage = ({params}: TeamPageProps) => {
  const teamId = params.id;
  const teamName = teamsData[teamId]?.name || 'الفريق';

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* رأس الصفحة مع محاذاة أقصى اليسار */}
      <header className="bg-violet-600 text-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-end"> {/* محاذاة المحتوى لليمين */}
            <div className="text-right"> {/* محتوى النص منحاز لليمين */}
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