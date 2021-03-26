import axios from 'axios'

// ACTION TYPES
const GET_LISTINGS = 'GET_LISTINGS'
const GET_FAVORITES = 'GET_FAVORITES'
const GET_PURCHASES = 'GET_PURCHASES'

// ACTION CREATORS
const getListings = listings => ({
  type: GET_LISTINGS,
  listings
})
const getFavorites = favorites => ({
  type: GET_FAVORITES,
  favorites
})

const getPurchases = purchases => ({
  type: GET_PURCHASES,
  purchases
})

// THUNK CREATORS
export const fetchListings = (userId, availability) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `/api/users/${userId}/listings/${availability}`
      )
      console.log('data', data)
      dispatch(getListings(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchUserProducts = (userId, type) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/${type}`)
      if (type === 'favorites') {
        dispatch(getFavorites(data))
      } else if (type === 'purchases') {
        dispatch(getPurchases(data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// INITIAL STATE
let initialState = {
  listings: [],
  favorites: [],
  purchases: []
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LISTINGS:
      return {...state, listings: action.listings}
    case GET_FAVORITES:
      return {...state, favorites: action.favorites}
    case GET_PURCHASES:
      return {...state, purchases: action.purchases}
    default:
      return state
  }
}
