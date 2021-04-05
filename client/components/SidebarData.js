import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'
import * as RiIcons from 'react-icons/ri'

export const SidebarDataLoggedIn = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    className: 'nav-text'
  },
  {
    title: 'My Page',
    path: '#',
    icon: <BiIcons.BiBookReader />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpned: <RiIcons.RiArrowUpSFill />,
    className: 'nav-text',
    subNav: [
      {
        title: 'My Profile',
        path: '/profile',
        icon: <FaIcons.FaUserCircle />
      },
      {
        title: 'My Favorites',
        path: '/favorites',
        icon: <BiIcons.BiBookHeart />,
        className: 'nav-text'
      },
      {
        title: 'My Listings',
        path: '/listings',
        icon: <BiIcons.BiPurchaseTagAlt />,
        className: 'nav-text'
      },
      {
        title: 'My Purchases',
        path: '/purchases',
        icon: <BiIcons.BiBook />,
        className: 'nav-text'
      }
    ]
  },
  {
    title: 'Books',
    path: '/products',
    icon: <BiIcons.BiBook />,
    className: 'nav-text'
  },
  {
    title: 'Chat',
    path: '/chats',
    icon: <AiIcons.AiOutlineMessage />,
    className: 'nav-text'
  },
  {
    title: 'Log Out',
    path: '#',
    icon: <AiIcons.AiOutlineLogout />,
    className: 'nav-text'
  }
]

export const SideBarLoggedOut = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    className: 'nav-text'
  },
  {
    title: 'Log in',
    path: '/login',
    icon: null,
    className: 'nav-text'
  },
  {
    title: 'Sign-up',
    path: '/signup',
    icon: null,
    className: 'nav-text'
  }
]
