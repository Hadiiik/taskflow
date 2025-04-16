import { supabase } from "@/lib/supabase";
import { getJwtUser } from "@/server_helpers/get_jwt_user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.nextUrl;
    const user_id = url.searchParams.get("user_id"); 
    
    // الحصول على المستخدم المصادق عليه من خلال توكن JWT
    const jwt_user = await getJwtUser(req);

    // إذا كانت الدالة أعادت كائن NextResponse (استجابة خطأ)
    if (jwt_user instanceof NextResponse) {
        return jwt_user;
    }
    try {
        // جلب بيانات name و bio من Supabase
        const { data, error } = await supabase
            .from('users')
            .select('name, bio') // تحديد الحقول المطلوبة
            .eq('id', user_id || jwt_user.id)
            .single();

        if (error) {
            console.log(error)
            return NextResponse.json(
                { error: 'فشل في جلب بيانات المستخدم' },
                { status: 500 }
            );
        }

        if (!data) {
            return NextResponse.json(
                { error: 'المستخدم غير موجود' },
                { status: 404 }
            );
        }

        // إرجاع البيانات بالشكل المطلوب { name, bio }
        return NextResponse.json({
            name: data.name,
            bio: data.bio
        });

    } catch (err) {
        console.error('خطأ غير متوقع:', err);
        return NextResponse.json(
            { error: 'خطأ داخلي في الخادم' },
            { status: 500 }
        );
    }
}