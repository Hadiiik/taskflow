"use client";

import { useState } from 'react';
import Link from 'next/link';
const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // حالة القائمة الجانبية

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // تبديل حالة القائمة الجانبية
    };

    return (
        <>
            {/* الشريط العلوي */}
            <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    {/* اسم الموقع */}
                    <Link href="/" className="text-2xl font-bold text-violet-700 hover:text-violet-900 transition duration-300">
                        TaskFlow
                    </Link>

                    {/* زر فتح القائمة الجانبية */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-violet-700 hover:text-violet-900 transition duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* القائمة الجانبية */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 border-l-2 border-violet-100 ${
                    isSidebarOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="p-6">
                    <h2 className="text-xl font-bold text-violet-900 mb-6">القائمة</h2>
                    <ul className="space-y-4">
                        <li>
                            <Link href="/" className="text-violet-700 hover:text-violet-900 transition duration-300">
                                الصفحة الرئيسية
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-violet-700 hover:text-violet-900 transition duration-300">
                                حول الموقع
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-violet-700 hover:text-violet-900 transition duration-300">
                                اتصل بنا
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* تغطية الخلفية عند فتح القائمة */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default Navbar;