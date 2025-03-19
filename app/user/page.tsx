"use client";
import React, { useState } from 'react'
import Navbar from "./components_user/Navbar";
import AccountCard from "./components_user/AccountCard";
import TaskManager from './components_user/TaskManager';
import TeamManager from './components_user/TeamManager';
const HomePage = () => {
    const [activeComponent, setActiveComponent] = useState <string | null>(null);
    const teams = [
        { name: "فريق التصميم", id: "1" },
        { name: "فريق التطوير", id: "2" },
        { name: "فريق التسويق", id: "3" },
    ];
    const handleMenuClick = (component: string) => {
        setActiveComponent(component);
    };
    return (
        <div className="min-h-screen bg-gray-50">
            {/* استدعاء مكون الشريط العلوي */}
            <Navbar onMenuClick={handleMenuClick} />

            {/* محتوى الصفحة */}
            <div className="container mx-auto px-4 py-20">
            {activeComponent === 'account' && (
                <div className="p-6">
                     <AccountCard
                        id="123"
                        name="محمد أحمد"
                        completedTasks={15}
                        teams={teams}
                        phoneNumber="+966500000000"
                        linkedinUrl="https://www.linkedin.com/in/example"
                        email="example@example.com"
                        bio="مطور واجهات أمامية بخبرة 5 سنوات في React وNext.js" 
                    />
                </div>
            )}
            {activeComponent === 'tasks' && (
                    <div className="p-6">
                        <TaskManager />
                    </div>
                )}

            {activeComponent === 'teams' && (
                    <div className="p-6">
                        <TeamManager/>
                    </div>
                )}  
            </div>
        </div>
    );
};

export default HomePage;