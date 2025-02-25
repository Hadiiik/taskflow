"use client"

import createTeam from '@/client_helpers/create_team';
import { getSubType } from '@/types/pricing';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';

const CreateTeamForm = () => {
    // تحديد الحالة للحقول
    const [companyName, setCompanyName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [subscriptionType, setSubscriptionType] = useState(''); // سيحمل القيمة الافتراضية من الرابط

    useEffect(() => {
        // استخراج القيمة من الرابط (URL)
        const urlParams = new URLSearchParams(window.location.search);
        const subscription = urlParams.get('subscriptionType') || 'مجاني'; // إذا لم تكن هناك قيمة، استخدم "مجاني" كقيمة افتراضية
        setSubscriptionType(subscription);
    }, []);

    // دالة لتحديث حقل اسم الشركة
    const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(e.target.value);
    };

    // دالة لتحديث حقل اسم الفريق
    const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTeamName(e.target.value);
    };

    // دالة لتحديث حقل نوع الاشتراك
    const handleSubscriptionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSubscriptionType(e.target.value);
    };

    // دالة لمعالجة إرسال النموذج
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            companyName,
            teamName,
            subscriptionType,
        });
        const result = await createTeam({
            team_name: teamName,
            company_name : companyName,
            team_type : getSubType(subscriptionType),
            creator_id : 0
        })
        console.log(result)
        if(result.success === false){
            // هون بنا نطرح رسالة خطأ
            return
        }
        redirect(`/account/team/${result.team_id}`)
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md md:mx-auto mx-6 p-6 bg-white rounded-xl border-2 border-violet-500 m-12 space-y-6">
    <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-center text-violet-900 mb-8">إنشاء الفريق</h2>
    </div>

    {/* حقل اسم الشركة */}
    <div>
        <label htmlFor="companyName" className="block text-sm text-violet-900 mb-2">اسم الشركة</label>
        <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={handleCompanyNameChange}
            required
            className="w-full p-3 border-2 border-violet-500 bg-violet-50 text-violet-900 placeholder-violet-400 rounded-md focus:outline-none focus:border-amber-500"
        />
    </div>

    {/* حقل اسم الفريق */}
    <div>
        <label htmlFor="teamName" className="block text-sm text-violet-900 mb-2">اسم الفريق</label>
        <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={handleTeamNameChange}
            required
            className="w-full p-3 border-2 border-violet-500 bg-violet-50 text-violet-900 placeholder-violet-400 rounded-md focus:outline-none focus:border-amber-500"
        />
    </div>

    {/* حقل نوع الاشتراك */}
    <div>
        <label htmlFor="subscriptionType" className="block text-sm text-violet-900 mb-2">نوع الاشتراك</label>
        <select
            id="subscriptionType"
            value={subscriptionType}
            onChange={handleSubscriptionTypeChange}
            className="w-full p-3 border-2 border-violet-500 bg-violet-50 text-violet-900 placeholder-violet-400 rounded-md focus:outline-none focus:border-amber-500"
        >
            <option value="مجاني">مجاني</option>
            <option value="اساسي">اساسي</option>
            <option value="محترف">محترف</option>
        </select>
    </div>

    {/* زر إنشاء الفريق */}
    <button
        type="submit"
        className="w-full py-3 bg-violet-900 text-white rounded-md text-lg hover:bg-violet-700 focus:bg-violet-700 transition duration-300 my-4"
    >
        إنشاء الفريق
    </button>
</form>

    );
};

export default CreateTeamForm;
