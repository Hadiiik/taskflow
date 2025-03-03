import React from "react";

interface LoadingMessageProps {
  message: string;  // الرسالة التي سيتم عرضها
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg text-center w-full max-w-xs">
        <div className="animate-pulse">
          <div className="text-lg font-bold text-violet-900 mb-3">{message}</div>
          <div className="text-sm text-violet-600">جاري التحميل...</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessage;
