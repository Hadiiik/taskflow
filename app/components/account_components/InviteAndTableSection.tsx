"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { accsepetInvite } from '@/client_helpers/accsepet_invite';
import PopUpCallLink from '../PopUpCallLink';



const FloatingButtonsSection = ({ props }: { props: { team_id: string | number } }) => {
  const [invitPopupVible,setInvitPopupVible] = useState(false);
  const [invitationLink,setInvitationLink] = useState("")


  const getInvite = async (team_id: string | number) => {
    setInvitPopupVible(false);
    const result = await accsepetInvite(team_id);
    
    // إذا كانت هناك دعوة (invite) في النتيجة
    if (result.invite) {
      // تشفير الـ invite
      const encodedInvite = encodeURIComponent(result.invite);
      
      // بناء الرابط
      const inviteLink = `https://taskflow-onrequest.vercel.app/account/join-team?invite=${encodedInvite}`;
      setInvitationLink(inviteLink);
      setInvitPopupVible(true);
      
      // طباعة الرابط
      
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

      {/* زر إنشاء جدول */}
      <button
        className='flex items-center justify-center bg-violet-600 text-white rounded-full p-4 shadow-lg hover:bg-violet-500 transition-all duration-300 ease-in-out transform hover:scale-110'
      >
        <p className='text-sm'>انشاء جدول</p>
        <Image src='/create-team.svg' alt='إنشاء جدول' width={30} height={30} />
      </button>
    </div>
    </>
  );
};

export default FloatingButtonsSection;
