import React from 'react'
import {propTypes} from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Welcome = ({isLoggedIn}) => {
  return (
    <div id="welcome-container" className="container">
      <header className="page-header header container-fluid">
        <div className="description">
          <h1>Welcome to Novel</h1>
          <h4>Bringing books back to life</h4>
          <Link to="/signup">
            <button type="button" className="btn btn-primary">
              Sign Up Now
            </button>
          </Link>
        </div>
      </header>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapStateToProps)(Welcome)

// Welcome.propTypes = {
//   isLoggedIn: propTypes.bool.isRequred
// }
