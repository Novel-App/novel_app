import React from 'react'

import {LocationVerification, Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <LocationVerification />
    </div>
  )
}

export default App
