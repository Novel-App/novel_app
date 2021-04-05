import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import SideNavBar from './components/SideNavbar'
import Footer from './components/footer'

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
