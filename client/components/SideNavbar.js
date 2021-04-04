import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {SidebarDataLoggedIn, SideBarLoggedOut} from './SidebarData'
import {logout} from '../store'
import styled from 'styled-components'
import SubMenu from './SubMenu'
import {IconContext} from 'react-icons/lib'

const SidebarNav = styled.nav`
  background: #254d4c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({sidebar}) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`

const SideNavBar = ({handleClick, isLoggedIn}) => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)
  const navBarIcons = isLoggedIn ? SidebarDataLoggedIn : SideBarLoggedOut

  return (
    <>
      <IconContext.Provider value={{color: '#e7fff8'}}>
        <div className="sideNavContainer">
          <div className="container-fluid d-flex align-items-center">
            <div className="toggle-icon">
              <Link to="#" className="navLink">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </div>
            <div className="d-flex nav-title justify-content-center">
              <Link to="/home">
                <h1 className="novel-logo">Novel</h1>
              </Link>
            </div>
          </div>
          <SidebarNav sidebar={sidebar}>
            <div className="sidebarwrap">
              <Link to="#" className="navLink">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </Link>
              {navBarIcons.map((item, index) => {
                const value =
                  item.title === 'LogOut' ? (
                    <Link
                      to="#"
                      className="linkNavigation"
                      onClick={handleClick}
                    >
                      <div>
                        {item.icon}
                        <span className="navTexts">{item.title}</span>{' '}
                      </div>
                    </Link>
                  ) : (
                    <SubMenu item={item} key={index} />
                  )
                return value
              })}
            </div>
          </SidebarNav>
        </div>
      </IconContext.Provider>
    </>
  )
}

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
