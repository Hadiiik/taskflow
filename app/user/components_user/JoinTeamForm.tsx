import React, { useState } from 'react';

const JoinTeamForm = () => {
  const [inviteLink, setInviteLink] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: { preventDefault: () => void }) => {
    setIsLoading(isLoading);
    e.preventDefault();
    setError('');
    setSuccessMessage('');
  
    // التحقق من صحة الرابط
    if (!inviteLink.trim()) {
      setError('يرجى إدخال رابط الدعوة');
      return;
    }
  
    if (!isValidInviteLink(inviteLink)) {
      setError('رابط الدعوة غير صالح');
      return;
    }
  
    // تحويل المستخدم إلى الرابط
    window.location.href = inviteLink;
  };

  // دالة التحقق من صحة الرابط (يمكن تعديلها حسب متطلباتك)
  const isValidInviteLink = (link: string ) => link.length > 10 

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg border border-violet-200 shadow-sm">
      <h2 className="text-xl font-bold text-violet-800 mb-4 text-right">الانضمام إلى فريق</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* حقل رابط الدعوة */}
        <div>
          <label htmlFor="inviteLink" className="block text-sm font-medium text-violet-700 mb-1 text-right">
            رابط الدعوة
          </label>
          <input
            id="inviteLink"
            name="inviteLink"
            type="text"
            value={inviteLink}
            onChange={(e) => setInviteLink(e.target.value)}
            className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition"
            placeholder="ادرج رابط الدعوة"
          />
          {error && (
            <div className="mt-1 text-sm text-red-600 text-right">{error}</div>
          )}
          {successMessage && (
            <div className="mt-1 text-sm text-green-600 text-right">{successMessage}</div>
          )}
        </div>

        {/* زر الانضمام */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري المعالجة...
              </span>
            ) : (
              'الانضمام إلى الفريق'
            )}
          </button>
        </div>
      </form>

      <div className="mt-4 text-sm text-gray-600 text-right">
        <p>كيفية الحصول على رابط الدعوة : </p>
        <ul className="list-disc pr-4 mt-2 space-y-1 text-right">
          <p>اطلب من قائد الفريق مشاركة رابط الدعوة معك</p>
          <p>تأكد من صحة الرابط قبل إدخاله</p>
        </ul>
      </div>
    </div>
  );
};

export default JoinTeamForm;