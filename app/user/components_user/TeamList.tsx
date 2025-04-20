import React from "react";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";

interface Team {
  id: string;
  name: string;
  description: string;
}

const TeamList: React.FC = () => {
  // بيانات الفرق الثابتة داخل المكون
  const teams: Team[] = [
    {
      id: "1",
      name: "فريق التطوير",
      description: "مسؤول عن تطوير وبرمجة التطبيقات والمواقع الإلكترونية",
    },
    {
      id: "2",
      name: "فريق التصميم",
      description: "يبتكر واجهات المستخدم وتجربة المستخدم المميزة",
    },
    {
      id: "3",
      name: "فريق التسويق",
      description: "يسوق للمنتجات ويحلل بيانات السوق لتحسين الاستراتيجيات",
    },
    {
      id: "4",
      name: "فريق الدعم",
      description: "يوفر الدعم الفني ويساعد العملاء في حل مشاكلهم",
    },
  ];

  return (
    <div className="flex flex-col gap-3 p-4 w-full">
      {teams.map((team) => (
        <Link
          key={team.id}
          href={`/team/${team.id}`}
          passHref
          legacyBehavior
        >
          <a className="block w-full">
            <div className="p-3 border-2 border-violet-200 rounded-full flex flex-row-reverse items-center hover:bg-violet-50 transition-colors duration-200">
              <div className="flex items-center justify-center w-10 h-10 bg-violet-100 rounded-full mr-2">
                <FaUsers className="text-violet-500 w-5 h-5" />
              </div>
              <div className="flex flex-col justify-center mr-4 text-right flex-1">
                <span className="text-violet-700 font-medium text-sm md:text-base">
                  {team.name}
                </span>
                <span className="text-gray-500 text-xs">
                  {team.description}
                </span>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default TeamList;