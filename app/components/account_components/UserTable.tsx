"use client";
import { getTeamMembers } from "@/client_helpers/getTeamMembers";
import React, { useEffect, useState } from "react";

type User = {
  id: number | string;
  name: string;
  user_role: string;
  user_position: string;
};

type UserTableProps = {
  team_id: string | number;
};

const ITEMS_PER_PAGE = 3;

const UserTable: React.FC<UserTableProps> = ({ team_id }) => {
  const [userList, setUserList] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fetchTeamData = async (team_id: number | string) => {
      const result = await getTeamMembers(team_id);
      if (!result.success) return;
      setUserList(result.members);
    };

    fetchTeamData(team_id);
  }, [team_id]);

  const handleDelete = (id: number | string) => {
    console.log(id);
  };

  const handleOptionChange = (id: number | string) => {
    console.log(id);
  };

  const totalPages = Math.ceil(userList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = userList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page === currentPage) return;
    setFade(true);
    setTimeout(() => {
      setCurrentPage(page);
      setFade(false);
    }, 300);
  };

  return (
    <div className="max-w-3xl mx-auto md:mt-8 mt-8 px-7 mb-28" dir="rtl">
      <div className="bg-purple-600 text-white text-lg font-semibold py-3 px-4 rounded-t-md mb-4">
        أعضاء الفريق
      </div>

      <div className={`overflow-hidden transition-opacity duration-300 ${fade ? "opacity-0" : "opacity-100"}`}>
        {/* عرض الجدول على الشاشات الكبيرة */}
        <div className="hidden md:block">
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
              {paginatedUsers.map((user,i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      defaultValue={user.user_position}
                      className="border border-gray-300 rounded-md px-3 py-1 w-full focus:ring-purple-500 focus:border-purple-500"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <select
                      className="border rounded-md px-3 py-1 w-full focus:ring-purple-500 focus:border-purple-500"
                      onChange={() => handleOptionChange(user.id)}
                    >
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

        {/* عرض المستطيلات على الشاشات الصغيرة */}
        <div className="md:hidden space-y-4 ">
          {paginatedUsers.map((user,i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex justify-between pb-2">
                <span className="font-semibold text-gray-700">الاسم:</span>
                <span>{user.name}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-semibold text-gray-700">الدور:</span>
                <input
                  type="text"
                  defaultValue={user.user_position}
                  className="border border-gray-300 rounded-md px-2 py-1 w-1/2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-semibold text-gray-700">المكانة:</span>
                <select
                  className="border rounded-md px-2 py-1 w-1/2 focus:ring-purple-500 focus:border-purple-500"
                  onChange={() => handleOptionChange(user.id)}
                >
                  <option>مدير</option>
                  <option>مساعد</option>
                  <option>مساهم</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setDeleteUser(user)}
                  className="bg-gradient-to-r from-red-500 to-red-700 text-white px-3 py-1 rounded-md hover:opacity-90 transition"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`h-8 w-8 rounded-full ${
                currentPage === page 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'bg-purple-400 hover:bg-purple-500'
              } text-white transition-colors`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {deleteUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <p className="text-lg font-semibold text-gray-800">
              هل أنت متأكد من أنك تريد حذف <span className="text-purple-600">{deleteUser.name}</span> من جدول الأعضاء؟
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setDeleteUser(null)} className="px-4 mx-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 transition">
                إلغاء
              </button>
              <button onClick={() => handleDelete(deleteUser.id)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
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