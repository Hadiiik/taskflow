"use client";
import React, { useState } from 'react';
import Navbar from "./components_user/Navbar";
import AccountCard from "./components_user/AccountCard";
import TaskManager from './components_user/TaskManager';
import TeamManager from './components_user/TeamManager';
import { useTabHistory } from '../hooks/useTabHistory';
import TeamActions from './components_user/TeamActions';
import TheAdminTeams from './components_user/TheAdminTeams';

const HomePage = () => {
    const [activeComponent, setActiveComponent] = useState<string | null>(null);
    const { handleTabChange } = useTabHistory(setActiveComponent);

    const handleLogout = () => {
        // منطق تسجيل الخروج
        console.log('تم تسجيل الخروج');
      };

      return (
        <div className="min-h-screen bg-gray-50">
            <Navbar onMenuClick={handleTabChange} />
            
            <div className="container mx-auto px-4 py-20">
                {activeComponent === 'account' &&  <AccountCard 
                    id="24" // get the id from local storage or cookies 
                    onLogout={handleLogout}
                />}
                {activeComponent === 'tasks' && <TaskManager />}
                {activeComponent === 'teams' && <TeamManager />}  
                {activeComponent === 'home' && (
                    <div className="space-y-8">
                        <TeamActions />
                        <TheAdminTeams /> {/* يمكنك تمرير ID المستخدم الفعلي هنا */}
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;