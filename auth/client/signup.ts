import { hashPassword } from "@/lib/hash_password";
import userInfo from "@/types/userInfo";

const client_signup = async (userInfo: userInfo) => {
  try {
    // تجزئة كلمة المرور
    const hashedPassword = hashPassword(userInfo.password);

    // تحديث كلمة المرور المشفرة في الكائن
    userInfo.password = hashedPassword;
    // هنا يمكنك إضافة الكود الخاص بإرسال البيانات إلى الخادم (API) أو حفظها في قاعدة البيانات
    const response = await fetch('/api/auth/signup', {
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
      return { success: true, message: "User registered successfully" };
    } else {
      return { success: false, message: data.message || "An error occurred during registration" };
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

export default client_signup;
