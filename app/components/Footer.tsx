import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-8 w-full mt-4">
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-base mb-2">
          جميع الحقوق محفوظة &copy; <span className="font-bold">OnRequest</span> 2025
        </p>
        <div className="mt-4 py-6">
          <div className="block mb-2">
            <a href="/privacy-policy" className="text-violet-200 hover:text-violet-50 mx-2">سياسة الخصوصية</a>
          </div>
          <div className="block mb-2">
            <a href="/about-us" className="text-violet-200 hover:text-violet-50 mx-2">من نحن</a>
          </div>
          <div className="block">
            <a href="/contact-us" className="text-violet-200 hover:text-violet-50 mx-2">تواصل معنا</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
