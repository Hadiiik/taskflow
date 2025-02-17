"use client"
import userInfo from '@/types/userInfo'
import Link from 'next/link';
import React, { useState } from 'react'

const Page = () => {
    const [userInfo, setUserInfo] = useState<userInfo>({
        email: "",
        password: ""
    });

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userInfo);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-violet-900 rounded-xl shadow-2xl m-12">
            <h2 className="text-3xl font-bold text-center text-violet-50 mb-8 ">انشاء حساب </h2>
            <form onSubmit={handelSubmit} className="space-y-6 shadow-sm">
                {/* حقل البريد الإلكتروني */}
                <div>
                    <label htmlFor="email" className="block text-sm text-violet-50 mb-2">البريد الإلكتروني</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="example@gmail.com"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        required
                        className="w-full p-3 rounded-md border border-violet-500 bg-violet-300 text-black focus:ring focus:ring-amber-500 focus:outline-none"
                    />
                </div>

                {/* حقل كلمة المرور */}
                <div>
                    <label htmlFor="password" className="block text-sm text-violet-50 mb-2">كلمة المرور</label>
                    <input
                        type="text"
                        id="password"
                        placeholder="********"
                        value={userInfo.password}
                        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                        required
                        className="w-full p-3 rounded-md border border-violet-500 bg-violet-300 text-black focus:ring focus:ring-amber-500 focus:outline-none"
                    />
                </div>

                {/* زر التسجيل */}
                <button
                    type="submit"
                    className="w-full py-3 bg-violet-50 text-violet-800  px-6 rounded-md text-lg hover:bg-violet-700 hover:text-white hover:shadow-md transition duration-300 my-4 focus:bg-slate-300 focus:text-white"
                >
                    تسجيل الدخول
                </button>
            </form>

            <p className="mt-4 text-center text-violet-200 text-sm">
            لديك حساب بالفعل؟{' '}
                <Link href="/login" className="text-amber-400 hover:text-amber-300 focus:text-slate-500">تسجيل الدخول؟ </Link>
            </p>
        </div>
    );
};

export default Page;
