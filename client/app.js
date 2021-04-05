import React from 'react'
import Routes from './routes'
// import SideNavBar from './components/SideNavbar'
import {Footer, SideNavBar} from './components'

const App = () => {
  return (
    <div>
      <SideNavBar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
