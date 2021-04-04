import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import SideNavBar from './components/SideNavbar'

const App = () => {
  return (
    <div>
      <SideNavBar />
      <Routes />
    </div>
  )
}

export default App
