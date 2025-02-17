import React from 'react';
import Image from 'next/image';

const ProblemsSection = () => {
  // مصفوفة المشاكل مع مسارات الأيقونات
  const problems = [
    {
      text: "صعوبة تنظيم المهام",
      iconPath: "/tasks.svg", // المسار الخاص بالأيقونة
    },
    {
      text: "تحديد الأولويات",
      iconPath: "/arrow.svg",
    },
    {
      text: "نقص المتابعة الفعالة وتأخر العمل",
      iconPath: "/work.svg",
    },
    {
        text: "ضياع الوقت في التواصل غير المنظم",
        iconPath:"/contact.svg"
    }
  ];

  return (
    <section className="py-20 px-6 bg-white text-right" dir="rtl">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-violet-950">
        المشاكل التي نعالجها
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* المشاكل */}
        {problems.map((problem, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="bg-violet-500 p-2 rounded-md shadow-md hover:shadow-xl hover:scale-105 duration-300 hover:cursor-pointer">
              <Image
                src={problem.iconPath}
                alt={problem.text}
                width={60} // العرض المناسب
                height={60} // الارتفاع المناسب
                className="text-violet-600"
              />
            </div>
            <p className="text-lg text-violet-950">{problem.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProblemsSection;
