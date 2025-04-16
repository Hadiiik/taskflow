// app/components/TaskLoader.tsx
import React from "react";

const TaskLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-40 h-40 rounded-full bg-violet-300 opacity-70 animate-pulse flex items-center justify-center shadow-xl">
        <span className="text-2xl font-bold text-violet-700 animate-pulse">
          TaskFlow
        </span>
      </div>
    </div>
  );
};

export default TaskLoader;
