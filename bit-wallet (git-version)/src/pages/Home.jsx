import React from 'react'
import CustomCarousel from '../components/carousel/CustomCarousel'
import AboutUs from '../components/about/AboutUs'
import Services from '../components/services/Service'
import Features from '../components/feat/Features'
import Team from '../components/team/Team'
import Footer from '../components/footer/Footer'

const Home = () => {
  return (
    <div>
      <CustomCarousel/>
      <AboutUs/>
      <Services/>
      <Features/>
      <Team/>
      <Footer/>
    </div>
  )
}

export default Home
