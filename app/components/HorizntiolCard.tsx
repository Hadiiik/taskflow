import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface CardProps {
  title: string;
  details: string;
  herf: string;
}

const Card: FC<CardProps> = ({ title, details, herf }) => {
  return (
    <Link
      dir="rtl"
      className="mx-6 md:mx-24 my-4 p-4 bg-white border-2 border-purple-600 rounded-full shadow-lg flex items-center justify-between"
      href={herf}
    >
      {/* محتوى البطاقة */}
      <div className="flex flex-col justify-center space-y-2">
        <h2 className="text-xl font-semibold text-purple-600">{title}</h2>
        <p className="text-purple-600">{details}</p>
      </div>

      {/* أيقونة الجدول */}
      <div className="flex-shrink-0">
        <Image
          src={"/table.svg"}
          alt="جدول"
          width={30}
          height={30}
          className="text-purple-600"
        />
      </div>
    </Link>
  );
};

export default Card;
