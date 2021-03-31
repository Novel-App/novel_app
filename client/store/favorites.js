import axios from 'axios'

// ACTION TYPES
const GET_FAVORITE = 'GET_FAVORITE'
const UPDATE_FAVORITE = 'UPDATE_FAVORITE'
const GET_FAV_COUNT = 'GET_FAV_COUNT'

// ACTION CREATORS
const _getFavorites = favorites => {
  return {
    type: GET_FAVORITE,
    favorites
  }
}

const _updateFavorite = favorite => {
  return {
    type: UPDATE_FAVORITE,
    favorite
  }
}

const _getFavCount = favCount => {
  return {
    type: GET_FAV_COUNT,
    favCount
  }
}

//GET /api/products/favorites/:userId
// THUNK CREATORS
export const getFavorites = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/favorites/${userId}`)
    dispatch(_getFavorites(data))
  } catch (error) {
    console.log(error)
  }
}

export const updateFavorite = (productId, info) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/products/favorite/${productId}`, info)
    dispatch(_updateFavorite(data))
  } catch (error) {
    console.log(error)
  }
}

export const getFavCount = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}/favorite-count`)
    dispatch(_getFavCount(data))
  } catch (error) {
    console.log(error)
  }
}

// INITIAL STATE
let initialState = {
  all: [],
  favCount: 0
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITE:
      return {
        ...state,
        all: [...action.favorites]
      }
    case UPDATE_FAVORITE:
      return {
        ...state,
        favorites: state.all.map(fav => {
          if (
            fav.productId === action.favorite.productId &&
            fav.userId === action.favorite.userId
          ) {
            return action.favorite
          } else {
            return fav
          }
        })
      }
    case GET_FAV_COUNT:
      return {
        ...state,
        favCount: action.favCount
      }
    default:
      return state
  }
}
