import { FaPhone, FaUsers, FaEnvelope, FaUser } from "react-icons/fa";
import Link from "next/link";

interface Member {
  id: string;
  name: string;
}

interface Props {
  id: string;
}

// بيانات افتراضية للفريق
const defaultTeamData = {
  name: "فريق التطوير",
  description: "فريق متخصص في تطوير تطبيقات الويب والجوال باستخدام أحدث التقنيات",
  manager_email: "team.manager@example.com",
  phone_number: "+966501234567",
  members: [
    { id: "24", name: "أحمد محمد" },
    { id: "21", name: "سارة عبدالله" },
    { id: "2", name: "خالد سعيد" }
  ] as Member[]
};

export default async function SheerTeam({ id }: Props) {
  console.log(id)
  // استخدام البيانات الافتراضية مباشرة
  const data = defaultTeamData;
  const error = null;

  console.log("Team data: ", data);

  if (error) {
    return (
      <div className="text-center py-6 text-red-600">
        حدث خطأ أثناء تحميل بيانات الفريق.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-6 text-gray-600">
        لا توجد بيانات متاحة لهذا الفريق.
      </div>
    );
  }

  const { name, description, manager_email, phone_number, members } = data;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 max-w-md mx-auto text-right transform transition-all duration-300 hover:shadow-3xl">
      {/* اسم الفريق */}
      <div className="flex items-center justify-end space-x-3 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <FaUsers className="w-12 h-12 text-blue-600" />
      </div>

      {/* وصف الفريق */}
      {description && (
        <p className="text-sm text-gray-700 mb-6">{description}</p>
      )}

      {/* معلومات التواصل */}
      <div className="space-y-3 mb-6 text-right">
        {manager_email && (
          <div className="flex items-center justify-end space-x-2">
            <span className="text-sm text-gray-700">{manager_email}</span>
            <FaEnvelope className="w-5 h-5 text-blue-600" />
          </div>
        )}

        {phone_number && (
          <div className="flex items-center justify-end space-x-2">
            <span className="text-sm text-gray-700">{phone_number}</span>
            <FaPhone className="w-5 h-5 text-green-600" />
          </div>
        )}
      </div>

      {/* قائمة الأعضاء */}
      {members && members.length > 0 && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">أعضاء الفريق:</h3>
          <ul className="space-y-3">
            {members.map((member: Member) => (
              <li key={member.id} className="flex items-center justify-end space-x-3">
                <Link
                  href={`/user/sharing/${member.id}`}
                  className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium text-gray-800">{member.name}</span>
                  <FaUser className="w-4 h-4 text-blue-600" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}