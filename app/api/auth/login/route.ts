import createJwt from "@/lib/createJwt";
import { getUserIp } from "@/lib/helpers";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import userInfo from "@/types/userInfo";

export async function POST(req: NextRequest) {
    const request_body: userInfo = await req.json();

    // to do make custom check type 
    if (!request_body.email || !request_body.password) {
        return NextResponse.json({ status: 400, message: "Email and password are required" });
    }

    // التحقق من وجود المستخدم في قاعدة البيانات
    const { data: user, error } = await supabase
        .from("users")
        .select("email, hashed_password")
        .eq("email", request_body.email)
        .single();

    if (error || !user) {
        return NextResponse.json({ status: 404, message: "User not found" });
    }

    // تحقق من كلمة المرور (مثال بسيط مع تطابق كلمات المرور)
    // في حال كان لديك مكتبة للتحقق من كلمة المرور مثل bcrypt، قم باستخدامها هنا.
    if (user.hashed_password !== request_body.password) {
        return NextResponse.json({ status: 401, message: "Invalid credentials" });
    }

    // توليد JWT وتخزينه في الكوكيز
    const user_ip = getUserIp(req) || "";
    const jwt = createJwt({
        email: request_body.email,
        user_ip: user_ip,
    });

    const response = NextResponse.json({ status: 200, message: "Login successful" });
    response.cookies.set("jwt", jwt || "");

    return response;
}
