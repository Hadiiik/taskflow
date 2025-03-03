import { decodeJWT } from "@/lib/createJwt";
import { supabase } from "@/lib/supabase";
import { table } from "@/types/table";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(req:NextRequest){
    //check if admin 
    const jwt = req.cookies.get("jwt");
    const jwt_value = jwt?.value;
    if (!jwt_value) {
    return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
    }
    const jwt_user = decodeJWT(jwt_value) as JwtPayload | null;
    if (!jwt_user || typeof jwt_user === 'string' || !jwt_user.id) {
        return NextResponse.json({ error: "Invalid JWT" }, { status: 500 });
    }
    const req_body:table = await req.json();
    const table_team_id = req_body.team_id;
    const admin_id = jwt_user.id;
    const {data,error} = await supabase
                        .from("teams")
                        .select()
                        .eq("team_id",table_team_id)
                        .eq("creator_id",admin_id)
                        .single()
    if(!data||error){
        return NextResponse.json({ error: "Invalid JWT" }, { status: 500 });
    }
    const {error:table_error} = await supabase
    .from("tables")
    .insert({
        "team_id":table_team_id,
        "table_name":req_body.table_name,
        "coulmns_array":req_body.coulmns_array

    })
    if(table_error)
        return NextResponse.json({status:500,message:"could not create table"})
    return NextResponse.json({status:200,message:"craeted table"})
    
}