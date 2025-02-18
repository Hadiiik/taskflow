import jwt_user from '@/types/jwt_user'
import jwt from 'jsonwebtoken'

const createJwt = (user:jwt_user)=>{
    const token = process.env.ACSSES_TOKEN_SCRET;
    if(!token) return;
    const access_token = jwt.sign(user,token);
    return access_token;
}
export default createJwt;



// الـ secret key الذي تم استخدامه لإنشاء التوكن
// دالة لفك تشفير الـ JWT
export const decodeJWT = (token: string) => {
  try {
    // فك تشفير التوكن باستخدام secret key
    const SECRET_KEY = process.env.ACSSES_TOKEN_SCRET;
    if(!SECRET_KEY) return;
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;  // هنا ستحصل على الكائن الأصلي
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;  // في حالة حدوث خطأ (مثل التوكن غير صالح أو منتهي الصلاحية)
  }
};
