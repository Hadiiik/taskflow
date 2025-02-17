import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-8 mt-16">
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-base">
          جميع الحقوق محفوظة &copy; <span className="font-bold">OnRequest</span> 2025
        </p>
        <div className="mt-4">
          {/* يمكنك إضافة روابط أخرى هنا إذا لزم الأمر */}
          <a href="/privacy-policy" className="text-violet-200 hover:text-violet-50 mx-2">سياسة الخصوصية</a>
          <a href="/about-us" className="text-violet-200 hover:text-violet-50 mx-2">من نحن</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
