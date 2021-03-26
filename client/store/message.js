import axios from 'axios'
import history from '../history'
import socket from '../socket'

// get all messages in chat
// add new message

// ACTION TYPES
const GET_MESSAGES = 'GET_MESSAGES'
const ADD_MESSAGE = 'ADD_MESSAGE'

// ACTION CREATORS
const getMessages = messages => ({
  type: GET_MESSAGES,
  messages
})

const addMessage = message => ({
  type: ADD_MESSAGE,
  message
})

// THUNK CREATEORS
export const fetchMessages = chatId => {
  return async dispatch => {
    try {
      console.log('fectching ...,.')
      const {data: messages} = await axios.get(`/api/messages/${chatId}`)
      dispatch(getMessages(messages))
    } catch (error) {
      console.log(error)
    }
  }
}

export const sendMessage = message => {
  return async dispatch => {
    try {
      //
      const {data: newMessage} = await axios.post('/api/messages', message)
      console.log(newMessage)
      dispatch(addMessage(newMessage))
      socket.emit('new-message', newMessage)
    } catch (error) {
      console.log(error)
    }
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
      console.log('reducer....')
      return {...state, messages: action.messages}
    case ADD_MESSAGE:
      return {...state, message: action.message}
    default:
      return state
  }
}
