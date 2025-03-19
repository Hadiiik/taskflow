import AccountHeader from "@/app/components/account_components/AccountHeader";
import TeamTaskSheet from "@/app/components/account_components/TeamTaskSheet";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  // إنشاء بعض المهام الوهمية للتجربة
  const tasks = [
    {
      name: "مهمة 1",
      created_at: "2025-03-01T10:00:00Z",
      due_date: "2025-03-10T10:00:00Z",
      currentColumn: 0,
      isCompleted: false,
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
      />
    </>
  );
}
