import React from 'react'
import HeroSection from './components/HeroSection'
import ProblemsSection from './components/ProblemsSection'
import FeaturesSection from './components/FeaturesSection'
import Header from './components/Header'
import Footer from './components/Footer'

const page = () => {
  // const tasks = [
  //   {
  //     name: "مهمة 1",
  //     created_at: new Date().toISOString(),
  //     due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // بعد 5 أيام
  //     currentColumn: 0,
  //   },
  //   {
  //     name: "مهمة 2",
  //     created_at: new Date().toISOString(),
  //     due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // بعد يومين
  //     currentColumn: 0,
  //   },
  //   {
  //     name: "مهمة 3",
  //     created_at: new Date().toISOString(),
  //     due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // منتهية منذ يوم
  //     currentColumn: 0,
  //   },
  // ];
  return (
    <>
      <Header/>
      <HeroSection/>
      <ProblemsSection/>
      <FeaturesSection/>
      <Footer/>
      {/* <TeamTaskSheet
        team_id={1}
        table_name="جدول المهام"
        columns_array={["قيد التنفيذ", "مراجعة", "اختبار"]}
        task_array={tasks}
      /> */}

    </>
  )
}

export default page
