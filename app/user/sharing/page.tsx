import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AccountCard from '../components_user/AccountCard';

// واجهة بيانات المستخدم
interface User {
    id: string;
    name: string;
    completedTasks: number;
    teams: { name: string; id: string }[];
    phoneNumber?: string;
    linkedinUrl?: string;
    email?: string;
    bio?: string;
}

const ProfilePage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query; // الحصول على الـ id من الرابط
    const [user, setUser] = useState<User | null>(null);

    // جلب بيانات المستخدم بناءً على الـ id
    useEffect(() => {
        if (id) {
            // استبدل هذا الجزء بطلب API أو جلب البيانات من مصدرك
            const fetchUser = async () => {
                const response = await fetch(`/api/users/${id}`); // مثال لطلب API
                const data = await response.json();
                setUser(data);
            };

            fetchUser();
        }
    }, [id]);

    if (!user) {
        return <div>جاري التحميل...</div>; // عرض رسالة تحميل أثناء جلب البيانات
    }

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-violet-900 mb-4 text-center">صفحة المستخدم</h1>
            <AccountCard
                id="123"
                name={user.name}
                completedTasks={user.completedTasks}
                teams={user.teams}
                phoneNumber={user.phoneNumber}
                linkedinUrl={user.linkedinUrl}
                email={user.email}
                bio={user.bio}
            />
        </div>
    );
};

export default ProfilePage;