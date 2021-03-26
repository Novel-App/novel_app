import io from 'socket.io-client'
import store from './store/index'
// import {getMessage} from './store/message'
// import {createNewChat} from './store/message'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('I am now connected to the server!')
})

socket.on('new-message', message => {
  store.dispatch(getMessage(message))
})

socket.on('new-chat', chat => {
  store.dispatch(createNewChat(chat))
})

export default socket
