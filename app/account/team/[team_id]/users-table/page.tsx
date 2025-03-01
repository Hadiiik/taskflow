"use client";
import AccountHeader from "@/app/components/account_components/AccountHeader";
import UserTable from "@/app/components/account_components/UserTable";
import { useEffect, useState } from "react";

const Page = () => {
  const [team_id, setTeam_id] = useState("");
  const [loading, setLoading] = useState(true); // حالة لمعرفة إذا كنا في مرحلة التحميل

  useEffect(() => {
    const teamId = new URLSearchParams(window.location.search).get('team_id');
    setTeam_id(teamId || "");
    setLoading(false); // عند تحميل الـ team_id يتم إيقاف التحميل
  }, []);

  if (loading) {
    return <div>Loading...</div>; // إظهار رسالة التحميل حتى يتم تحميل البيانات
  }

  return(
    <> 
    <AccountHeader/>
    <UserTable team_id={team_id} />
    </>
  );
};

export default Page;
