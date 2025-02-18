"use client"
import client_signup from '@/auth/client/signup';
import userInfo from '@/types/userInfo'
import Link from 'next/link';
import React, { useState } from 'react'

const Page = () => {
    const [userInfo, setUserInfo] = useState<userInfo>({
        email: "",
        name:"",
        password: ""
    });

    const handelSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
        //to do handel errors and loading...
        e.preventDefault();
        console.log(userInfo);
        const result = await client_signup({...userInfo});
        console.log(result)

    };

    return (
        <div className="max-w-md md:mx-auto  mx-6 p-6 bg-white rounded-xl border-2 border-violet-500 m-12 ">
    {/* رابط TaskFlow خارج البطاقة */}
    <div className="text-center mb-8">
        <Link href="/" className="text-3xl font-semibold text-violet-700 hover:text-violet-900 transition duration-300">
            TaskFlow
        </Link>
    </div>

    <h2 className="text-3xl font-bold text-center text-violet-900 mb-8">انشاء حساب</h2>
    <form onSubmit={handelSubmit} className="space-y-6 shadow-sm">
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
                className="w-full p-3 border-2 border-violet-500 bg-violet-50 text-violet-900 placeholder-violet-400 rounded-md focus:outline-none focus:border-amber-500"
            />
        </div>

        {/* حقل الاسم */}
        <div>
            <label htmlFor="name" className="block text-sm text-violet-900 mb-2">الاسم</label>
            <input
                type="text"
                id="name"
                placeholder="الاسم"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                required
                className="w-full p-3 border-2 border-violet-500 bg-violet-50 text-violet-900 placeholder-violet-400 rounded-md focus:outline-none focus:border-amber-500"
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
                className="w-full p-3 border-2 border-violet-500 bg-violet-50 text-violet-900 placeholder-violet-400 rounded-md focus:outline-none focus:border-amber-500"
            />
        </div>

        {/* زر التسجيل */}
        <button
            type="submit"
            className="w-full py-3 bg-violet-900 text-white rounded-md text-lg hover:bg-violet-700 focus:bg-violet-700 transition duration-300 my-4"
        >
            انشاء حساب
        </button>
    </form>

    <p className="mt-4 text-center text-violet-500 text-sm">
        لديك حساب بالفعل؟{' '}
        <Link href="/login" className="text-amber-500 hover:text-amber-300 focus:text-slate-500 underline">
            تسجيل الدخول؟
        </Link>
    </p>
</div>

    );
};

export default Page;
