"use client";

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

// تعريف نوع (type) للعناصر في القائمة
type Account = {
  name: string;
  icon: string;
  link: string;
};

// المكون الرئيسي
const AccountHeader: React.FC = () => {
  // بيانات الحسابات
  const accounts: Account[] = [
    { name: 'الحساب', icon: '/home.svg', link: '/profile' },
    { name: 'الإعدادات', icon: '/setteing.svg', link: '/settings' },
    { name: 'تسجيل الخروج', icon: '/logout.svg', link: '/logout' },
  ];

  return (
    <>
      {/* الشريط العلوي - يظهر فقط في وضع سطح المكتب */}
      <header className="hidden lg:flex bg-violet-50 text-violet-800 items-center justify-between py-4 px-6 shadow-lg sticky top-0 z-50">
        {/* اسم الموقع */}
        <Link href="/" className="text-xl font-bold hover:cursor-pointer hover:text-violet-700">
          TaskFlow
        </Link>

        {/* قائمة سطح المكتب */}
        <div className="flex space-x-4">
          {accounts.map((account) => (
            <Link
              key={account.name}
              href={account.link}
              className="flex items-center bg-white rounded-lg px-4 py-2 shadow hover:bg-violet-100 transition border border-violet-200"
            >
              <Image src={account.icon} alt={account.name} width={24} height={24} />
              <span className="ml-2">{account.name}</span>
            </Link>
          ))}
        </div>
      </header>

      {/* قائمة الهاتف - تظهر فقط في وضع الهاتف */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-violet-600 to-violet-800 text-white flex justify-around items-center py-2">
        {accounts.map((account) => (
          <Link
            key={account.name}
            href={account.link}
            className="flex flex-col items-center justify-center p-2 rounded-lg active:bg-red-500 transition-colors"
          >
            <Image src={account.icon} alt={account.name} width={20} height={20} />
            <span className="mt-1 text-xs">{account.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default AccountHeader;
