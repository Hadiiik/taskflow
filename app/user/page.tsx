"use client";
import React, { useState, useEffect } from 'react';
import Navbar from "./components_user/Navbar";
import AccountCard from "./components_user/AccountCard";
import TaskManager from './components_user/TaskManager';
import TeamManager from './components_user/TeamManager';

const STORAGE_KEY = 'tab_history_stack';

const HomePage = () => {
    const [activeComponent, setActiveComponent] = useState<string | null>(null);
    const teams = [
        { name: "فريق التصميم", id: "1" },
        { name: "فريق التطوير", id: "2" },
        { name: "فريق التسويق", id: "3" },
    ];

    // تهيئة السجل من localStorage عند التحميل
    useEffect(() => {
        const savedStack = localStorage.getItem(STORAGE_KEY);
        if (savedStack) {
            const stack = JSON.parse(savedStack);
            if (stack.length > 0) {
                setActiveComponent(stack[stack.length - 1]);
            }
        }

        // إضافة معالج حدث للزر الخلفي
        window.addEventListener('popstate', handleBackButton);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, []);

    const handleBackButton = () => {
        const stack = getTabStack();
        if (stack.length > 1) {
            // إزالة آخر عنصر (الحالي)
            stack.pop();
            // الحصول على العنصر السابق
            const previousTab = stack[stack.length - 1];
            setActiveComponent(previousTab);
            saveTabStack(stack);
        } else {
            // إذا كان هناك عنصر واحد فقط، أعد التوجيه للصفحة الرئيسية
            setActiveComponent(null);
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    const getTabStack = (): string[] => {
        const savedStack = localStorage.getItem(STORAGE_KEY);
        return savedStack ? JSON.parse(savedStack) : [];
    };

    const saveTabStack = (stack: string[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stack));
    };

    const handleMenuClick = (component: string) => {
        let stack = getTabStack();
        
        // إزالة التبويب إذا كان موجودًا بالفعل في السجل
        stack = stack.filter(tab => tab !== component);
        
        // إضافة التبويب الجديد إلى نهاية السجل
        stack.push(component);
        saveTabStack(stack);
        setActiveComponent(component);

        // إضافة إدخال جديد إلى سجل المتصفح
        window.history.pushState({ tab: component }, '', window.location.href);
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