import { hashPassword } from "@/lib/hash_password";
import userInfo from "@/types/userInfo";

const client_login = async (userInfo: userInfo) => {
  try {
    // تجزئة كلمة المرور (إذا كنت تستخدم hashing أيضاً في عملية تسجيل الدخول)
    const hashedPassword = hashPassword(userInfo.password);

    // تحديث كلمة المرور المشفرة في الكائن
    userInfo.password = hashedPassword;

    // إرسال البيانات إلى الخادم (API) للتحقق من بيانات تسجيل الدخول
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (data.status == 200) {
      //we maybe would have to use them to login in auto
      localStorage.setItem("hased_password",userInfo.password);
      localStorage.setItem("email",userInfo.email)
      // تخزين JWT في الكوكيز أو المحفوظات حسب الحاجة
      return { success: true, message: "Login successful", jwt: data.jwt };
    } else {
      return { success: false, message: data.message || "An error occurred during login" };
    }
  } catch (error: unknown) {
    // التحقق من أن الخطأ هو من النوع Error
    if (error instanceof Error) {
      return { success: false, message: error.message || "An unexpected error occurred" };
    } else {
      return { success: false, message: "An unknown error occurred" };
    }
  }
};

export default client_login;
