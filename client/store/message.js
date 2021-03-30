import axios from 'axios'
import socket from '../socket'

// ACTION TYPES
const GET_MESSAGES = 'GET_MESSAGES'
const ADD_MESSAGE = 'ADD_MESSAGE'

// ACTION CREATORS
const getMessages = messages => ({
  type: GET_MESSAGES,
  messages
})

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message
})

// THUNK CREATORS
export const fetchMessages = chatId => async dispatch => {
  try {
    const {data: messages} = await axios.get(`/api/messages/${chatId}`)
    dispatch(getMessages(messages))
  } catch (error) {
    console.log(error)
  }
}

export const sendMessage = message => async dispatch => {
  try {
    const {data: newMessage} = await axios.post('/api/messages', message)
    dispatch(addMessage(newMessage))
    socket.emit('new-message', newMessage)
  } catch (error) {
    console.log(error)
  }
}

// INITIAL STATE
const initialState = {
  messages: [],
  message: {}
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {...state, messages: action.messages}
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
        message: action.message
      }
    default:
      return state
  }
}
