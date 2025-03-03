
"use client";
import { useState, useRef, useEffect } from 'react';
import { accsepetInvite } from '@/client_helpers/accsepet_invite';
import PopUpCallLink from '../PopUpCallLink';
import Image from 'next/image';
import Link from 'next/link';


const InviteAndTableSection = ({ team_id }: { team_id: string | number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [invitPopupVisible, setInvitPopupVisible] = useState(false);
  const [invitationLink, setInvitationLink] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); // مرجع للزر الرئيسي

  const toggleMenu = () => {
    setIsOpen(prev => !prev); // عكس الحالة الحالية للقائمة
  };

  const getInvite = async (team_id: string | number) => {
    setInvitPopupVisible(false);
    const result = await accsepetInvite(team_id);
    
    if (result.invite) {
      const encodedInvite = encodeURIComponent(result.invite);
      const inviteLink = `https://taskflow-onrequest.vercel.app/account/join-team?invite=${encodedInvite}`;
      setInvitationLink(inviteLink);
      setInvitPopupVisible(true);
    }

    setIsOpen(false); // إغلاق القائمة بعد الحصول على الدعوة
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // إغلاق القائمة عند التفاعل مع الصفحة
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {invitPopupVisible && (
        <PopUpCallLink 
          invitationLink={invitationLink} 
          onClose={() => setInvitPopupVisible(false)}
        />
      )}


      <button
        ref={buttonRef} // إضافة المرجع للزر
        onClick={toggleMenu}
        className={`fixed z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 
        flex items-center justify-center text-white shadow-lg transition-all duration-300
        hover:from-purple-600 hover:to-purple-800 md:left-1/2 md:-translate-x-1/2 md:bottom-6
        ${isOpen ? 'md:-translate-y-16 rotate-45' : 'rotate-0'} top-4 right-4 md:top-auto md:right-auto`}
      >
        <div className="w-5 h-5 md:w-6 md:h-6 relative">
          <div className="absolute w-full h-1 bg-white top-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="absolute h-full w-1 bg-white left-1/2 -translate-x-1/2 rounded-full"></div>
        </div>
      </button>


      <div className="hidden md:flex fixed left-1/2 -translate-x-1/2 bottom-6 space-x-6 transition-all duration-300">
        <button
          onClick={() => {
            setIsOpen(false); // إغلاق القائمة المنسدلة
            
          }}
          className={`w-44 h-12 bg-gradient-to-r from-purple-500 to-purple-700 
          text-white rounded-lg flex items-center justify-center space-x-3 shadow-lg
          transition-all duration-300 ${
            isOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[100px]'
          }`}
        >
          <span className="text-base">انشاء جدول</span>
          <Image 
            src='/create-team.svg' 
            alt='إنشاء جدول' 
            width={30} 
            height={30}
            className="w-6 h-6"
          />
        </button>
        
        <button
          onClick={() => {
            getInvite(team_id);
            setIsOpen(false); // إغلاق القائمة عند الضغط على زر دعوة الأعضاء
          }}
          className={`w-44 h-12 bg-gradient-to-r from-purple-500 to-purple-700 
          text-white rounded-lg flex items-center justify-center space-x-3 shadow-lg
          transition-all duration-300 ${
            isOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[100px]'
          }`}
        >
          <span className="text-base">دعوة اعضاء</span>
          <Image 
            src='/join-team.svg' 
            alt='دعوة أعضاء' 
            width={30} 
            height={30}
            className="w-6 h-6"
          />
        </button>

        <Link
          href="/members-table"
          className={`w-44 h-12 bg-gradient-to-r from-purple-500 to-purple-700 
          text-white rounded-lg flex items-center justify-center space-x-3 shadow-lg
          transition-all duration-300 ${
            isOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[100px]'
          }`}
        >
          <span className="text-base">عرض جدول الأعضاء</span>
          <div className="w-6 h-6 relative">
            <div className="absolute w-full h-1 bg-white top-1/2 -translate-y-1/2 rounded-full"></div>
            <div className="absolute h-full w-1 bg-white left-1/2 -translate-x-1/2 rounded-full"></div>
            <div className="absolute w-2 h-2 bg-white top-1/4 left-1/4 rounded-full"></div>
            <div className="absolute w-2 h-2 bg-white top-1/4 right-1/4 rounded-full"></div>
            <div className="absolute w-2 h-2 bg-white bottom-1/4 left-1/4 rounded-full"></div>
            <div className="absolute w-2 h-2 bg-white bottom-1/4 right-1/4 rounded-full"></div>
          </div>
        </Link>
      </div>


      {isOpen && (
        <div
          ref={menuRef}
          className="md:hidden fixed top-16 right-4 z-50 bg-white rounded-lg shadow-lg w-48 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white text-center py-2">
            <span className="text-sm">صلاحيات المدير</span>
          </div>

          <button
            onClick={() => {
              setIsOpen(false); // إغلاق القائمة المنسدلة
              
            }}
            className="w-full py-3 px-4 text-sm text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 active:from-red-500 active:to-red-700 flex items-center space-x-2 transition-all duration-300"
          >
            <Image 
              src='/create-team.svg' 
              alt='إنشاء جدول' 
              width={20} 
              height={20}
              className="w-5 h-5"
            />
            <span>انشاء جدول</span>
          </button>

          <button
            onClick={() => {
              getInvite(team_id);
              setIsOpen(false); // إغلاق القائمة عند الضغط على زر دعوة الأعضاء
            }}
            className="w-full py-3 px-4 text-sm text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 active:from-red-500 active:to-red-700 flex items-center space-x-2 transition-all duration-300"
          >
            <Image 
              src='/join-team.svg' 
              alt='دعوة أعضاء' 
              width={20} 
              height={20}
              className="w-5 h-5"
            />
            <span>دعوة اعضاء</span>
          </button>

          <Link
            href="/members-table"
            className="w-full py-3 px-4 text-sm text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 active:from-red-500 active:to-red-700 flex items-center space-x-2 transition-all duration-300"
          >
            <div className="w-5 h-5 relative">
              <div className="absolute w-full h-1 bg-white top-1/2 -translate-y-1/2 rounded-full"></div>
              <div className="absolute h-full w-1 bg-white left-1/2 -translate-x-1/2 rounded-full"></div>
              <div className="absolute w-2 h-2 bg-white top-1/4 left-1/4 rounded-full"></div>
              <div className="absolute w-2 h-2 bg-white top-1/4 right-1/4 rounded-full"></div>
              <div className="absolute w-2 h-2 bg-white bottom-1/4 left-1/4 rounded-full"></div>
              <div className="absolute w-2 h-2 bg-white bottom-1/4 right-1/4 rounded-full"></div>
            </div>
            <span>عرض جدول الأعضاء</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default InviteAndTableSection;
