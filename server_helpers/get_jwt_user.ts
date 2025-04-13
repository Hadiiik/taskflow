import { decodeJWT } from "@/lib/createJwt";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// دالة للتحقق من JWT وفك تشفيره
export async function getJwtUser(req: NextRequest): Promise<JwtPayload | NextResponse> {
    const jwt = req.cookies.get("jwt");
    const jwt_value = jwt?.value;

    // التحقق من وجود JWT
    if (!jwt_value) {
        return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
    }

    // فك تشفير JWT واستخراج بيانات المستخدم
    const jwt_user = decodeJWT(jwt_value) as JwtPayload | null;

    // التحقق من صلاحية بيانات المستخدم المستخلصة من الـ JWT
    if (!jwt_user || typeof jwt_user === 'string' || !jwt_user.id) {
        return NextResponse.json({ error: "Invalid JWT" }, { status: 500 });
    }

    return jwt_user;
}
