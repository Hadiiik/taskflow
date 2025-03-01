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
    {
      invitPopupVible && <PopUpCallLink invitationLink={invitationLink} onClose={()=>setInvitPopupVible(false)}/>
    }
    <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-6'>
      {/* زر إنشاء دعوة */}
      <button
        onClick={() => getInvite(props.team_id)}
        className='flex items-center justify-center bg-violet-600 text-white rounded-full p-4 shadow-lg hover:bg-violet-500 transition-all duration-300 ease-in-out transform hover:scale-110'
      >
        <p className='text-sm'>دعوة الأعضاء</p>
        <Image src='/join-team.svg' alt='إنشاء دعوة' width={30} height={30} />
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
