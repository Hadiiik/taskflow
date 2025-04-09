
import React from 'react';
import SheerUser from '../../components_user/SheerUser';

const ProfilePage = async ({params}:{params:{id:string}}) => {
    const id = (await params).id
    if (!id) {
        return <div>جاري التحميل...</div>; // عرض رسالة تحميل إذا لم يتم تحميل الـ id بعد
    }

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-violet-900 mb-4 text-center">صفحة المستخدم</h1>
            <SheerUser id={id as string} /> 
        </div>
    );
};

export default ProfilePage;