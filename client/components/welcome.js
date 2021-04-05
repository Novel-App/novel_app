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
          <btn
            type="button"
            id="signup"
            className="btn btn-outline btn-primary"
          >
            Sign up
          </btn>
        </a>
        <a href="/login">
          <btn type="button" id="login" className="btn btn-outline btn-primary">
            Login
          </btn>
        </a>
        <img id="novelgraphic" src="resources/images/novel_graphic.png" />
      </div>
    </div>
  )
}
