import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
const SET_ERROR = 'SET_ERROR'
const CLEAR_ERROR = 'CLEAR_ERROR'

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
const handleError = error => ({type: SET_ERROR, error})
const removeError = () => ({type: CLEAR_ERROR})

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
    history.push('/home')
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
export const updateUser = (userInfo, userId) => {
  return async dispatch => {
    const {data} = await axios.put(`/api/users/${userId}`, userInfo)
    dispatch(_updateUser(data))
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
    case SET_ERROR:
      return {...state, error: action.error}
    case CLEAR_ERROR:
      return {...state, error: {}}
    default:
      return state
  }
}
