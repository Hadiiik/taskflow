"use client";
import { useEffect } from 'react';
import { getTabStack, saveTabStack, handleBackNavigation } from './tabHistory';

export const useTabHistory = (setActiveComponent: (component: string | null) => void) => {
    useEffect(() => {
        // تهيئة السجل عند التحميل
        const savedStack = getTabStack();
        if (savedStack.length > 0) {
            setActiveComponent(savedStack[savedStack.length - 1]);
        }

        // إضافة معالج حدث للزر الخلفي
        const handlePopState = () => handleBackNavigation(setActiveComponent);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [setActiveComponent]);

    const handleTabChange = (component: string) => {
        const stack = getTabStack().filter(tab => tab !== component);
        stack.push(component);
        saveTabStack(stack);
        setActiveComponent(component);
        window.history.pushState({ tab: component }, '', window.location.href);
    };

    return { handleTabChange };
};