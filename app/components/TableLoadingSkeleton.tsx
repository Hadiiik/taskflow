"use client"
import React from "react";

const TableLoadingSkeleton: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      {/* رأس الجدول */}
      <div className="bg-purple-600 text-white text-lg font-semibold py-3 px-4 rounded-t-md">
        أعضاء الفريق
      </div>

      {/* هيكل تحميل الجدول */}
      <div className="animate-pulse">
        <table className="w-full border border-gray-200 shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">الاسم</th>
              <th className="py-2 px-4 border-b">الدور</th>
              <th className="py-2 px-4 border-b">المكانة</th>
              <th className="py-2 px-4 border-b">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableLoadingSkeleton;