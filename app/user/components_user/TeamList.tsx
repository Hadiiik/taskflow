import React from "react";
import { FaUsers } from "react-icons/fa";
import Link from "next/link"; // استيراد مكون Link من Next.js

interface Team {
  id: string;
  name: string;
  description: string;
}

interface TeamListProps {
  teams: Team[];
}

const TeamList: React.FC<TeamListProps> = ({ teams }) => {
  return (
    <div className="flex flex-col gap-3 p-4 w-full">
      {teams.map((team) => (
        <Link
          key={team.id}
          href={`/team/${team.id}`} // مسار الصفحة الديناميكية
          passHref
          legacyBehavior
        >
          <a className="block w-full"> {/* إضافة عنصر a لتحسين الأداء */}
            <div
              className="flex flex-row-reverse items-center justify-start w-full h-16 bg-white border-2 border-violet-500 rounded-s-full rounded-e-full shadow-sm hover:shadow-md transition-all
                        md:h-24 cursor-pointer" // إضافة cursor-pointer
            >
              {/* أيقونة الفريق */}
              <div className="flex items-center justify-center w-10 h-10 bg-violet-100 rounded-full mr-2">
                <FaUsers className="text-violet-500 w-5 h-5" />
              </div>

              {/* اسم الفريق والنص التعريفي */}
              <div className="flex flex-col justify-center mr-4 text-right flex-1">
                <span className="text-violet-700 font-medium text-sm md:text-base">
                  {team.name}
                </span>
                <span className="text-gray-500 text-xs">{team.description}</span>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default TeamList;