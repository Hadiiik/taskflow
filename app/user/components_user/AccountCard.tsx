import React, { useState } from 'react';
import { FaShare, FaUserCircle, FaPhone, FaLinkedin, FaEnvelope, FaSave, FaTimes, FaEdit } from 'react-icons/fa';
import Link from 'next/link';

interface Team {
    name: string;
    id: string;
}

interface AccountCardProps {
    id: string; // إضافة id كـ prop
    name: string;
    completedTasks: number;
    teams: Team[];
    phoneNumber?: string;
    linkedinUrl?: string;
    email?: string;
    bio?: string;
}

const AccountCard: React.FC<AccountCardProps> = ({ id, name, completedTasks, teams, phoneNumber, linkedinUrl, email, bio }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(phoneNumber || '');
    const [editedLinkedinUrl, setEditedLinkedinUrl] = useState(linkedinUrl || '');
    const [editedEmail, setEditedEmail] = useState(email || '');
    const [editedBio, setEditedBio] = useState(bio || '');

    const handleSave = () => {
        console.log('تم حفظ التغييرات:', { editedPhoneNumber, editedLinkedinUrl, editedEmail, editedBio });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedPhoneNumber(phoneNumber || '');
        setEditedLinkedinUrl(linkedinUrl || '');
        setEditedEmail(email || '');
        setEditedBio(bio || '');
    };

    const handleShare = async () => {
        const dynamicUrl = `taskflow-onrequest.vercel.app/sharing/${id}`; // إنشاء الرابط الديناميكي
        const shareData = {
            title: `معلومات ${name}`, // عنوان المشاركة
            text: `تعرف على ${name}!`, // نص المشاركة (اختياري)
            url: dynamicUrl, // الرابط الديناميكي
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData); // فتح قائمة المشاركة
            } catch (error) {
                console.error('حدث خطأ أثناء المشاركة:', error);
            }
        } else {
            alert('عذرًا، المشاركة غير مدعومة في هذا المتصفح.'); // رسالة بديلة
        }
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-violet-100 max-w-xs sm:max-w-md mx-auto text-right">
            <div className="flex justify-center mb-3 sm:mb-4">
                <FaUserCircle className="w-16 h-16 sm:w-20 sm:h-20 text-violet-700" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-violet-900 mb-2 text-center">{name}</h2>

            {/* النص التعريفي */}
            <div className="mb-3 sm:mb-4 text-center">
                {isEditing ? (
                    <textarea
                        value={editedBio}
                        onChange={(e) => setEditedBio(e.target.value)}
                        className="w-full text-xs sm:text-sm text-violet-700 p-1 border border-violet-300 rounded"
                        rows={3}
                        placeholder="أضف نصًا تعريفيًا..."
                    />
                ) : (
                    <p className="text-xs sm:text-sm text-violet-700">{editedBio || bio || "لا يوجد نص تعريفي"}</p>
                )}
            </div>

            {/* البريد الإلكتروني */}
            {email && (
                <div className="mb-3 sm:mb-4 text-center">
                    {isEditing ? (
                        <input
                            type="email"
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                            className="text-xs sm:text-sm text-violet-700 p-1 border border-violet-300 rounded"
                        />
                    ) : (
                        <p className="text-xs sm:text-sm text-violet-700 flex items-center justify-end space-x-2">
                            <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{email}</span>
                        </p>
                    )}
                </div>
            )}

            {/* رقم الهاتف */}
            {phoneNumber && (
                <div className="mb-3 sm:mb-4">
                    {isEditing ? (
                        <input
                            type="tel"
                            value={editedPhoneNumber}
                            onChange={(e) => setEditedPhoneNumber(e.target.value)}
                            className="text-xs sm:text-sm text-violet-700 p-1 border border-violet-300 rounded"
                        />
                    ) : (
                        <p className="text-xs sm:text-sm text-violet-700 flex items-center justify-end space-x-2">
                            <FaPhone className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{phoneNumber}</span>
                        </p>
                    )}
                </div>
            )}

            {/* رابط LinkedIn */}
            {linkedinUrl && (
                <div className="mb-4 sm:mb-6">
                    {isEditing ? (
                        <input
                            type="url"
                            value={editedLinkedinUrl}
                            onChange={(e) => setEditedLinkedinUrl(e.target.value)}
                            className="text-xs sm:text-sm text-violet-700 p-1 border border-violet-300 rounded"
                        />
                    ) : (
                        <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs sm:text-sm text-violet-700 hover:text-violet-900 transition duration-300 flex items-center justify-end space-x-2"
                        >
                            <FaLinkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>صفحة LinkedIn</span>
                        </a>
                    )}
                </div>
            )}

            {/* عدد المهام المنجزة */}
            <p className="text-xs sm:text-sm text-violet-700 mb-3 sm:mb-4">
                المهام المنجزة: <span className="font-bold">{completedTasks}</span>
            </p>

            {/* الفرق المشترك فيها */}
            <div className="mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-lg font-semibold text-violet-900 mb-1 sm:mb-2">الفرق المشترك فيها:</h3>
                <ul className="space-y-1">
                    {teams.map((team, index) => (
                        <li key={index} className="text-xs sm:text-sm text-violet-700">
                            <Link href={`/teams/${team.id}`} className="hover:text-violet-900 transition duration-300">
                                {team.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* أزرار التعديل والحفظ والإلغاء والمشاركة */}
            <div className="flex space-x-2">
                {isEditing ? (
                    <>
                        <button
                            className="w-full flex items-center justify-center space-x-2 p-1 sm:p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none"
                            onClick={handleSave}
                        >
                            <FaSave className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">حفظ</span>
                        </button>
                        <button
                            className="w-full flex items-center justify-center space-x-2 p-1 sm:p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 focus:outline-none"
                            onClick={handleCancel}
                        >
                            <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">إلغاء</span>
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="w-full flex items-center justify-center space-x-2 p-1 sm:p-2 bg-violet-700 text-white rounded-lg hover:bg-violet-900 transition duration-300 focus:outline-none"
                            onClick={() => setIsEditing(true)}
                        >
                            <FaEdit className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">تعديل</span>
                        </button>
                        <button
                            className="w-full flex items-center justify-center space-x-2 p-1 sm:p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none"
                            onClick={handleShare}
                        >
                            <FaShare className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">مشاركة</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AccountCard;