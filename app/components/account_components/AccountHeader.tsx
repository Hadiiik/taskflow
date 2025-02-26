"use client";

import Link from 'next/link';
import Image from 'next/image';

const AccountHeader = () => {

  const accounts = [
    { name: 'الحساب', icon: '/home.svg', link: '/profile' },
    { name: 'الإعدادات', icon: '/setteing.svg', link: '/settings' },
    { name: 'تسجيل الخروج', icon: '/logout.svg', link: '/logout' },
  ];

  return (
    <header className="bg-violet-50 text-violet-800 flex items-center justify-between py-4 px-6 shadow-lg sticky top-0 z-50">
      {/* اسم الموقع */}
      <Link href="/" className="text-xl font-bold hover:cursor-pointer hover:text-violet-700">
        TaskFlow
      </Link>

      {/* قائمة سطح المكتب */}
      <div className="hidden lg:flex space-x-4">
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

      {/* قائمة الهاتف */}
      <div className="lg:hidden flex space-x-4">
        {accounts.map((account) => (
          <Link
            key={account.name}
            href={account.link}
            className="flex flex-col items-center rounded-lg px-3 py-2 lg:shadow lg:hover:bg-violet-100 lg:transition lg:border lg:border-violet-200"
            //style={{ border: 'none', boxShadow: 'none' }} // إزالة الحواف والظلال بشكل صريح
          >
            <Image src={account.icon} alt={account.name} width={24} height={24} />
            <span className="mt- text-sm">{account.name}</span>
          </Link>
        ))}
      </div>
    </header>
  );
};

export default AccountHeader;
