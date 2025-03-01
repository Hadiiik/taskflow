export async function getTeamMembers(teamId:string|number) {
    try {
        // استدعاء الـ API باستخدام fetch
        const response = await fetch(`/api/get-members?team_id=${teamId}`, {
            method: 'GET', // تحديد طريقة الطلب
            credentials: 'include', // إرسال الكوكيز مع الطلب إذا كنت بحاجة إليها
        });

        // تحقق من استجابة الـ API
        const data = await response.json();

        // إذا كانت الاستجابة ناجحة
        if (data) {
            return { success: true, members: data.members };
        } else {
            // إذا كانت هناك مشكلة في الـ API
            return { success: false, error: data.error || "Unknown error" };
        }
    } catch  {
        // إذا حدث خطأ أثناء استدعاء الـ API
        return { success: false, error: "Failed to fetch data" };
    }
}
