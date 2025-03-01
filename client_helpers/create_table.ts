import { table } from "@/types/table";

const createTable = async (tableData: table) => {
  try {
    // استخدام await لجلب استجابة الطلب
    const response = await fetch('/api/tables/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tableData),
      credentials: 'include', // لضمان إرسال الـ cookies (الـ JWT)
    });

    // الانتظار للحصول على البيانات في الاستجابة
    const data = await response.json();
    
    // التحقق من حالة الاستجابة
    if (response.ok) {
      return { success: true, message: 'Table created successfully!' };
    } else {
      return { success: false, message: data.error || 'Failed to create table' };
    }
  } catch (error) {
    // التعامل مع الخطأ في حال حدوثه
    console.error('Error creating table:', error);
    return { success: false, message: 'An error occurred. Please try again later.' };
  }
};

export default createTable;
