import { NextRequest, NextResponse } from "next/server";
import { team } from "@/types/team";
import { supabase } from "@/lib/supabase";
import  { decodeJWT } from "@/lib/createJwt";
import { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    // تحويل الطلب إلى JSON
    const body: team = await req.json();
    const jwt = req.cookies.get("jwt");
    const jwt_value = jwt?.value;

if (!jwt_value) {
  return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
}

// فك تشفير JWT
  const jwt_user = decodeJWT(jwt_value) as JwtPayload | null;

// تحقق من أن jwt_user ليس null وأنه يحتوي على خاصية id
  if (!jwt_user || typeof jwt_user === 'string' || !jwt_user.id) {
    return NextResponse.json({ error: "Invalid JWT" }, { status: 500 });
  }

  const creator_id = jwt_user.id;
  body.creator_id = creator_id
    // إدخال البيانات إلى Supabase
    const { data, error } = await supabase
      .from("teams") // اسم الجدول في Supabase
      .insert([
        //change this to json
        {
          team_name: body.team_name,
          creator_id: body.creator_id,
          team_type: body.team_type,
          company_name : body.company_name
        }
      ])
      .select("team_id")
      .single();

      // تعديل مصفوفة team_id_arry
      // تم الحذف

    // هاد السطر لا تشيلو    
    console.log(data,error)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // إرجاع team_id
    const response = NextResponse.json({ "team_id":data.team_id }, { status: 201 });
    return response;
        
  } catch (e) {
    // التعامل مع الأخطاء العامة
    // لا تشيل هاد السطر كمان عبين ما نلغي قاعدة never used
    console.log(e)
    return NextResponse.json({ e: "Failed to create team" }, { status: 500 });
  }
}
