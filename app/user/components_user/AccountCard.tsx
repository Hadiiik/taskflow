import editAccountData from "@/client_helpers/edit_account_data";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaLinkedin, FaSave, FaTimes, FaEdit, FaShare, FaSignOutAlt } from "react-icons/fa";

interface Team {
  name: string;
  id: string;
}

interface BioData {
  Email?: string;
  PhoneNumber?: string;
  LinkedinUrl?: string;
  Bio?: string;
}

interface UserData {
  name: string;
  completedTasks: number;
  teams: Team[];
  bioData: BioData;
}

interface AccountCardProps {
  id: string;
  onLogout?: () => void;
}

const fetchUserData = async (id: string): Promise<UserData> => {
  try {
    const response = await fetch(`/api/account/getData?user_id=${id}`);
    
    if (!response.ok) {
      console.error('فشل في جلب بيانات المستخدم - حالة الاستجابة:', response.status);
      // إرجاع بيانات افتراضية بدلاً من إطلاق خطأ
      return {
        name: "مستخدم",
        bioData: {
          Email: "",
          PhoneNumber: "",
          LinkedinUrl: "",
          Bio: ""
        },
        completedTasks: 0,
        teams: []
      };
    }

    const { name, bio } = await response.json();
    
    // معالجة بيانات bio سواء كانت سلسلة JSON أو كائن
    const bioData = typeof bio === 'string' ? JSON.parse(bio) : bio || {};

    return {
      name: name || "مستخدم",
      bioData: {
        Email: bioData.Email || "",
        PhoneNumber: bioData.PhoneNumber || "",
        LinkedinUrl: bioData.LinkedinUrl || "",
        Bio: bioData.Bio || ""
      },
      completedTasks: 0,
      teams: []
    };
  } catch (error) {
    console.error('خطأ في جلب البيانات:', error);
    // إرجاع بيانات افتراضية في حالة الخطأ
    return {
      name: "مستخدم",
      bioData: {
        Email: "",
        PhoneNumber: "",
        LinkedinUrl: "",
        Bio: ""
      },
      completedTasks: 0,
      teams: []
    };
  }
};

const AccountCard: React.FC<AccountCardProps> = ({ id, onLogout }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<BioData>({
    Email: "",
    PhoneNumber: "",
    LinkedinUrl: "",
    Bio: ""
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchUserData(id);
        setUserData(data);
        setEditedData(data.bioData);
      } catch (error) {
        console.error("خطأ في تحميل البيانات:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleSave = async () => {
    if (!userData) return;

    try {
      const result = await editAccountData(id, {
        Bio: editedData.Bio,
        PhoneNumber: editedData.PhoneNumber,
        LinkedinUrl: editedData.LinkedinUrl,
        Email: editedData.Email
      });

      console.log("نتيجة التعديل:", result);

      setUserData({
        ...userData,
        bioData: editedData
      });

      setIsEditing(false);
    } catch (error) {
      console.error("خطأ في حفظ التعديلات:", error);
      alert("حدث خطأ أثناء حفظ التعديلات");
    }
  };

  const handleCancel = () => {
    if (!userData) return;
    setIsEditing(false);
    setEditedData(userData.bioData);
  };

  const handleShare = async () => {
    if (!userData) return;

    const dynamicUrl = `user/sharing/${id}`;
    const shareData = {
      title: `معلومات ${userData.name}`,
      text: `تعرف على ${userData.name}!`,
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

  const shouldShowField = (value: string | undefined | null): boolean => {
    return value != null && typeof value === 'string' && value.trim() !== '';
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

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-violet-100 max-w-xs sm:max-w-md mx-auto text-right">
      <div className="flex justify-center mb-3 sm:mb-4">
        <FaUserCircle className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600" />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">{userData.name}</h2>

      {/* السيرة الذاتية */}
      <div className="mb-3 sm:mb-4 text-center">
        {isEditing ? (
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">السيرة الذاتية</label>
            <textarea
              value={editedData.Bio || ""}
              onChange={(e) => setEditedData({...editedData, Bio: e.target.value})}
              className="w-full text-xs sm:text-sm text-gray-700 p-1 border border-gray-300 rounded"
              rows={3}
              placeholder="أضف سيرة ذاتية..."
              maxLength={50}
            />
          </div>
        ) : shouldShowField(userData.bioData.Bio) ? (
          <p className="text-xs sm:text-sm text-gray-700">{userData.bioData.Bio}</p>
        ) : null}
      </div>

      {/* البريد الإلكتروني */}
      {(isEditing || shouldShowField(userData.bioData.Email)) && (
        <div className="mb-3 sm:mb-4">
          {isEditing ? (
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={editedData.Email || ""}
                onChange={(e) => setEditedData({...editedData, Email: e.target.value})}
                className="text-xs sm:text-sm text-gray-700 p-1 border border-gray-300 rounded"
                placeholder="أدخل البريد الإلكتروني"
              />
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-gray-700 flex items-center justify-end space-x-2">
              <span>{userData.bioData.Email}</span>
              <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </p>
          )}
        </div>
      )}

      {/* رقم الهاتف */}
      {(isEditing || shouldShowField(userData.bioData.PhoneNumber)) && (
        <div className="mb-3 sm:mb-4">
          {isEditing ? (
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">رقم الهاتف</label>
              <input
                type="tel"
                value={editedData.PhoneNumber || ""}
                onChange={(e) => setEditedData({...editedData, PhoneNumber: e.target.value})}
                className="text-xs sm:text-sm text-gray-700 p-1 border border-gray-300 rounded"
                placeholder="أدخل رقم الهاتف"
              />
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-gray-700 flex items-center justify-end space-x-2">
              <span>{userData.bioData.PhoneNumber}</span>
              <FaPhone className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
            </p>
          )}
        </div>
      )}

      {/* رابط LinkedIn */}
      {(isEditing || shouldShowField(userData.bioData.LinkedinUrl)) && (
        <div className="mb-4 sm:mb-6">
          {isEditing ? (
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">رابط LinkedIn</label>
              <input
                type="url"
                value={editedData.LinkedinUrl || ""}
                onChange={(e) => setEditedData({...editedData, LinkedinUrl: e.target.value})}
                className="text-xs sm:text-sm text-gray-700 p-1 border border-gray-300 rounded"
                placeholder="أدخل رابط LinkedIn"
              />
            </div>
          ) : (
            <a
              href={userData.bioData.LinkedinUrl}
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

      {/* المهام المنجزة */}
      <p className="text-xs sm:text-sm text-red-500 mb-3 sm:mb-4">
        المهام المنجزة: <span className="font-bold">{userData.completedTasks}</span>
      </p>

      {/* الفرق */}
      {userData.teams.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">الفرق المشترك فيها:</h3>
          <ul className="space-y-1">
            {userData.teams.map((team, index) => (
              <li key={index} className="text-xs sm:text-sm text-gray-700 border-b border-gray-200 pb-1">
                <Link href={`/teams/${team.id}`} className="text-blue-600 underline">
                  {team.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* أزرار التحكم */}
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
