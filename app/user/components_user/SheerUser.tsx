"use client";
import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaPhone, FaLinkedin, FaEnvelope, FaTasks } from 'react-icons/fa';
import Link from 'next/link';

interface Team {
    id: string;
    name: string;
}

interface UserData {
    name: string;
    bio: string;
    email: string;
    phoneNumber: string;
    linkedinUrl: string;
    completedTasks: number;
    teams: Team[];
}

const fetchUserData = async (id: string): Promise<UserData> => {
    console.log(id);
    // هنا يمكنك استبدال هذا الجزء باستدعاء API حقيقي
    // هذا مثال للبيانات الوهمية
    const mockData: UserData = {
        name: 'محمد أحمد',
        bio: 'مطور واجهات أمامية بخبرة 5 سنوات في React وNext.js.',
        email: 'mohamed.ahmed@example.com',
        phoneNumber: '+966123456789',
        linkedinUrl: 'https://linkedin.com/in/mohamed-ahmed',
        completedTasks: 42,
        teams: [
            { id: '1', name: 'فريق التطوير' },
            { id: '2', name: 'فريق التصميم' },
        ],
    };

    // محاكاة تأخير الشبكة
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockData;
};

const SheerUser: React.FC<{ id: string }> = ({ id }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchUserData(id);
                setUserData(data);
            } catch {
                setError('فشل في جلب البيانات. يرجى المحاولة مرة أخرى.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    if (loading) {
        return <div className="text-center py-4">جاري التحميل...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-600">{error}</div>;
    }

    if (!userData) {
        return <div className="text-center py-4">لا توجد بيانات متاحة.</div>;
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 max-w-md mx-auto text-right transform transition-all duration-300 hover:shadow-3xl">
            {/* الأيقونة والاسم */}
            <div className="flex items-center justify-end space-x-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                <FaUserCircle className="w-12 h-12 text-blue-600 hover:scale-110 transform transition-transform duration-300" />
            </div>

            {/* النص التعريفي */}
            <p className="text-sm text-gray-700 mb-6 text-right hover:translate-y-1 transform transition-transform duration-300">
                {userData.bio}
            </p>

            {/* معلومات التواصل */}
            <div className="space-y-3 mb-6 text-right">
                <div className="flex items-center justify-end space-x-2 hover:translate-y-1 transform transition-transform duration-300">
                    <span className="text-sm text-gray-700">{userData.email}</span>
                    <FaEnvelope className="w-5 h-5 text-blue-600 hover:scale-110 transform transition-transform duration-300" />
                </div>
                <div className="flex items-center justify-end space-x-2 hover:translate-y-1 transform transition-transform duration-300">
                    <span className="text-sm text-gray-700">{userData.phoneNumber}</span>
                    <FaPhone className="w-5 h-5 text-green-600 hover:scale-110 transform transition-transform duration-300" />
                </div>
                <div className="flex items-center justify-end space-x-2 hover:translate-y-1 transform transition-transform duration-300">
                    <a
                        href={userData.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 underline"
                    >
                        صفحة LinkedIn
                    </a>
                    <FaLinkedin className="w-5 h-5 text-blue-600 hover:scale-110 transform transition-transform duration-300" />
                </div>
            </div>

            {/* عدد المهام المنجزة */}
            <div className="flex items-center justify-end space-x-2 mb-6 hover:translate-y-1 transform transition-transform duration-300">
                <span className="text-sm text-red-500">
                    المهام المنجزة: <span className="font-bold">{userData.completedTasks}</span>
                </span>
                <FaTasks className="w-5 h-5 text-gray-600 hover:scale-110 transform transition-transform duration-300" />
            </div>

            {/* الفرق المشتركة */}
            <div className="mb-6 text-right">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">الفرق المشتركة:</h3>
                <ul className="space-y-1">
                    {userData.teams.map((team) => (
                        <li key={team.id} className="text-sm text-gray-700 border-b border-gray-200 pb-1 hover:translate-y-1 transform transition-transform duration-300">
                            <Link href={`/teams/${team.id}`} className="text-blue-600 underline">
                                {team.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SheerUser;