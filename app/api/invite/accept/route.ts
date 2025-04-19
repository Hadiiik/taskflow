import  { decodeJWT } from "@/lib/createJwt";
import { supabase } from "@/lib/supabase";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const req_body = await req.json()
    const invite_jwt_string = req_body.invite_jwt
    const invite_jwt = decodeJWT(invite_jwt_string) as JwtPayload | null;
    if (!invite_jwt || typeof invite_jwt === 'string' ) {
            return NextResponse.json({ error: "Invalid JWT" }, { status: 500 });
          }
    console.log("invite jwt:")
    console.log(invite_jwt)


    const { data, error } = await supabase
        .from('teams')
        .select('team_name')
        .eq('team_id', invite_jwt.team_id)
        .eq('creator_id', invite_jwt.invitor_id)
        .eq('disabled', false)
        .single(); // تأكد من أننا نأخذ سطر واحد فقط
        console.log("data: ", data)  
        console.log("error", error) 
    if (error || !data) {
        return NextResponse.json({ error: "Invalid invitation" }, { status: 400 });
    }  


    const jwt = req.cookies.get("jwt");
    const jwt_value = jwt?.value;
    if (!jwt_value) {
    return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
    }
    const jwt_user = decodeJWT(jwt_value) as JwtPayload | null;
    if (!jwt_user || typeof jwt_user === 'string' || !jwt_user.id) {
        return NextResponse.json({ error: "Invalid JWT" }, { status: 500 });
      }


      


      //add user to members table 
      const {data:d,error:e} = await supabase
                              .from("members")
                              .insert({
                                "team_id":invite_jwt?.team_id,
                                "user_role" : "user",
                                "user_id" : jwt_user?.id

                              });
      console.log(d,e)                        
      
      const res = NextResponse.json({ "message": "done succsefuly" ,"team_id": invite_jwt.team_id , "team_name":data.team_name }, { status: 201 });
      
    return res
}