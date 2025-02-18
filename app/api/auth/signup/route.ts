import createJwt from "@/lib/createJwt";
import { supabase } from "@/lib/supabase";
import userInfo from "@/types/userInfo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const request_body : userInfo = await req.json();
    //to do check type
    // if false return error

    //to do check if email exits 

    const {data,error} = await supabase
                        .from("users")
                        .insert({"email":request_body.email,
                                "name":request_body.name,
                                "hashed_password":request_body.password
                        })
    if (error) {
        //add wait 2s
        console.log(error)
        return NextResponse.json({ status: 400, message: "bad format" });
    }
    //to do set jwt 

    const response = NextResponse.json({ status: 200, message: "ok" });
    const jwt = createJwt({"user":"user"});

    response.cookies.set("jwt",jwt||"");
    return response;
}