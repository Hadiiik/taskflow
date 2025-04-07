import React from "react";
import { FaUserPlus, FaExternalLinkAlt } from "react-icons/fa";

interface Team {
  id: string;
  name: string;
  description: string; // النص التعريفي للفريق
  completedTasks: number; // عدد المهام المنجزة
  //teamLink: string; // رابط صفحة الفريق
}

interface TopTeamsProps {
  teams: Team[];
}

const TopTeams: React.FC<TopTeamsProps> = ({ teams }) => {
  // ترتيب الفرق تنازليًا بناءً على عدد المهام المنجزة
  const sortedTeams = teams.sort((a, b) => b.completedTasks - a.completedTasks);

  // دالة لطلب الانضمام إلى الفريق
  const handleJoinRequest = (teamId: string) => {
    alert(`تم طلب الانضمام إلى الفريق ذو المعرف: ${teamId}`);
    //الهدهد الاحمر هون بدك تعمل طلب للحساب الي هو بمعرف الفريق (المدير ) 
    //بنبعت للمدير اشعار انو المستخدم فلان معروف من معرفو بدو ينضم للفريق 
    // مكون الاشعار يمكن يلزمك هون 
  };

  return (
    <div className="flex flex-col gap-3 p-4 w-full">
      {sortedTeams.map((team, index) => (
        <div
          key={team.id}
          className="flex flex-col md:flex-row md:items-center justify-start w-full h-auto bg-white border-2 border-violet-500 rounded-s-full rounded-e-full shadow-sm hover:shadow-md transition-all p-3"
        >
          {/* الترتيب (Top) */}
          <div className="flex items-center justify-center w-10 h-10 bg-violet-100 rounded-full mr-2">
            <span className="text-violet-700 font-bold">{index + 1}</span>
          </div>

          {/* اسم الفريق والنص التعريفي وعدد المهام المنجزة */}
          <div className="flex flex-col justify-center mr-4 text-right flex-1">
            <span className="text-violet-700 font-medium text-sm md:text-base">
              {team.name}
            </span>
            <span className="text-gray-500 text-xs">{team.description}</span>
            <span className="text-red-500 text-xs mt-1">
              المهام المنجزة: {team.completedTasks}
            </span>
          </div>

          {/* الأزرار (أسفل النص في الهاتف، بجانب النص في سطح المكتب) */}
          <div className="flex flex-row gap-2 mt-2 md:mt-0">
            {/* زر طلب الانضمام */}
            <button
              className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
              onClick={() => handleJoinRequest(team.id)}
              title="طلب انضمام"
            >
              <FaUserPlus className="text-green-500 w-4 h-4" />
            </button>

            {/* زر زيارة صفحة الفريق */}
            <a
              href={``}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
              title="زيارة الصفحة"
            >
              <FaExternalLinkAlt className="text-blue-500 w-4 h-4" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopTeams;