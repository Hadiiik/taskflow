"use client"
import Link from 'next/link';
import React from 'react'

interface SubscriptionCardProps {
  subscriptionName: string;
  subscriptionDescription: string;
  price: string;
  tablesCount: number|string;  // عدد الجداول
  membersCount: number|string;   // عدد المهام
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ 
  subscriptionName, 
  subscriptionDescription, 
  price, 
  tablesCount, 
  membersCount 
}) => {
  return (
    <div className="max-w-md md:mx-auto mx-6 p-6 bg-white rounded-xl border-2 border-violet-500 m-12 mb-0">
      

      <div className="text-center">
        <h2 className="text-3xl font-semibold text-violet-700 mb-4">{subscriptionName}</h2>
        <p className="text-lg text-violet-700 mb-4">{subscriptionDescription}</p>

        {/* عرض عدد الجداول */}
        <p className="text-sm text-violet-700 mb-2">
          <strong>عدد الجداول:</strong> {tablesCount}
        </p>

        {/* عرض عدد المهام */}
        <p className="text-sm text-violet-700 mb-2">
          <strong>عدد الاعضاء:</strong> {membersCount}
        </p>

        {/* سعر الاشتراك */}
        <div className="text-2xl font-bold text-green-500 mb-6">
          {price}
        </div>

        {/* زر الاشتراك */}
        <Link href={'account/create-team'}
        className="w-full py-3 bg-violet-900 text-white rounded-md text-lg hover:bg-violet-700 focus:bg-violet-700 transition duration-300 block"
        >
        اشتراك الآن
        </Link>

      </div>
    </div>
  )
}

export default SubscriptionCard
