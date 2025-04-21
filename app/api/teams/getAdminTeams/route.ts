import { supabase } from "@/lib/supabase";
import { getJwtUser } from "@/server_helpers/get_jwt_user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const jwt_user = await getJwtUser(req);
        // إذا كانت الدالة أعادت كائن NextResponse (استجابة خطأ)
    if (jwt_user instanceof NextResponse) {
        return jwt_user;
    }
    const { data: teams, error } = await supabase
        .from("teams")
        .select("team_name, team_info_object, team_id")
        .eq("creator_id", jwt_user.id);
        if (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'فشل في جلب بيانات الفرق' },
            { status: 500 }
        );
    }
    if (!teams) {
        return NextResponse.json(
            { error: 'لا توجد فرق' },
            { status: 404 }
        );
    }

    return NextResponse.json(
        { teams },
        { status: 200 }
    );
}