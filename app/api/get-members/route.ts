import { decodeJWT } from "@/lib/createJwt";
import { supabase } from "@/lib/supabase";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.nextUrl;
    const teamId =  url.searchParams.get("team_id"); // تأكد أن الـ team_id هو من نوع BIGINT
    const jwt = req.cookies.get("jwt");
    const jwt_value = jwt?.value;

    // التحقق من وجود JWT
    if (!jwt_value) {
        return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
    }

    // فك تشفير JWT واستخراج بيانات المستخدم
    const jwt_user = decodeJWT(jwt_value) as JwtPayload | null;

    if (!jwt_user || typeof jwt_user === 'string' || !jwt_user.id) {
        return NextResponse.json({ error: "Invalid JWT" }, { status: 500 });
    }

    // استدعاء الـ RPC للتحقق من وجود الفريق وجلب الأعضاء مع أسمائهم
    const { data, error } = await supabase
        .rpc('get_team_members_with_names', { 
            team_identifier: parseInt(teamId||"1"), // تأكد من تحويل الـ teamId إلى int
            creator_identifier: jwt_user.id 
        });

    // التحقق من وجود خطأ في استدعاء الـ RPC
    console.log(error)
    if (error) {
        return NextResponse.json({ error: error.message || "Failed to fetch team members with names" }, { status: 500 });
    }

    // إرجاع الأعضاء مع الأسماء
    return NextResponse.json({ success: true, members: data });
}
