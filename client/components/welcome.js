import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const Welcome = () => {
  return (
    <div className="welcome">
      <div>
        <a href="/signup">
          <button
            type="button"
            id="signup"
            className="btn btn-outline btn-primary"
          >
            Sign up
          </button>
        </a>
        <a href="/login">
          <button
            type="button"
            id="login"
            className="btn btn-outline btn-primary"
          >
            Login
          </button>
        </a>
        <img id="novelgraphic" src="resources/images/novel_graphic.png" />
      </div>
    </div>
  )
}
