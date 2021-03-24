import axios from 'axios'

// ACTION TYPES
const GET_LISTINGS = 'GET_LISTINGS'
const GET_FAVORITES = 'GET_FAVORITES'

// ACTION CREATORS
const getListings = listings => ({
  type: GET_LISTINGS,
  listings
})
const getFavorites = favorites => ({
  type: GET_FAVORITES,
  favorites
})

// THUNK CREATORS
export const fetchListings = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/listings/available`)
      dispatch(getListings(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchFavorites = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/favorites`)
      console.log('favorite data', data)
      dispatch(getFavorites(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// INITIAL STATE
let initialState = {
  listings: [],
  favorites: []
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LISTINGS:
      return {...state, listings: action.listings}
    case GET_FAVORITES:
      return {...state, favorites: action.favorites}
    default:
      return state
  }
}
