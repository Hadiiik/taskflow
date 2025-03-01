// InviteAndTableSection.tsx
"use client";
import { useState } from 'react';
import { accsepetInvite } from '@/client_helpers/accsepet_invite';
import PopUpCallLink from '../PopUpCallLink';
import Image from 'next/image';

const InviteAndTableSection = ({ team_id }: { team_id: string | number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [invitPopupVisible, setInvitPopupVisible] = useState(false);
  const [invitationLink, setInvitationLink] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
  };

  return (
    <>
      {invitPopupVisible && (
        <PopUpCallLink 
          invitationLink={invitationLink} 
          onClose={() => setInvitPopupVisible(false)}
        />
      )}

      <div className="fixed md:left-1/2 md:-translate-x-1/2 bottom-6 left-6 z-50">
        {/* الزر الرئيسي */}
        <button
          onClick={toggleMenu}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 
          flex items-center justify-center text-white shadow-lg transition-all duration-300
          hover:from-purple-600 hover:to-purple-800 md:mx-auto
          ${isOpen ? 'md:-translate-y-16 rotate-45' : 'rotate-0'}`}
        >
          <div className="w-5 h-5 md:w-6 md:h-6 relative">
            <div className="absolute w-full h-1 bg-white top-1/2 -translate-y-1/2 rounded-full"></div>
            <div className="absolute h-full w-1 bg-white left-1/2 -translate-x-1/2 rounded-full"></div>
          </div>
        </button>

        {/* الأزرار الفرعية */}
        <div className={`fixed left-1/2 -translate-x-1/2 bottom-6 flex space-x-2 md:space-x-6 transition-all duration-300 ${isOpen ? 'md:bottom-[6rem]' : ''}`}>
          {/* زر إنشاء جدول */}
          <button
            className={`md:w-44 md:h-12 w-32 h-10 bg-gradient-to-r from-purple-500 to-purple-700 
            text-white rounded-lg flex items-center justify-center md:space-x-3 space-x-1 shadow-lg
            transition-all duration-300 ${
              isOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[100px]'
            }`}
          >
            <span className="md:text-base text-sm">انشاء جدول</span>
            <Image 
              src='/create-team.svg' 
              alt='إنشاء جدول' 
              width={30} 
              height={30}
              className="w-5 h-5 md:w-6 md:h-6"
            />
          </button>

          {/* زر دعوة أعضاء */}
          <button
            onClick={() => getInvite(team_id)}
            className={`md:w-44 md:h-12 w-32 h-10 bg-gradient-to-r from-purple-500 to-purple-700 
            text-white rounded-lg flex items-center justify-center md:space-x-3 space-x-1 shadow-lg
            transition-all duration-300 ${
              isOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[100px]'
            }`}
          >
            <span className="md:text-base text-sm">دعوة اعضاء</span>
            <Image 
              src='/join-team.svg' 
              alt='دعوة أعضاء' 
              width={30} 
              height={30}
              className="w-5 h-5 md:w-6 md:h-6"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default InviteAndTableSection;
