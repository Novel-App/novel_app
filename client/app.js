import React from 'react'
import Routes from './routes'
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
