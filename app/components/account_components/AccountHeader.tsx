"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AccountHeader = () => {
  // المصفوفة التي تحتوي على البيانات
  const accounts = [
    { name: 'الحساب', icon: '/home.svg', link: '/profile' },
    { name: 'الاعدادات', icon: '/setteing.svg', link: '/settings' },
    { name: 'Logout', icon: '/logout.svg', link: '/logout' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false); // حالة القائمة المنسدلة
  const menuRef = useRef<HTMLDivElement | null>(null); // تحديد النوع بشكل دقيق

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { 
      // التحقق إذا كان event.target هو من نوع Node
      if (menuRef.current && !(event.target instanceof Node && menuRef.current.contains(event.target))) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-violet-50 text-violet-800 flex items-center justify-between py-4 px-6 shadow-lg sticky top-0 z-50">
      {/* عرض اسم الموقع */}
      <Link className="text-xl font-bold hover:cursor-pointer hover:text-violet-700" href={"/"}>
        TaskFlow
      </Link>

      {/* قائمة العناصر */}
      <div className="hidden lg:flex space-x-6">
        {accounts.map((account) => (
          <Link key={account.name} href={account.link} className="flex items-center space-x-2 text-right">
            <Image src={account.icon} alt={account.name} width={30} height={30} />
            <span>{account.name}</span>
          </Link>
        ))}
      </div>

      {/* قائمة منسدلة للهواتف */}
      <div className="lg:hidden relative">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
          <Image src={"/menu.svg"} alt={"Menu"} width={24} height={24} />
        </button>

        {isMenuOpen && (
          <div
            ref={menuRef} // إضافة الـ ref هنا
            className="absolute right-0 bg-white shadow-md w-56 mt-2 rounded-lg py-4 z-50 transition-all duration-300 ease-in-out"
          >
            {accounts.map((account) => (
              <Link
                key={account.name}
                href={account.link}
                className="flex items-center space-x-2 p-3 hover:bg-violet-100 rounded-lg text-right"
              >
                <Image src={account.icon} alt={account.name} width={24} height={24} />
                <span>{account.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default AccountHeader;
