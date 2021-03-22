import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const Welcome = () => {
  return (
    <header>
      <div id="intro-example" className="p-5 text-center bg-image">
        <div className="mask">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-wheat">
              <h1 className="mb-3">Welcome to Novel</h1>
              <h4 className="mb-3">Bringing books back to life</h4>
              <Link to="/signup">Sign Up Now</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
