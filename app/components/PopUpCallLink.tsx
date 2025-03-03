"use client";

import React, { useState, useEffect } from 'react';

interface PopUpCallLinkProps {
  invitationLink: string;
  onClose: () => void;
}

const PopUpCallLink: React.FC<PopUpCallLinkProps> = ({ invitationLink, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isShrinking, setIsShrinking] = useState(false);

  const truncateLink = (link: string, maxLength: number = 70) => {
    return link.length > maxLength ? link.substring(0, maxLength) + "..." : link;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationLink).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsShrinking(true);
      }, 700);

      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 1000);
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    const popup = document.querySelector('.popup-container');
    if (popup && !popup.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* طبقة لمنع التفاعل مع الصفحة */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>

      {/* النافذة المنبثقة */}
      <div className="fixed inset-0 flex items-center justify-center z-50 mx-5">
        <div
          className={`popup-container bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md transition-transform duration-500 ${
            isShrinking ? 'scale-0' : 'scale-100'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-700 to-purple-700 rounded-t-lg p-3 sm:p-4">
            <h2 className="text-white text-sm sm:text-lg font-semibold">رابط الدعوة :</h2>
          </div>

          {/* Body */}
          <div className="p-3 sm:p-4">
            <p className="text-gray-500 break-words text-sm sm:text-base">
              {truncateLink(invitationLink)}
            </p>
          </div>

          {/* Footer */}
          <div className="p-3 sm:p-4 flex justify-end">
            <button
              onClick={handleCopyLink}
              className={`${
                isCopied
                  ? 'bg-gradient-to-r from-green-500 to-green-700'
                  : 'bg-gradient-to-r from-purple-500 to-purple-700'
              } text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition-all text-sm sm:text-base`}
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
