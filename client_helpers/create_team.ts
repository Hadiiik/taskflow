import { team } from "@/types/team";

  
  const createTeam = async (team: team) => {
    try {
      // استخدام await لجلب استجابة الطلب
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(team),
      });
  
      // الانتظار للحصول على البيانات في الاستجابة
      const data = await response.json();
  
      // التحقق من حالة الاستجابة
      if (response.ok) {
        return { success: true, message: 'Team created successfully!' };
      } else {
        return { success: false, message: data.error || 'Failed to create team' };
      }
    } catch (error) {
      // التعامل مع الخطأ في حال حدوثه
      console.error('Error creating team:', error);
      return { success: false, message: 'An error occurred. Please try again later.' };
    }
  };
  