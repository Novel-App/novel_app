import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="navbar navbar-expand-md">
      {isLoggedIn ? (
        <div className="navbar-collapse">
          {/* The navbar will show these links after you log in */}
          <a className="navbar-brand" href="/">
            <i className="bi bi-house-fill large" style={{fontSize: '1.5em'}} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#main-navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="main-navigation">
            <ul className="navbar-nav">
              {/* <li className="nav-item">
                <a className="nav-link" href="/products">
                  Products
                </a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="/chats">
                  <i
                    className="bi bi-chat-left-quote-fill"
                    style={{fontSize: '1.5em'}}
                  />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile" to="/profile">
                  <i
                    className="bi bi-person-square"
                    style={{fontSize: '1.5em'}}
                  />
                </a>
              </li>
            </ul>
          </div>
          <a className="nav-link" href="#" onClick={handleClick}>
            <i className="bi bi-door-closed-fill" style={{fontSize: '1.5em'}} />
          </a>
        </div>
      ) : (
        <div className="navbar-signin">
          {/* The navbar will show these links before you log in */}
          <div className="collapse navbar-collapse" id="main-navigation">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signup">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
          {/* <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
