import React from 'react'
import HeroSection from './components/HeroSection'
import ProblemsSection from './components/ProblemsSection'
import FeaturesSection from './components/FeaturesSection'
import Header from './components/Header'
import Footer from './components/Footer'
import InviteAndTableSection from './components/account_components/InviteAndTableSection'

const page = () => {

  return (
    <>
      <Header/>
      <HeroSection/>
      <ProblemsSection/>
      <FeaturesSection/>
      <Footer/>
      <InviteAndTableSection team_id={100}/>
      
    </>
  )
}

export default page
