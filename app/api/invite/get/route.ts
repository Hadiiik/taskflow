import { createInviteJwt, decodeJWT } from "@/lib/createJwt";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

try{
    const req_body = await req.json();
    const jwt = req.cookies.get("jwt");
    const jwt_value = jwt?.value;
    if (!jwt_value) {
    return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
    }
    //check if admin
  
  // تحديد تاريخ انتهاء الدعوة (الحد الأقصى أسبوع من الآن)
    const expiration_date = new Date();
    expiration_date.setDate(expiration_date.getDate() + 7);  // إضافة 7 أيام (أسبوع)

  // تنسيق تاريخ انتهاء الدعوة بصيغة ISO 8601
    const expiration_date_str = expiration_date.toISOString();


    const jwt_user = decodeJWT(jwt_value) as JwtPayload | null;
    if (!jwt_user || typeof jwt_user === 'string' || !jwt_user.id) {
        return NextResponse.json({ error: "Invalid JWT" }, { status: 500 });
      }
    console.log(jwt_user)
    console.log("team_id",req_body.team_id)
    const invite:invite_jwt = {
        "team_id": req_body.team_id,
        "invitor_id":jwt_user.id,
        expiration_date: expiration_date_str,
    };
    const inviteJwt = createInviteJwt(invite);
    console.log(inviteJwt)
  // إرسال الاستجابة
  return NextResponse.json({ "invite":inviteJwt  }, { status: 201 });
}catch{
    return NextResponse.json({ e: "some thing went wrong" }, { status: 500 });
}
}
