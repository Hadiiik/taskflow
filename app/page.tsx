import React from 'react'
import HeroSection from './components/HeroSection'
import ProblemsSection from './components/ProblemsSection'
import FeaturesSection from './components/FeaturesSection'
import Header from './components/Header'
import Footer from './components/Footer'

const page = () => {
  return (
    <>
      <Header/>
      <HeroSection/>
      <ProblemsSection/>
      <FeaturesSection/>
      <Footer/>

    </>
  )
}

export default page
