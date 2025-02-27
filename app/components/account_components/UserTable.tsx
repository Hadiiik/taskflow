"use client"
import React, { useState } from "react";

type User = {
  id: number;
  name: string;
  role: string;
  position: string;
};

type UserTableProps = {
  users: User[];
};

const ITEMS_PER_PAGE = 10;

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [userList, setUserList] = useState(users);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [fade, setFade] = useState(false);

  const handleDelete = (id: number) => {
    setUserList(userList.filter((user) => user.id !== id));
    setDeleteUser(null);
  };

  const totalPages = Math.ceil(userList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = userList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const changePage = (direction: number) => {
    setFade(true);
    setTimeout(() => {
      setCurrentPage((prev) => Math.min(Math.max(prev + direction, 1), totalPages));
      setFade(false);
    }, 300); // مدة التأثير
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="bg-purple-600 text-white text-lg font-semibold py-3 px-4 rounded-t-md">
        أعضاء الفريق
      </div>

      <div className={`overflow-hidden transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
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
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors duration-200">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    defaultValue={user.role}
                    className="border border-gray-300 rounded-md px-3 py-1 w-full focus:ring-purple-500 focus:border-purple-500"
                  />
                </td>
                <td className="py-2 px-4">
                  <select className="border rounded-md px-3 py-1 w-full focus:ring-purple-500 focus:border-purple-500">
                    <option>مدير</option>
                    <option>مساعد</option>
                    <option>مساهم</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => setDeleteUser(user)}
                    className="bg-gradient-to-r from-red-500 to-red-700 text-white px-3 py-1 rounded-md hover:opacity-90 transition"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => changePage(-1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition"
          >
            السابق
          </button>
          <span className="px-3 py-1">{currentPage} من {totalPages} </span>
          <button
            onClick={() => changePage(1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition"
          >
            التالي
          </button>
        </div>
      )}

      {deleteUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <p className="text-lg font-semibold text-gray-800">
              هل أنت متأكد من أنك تريد حذف <span className="text-purple-600">{deleteUser.name}</span> من جدول الأعضاء؟
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setDeleteUser(null)}
                className="px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 transition"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleDelete(deleteUser.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;