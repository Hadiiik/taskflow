import React from 'react'
import SubscriptionCard from '../SubsecribtionCard'
import AccountHeader from './AccountHeader'

const subscriptions = [
    {
      name: "مجاني",
      description: "الاشتراك الأساسي الذي يوفر لك جدولين مع 10 مهام لكل جدول، مثالي لإدارة المهام البسيطة اليومية.",
      price: "مجاني",
      tables: 2,
      tasksPerTable: 3
    },
    {
      name: "اساسي",
      description: "يتيح لك هذا الاشتراك 7 جداول مع 30 مهمة في كل جدول، مناسب للأشخاص الذين يحتاجون إلى تنظيم مهام أكثر مع إمكانيات موسعة.",
      price: "5.4 $",
      tables: 7,
      tasksPerTable: 15
    },
    {
      name: "محترف",
      description: "أقصى مستوى من التخصيص! يمنحك 25 جدولًا وعدد غير محدود من المهام، مثالي لأولئك الذين يحتاجون إلى إدارة وتنظيم عمل معقد ومتعدد المهام.",
      price: "17 $",
      tables: 25,
      tasksPerTable: 70
    }
  ];

const PricingCard = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {subscriptions.map((sub, i) => (
          <SubscriptionCard
            key={i}
            subscriptionName={sub.name}
            subscriptionDescription={sub.description}
            price={sub.price}
            tablesCount={sub.tables}
            membersCount={sub.tasksPerTable}
          />
        ))}
      </div>
    </>
  )
}

export default PricingCard
