import React from 'react';
import AdminTabs from '../components_Admin/AdminTabs';

const page = () => {
  return (
    <div className="text-center p-4">
      <header className="bg-violet-600 text-white p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold">إدارة الفريق</h1>
        <p className="text-sm opacity-90 mt-1">لوحة التحكم لإدارة أعضاء الفريق وإعداداته</p>
      </header>
      <AdminTabs/>
    </div>
  );
};

export default page;