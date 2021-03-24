import axios from 'axios'
import history from '../history'
import socket from '../socket'
// get all chats
// get single chat
// create chat
// delete chat

// ACTION TYPES
const GET_ALL_CHATS = 'GET_ALL_CHATS'
const GET_SINGLE_CHAT = 'GET_SINGLE_CHAT'
const CREATE_CHAT = 'CREATE_CHAT'
const DELETE_CHAT = 'DELETE_CHAT'

// ACTION CREATORS
const getAllChats = chats => ({type: GET_ALL_CHATS, chats})
const getSingleChat = chat => ({type: GET_SINGLE_CHAT, chat})
const createChat = chat => ({type: CREATE_CHAT, chat})
const deleteChat = chat => ({type: DELETE_CHAT, chat})

// THUNK REDUCERS
export const fetchAllChats = () => {
  return async dispatch => {
    try {
      const {data: chats} = await axios.get('/api/chats')
      dispatch(getAllChats(chats))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchSingleChat = chatId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/chats/${chatId}`)
      dispatch(getSingleChat(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addNewChat = chat => {
  return async dispatch => {
    try {
      const {data: newChat} = await axios.post('/api/chats', chat)
      dispatch(createChat(newChat))
      socket.emit('new-chat', newChat)
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeChat = chatId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/chats/${chatId}`)
      dispatch(deleteChat(chatId))
      history.push('/chats')
    } catch (err) {
      console.log(err)
    }
  }
}

// INITIAL STATE
let initialState = {
  chats: [],
  chat: {}
}

// REDUCER

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CHATS:
      console.log('reducer....', action.chats)
      return {...state, chats: action.chats}
    case GET_SINGLE_CHAT:
      return {...state, chat: action.chat}
    case CREATE_CHAT:
      return {...state, chats: [...state.chats, action.chat]}
    case DELETE_CHAT:
      return {
        ...state,
        chats: state.chats.filter(chat => chat.id !== action.chatId)
      }
    default:
      return state
  }
}
