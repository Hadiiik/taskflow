import AccountHeader from "@/app/components/account_components/AccountHeader";
import TeamTaskSheet from "@/app/components/account_components/TeamTaskSheet";
import { decodeJWT } from "@/lib/createJwt";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  // check if there is no jwt 
  const jwt_user = decodeJWT(jwt||"");
  if (!jwt_user || typeof jwt_user === 'string' || !jwt_user.id) 
    return <div>errro</div>
  const admin_id = jwt_user.id;
  // إنشاء بعض المهام الوهمية للتجربة
  const tasks = [
    {
      name: "مهمة 1",
      created_at: "2025-03-01T10:00:00Z",
      due_date: "2025-03-10T10:00:00Z",
      currentColumn: 0,
      isCompleted: false,
      editedBy_id : 24
    },
    {
      name: "مهمة 2",
      created_at: "2025-03-02T14:00:00Z",
      due_date: "2025-03-12T15:00:00Z",
      currentColumn: 1,
      isCompleted: false,
    },
    {
      name: "مهمة 3",
      created_at: "2025-03-03T12:00:00Z",
      due_date: "2025-03-09T18:00:00Z",
      currentColumn: 2,
      isCompleted: false,
    },
  ];

  const columns = ["عمود 1", "عمود 2", "عمود 3"];

  return (
    <>
    <AccountHeader/>
      <TeamTaskSheet
        table_id={id}
        table_name={"جدول الفريق"}
        columns_array={columns}
        task_array={tasks} 
        admin_id={admin_id}        
      />
    </>
  );
}
