import React from 'react';

interface SidebarButtonProps {
    text: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    isActive?: boolean;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ 
    text, 
    onClick, 
    icon,
    isActive = false
}) => {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-end space-x-3 p-2 transition duration-300 focus:outline-none rtl-text rounded-lg ${
                isActive 
                    ? 'bg-violet-400 bg-opacity-20 text-violet-700 border-r-4 border-violet-500' 
                    : 'text-violet-700 hover:text-violet-900 hover:bg-violet-100'
            }`}
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