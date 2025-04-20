import createTeam from '@/client_helpers/create_team';
import React, { useState } from 'react';

const CreateTeamForm = () => {
  const [formData, setFormData] = useState({
    teamName: '',
    teamDescription: ''
  });

  const [errors, setErrors] = useState({
    teamName: '',
    teamDescription: ''
  });

  const handleChange = (e: { target: { name: string; value:string }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // التحقق من الصحة أثناء الكتابة
    if (name === 'teamName' && value.length > 30) {
      setErrors(prev => ({...prev, teamName: 'يجب ألا يتجاوز اسم الفريق 30 محرفًا'}));
    } else if (name === 'teamDescription' && value.length > 50) {
      setErrors(prev => ({...prev, teamDescription: 'يجب ألا يتجاوز الوصف 50 محرفًا'}));
    } else {
      setErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {...errors};

    if (!formData.teamName.trim()) {
      newErrors.teamName = 'اسم الفريق مطلوب';
      valid = false;
    } else if (formData.teamName.length > 30) {
      newErrors.teamName = 'يجب ألا يتجاوز اسم الفريق 30 محرفًا';
      valid = false;
    }

    if (!formData.teamDescription.trim()) {
      newErrors.teamDescription = 'وصف الفريق مطلوب';
      valid = false;
    } else if (formData.teamDescription.length > 50) {
      newErrors.teamDescription = 'يجب ألا يتجاوز الوصف 50 محرفًا';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit =async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await createTeam({
        team_name: formData.teamName,
        creator_id: '0', // Replace '0' with the appropriate creator ID
        team_info_object: {
          team_description: formData.teamDescription
        }
      });
      if (!result.success) return; // Show error message
      const existingTeams = Array.isArray(JSON.parse(localStorage.getItem('teams') || '[]')) 
        ? JSON.parse(sessionStorage.getItem('teams') || '[]') 
        : [];
      const updatedTeams = [
        ...existingTeams,
        {
          team_name: formData.teamName,
          team_id: result.team_id,
          team_info_object: { team_description: formData.teamDescription }
        }
      ];
      sessionStorage.setItem('teams', JSON.stringify(updatedTeams));
      localStorage.setItem('current_team_id', result.team_id);
      alert(`تم إنشاء الفريق: ${formData.teamName}`);
      window.location.reload(); // Refresh the page
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg border border-violet-200 shadow-sm">
      <h2 className="text-xl font-bold text-violet-800 mb-4 text-right">إنشاء فريق جديد</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* حقل اسم الفريق */}
        <div>
          <label htmlFor="teamName" className="block text-sm font-medium text-violet-700 mb-1 text-right">
            اسم الفريق
          </label>
          <input
            id="teamName"
            name="teamName"
            type="text"
            onChange={handleChange}
            value={formData.teamName}
            className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition"
            placeholder="أدخل اسم الفريق"
          />
          {errors.teamName && (
            <div className="mt-1 text-sm text-red-600 text-right">{errors.teamName}</div>
          )}
        </div>

        {/* حقل وصف الفريق */}
        <div>
          <label htmlFor="teamDescription" className="block text-sm font-medium text-violet-700 mb-1 text-right">
            وصف الفريق (حد أقصى 50 محرفًا)
          </label>
          <textarea
            id="teamDescription"
            name="teamDescription"
            rows={3}
            onChange={handleChange}
            value={formData.teamDescription}
            className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition"
            placeholder="أدخل وصفًا مختصرًا للفريق"
            maxLength={50}
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {formData.teamDescription.length}/50
            </span>
            {errors.teamDescription && (
              <span className="text-xs text-red-600 text-right">{errors.teamDescription}</span>
            )}
          </div>
        </div>

        {/* زر الحفظ */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            انشاء الفريق
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeamForm;