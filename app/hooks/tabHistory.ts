const STORAGE_KEY = 'tab_history_stack';

// استرجاع سجل التبويبات من localStorage
export const getTabStack = (): string[] => {
    const savedStack = localStorage.getItem(STORAGE_KEY);
    return savedStack ? JSON.parse(savedStack) : [];
};

// حفظ سجل التبويبات في localStorage
export const saveTabStack = (stack: string[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stack));
};

// معالجة الضغط على زر الرجوع
export const handleBackNavigation = (
    setActiveComponent: (component: string | null) => void
) => {
    const stack = getTabStack();
    if (stack.length > 1) {
        stack.pop(); // إزالة التبويب الحالي
        const previousTab = stack[stack.length - 1];
        setActiveComponent(previousTab);
        saveTabStack(stack);
    } else {
        setActiveComponent(null);
        localStorage.removeItem(STORAGE_KEY);
    }
};