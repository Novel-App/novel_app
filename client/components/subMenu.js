import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const SubMenu = ({item}) => {
  const [subnav, setSubnav] = useState(false)

  const showSubnav = () => setSubnav(!subnav)

  return (
    <>
      <Link
        className="linkNavigation"
        to={item.path}
        onClick={item.subNav && showSubnav}
      >
        <div>
          {item.icon}
          <span className="navTexts">{item.title}</span>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav ? item.iconClosed : null}
        </div>
      </Link>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link className="navDropDown" to={item.path} key={index}>
              {item.icon}
              <span className="navTexts">{item.title}</span>
            </Link>
          )
        })}
    </>
  )
}

export default SubMenu
