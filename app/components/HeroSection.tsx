import Link from 'next/link';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-violet-400  to-violet-700 text-yellow-50 py-20 px-6 text-center"
>
      <h1 className="text-3xl md:text-3xl font-bold mb-4">
        إدارة المهام بذكاء وسهولة
      </h1>
      <p className=" md:text-xl mb-6 max-w-3xl mx-auto  ">
        نظام كانبان يساعدك على تنظيم وتوزيع المهام بكفاءة عالية، مما يساهم في تحسين الإنتاجية.((منا نغير هالحكي لشي احسن))
      </p>
      <Link className=" bg-white text-violet-600 py-2 px-6 rounded-md text-lg hover:bg-violet-700 hover:text-white hover:shadow-md transition duration-300 my-4"
      href={"/login"}>
        جرب الآن
      </Link>
    </section>
  );
}

export default HeroSection;
