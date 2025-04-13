// app/components/SheerUser.tsx
import { supabase } from "@/lib/supabase";
import { FaUserCircle, FaPhone, FaLinkedin, FaEnvelope, FaTasks } from "react-icons/fa";
import Link from "next/link";

interface Props {
  id: string;
}

export default async function SheerUser({ id }: Props) {
  // جلب بيانات المستخدم من Supabase
  const { data, error } = await supabase
    .from("users")
    .select("name, bio")
    .eq("id", id)
    .single();

  if (error) {
    return (
      <div className="text-center py-6 text-red-600">
        حدث خطأ أثناء تحميل البيانات.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-6 text-gray-600">
        لا توجد بيانات متاحة لهذا المستخدم.
      </div>
    );
  }

  const { name, bio } = data;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 max-w-md mx-auto text-right transform transition-all duration-300 hover:shadow-3xl">
      {/* الاسم */} 
      <div className="flex items-center justify-end space-x-3 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <FaUserCircle className="w-12 h-12 text-blue-600" />
      </div>

      {/* النص التعريفي */} 
      {bio?.Bio && (
        <p className="text-sm text-gray-700 mb-6">{bio.Bio}</p>
      )}

      {/* معلومات التواصل */}
      <div className="space-y-3 mb-6 text-right">
        {bio?.Email && (
          <div className="flex items-center justify-end space-x-2">
            <span className="text-sm text-gray-700">{bio.Email}</span>
            <FaEnvelope className="w-5 h-5 text-blue-600" />
          </div>
        )}
        {bio?.PhoneNumber && (
          <div className="flex items-center justify-end space-x-2">
            <span className="text-sm text-gray-700">{bio.PhoneNumber}</span>
            <FaPhone className="w-5 h-5 text-green-600" />
          </div>
        )}
        {bio?.LinkedinUrl && (
          <div className="flex items-center justify-end space-x-2">
            <a
              href={bio.LinkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 underline"
            >
              صفحة LinkedIn
            </a>
            <FaLinkedin className="w-5 h-5 text-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
}
