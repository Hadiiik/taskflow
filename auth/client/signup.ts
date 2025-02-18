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
    console.log("1");
    const data = await response.json();
    console.log("data: ")
    console.log(data)
    if (data.status == 200) {
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
