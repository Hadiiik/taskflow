"use client";

import React, { useState, useEffect } from 'react';

interface PopUpCallLinkProps {
  invitationLink: string;
}

const PopUpCallLink: React.FC<PopUpCallLinkProps> = ({ invitationLink }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // حالة لإظهار أو إخفاء النافذة
  const [isShrinking, setIsShrinking] = useState(false); // حالة للانضغاط

  // تقصير الرابط إذا كان طويلاً
  const truncateLink = (link: string, maxLength: number = 30) => {
    return link.length > maxLength ? link.substring(0, maxLength) + "..." : link;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationLink).then(() => {
      setIsCopied(true);

      // بدء الانضغاط بعد 2 ثانية
      setTimeout(() => {
        setIsShrinking(true); // بدء الانضغاط
      }, 2000);

      // إخفاء النافذة بعد انتهاء الانضغاط
      setTimeout(() => {
        setIsVisible(false); // إخفاء النافذة
      }, 2500); // 2000 للانتظار + 500 للانضغاط
    });
  };

  // إغلاق النافذة عند النقر خارجها
  const handleClickOutside = (event: MouseEvent) => {
    const popup = document.querySelector('.popup-container');
    if (popup && !popup.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  // إضافة مستمع حدث عند تحميل المكون
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // إذا لم تعد النافذة مرئية، لا نعيد عرض أي شيء
  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* طبقة لمنع التفاعل مع الصفحة */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* النافذة المنبثقة */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className={`popup-container bg-white rounded-lg shadow-lg w-96 transition-transform duration-500 ${
            isShrinking ? 'scale-0' : 'scale-100'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-700 to-purple-700 rounded-t-lg p-4">
            <h2 className="text-white text-lg font-semibold">رابط الدعوة :</h2>
          </div>

          {/* Body */}
          <div className="p-4">
            <p className="text-gray-500 break-words">
              {truncateLink(invitationLink)}
            </p>
          </div>

          {/* Footer */}
          <div className="p-4 flex justify-end">
            <button
              onClick={handleCopyLink}
              className={`${
                isCopied
                  ? 'bg-gradient-to-r from-green-500 to-green-700' // لون أخضر عند النسخ
                  : 'bg-gradient-to-r from-purple-500 to-purple-700' // لون بنفسجي افتراضي
              } text-white px-4 py-2 rounded-lg transition-all`}
            >
              {isCopied ? 'تم النسخ!' : 'نسخ الرابط'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpCallLink;