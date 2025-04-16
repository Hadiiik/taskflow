"use client";
import { useEffect, useRef } from 'react';

type TabType = string;

export const useTabAnimation = <T extends TabType>(activeTab: T) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const underlineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    contentRef.current?.classList.add('slide-transition');
    const timer = setTimeout(() => {
      contentRef.current?.classList.remove('slide-transition');
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    underlineRef.current?.classList.add('underline-transition');
    const timer = setTimeout(() => {
      underlineRef.current?.classList.remove('underline-transition');
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return { contentRef, underlineRef };
};

interface TabUnderlineProps {
  activeTab: string;
  underlineRef: React.RefObject<HTMLDivElement | null>;
  tabCount?: number;
}

export const TabUnderline = ({
  activeTab,
  underlineRef,
  tabCount = 2
}: TabUnderlineProps) => {
  const widthPercentage = 100 / tabCount;
  let leftPosition = 0;

  if (tabCount === 2) {
    leftPosition = activeTab === 'best' ? 0 : 50;
  } else if (tabCount === 3) {
    if (activeTab === 'tasks') leftPosition = 0;
    else if (activeTab === 'members') leftPosition = 33.33;
    else if (activeTab === 'chats') leftPosition = 66.66;
  }

  return (
    <div 
      ref={underlineRef}
      className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300"
      style={{
        width: `${widthPercentage}%`,
        left: `${leftPosition}%`
      }}
    />
  );
};

export const animationStyles = `
  .slide-transition {
    overflow-x: hidden;
  }
  
  .left-transition .content-wrapper {
    animation: slideInLeft 0.3s forwards;
  }
  
  .right-transition .content-wrapper {
    animation: slideInRight 0.3s forwards;
  }
  
  @keyframes slideInLeft {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideInRight {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  .underline-transition {
    animation: underlineFade 0.3s ease-out;
  }
  
  @keyframes underlineFade {
    from { opacity: 0; transform: scaleX(0.8); }
    to { opacity: 1; transform: scaleX(1); }
  }
`;