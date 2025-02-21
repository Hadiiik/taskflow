import { NextRequest, NextResponse } from "next/server";
import { team } from "@/types/team";
import { supabase } from "@/lib/supabase";
import { decodeJWT } from "@/lib/createJwt";

export async function POST(req: NextRequest) {
  try {
    // تحويل الطلب إلى JSON
    const body: team = await req.json();

    // إدخال البيانات إلى Supabase
    const { data, error } = await supabase
      .from("teams") // اسم الجدول في Supabase
      .insert([
        {
          team_name: body.team_name,
          creator_id: body.creator_id,
          team_type: body.team_type,
        }
      ])
      .select("team_id")
      .single(); 

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // إرجاع team_id
    const response = NextResponse.json({ "":"" }, { status: 201 });
    const jwt = req.cookies.get("jwt");
    const jwt_value = jwt?.value
    if(!jwt) 
        return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
    const jwt_user  = decodeJWT(jwt_value||"");
    console.log(jwt_user);
    return response;
        
  } catch (error) {
    // التعامل مع الأخطاء العامة
    return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
  }
}
