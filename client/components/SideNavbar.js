import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {SidebarDataLoggedIn, SideBarLoggedOut} from './SidebarData'
import {logout} from '../store'

function SideNavBar({handleClick, isLoggedIn}) {
  const [sidebar, setSidebar] = useState(false)
  const showSideBar = () => {
    setSidebar(!sidebar)
  }
  const navBarIcons = isLoggedIn ? SidebarDataLoggedIn : SideBarLoggedOut
  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars
            className="fa-lg"
            style={{color: 'white'}}
            onClick={showSideBar}
          />
        </Link>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSideBar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose style={{color: 'white'}} />
              </Link>
            </li>
            {navBarIcons.map((item, index) => {
              return (
                <li key={index} className={item.className}>
                  {item.title === 'LogOut' ? (
                    <Link to="#" className="navLink" onClick={handleClick}>
                      {' '}
                      {item.icon} <span>{item.title}</span>{' '}
                    </Link>
                  ) : (
                    <Link to={item.path} className="navLink">
                      {item.icon ? item.icon : <></>}
                      <span> {item.title}</span>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
        <h1 id="navHeader">Novel</h1>
      </div>
    </>
  )
}

//                           if()
//                                       <a className="nav-link" href="#" onClick={handleClick}>
//     <i className="bi bi-door-closed-fill" style={{fontSize: '1.5em'}} />
//   </a>

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

export default connect(mapState, mapDispatch)(SideNavBar)

/**
 * PROP TYPES
 */
SideNavBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
