export type Task = {
    name: string;
    created_at: string;
    due_date: string; // تاريخ ووقت انتهاء المهمة
    currentColumn: number;
    isCompleted?: boolean;
  }