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
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        {/* زر إنشاء فريق */}
        <button
          onClick={toggleCreateTeam}
          className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
            showCreateTeam 
              ? 'bg-violet-700 text-white' 
              : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
          }`}
        >
          <FaUsers />
          <span>إنشاء فريق</span>
        </button>

        {/* زر الانضمام إلى فريق */}
        <button
          onClick={toggleJoinTeam}
          className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
            showJoinTeam 
              ? 'bg-violet-700 text-white' 
              : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
          }`}
        >
          <FaUserPlus />
          <span>الانضمام إلى فريق</span>
        </button>
      </div>

      {/* المكونات المعروضة */}
      <div className="w-full">
          {showCreateTeam && <CreateTeamForm />}
        {showJoinTeam && <JoinTeamForm/>}
      </div>
    </div>
  );
};

export default TeamActions;