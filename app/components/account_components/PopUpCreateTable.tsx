"use client";
import React, { useState } from "react";

interface PopUpCreateTableProps {
  isOpen: boolean;
}

const PopUpCreateTable: React.FC<PopUpCreateTableProps> = ({ isOpen }) => {
  const [columns, setColumns] = useState<{ id: number; name: string }[]>([]);
  const [showConfirm, setShowConfirm] = useState<number | null>(null);

  const addColumn = () => {
    const newColumnId = columns.length > 0 ? columns[columns.length - 1].id + 1 : 1;
    setColumns([...columns, { id: newColumnId, name: "" }]);
  };

  const removeColumn = (id: number) => {
    setColumns(columns.filter((col) => col.id !== id));
    setShowConfirm(null);
  };

  const handleClose = () => {
    // هنا يمكنك إضافة أي منطق لإغلاق النافذة إذا لزم الأمر
    // على سبيل المثال، يمكن أن تضع هنا دالة لتحديث الحالة في المكون الأب إذا لزم الأمر
  };

  const getReindexedColumns = () => {
    return columns.map((col, index) => ({
      ...col,
      id: index + 1, // إعادة تعيين ID ليكون متسلسلًا
    }));
  };

  if (!isOpen) {
    return null; // إذا لم يكن مفتوحًا، لا نعرض أي شيء
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-5 relative">
        <h2 className="text-lg font-bold text-white bg-purple-600 py-2 px-4 rounded-t-lg text-center">إنشاء جدول مهمة</h2>

        <div className="mt-3">
          <label className="block text-gray-700 font-medium text-sm">اسم الجدول</label>
          <input type="text" className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-purple-600 text-sm" placeholder="أدخل اسم الجدول" />
        </div>

        <div className="mt-3 text-center font-bold text-purple-600 border-t-2 border-purple-600 pt-2 text-sm">أعمدة الجدول</div>

        <div className="max-h-48 overflow-y-auto mt-2 space-y-2">
          {getReindexedColumns().map((column) => (
            <div key={column.id} className="flex items-center gap-2 bg-gray-100 p-2 rounded-md">
              <span className="bg-purple-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">{column.id}</span>
              <input
                type="text"
                className="flex-1 p-0.5 border-2 border-gray-300 rounded-md focus:outline-none focus:border-purple-600 text-xs h-6 w-24"
                placeholder="اسم العمود"
                value={column.name}
                onChange={(e) => {
                  const updatedColumns = columns.map((col) =>
                    col.id === column.id ? { ...col, name: e.target.value } : col
                  );
                  setColumns(updatedColumns);
                }}
              />
              <button
                className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center gap-1 text-xs px-2"
                onClick={() => setShowConfirm(column.id)}
              >
                حذف
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-md text-sm" onClick={addColumn}>إضافة عمود</button>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md text-sm" onClick={handleClose}>إنشاء الجدول</button>
        </div>

        {showConfirm !== null && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg text-center w-full max-w-xs">
              <h3 className="text-sm font-bold text-gray-800">هل أنت متأكد من حذف هذا العمود؟</h3>
              <div className="mt-3 flex justify-center gap-2">
                <button className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded-md text-xs" onClick={() => setShowConfirm(null)}>إلغاء</button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-xs"
                  onClick={() => {
                    if (showConfirm !== null) {
                      removeColumn(showConfirm);
                    }
                  }}
                >
                  تأكيد الحذف
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUpCreateTable;