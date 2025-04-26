import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaUserPlus, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';

interface Team {
  id: string;
  name: string;
  description: string;
  completedTasks: number;
  members: number;
}

const JoinTeamForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Team[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setSearchResults([]);
    setHasSearched(false);

    if (!searchQuery.trim()) {
      setError('يرجى إدخال اسم الفريق أو المعرف');
      setIsLoading(false);
      return;
    }

    try {
      const mockResults = await mockSearchTeams(searchQuery);
      setSearchResults(mockResults);
      setHasSearched(true);
    } catch  {
      setError('حدث خطأ أثناء البحث، يرجى المحاولة لاحقاً');
    } finally {
      setIsLoading(false);
    }
  };

  const mockSearchTeams = async (query: string): Promise<Team[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockTeams: Team[] = [
          { 
            id: '1', 
            name: 'فريق التطوير', 
            description: 'فريق مخصص لتطوير المشاريع البرمجية',
            completedTasks: 42,
            members: 5
          },
          { 
            id: '2', 
            name: 'فريق التصميم', 
            description: 'فريق متخصص في التصميم الجرافيكي',
            completedTasks: 28,
            members: 3
          },
          { 
            id: '3', 
            name: 'فريق التصميم', 
            description: 'فريق متخصص في التصميم الجرافيكي',
            completedTasks: 28,
            members: 3
          },
        ];
        resolve(mockTeams.filter(team => 
          team.name.includes(query) || team.id.includes(query))
        );
      }, 1000);
    });
  };

  const handleJoinRequest = (teamId: string) => {
    alert(`تم طلب الانضمام إلى الفريق ذو المعرف: ${teamId}`);
    // هنا يمكنك إضافة طلب API لإرسال طلب الانضمام
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg border border-violet-200 shadow-sm">
      <h2 className="text-xl font-bold text-violet-800 mb-4 text-right">الانضمام إلى فريق</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="searchQuery" className="block text-sm font-medium text-violet-700 mb-1 text-right">
            اسم الفريق أو المعرف
          </label>
          <input
            id="searchQuery"
            name="searchQuery"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition"
            placeholder="ابحث عن فريق بالاسم أو المعرف"
          />
          {error && (
            <div className="mt-1 text-sm text-red-600 text-right">{error}</div>
          )}
        </div>

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
                جاري البحث...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <FiSearch className="ml-2" />
                البحث عن فريق
              </span>
            )}
          </button>
        </div>
      </form>

      {hasSearched && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-violet-700 mb-3 text-right">نتائج البحث</h3>
          
          {searchResults.length > 0 ? (
            <div className="flex flex-col gap-3 w-full">
              {searchResults.map((team, index) => (
                <div
                  key={team.id}
                  className="flex flex-col md:flex-row md:items-center justify-start w-full h-auto bg-white border-2 border-violet-500 rounded-s-full rounded-e-full shadow-sm hover:shadow-md transition-all p-3"
                >
                  {/* الترتيب */}
                  <div className="flex items-center justify-center w-10 h-10 bg-violet-100 rounded-full mr-2">
                    <span className="text-violet-700 font-bold">{index + 1}</span>
                  </div>

                  {/* معلومات الفريق */}
                  <div className="flex flex-col justify-center mr-4 text-right flex-1">
                    <span className="text-violet-700 font-medium text-sm md:text-base">
                      {team.name}
                    </span>
                    <span className="text-gray-500 text-xs">{team.description}</span>
                    <div className="flex gap-2 mt-1">
                      <span className="text-red-500 text-xs">
                        المهام المنجزة: {team.completedTasks}
                      </span>
                      <span className="text-violet-500 text-xs">
                        الأعضاء: {team.members}
                      </span>
                    </div>
                  </div>

                  {/* الأزرار */}
                  <div className="flex flex-row gap-2 mt-2 md:mt-0">
                    <button
                      className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
                      onClick={() => handleJoinRequest(team.id)}
                      title="طلب انضمام"
                    >
                      <FaUserPlus className="text-green-500 w-4 h-4" />
                    </button>

                    <Link
                      href={`/team/sharing/${team.id}`}
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                      title="زيارة الصفحة"
                    >
                      <FaExternalLinkAlt className="text-blue-500 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-right">لا توجد نتائج مطابقة للبحث</p>
          )}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600 text-right">
        <p>كيفية البحث عن فريق: </p>
          <span>يمكنك البحث باستخدام اسم الفريق أو المعرف الخاص به</span>
          <br />
          <span>تأكد من كتابة اسم الفريق بشكل صحيح</span>
      </div>
    </div>
  );
};

export default JoinTeamForm;