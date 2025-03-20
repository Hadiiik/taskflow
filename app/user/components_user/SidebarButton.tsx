import React from 'react';

interface SidebarButtonProps {
    text: string; // نص الزر
    onClick?: () => void; // دالة عند النقر (اختياري)
    icon?: React.ReactNode; // أيقونة الزر (اختياري)
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ text, onClick, icon }) => {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-end space-x-3 p-2 text-violet-700 hover:text-violet-900 transition duration-300 focus:outline-none rtl-text"
        >
            {/* نص الزر */}
            <span className="text-sm font-medium">{text}</span>

            {/* أيقونة SVG */}
            <div className="w-5 h-5">
                {icon}
            </div>
        </button>
    );
};

export default SidebarButton;