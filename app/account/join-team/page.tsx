"use client";
import { checkInvite } from '@/client_helpers/accsepet_invite';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [inviteLink, setInviteLink] = useState<string>(); // حالة رابط الدعوة
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل
  const [error, setError] = useState<string | null>(null); // حالة الخطأ

  // استخلاص الدعوة من الرابط إذا كانت موجودة
  useEffect(() => {
    const inviteFromUrl = new URLSearchParams(window.location.search).get('invite');
    if (inviteFromUrl) {
      setInviteLink(inviteFromUrl); // وضع الدعوة في الحقل
      handelSubmit(inviteFromUrl); // استدعاء handleSubmit مباشرة
    }
  }, []);

  const handelSubmit = async (invite?: string) => {
    setIsLoading(true); // تفعيل حالة التحميل
    setError(null); // إعادة تعيين الأخطاء

    // إذا كانت الدعوة في الحقل، نستخدمها من هناك
    let inviteToUse = invite || inviteLink;
    if(inviteToUse?.includes("?invite="))
      inviteToUse = inviteToUse.split("?invite=")[1]

    if (!inviteToUse) {
      setError("لم يتم العثور على رابط دعوة صالح");
      setIsLoading(false);
      return;
    }

    const result = await checkInvite(inviteToUse);

    if (!result.success) {
      setError("فشل في التحقق من الدعوة");
      setIsLoading(false);
      return;
    }

    // إذا كانت الدعوة صالحة، نضيف الفريق إلى localStorage
    localStorage.setItem('team_id', result.team_id.toString());
    localStorage.setItem('team_name', result.team_name);

    // إخفاء الـ popup بعد التحقق
    setIsLoading(false);
    redirect(`/account/team/${result.team_id}`)
    console.log(result.team_id)
  };

  return (
    <>
      <div className="fixed flex justify-center items-center z-50 w-full h-full bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded-md w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-10">
          <h2 className="text-xl font-semibold mb-6">الفريق</h2>

          <div className="mb-4">
            <label htmlFor="inviteLink" className="block text-sm font-medium text-violet-600">
              رابط الدعوة
            </label>
            <input
              onChange={(e) => setInviteLink(e.target.value)}
              id="inviteLink"
              type="text"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent"
              placeholder="أدخل رابط الدعوة"
            />
          </div>

          {/* عرض الخطأ إذا حدث */}
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

          {/* عرض حالة التحميل */}
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="spinner-border animate-spin text-violet-600" role="status"></div>
            </div>
          ) : (
            <div className="flex justify-end space-x-4">
              <Link
                href="/account"
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-5 py-2 rounded-md"
              >
                إلغاء
              </Link>
              <button
                onClick={() => handelSubmit()}
                className="bg-violet-700 hover:bg-violet-800 text-white px-6 py-3 rounded-md shadow-md"
              >
                حسناً
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;