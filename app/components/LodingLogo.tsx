"use client";
import React from "react";

const LoadingLogo: React.FC = () => {
  const originalText = "TaskFlow";

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* إضافة الـ CSS animations هنا */}
      <style>
        {`
          @keyframes rotate-with-pause {
            0%, 40% {
              transform: rotate(0deg);
            }
            60%, 100% {
              transform: rotate(360deg);
            }
          }

          .animate-rotate-with-pause {
            animation: rotate-with-pause 2s linear infinite;
          }
        `}
      </style>

      {/* المكون الرئيسي */}
      <div className="relative">
        {/* الجزء الأول: الأسطوانة (الدائرة) */}
        <div
          className="absolute inset-0 rounded-full border-4 border-purple-700 opacity-50 animate-rotate-with-pause"
        />

        {/* الجزء الثاني: النص */}
        <div className="flex animate-rotate-with-pause">
          {originalText.split("").map((char, index) => (
            <span
              key={index}
              className="text font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 mx-1"
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingLogo;