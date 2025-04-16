import React, { useState } from 'react';
import { FaUsers, FaUserPlus } from 'react-icons/fa';
import CreateTeamForm from './CreateTeamForm';
import JoinTeamForm from './JoinTeamForm';

const TeamActions = () => {
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);

  const toggleCreateTeam = () => {
    setShowCreateTeam(!showCreateTeam);
    if (showJoinTeam) setShowJoinTeam(false);
  };

  const toggleJoinTeam = () => {
    setShowJoinTeam(!showJoinTeam);
    if (showCreateTeam) setShowCreateTeam(false);
  };

  return (
    <div className="flex flex-col items-center w-full space-y-4">
      <div className="flex flex-row w-full justify-center gap-2">
        {/* زر إنشاء فريق */}
        <button
          onClick={toggleCreateTeam}
          className={`px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
            showCreateTeam 
              ? 'bg-violet-700 text-white' 
              : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
          }`}
        >
          <FaUsers className="text-sm md:text-base lg:text-lg" />
          <span className="text-xs md:text-sm lg:text-base">إنشاء فريق</span>
        </button>

        {/* زر الانضمام إلى فريق */}
        <button
          onClick={toggleJoinTeam}
          className={`px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
            showJoinTeam 
              ? 'bg-violet-700 text-white' 
              : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
          }`}
        >
          <FaUserPlus className="text-sm md:text-base lg:text-lg" />
          <span className="text-xs md:text-sm lg:text-base">الانضمام إلى فريق</span>
        </button>
      </div>

      {/* المكونات المعروضة */}
      <div className="w-full">
        {showCreateTeam && <CreateTeamForm />}
        {showJoinTeam && <JoinTeamForm />}
      </div>
    </div>
  );
};

export default TeamActions;