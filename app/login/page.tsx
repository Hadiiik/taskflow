"use client"
import client_login from '@/auth/client/login';
import userInfo from '@/types/userInfo'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import ErrorMessagePopUP from '../components/ErrorMessagePopUP';

const Page = () => {
    const [userInfo, setUserInfo] = useState<userInfo>({
        email: "",
        name: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await client_login({ ...userInfo });

        if (result.success === true) {
            redirect("/user");
        } else {
            setErrorMessage("فشل تسجيل الدخول. يرجى التحقق من بياناتك.");
        }
    };

    const handleCloseError = () => {
        setErrorMessage(null);
    };

    return (
        <div className="max-w-md md:mx-auto mx-6 p-8 bg-white rounded-xl border-2 border-violet-500 m-12 relative overflow-hidden shadow-[0_0_20px_5px_rgba(124,58,237,0.3)]">
        

            {/* رابط TaskFlow خارج البطاقة */}
            <div className="text-center mb-8">
                <Link href="/" className="text-3xl font-semibold text-violet-700 hover:text-violet-900 transition duration-300">
                    TaskFlow
                </Link>
            </div>

            <h2 className="text-3xl font-semibold text-center text-violet-900 mb-8">تسجيل الدخول</h2>
            <form onSubmit={handelSubmit} className="space-y-6">
                {/* حقل البريد الإلكتروني */}
                <div>
                    <label htmlFor="email" className="block text-sm text-violet-900 mb-2">البريد الإلكتروني</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="example@gmail.com"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        required
                        className="w-full p-2 md:p-3 border-2 border-violet-500 bg-violet-50 text-violet-900 placeholder-violet-400 rounded-md focus:outline-none focus:border-amber-500"
                    />
                </div>

                {/* حقل كلمة المرور */}
                <div>
                    <label htmlFor="password" className="block text-sm text-violet-900 mb-2">كلمة المرور</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="********"
                        value={userInfo.password}
                        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                        required
                        className="w-full p-2 md:p-3 border-2 border-violet-500 bg-violet-50 text-violet-900 placeholder-violet-400 rounded-md focus:outline-none focus:border-amber-500"
                    />
                </div>

                {/* زر التسجيل */}
                <button
                    type="submit"
                    className="w-full py-2 md:py-3 bg-gradient-to-r from-violet-700 to-violet-900 text-white rounded-md text-lg hover:from-violet-600 hover:to-violet-800 focus:from-violet-600 focus:to-violet-800 transition duration-300 my-4"
                >
                    تسجيل الدخول
                </button>
            </form>

            <p className="mt-4 text-center text-violet-500 text-sm">
                لا تملك حساب؟{' '}
                <Link href="/signup" className="text-amber-500 hover:text-amber-300 focus:text-slate-500 underline">
                    انشاء حساب؟
                </Link>
            </p>

            {/* عرض رسالة الخطأ عند الحاجة */}
            {errorMessage && (
                <ErrorMessagePopUP 
                    message={errorMessage} 
                    onClose={handleCloseError} 
                />
            )}
        </div>
    );
};

export default Page;
