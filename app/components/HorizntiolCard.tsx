// components/Card.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface CardProps {
  title: string;
  details: string;
  herf : string
}

const Card: FC<CardProps> = ({ title, details , herf }) => {
  return (
    <Link
      dir="rtl"
      className=" mx-6  md:mx-24 my-4 p-4 bg-purple-600 border rounded-lg shadow-lg flex items-center justify-between"
    href={herf}
    >
      {/* محتوى البطاقة */}
      <div className="flex flex-col justify-center space-y-2">
        <h2 className="text-xl font-semibold text-violet-100">{title}</h2>
        <p className="text-gray-200">{details}</p>
      </div>

      {/* أيقونة الجدول */}
      <div className="flex-shrink-0">
        <Image
          src={"/table.svg"}
          alt="جدول"
          width={30}
          height={30}
          className="text-violet"
        />
      </div>
    </Link>
  );
};

export default Card;
