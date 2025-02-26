import React from 'react';

const SkeletonLoadingForm: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                <div className="animate-pulse">
                    {/* عنوان تسجيل الدخول */}
                    <div className="h-8 bg-gray-300 rounded w-1/2 mb-6 mx-auto"></div>

                    {/* حقل إدخال البريد الإلكتروني */}
                    <div className="h-12 bg-gray-300 rounded mb-4"></div>

                    {/* حقل إدخال كلمة المرور */}
                    <div className="h-12 bg-gray-300 rounded mb-4"></div>

                    {/* زر تسجيل الدخول */}
                    <div className="h-12 bg-gray-300 rounded w-1/2 mb-4 mx-auto"></div>

                    {/* رابط نسيت كلمة المرور */}
                    <div className="h-4 bg-gray-300 rounded w-1/3 mb-2 mx-auto"></div>

                    {/* رابط تسجيل جديد */}
                    <div className="h-4 bg-gray-300 rounded w-1/3 mb-2 mx-auto"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoadingForm;