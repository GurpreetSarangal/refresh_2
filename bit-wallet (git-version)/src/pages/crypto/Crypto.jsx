import React from 'react'
import Header from '../../components/header/Header'
import Banner from '../../components/Banner/Banner'
import CoinsTable from '../../components/coin/CoinsTable'
import Footer from '../../components/footer/Footer'



const crypto = () => {
  return (
    <div>
      <Header />
      <Banner />
      
        {/* <br /><br /><br /><br /><br /><br /><br /> */}

      <CoinsTable />
    
      <Footer />
      
    </div>
  )
}

export default crypto
