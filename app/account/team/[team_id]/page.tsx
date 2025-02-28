import AccountHeader from '@/app/components/account_components/AccountHeader';
import InviteAndTableSection from '@/app/components/account_components/InviteAndTableSection';
import Card from '@/app/components/HorizntiolCard';
import { decodeJWT } from '@/lib/createJwt';
import { cookies } from 'next/headers'

export default async function Page({
    params,
  }: {
    params: Promise<{ team_id: string }>
  }) {


    const team_id = (await params).team_id
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;
    // check if there is no jwt 
    const jwt_user = decodeJWT(jwt||"");
    console.log(jwt_user) 

    return (
        <>
        <AccountHeader/>
        {/* if admin  */}
        <div className='lg:my-2 my-20'>
        <Card title={'جدول الأعضاء'} details={'hdkkdkdlldjfjjfjkdk'} herf={`/account/team/${team_id}/users-table?team_id=${team_id}`}/>
        </div>
        <InviteAndTableSection team_id={team_id}/>
        {/* if admin  */}
        </>
    );
  }