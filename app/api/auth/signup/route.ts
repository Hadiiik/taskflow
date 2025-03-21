import createJwt from "@/lib/createJwt";
import { getUserIp } from "@/lib/helpers";
import { supabase } from "@/lib/supabase";
import userInfo from "@/types/userInfo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const request_body : userInfo = await req.json();
    //to do check type
    // if false return error

    //to do check if email exits 

    const { data, error } = await supabase
  .from("users")
  .insert([
    {
      email: request_body.email,
      name: request_body.name,
      hashed_password: request_body.password,
    }
  ])
  .select('id')
  .single(); // تحديد أنك تريد إرجاع الـ id فقط
    if (error) {
        //add wait 2s
        return NextResponse.json({ status: 400, message: "bad format" });
    }
    //to do set jwt 

    const response = NextResponse.json({ status: 200, message: "ok" });
    const user_ip = getUserIp(req)||"";
    const jwt = createJwt({
        email: request_body.email,
        user_ip: user_ip,
        id: data.id,
        team_id_arry : null
    });

    response.cookies.set("jwt",jwt||"",{path:"/" , maxAge : 60 * 60 * 24 * 365 * 20});
    return response;
}