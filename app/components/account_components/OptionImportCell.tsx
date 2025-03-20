import React from "react";
import Link from 'next/link'; // استيراد Link من react-router-dom

interface OptionImportCellProps {
  onDelete: () => void;
  onPin: () => void;
  onAlert: () => void;
  isAdmin: boolean; // البراميتر الجديد
}

const OptionImportCell: React.FC<OptionImportCellProps> = ({
  onDelete,
  onPin,
  onAlert,
  isAdmin,
}) => {
  return (
    <div className="flex justify-end mt-2 space-x-2">
      {isAdmin && (
        <>
          {/* زر حذف المهمة */}
          <button
            onClick={onDelete}
            className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors w-6 h-6 flex items-center justify-center"
          >
            ×
          </button>
          {/* زر تثبيت المهمة */}
          <button
            onClick={onPin}
            className="p-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors w-6 h-6 flex items-center justify-center"
          >
            ✓
          </button>
        </>
      )}
      {/* زر التنبيه */}
      <Link
        href={``}
        onClick={onAlert}
        className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors w-6 h-6 flex items-center justify-center"
      >
        !
      </Link>
    </div>
  );
};

export default OptionImportCell;