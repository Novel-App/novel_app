import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const Welcome = () => {
  return (
    <div className="container">
      <header className="page-header header container-fluid">
        <div className="overlay">
          <div className="description">
            <h1>Welcome to Novel</h1>
            <h4>Bringing books back to life</h4>
            <Link to="/signup">
              <button type="button" className="btn btn-primary">
                Sign Up Now
              </button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}
