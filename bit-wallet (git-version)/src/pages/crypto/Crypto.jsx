import React from 'react'
import Header from '../../components/header/Header'
import Banner from '../../components/Banner/Banner'
import CoinsTable from '../../components/coin/CoinsTable'


const crypto = () => {
  return (
    <div>
      <Header />
      <Banner />
      <div><br /><br /><br /><br /><br /><br /><br />

      <CoinsTable />
      </div>
      
    </div>
  )
}

export default crypto
