import { supabase } from "@/lib/supabase";
import { getJwtUser } from "@/server_helpers/get_jwt_user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const url = req.nextUrl;
    const user_id = url.searchParams.get("user_id"); 
    
    // استرجاع بيانات المستخدم من الـ JWT
    const jwt_user = await getJwtUser(req);

    // إذا كانت الدالة قد أرجعت استجابة بدلاً من بيانات المستخدم
    if (jwt_user instanceof NextResponse) {
        return jwt_user; // في حالة الخطأ
    }

    const jwt_user_id = jwt_user.id;

    // التحقق من صلاحية المستخدم
    if (jwt_user_id != user_id) {
        return NextResponse.json({ error: "Not Authorized" }, { status: 403 });
    }

    try {
        // استخراج البيانات من جسم الطلب
        const { bio } = await req.json(); // فرض أن البايو مرسل كـ JSON في جسم الطلب

        // التحقق من وجود البايو
        if (!bio || typeof bio !== "object") {
            return NextResponse.json({ error: "Invalid bio format" }, { status: 400 });
        }

        // تحديث الـ bio في قاعدة بيانات Supabase
        const { data, error } = await supabase
            .from("users")
            .update({ bio }) // تحديث حقل bio
            .eq("id", user_id); // تحديد المستخدم حسب user_id

        // التحقق من وجود خطأ في التحديث
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // العودة باستجابة ناجحة
        return NextResponse.json({ message: "Bio updated successfully", data });
        
    } catch  {
        // التعامل مع أي أخطاء أخرى
        return NextResponse.json({ error: "An error occurred while updating bio" }, { status: 500 });
    }
}
