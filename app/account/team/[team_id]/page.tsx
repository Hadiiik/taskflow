import AccountHeader from '@/app/components/account_components/AccountHeader';
import InviteAndTableSection from '@/app/components/account_components/InviteAndTableSection';
import UserTable from '@/app/components/account_components/UserTable';
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
        <UserTable  team_id={team_id}/>
        {/* if admin  */}
        <InviteAndTableSection props={{
          team_id: team_id
        }} />
        {/* if admin  */}
        </>
    );
  }