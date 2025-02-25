"use client";
import React, { useEffect, useState } from "react";

const LoadingLogo: React.FC = () => {
  const originalText = "TaskFlow";
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 360); // زيادة الزاوية للدوران
    }, 2000); // كل ثانيتين

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full border-4 border-purple-700 opacity-50"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 2s ease-in-out",
            animation: "fadeOut 2s forwards",
          }}
        />
        <div
          className="flex transform transition-transform duration-1000"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
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