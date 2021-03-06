import axios from 'axios'
import {useReducer} from 'react'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
const UPDATE_USER_PIC = 'UPDATE_USER_PIC'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const _updateUser = user => ({type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */
export const getMe = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const register = (
  email,
  password,
  firstName,
  lastName
) => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/signup', {
      email,
      password,
      firstName,
      lastName
    })
    dispatch(getUser(res.data))
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
}

export const login = (email, password) => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/login', {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

//GENERIC THUNK CREATOR FOR ALL USER UPDATES (updating info in settings, adding location coords after verification)
//user argument passed with spread operator of existing user info + updated user info
export const updateUser = user => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${user.id}`, user)
    dispatch(_updateUser(data))
    if (!user.coordinates) {
      history.push('/profile')
    }
  } catch (err) {
    console.error(err)
  }
}

//UPDATE PROFILE PICTURE
export const updateUserPicture = user => async dispatch => {
  try {
    const {data} = await axios.post(`/api/users/uploadProfile`, user)
    dispatch(_updateUser(data))
    history.push('/profile')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    case UPDATE_USER_PIC:
      return action.user
    default:
      return state
  }
}
