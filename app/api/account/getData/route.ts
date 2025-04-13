import { supabase } from "@/lib/supabase";
import { getJwtUser } from "@/server_helpers/get_jwt_user";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest){
    const url = req.nextUrl;
    const user_id =  url.searchParams.get("user_id"); 
    const jwt_user = await getJwtUser(req);

    // إذا كانت الدالة قد أرجعت استجابة بدلاً من بيانات المستخدم
    if (jwt_user instanceof NextResponse) {
        return jwt_user; // في حالة الخطأ
    }
    // احضار البيانات من supabase
    // from table users get bio 
    // ارجاع البيانات على شكل كاءن json 
    // في حال حدوث اخطأ  ارجاع رد الخطأ 
}