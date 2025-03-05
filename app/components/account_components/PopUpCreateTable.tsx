import createTable from "@/client_helpers/create_table";
import React, { useState, useRef, useEffect } from "react";
import LoadingMessage from "../LoadingMessage";

interface PopUpCreateTableProps {
  isSubscription?: boolean; // باراميتر اختياري لتحديد نوع النافذة
  onClose: () => void; // دالة لإغلاق النافذة
  team_id: number | string;
}

const PopUpCreateTable: React.FC<PopUpCreateTableProps> = ({ isSubscription = false, onClose, team_id }) => {
  const [columns, setColumns] = useState<string[]>([]); // الأعمدة أصبحت مصفوفة من السلاسل (أسماء الأعمدة)
  const [showConfirm, setShowConfirm] = useState<number | null>(null);
  const [tableName, setTableName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // إغلاق النافذة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose(); // إغلاق النافذة
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const addColumn = () => {
    setColumns([...columns, ""]); // إضافة عمود جديد مع اسم فارغ
  };

  const removeColumn = (index: number) => {
    setColumns((prevColumns) => prevColumns.filter((_, idx) => idx !== index)); // حذف العمود باستخدام index
    setShowConfirm(null);
  };

  const handleCreateTable = async () => {
    setIsLoading(true);
    await createTable({
      table_name: tableName,
      team_id: team_id,
      coulmns_array: columns, // إرسال الأعمدة مباشرةً بدون الحاجة إلى id
    });
    setIsLoading(false);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div ref={popupRef} className="bg-white rounded-lg shadow-lg w-full max-w-sm p-5 relative">
          {isLoading && <LoadingMessage message={"جار انشاء الجدول"} />}
          <button
            onClick={onClose} // زر إغلاق النافذة
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            &times; {/* رمز إغلاق */}
          </button>

          <h2 className="text-lg font-bold text-white bg-purple-600 py-2 px-4 rounded-t-lg text-center">
            {isSubscription ? "الاشتراك" : "إنشاء جدول مهمة"}
          </h2>

          <div className="mt-3">
            <label className="block text-gray-700 font-medium text-sm">اسم الجدول</label>
            <input
              onChange={(e) => setTableName(e.target.value)}
              type="text"
              className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-purple-600 text-sm"
              placeholder="أدخل اسم الجدول"
            />
          </div>

          <div className="mt-3 text-center font-bold text-purple-600 border-t-2 border-purple-600 pt-2 text-sm">
            أعمدة الجدول
          </div>

          <div className="max-h-48 overflow-y-auto mt-2 space-y-2">
            {columns.map((column, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-100 p-2 rounded-md">
                <span className="bg-purple-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">
                  {index + 1}
                </span>
                <input
                  type="text"
                  className="flex-1 px-4 py-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-purple-600 text-xs h-6 w-24"
                  placeholder="اسم العمود"
                  value={column}
                  onChange={(e) => {
                    const copyColumns = [...columns];
                    copyColumns[index] = e.target.value;
                    setColumns(copyColumns);
                  }}
                />
                <button
                  className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center gap-1 text-xs px-2"
                  onClick={() => setShowConfirm(index)} // تحديد الفهرس لحذف العمود
                >
                  حذف
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-md text-sm"
              onClick={addColumn}
            >
              إضافة عمود
            </button>
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md text-sm"
              onClick={async () => {
                await handleCreateTable();
                onClose();
              }}
            >
              إنشاء الجدول
            </button>
          </div>

          {showConfirm !== null && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-5 rounded-lg shadow-lg text-center w-full max-w-xs">
                <h3 className="text-sm font-bold text-gray-800">هل أنت متأكد من حذف هذا العمود؟</h3>
                <div className="mt-3 flex justify-center gap-2">
                  <button
                    className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded-md text-xs"
                    onClick={() => setShowConfirm(null)}
                  >
                    إلغاء
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-xs"
                    onClick={() => {
                      if (showConfirm !== null) {
                        removeColumn(showConfirm); // تمرير الـ index لحذف العمود
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
    </>
  );
};

export default PopUpCreateTable;
