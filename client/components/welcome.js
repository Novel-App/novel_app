import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const Welcome = () => {
  return (
    <div className="welcome">
      <div>
        <img id="novelgraphic" src="resources/images/novel_graphic.png" />
        <a href="/signup">
          <button
            type="button"
            id="welcome_round_left"
            className="btn btn-primary btn-circle btn-xl text-wrap"
          >
            Sign up!
          </button>
        </a>
        <a href="/login">
          <button
            type="button"
            id="welcome_round_right"
            className="btn btn-primary btn-circle btn-xl text-wrap"
          >
            Log in!
          </button>
        </a>
      </div>
    </div>
  )
}
