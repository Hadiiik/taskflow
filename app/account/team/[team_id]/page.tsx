import AccountHeader from '@/app/components/account_components/AccountHeader';
import InviteAndTableSection from '@/app/components/account_components/InviteAndTableSection';
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


    return (
        <>
        <AccountHeader/>
        {/* if admin  */}
        <InviteAndTableSection/>
        {/* if admin  */}
        </>
    );
  }