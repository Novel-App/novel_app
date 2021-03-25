import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllChats, removeChat} from '../../store/chat'

class AllChats extends Component {
  constructor() {
    super()

    //state or props will populate with chats objects connected to that user once components mount
    //once chats are populated the map function will map through every chat
    //each chat has a link, that navigates to the specific single chat based on chat id
    this.deleteClickHandler = this.deleteClickHandler.bind(this)
  }

  componentDidMount() {
    this.props.getAllChats()
  }

  // handling the delete chat button
  deleteClickHandler(chatId) {
    // if (this.props.chat.id)
    this.props.deleteChat(chatId)
  }

  render() {
    console.log('rendering AllChats...')

    let chats = this.props.chats

    return (
      <div>
        <h3>All chats</h3>
        <ul>
          {chats.map(chat => {
            return (
              <li key={chat.id}>
                <Link
                  to={{
                    pathname: `/messages/${chat.id}`,
                    chat: {chat}
                  }}
                >
                  {`${chat.users[0].firstName}`}
                </Link>

                <div>
                  <button
                    type="button"
                    onClick={() => this.deleteClickHandler(chat.id)}
                  >
                    X
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    chats: state.chat.chats
  }
}
const mapDispatch = dispatch => {
  return {
    getAllChats: () => dispatch(fetchAllChats()),
    deleteChat: chatId => dispatch(removeChat(chatId))
  }
}

export default connect(mapState, mapDispatch)(AllChats)
