import React from 'react';
import Image from 'next/image';

const FeaturesSection = () => {
  // مصفوفة الميزات مع مسارات الأيقونات
  const features = [
    {
      text: "سهولة الاستخدام",
      iconPath: "/easy.svg", // المسار الخاص بالأيقونة
    },
    {
      text: "تنظيم مرن",
      iconPath: "/orgnaize.svg",
    },
    {
      text: "متابعة مستمرة",
      iconPath: "/arrow.svg",
    },
    {
        text: "أداء عالي",
        iconPath:"high.svg"
    }
  ];

  return (
    <section className="py-20 px-6 bg-violet-900 text-right rounded-3xl mx-4 shadow-3xl" dir="rtl">
      
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-violet-50">
        الميزات التي نقدمها
      </h2>

      {/* عرض الميزات في شبكة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="flex flex-col items-center gap-4">
            <div className='bg-violet-500 p-6 rounded-full shadow-lg hover:scale-105 transition-all duration-300 ease-in-out transform hover:cursor-pointer'>
              <Image
                src={feature.iconPath}
                alt={feature.text}
                width={60} // العرض المناسب
                height={60} // الارتفاع المناسب
                className="text-violet-600"
              />
            </div>
            <p className="text-lg text-violet-200">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
