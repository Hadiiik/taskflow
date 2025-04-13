// الدالة التي ستقوم بتحديث البيانات على جانب العميل
const editAccountData = async(userId: string, bio: Record<string, any>)=>{
    try {
        const response = await fetch(`/api/account/editData?user_id=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bio }),  // إرسال البيانات الجديدة (مثل الـ bio) في جسم الطلب
        });

        const data = await response.json();  // تحليل استجابة الخادم من JSON

        // التحقق من نجاح العملية بناءً على الاستجابة
        if (response.ok) {
            return { success: true, response: data };
        } else {
            return { success: false, response: data };
        }
    } catch (error) {
        // في حالة حدوث خطأ أثناء الطلب (مثل فشل الاتصال بالخادم)
        return { success: false, response: { error: "An error occurred during the request." } };
    }
}
export default editAccountData
