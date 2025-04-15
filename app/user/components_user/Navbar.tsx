import React, { useState } from 'react';
import Link from 'next/link';
import SidebarButton from './SidebarButton'; // استيراد مكون الزر
import { FaUser, FaTasks, FaUsers, FaCog, FaBell, FaHome } from 'react-icons/fa'; // استيراد الأيقونات

const Navbar = ({ onMenuClick }: { onMenuClick: (component: string) => void }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-violet-700 hover:text-violet-900 transition duration-300">
                        TaskFlow
                    </Link>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg outline-none focus:outline-none"
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
                className={`z-50 fixed top-0 right-0 h-full w-36 bg-white shadow-lg transform transition-transform duration-300 ease-in-out  border-l-2 border-violet-100 ${
                    isSidebarOpen ? "translate-x-0" : "translate-x-full"
                } md:w-64`} 
            >
                <div className="p-6">
                    <h2 className="text-xl font-bold text-violet-900 mb-6 text-right">القائمة</h2>
                    <ul className="space-y-4">
                        {/* زر الرئيسية */}
                        <li>
                            <SidebarButton
                                text="الرئيسية"
                                icon={<FaHome />}
                                onClick={() => {
                                    onMenuClick('home');
                                    toggleSidebar();
                                }}
                            />
                        </li>

                        {/* زر الحساب */}
                        <li>
                            <SidebarButton
                                text="الحساب"
                                icon={<FaUser />}
                                onClick={() => {
                                    onMenuClick('account');
                                    toggleSidebar();
                                }}
                            />
                        </li>

                        {/* زر المهام */}
                        <li>
                            <SidebarButton
                                text="المهام"
                                icon={<FaTasks />}
                                onClick={() => {
                                    onMenuClick('tasks');
                                    toggleSidebar();
                                }}
                            />
                        </li>
                        
                        {/* زر الفرق */}
                        <li>
                            <SidebarButton
                                text="الفرق"
                                icon={<FaUsers />}
                                onClick={() => {
                                    onMenuClick('teams');
                                    toggleSidebar();
                                }}
                            />
                        </li>

                        {/* زر الإعدادات */}
                        <li>
                            <SidebarButton
                                text="الإعدادات"
                                icon={<FaCog />}
                                onClick={() => {
                                    onMenuClick('settings');
                                    toggleSidebar();
                                }}
                            />
                        </li>

                        {/* زر الإشعارات */}
                        <li>
                            <SidebarButton
                                text="الإشعارات"
                                icon={<FaBell />}
                                onClick={() => {
                                    onMenuClick('notifications');
                                    toggleSidebar();
                                }}
                            />
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