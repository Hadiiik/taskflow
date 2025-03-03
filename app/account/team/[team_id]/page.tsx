import AccountHeader from '@/app/components/account_components/AccountHeader';
import InviteAndTableSection from '@/app/components/account_components/InviteAndTableSection';
import MissionSchedules from '@/app/components/account_components/MissionSchedules';
import { decodeJWT } from '@/lib/createJwt';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers'


const getTables = async (team_id:string|number)=>{
  const {data,error} = await supabase
  .from("tables")
  .select("table_name , id")
  .eq("team_id",team_id)
  if(error)
    //to do check for errors 
    return null;
  return data;
}

export default async function Page({
    params,
  }: {
    params: Promise<{ team_id: string }>
  }) {


    const team_id = (await params).team_id
    const tables = await getTables(team_id);
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;
    // check if there is no jwt 
    const jwt_user = decodeJWT(jwt||"");
    console.log(jwt_user);

    return (
        <>
        <AccountHeader/>

        <div className='lg:my-2 my-20'>
        <MissionSchedules schedules={tables}/>
        </div>

        {/* if admin  */}
        <InviteAndTableSection team_id={team_id}/>
        {/* if admin  */}
        </>
    );
  }