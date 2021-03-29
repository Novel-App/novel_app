import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'

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

const _getFavorite = product => {
  return {
    type: TOGGLE_FAVORITE,
    product
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

export const getFavorite = (product, userId) => {
  return async dispatch => {
    const {data} = await axios.put(
      `/api/products/${product.id}/favorite`,
      userId
    )
    dispatch(_getFavorite(data))
  }
}

// INITIAL STATE
let initialState = {
  all: [],
  single: {},
  favorited: {}
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
        all: state.all.map(product => {
          if (product.id === action.product.id) {
            product = action.product
          }
          return product
        }),
        single: action.product
      }
    default:
      return state
  }
}
