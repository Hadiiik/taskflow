import editAccountData from "@/client_helpers/edit_account_data";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaLinkedin, FaSave, FaTimes, FaEdit, FaShare, FaSignOutAlt } from "react-icons/fa";


// أنواع البيانات
interface Team {
  name: string;
  id: string;
}

interface UserData {
  name: string;
  completedTasks: number;
  teams: Team[];
  phoneNumber?: string;
  linkedinUrl?: string;
  email?: string;
  bio?: string;
}

interface AccountCardProps {
  id: string;
  onLogout?: () => void;
}

// دالة وهمية لجلب البيانات (استبدلها بـ API حقيقي)
const fetchUserData = async (id: string): Promise<UserData> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        name: "محمد الأحمد",
        completedTasks: 12,
        teams: [
          { name: "فريق البرمجة", id: "team1" },
          { name: "فريق التصميم", id: "team2" },
        ],
        phoneNumber: "0912345678",
        linkedinUrl: "https://linkedin.com/in/example",
        email: "mohammed@example.com",
        bio: "مطور ويب بخبرة 5 سنوات",
      });
    }, 1500)
  );
};

const AccountCard: React.FC<AccountCardProps> = ({ id, onLogout }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [editedLinkedinUrl, setEditedLinkedinUrl] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedBio, setEditedBio] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchUserData(id);
        setUserData(data);
        setEditedPhoneNumber(data.phoneNumber || "");
        setEditedLinkedinUrl(data.linkedinUrl || "");
        setEditedEmail(data.email || "");
        setEditedBio(data.bio || "");
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
      }
      setLoading(false);
    };

    getData();
  }, [id]);

  const handleSave = async () => {
    // edit data
    const result = await editAccountData(id,{
      "Bio":editedBio,
      "PhoneNumber":editedPhoneNumber,
      "LinkedinUrl":editedLinkedinUrl,
      "Email":editedEmail
    });
    console.log(result);
    if (editedBio.length > 50) {
      alert("النص التعريفي يجب ألا يتجاوز 50 محرفًا.");
      return;
    }

    if (!userData) return;

    // تحديث البيانات محليًا (يمكنك ربطها بـ API لاحقًا)
    setUserData({
      ...userData,
      phoneNumber: editedPhoneNumber,
      linkedinUrl: editedLinkedinUrl,
      email: editedEmail,
      bio: editedBio,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    if (!userData) return;
    setIsEditing(false);
    setEditedPhoneNumber(userData.phoneNumber || "");
    setEditedLinkedinUrl(userData.linkedinUrl || "");
    setEditedEmail(userData.email || "");
    setEditedBio(userData.bio || "");
  };

  const handleShare = async () => {
    const dynamicUrl = `user/sharing/${id}`;
    const shareData = {
      title: `معلومات ${userData?.name}`,
      text: `تعرف على ${userData?.name}!`,
      url: dynamicUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("حدث خطأ أثناء المشاركة:", error);
      }
    } else {
      alert("عذرًا، المشاركة غير مدعومة في هذا المتصفح.");
    }
  };

  const shouldShowField = (value?: string) => {
    return value && value.trim() !== "";
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600 p-6">
        <p>جاري تحميل البيانات...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center text-red-600 p-6">
        <p>تعذر تحميل بيانات المستخدم.</p>
      </div>
    );
  }

  const { name, completedTasks, teams, phoneNumber, linkedinUrl, email, bio } = userData;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-violet-100 max-w-xs sm:max-w-md mx-auto text-right">
      <div className="flex justify-center mb-3 sm:mb-4">
        <FaUserCircle className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600" />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">{name}</h2>

      {/* النص التعريفي */}
      <div className="mb-3 sm:mb-4 text-center">
        {isEditing ? (
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">النص التعريفي</label>
            <textarea
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
              className="w-full text-xs sm:text-sm text-gray-700 p-1 border border-gray-300 rounded"
              rows={3}
              placeholder="أضف نصًا تعريفيًا..."
              maxLength={50}
            />
          </div>
        ) : shouldShowField(bio) ? (
          <p className="text-xs sm:text-sm text-gray-700">{bio}</p>
        ) : null}
      </div>

      {/* البريد الإلكتروني */}
      {(isEditing || shouldShowField(email)) && (
        <div className="mb-3 sm:mb-4">
          {isEditing ? (
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="text-xs sm:text-sm text-gray-700 p-1 border border-gray-300 rounded"
                placeholder="أدخل البريد الإلكتروني"
              />
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-gray-700 flex items-center justify-end space-x-2">
              <span>{email}</span>
              <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </p>
          )}
        </div>
      )}

      {/* رقم الهاتف */}
      {(isEditing || shouldShowField(phoneNumber)) && (
        <div className="mb-3 sm:mb-4">
          {isEditing ? (
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">رقم الهاتف</label>
              <input
                type="tel"
                value={editedPhoneNumber}
                onChange={(e) => setEditedPhoneNumber(e.target.value)}
                className="text-xs sm:text-sm text-gray-700 p-1 border border-gray-300 rounded"
                placeholder="أدخل رقم الهاتف"
              />
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-gray-700 flex items-center justify-end space-x-2">
              <span>{phoneNumber}</span>
              <FaPhone className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
            </p>
          )}
        </div>
      )}

      {/* رابط LinkedIn */}
      {(isEditing || shouldShowField(linkedinUrl)) && (
        <div className="mb-4 sm:mb-6">
          {isEditing ? (
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">رابط LinkedIn</label>
              <input
                type="url"
                value={editedLinkedinUrl}
                onChange={(e) => setEditedLinkedinUrl(e.target.value)}
                className="text-xs sm:text-sm text-gray-700 p-1 border border-gray-300 rounded"
                placeholder="أدخل رابط LinkedIn"
              />
            </div>
          ) : (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-blue-600 underline flex items-center justify-end space-x-2"
            >
              <span>صفحة LinkedIn</span>
              <FaLinkedin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </a>
          )}
        </div>
      )}

      {/* عدد المهام المنجزة */}
      <p className="text-xs sm:text-sm text-red-500 mb-3 sm:mb-4">
        المهام المنجزة: <span className="font-bold">{completedTasks}</span>
      </p>

      {/* الفرق */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">الفرق المشترك فيها:</h3>
        <ul className="space-y-1">
          {teams.map((team, index) => (
            <li key={index} className="text-xs sm:text-sm text-gray-700 border-b border-gray-200 pb-1">
              <Link href={`/teams/${team.id}`} className="text-blue-600 underline">
                {team.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* أزرار */}
      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <button
              className="w-full flex items-center justify-center space-x-2 p-1 sm:p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
              onClick={handleSave}
            >
              <FaSave className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">حفظ</span>
            </button>
            <button
              className="w-full flex items-center justify-center space-x-2 p-1 sm:p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
              onClick={handleCancel}
            >
              <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">إلغاء</span>
            </button>
          </>
        ) : (
          <>
            <button
              className="w-full flex items-center justify-center space-x-2 p-1 sm:p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">تعديل</span>
            </button>
            <button
              className="w-full flex items-center justify-center space-x-2 p-1 sm:p-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition duration-300"
              onClick={handleShare}
            >
              <FaShare className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">مشاركة</span>
            </button>
          </>
        )}
      </div>

      {/* زر تسجيل الخروج */}
      <div className="mt-4">
        <button
          className="w-full flex items-center justify-center space-x-2 p-1 sm:p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
          onClick={onLogout}
        >
          <FaSignOutAlt className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm">تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};

export default AccountCard;
