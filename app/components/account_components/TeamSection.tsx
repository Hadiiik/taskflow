"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TeamSection = () => {
  return (
    <section className='bg-gradient-to-r from-indigo-100 via-purple-200 to-indigo-100 py-12 px-6 md:px-16 text-gray-800 rounded-lg shadow-lg'>
      <div className='max-w-4xl mx-auto text-center'>
        <h2 className='text-4xl font-bold text-indigo-900 mb-6'>إدارة الفرق بسهولة</h2>

        <div className='mb-8 space-y-6'>
          <p className='text-lg text-right mb-4'>
            لبدء العمل مع فريقك، يمكنك <strong className='text-indigo-700'>إنشاء فريق</strong> ودعوة الأعضاء للانضمام باستخدام رابط أو معرف الفريق.
          </p>
          <p className='text-lg text-right'>
            إذا كنت ترغب في <strong className='text-indigo-700'>الانضمام إلى فريق</strong> موجود، يمكنك استخدام رابط الدعوة أو معرف الفريق.
          </p>
        </div>

        {/* أزرار إنشاء فريق وانضمام */}
        <div className='flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 justify-center'>
          {/* زر إنشاء فريق */}
          <Link
            href='/create-team'
            className='flex items-center justify-center bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105 w-full md:w-auto'
          >
            <Image src='/create-team.svg' alt='إنشاء فريق' width={30} height={30} />
            <span className='ml-3'>إنشاء فريق</span>
          </Link>

          {/* زر انضمام إلى فريق */}
          <Link
            href='/join-team'
            className='flex items-center justify-center bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105 w-full md:w-auto'
          >
            <Image src='/join-team.svg' alt='انضمام إلى فريق' width={30} height={30} />
            <span className='ml-3'>انضمام إلى فريق</span>
          </Link>
        </div>

        {/* شرح كيفية إنشاء الفريق */}
        <div className='mt-10 text-right space-y-6'>
          <h3 className='text-2xl font-semibold text-indigo-800 mb-2'>كيفية إنشاء فريق</h3>
          <p className='text-lg mb-4'>
            يمكنك إنشاء فريق جديد بسهولة عن طريق النقر على زر 'إنشاء فريق'. بعد ذلك، يمكنك دعوة الأعضاء عبر رابط الفريق أو معرفه.
            <br />
            <strong className='text-indigo-700'>ابدأ في توزيع المهام وتحقيق أهدافك مع الفريق الجديد!</strong>
          </p>

          {/* شرح كيفية الانضمام إلى فريق */}
          <h3 className='text-2xl font-semibold text-indigo-800 mb-2'>كيفية الانضمام إلى فريق</h3>
          <p className='text-lg mb-4'>
            للانضمام إلى فريق موجود، ما عليك سوى النقر على زر 'انضمام إلى فريق'، ثم أدخل رابط الدعوة أو معرف الفريق.
            <br />
            <strong className='text-indigo-700'>انضم للفريق وابدأ في التعاون على المهام المشتركة!</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
