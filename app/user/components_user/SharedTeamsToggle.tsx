import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import TeamList from './TeamList'; // تأكد من مسار المكون

const SharedTeamsToggle = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const bestTeams = [
    { id: "1", name: "فريق التصميم", description: "متخصصون في تصميم الواجهات التفاعلية." },
    { id: "2", name: "فريق التطوير", description: "نطور حلول برمجية مبتكرة وفعالة." },
  ];
  return (
    <div className="font-sans">
      {/* زر التوسيع/الطي */}
      <div className="flex justify-end items-center mb-2">
        <div 
          className={`flex items-center justify-between px-4 py-2 rounded-full cursor-pointer 
            ${isExpanded ? 'bg-violet-600 text-white' : 'bg-white text-gray-800 border border-gray-200'}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-sm md:text-base font-medium ml-2">الفرق المشترك بها</span>
          <FaChevronDown 
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* عرض مكون TeamList عند التوسيع */}
      {isExpanded && <TeamList teams={bestTeams} />}
    </div>
  );
};

export default SharedTeamsToggle;