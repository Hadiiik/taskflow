import { useState } from 'react';
import { FaUsers, FaChevronDown } from 'react-icons/fa';

const TheAdminTeams = ({ userId } : { userId: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(userId);
  // بيانات الفرق الافتراضية
  const teams = [
    {
      id: 1,
      name: "فريق التطوير",
      description: "مسؤول عن تطوير وبرمجة التطبيقات والمواقع الإلكترونية"
    },
    {
      id: 2,
      name: "فريق التصميم",
      description: "يبتكر واجهات المستخدم وتجربة المستخدم المميزة"
    },
    {
      id: 3,
      name: "فريق التسويق",
      description: "يسوق للمنتجات ويحلل بيانات السوق لتحسين الاستراتيجيات"
    },
    {
      id: 4,
      name: "فريق الدعم",
      description: "يوفر الدعم الفني ويساعد العملاء في حل مشاكلهم"
    }
  ];

  return (
    <div className="font-sans">
      {/* عنوان الفرق مع زر التوسيع */}
      <div className="flex justify-end items-center mb-2">
        <div 
          className={`flex items-center justify-between px-4 py-2 rounded-full cursor-pointer 
            ${isExpanded ? 'bg-violet-600 text-white' : 'bg-white text-gray-800 border border-gray-200'}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-sm md:text-base font-medium ml-2">الفرق الخاصة بي</span>
          <FaChevronDown 
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* قائمة الفرق */}
      {isExpanded && (
        <div className="space-y-2">
          {teams.map((team) => (
            <div 
              key={team.id}
              className="p-3 border-2 border-violet-200 rounded-full flex flex-row-reverse items-center hover:bg-violet-50 transition-colors duration-200"
            >
              <div className="p-2 bg-violet-100 rounded-full ml-3">
                <FaUsers className="text-violet-600 text-lg" />
              </div>
              <div className="text-right">
                <h3 className="text-violet-700 font-medium text-sm md:text-base text-gray-800">{team.name}</h3>
                <p className="text-xs md:text-sm text-gray-600">{team.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TheAdminTeams;