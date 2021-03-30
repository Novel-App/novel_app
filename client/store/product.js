import ActionButton from 'antd/lib/modal/ActionButton'
import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
const GET_FAV_COUNT = 'GET_FAV_COUNT'

// ACTION CREATORS
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

const _createProduct = product => {
  return {
    type: CREATE_PRODUCT,
    product
  }
}

const _updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

const _removeProduct = productId => {
  return {
    type: REMOVE_PRODUCT,
    productId
  }
}

const _getFavorite = favorite => {
  return {
    type: TOGGLE_FAVORITE,
    favorite
  }
}

const _getFavCount = favCount => {
  return {
    type: GET_FAV_COUNT,
    favCount
  }
}

// THUNK CREATORS
export const fetchProducts = availability => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/status/${availability}`)
      dispatch(getProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(getSingleProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const createProduct = product => {
  return async dispatch => {
    const {data} = await axios.post('/api/products', product)
    dispatch(_createProduct(data))
    history.push('/products')
  }
}

export const updateProduct = product => {
  return async dispatch => {
    const {data} = await axios.put(`/api/products/${product.id}`, product)
    dispatch(_updateProduct(data))
    history.push('/listings')
  }
}

export const removeProduct = productId => {
  return async dispatch => {
    await axios.delete(`/api/products/${productId}`)
    dispatch(_removeProduct(productId))
    //   history.push()
  }
}

export const getFavorite = (product, info) => {
  return async dispatch => {
    const {data} = await axios.post(
      `/api/products/${product.id}/favorite`,
      info
    )
    dispatch(_getFavorite(data))
  }
}

export const getFavCount = productId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/${productId}/favorite-count`)
    dispatch(_getFavCount(data))
  }
}

// INITIAL STATE
let initialState = {
  all: [],
  single: {},
  favorited: {},
  favCount: 0
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, all: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, single: action.product}
    case CREATE_PRODUCT:
      return {...state, all: [...state.all, action.product]}
    case UPDATE_PRODUCT:
      return {
        ...state,
        all: state.all.map(product => {
          if (product.id === action.product.id) {
            product = action.product
          }
          return product
        }),
        single: action.product
      }
    case REMOVE_PRODUCT:
      return {
        ...state,
        all: state.all.filter(product => product.id !== action.productId)
      }
    case TOGGLE_FAVORITE:
      return {
        ...state,
        favorite: action.favorite
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
