import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllChats, addNewChat, removeChat} from '../../store/chat'

class AllChats extends Component {
  constructor() {
    super()
    this.state = {chats: []}
    //state or props will populate with chats objects connected to that user once components mount
    //once chats are populated the map function will map through every chat
    //each chat has a link, that navigates to the specific single chat based on chat id
    this.deleteClickHandler = this.deleteClickHandler.bind(this)
  }

  componentDidMount() {
    this.props.getAllChats()
  }

  // handling the delete chat button
  deleteClickHandler() {}

  render() {
    console.log('rendering AllChats...')

    const chats = this.props.chats
    console.log('chats', chats)

    return (
      <div>
        <h3>All chats</h3>
        <ul>
          {chats.map(chat => {
            return (
              <li key={chat.id}>
                <Link
                  to={{
                    pathname: `/messages/${chat.id}/messages`,
                    chat: {chat}
                  }}
                >
                  {`${chat.users[0].firstName} ${chat.users[0].lastName}`}
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
          <div>
            <Link to="/singleChat">Start A New Chat</Link>
          </div>
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
    addNewChat: chat => dispatch(addNewChat(chat)),
    deleteChat: chatId => dispatch(removeChat(chatId))
  }
}

export default connect(mapState, mapDispatch)(AllChats)
