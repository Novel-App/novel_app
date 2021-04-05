import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const Welcome = () => {
  return (
    <div className="welcome">
      {/* <div id="welcome-container" className="jumbotron jumbotron-fluid bg-dark">
        <div className="jumbotron-background">
          <img
            src="https://cdn.lifestyleasia.com/wp-content/uploads/sites/2/2020/02/25145253/Photo-by-Alfons-Morales-on-Unsplash-scaled-1535x900.jpg"
            className="blur "
          />
        </div>
        <div className="container text-white">
          <h1 className="display-4">Welcome to Novel</h1>
          <h4 className="lead">Bringing books back to life</h4>
          <Link to="/signup">
            <button type="button" className="btn btn-outline-dark">
              Sign Up Now
            </button>
          </Link>
        </div>
      </div> */}
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
