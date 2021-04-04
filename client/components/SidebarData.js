import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as BiIcons from 'react-icons/bi'

export const SidebarDataLoggedIn = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    className: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <FaIcons.FaUserCircle />,
    className: 'nav-text'
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
    title: 'Favorites',
    path: '/favorites',
    icon: <BiIcons.BiBookHeart />,
    className: 'nav-text'
  },
  {
    title: 'LogOut',
    path: '',
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
