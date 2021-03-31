import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllChats, removeChat} from '../../store/chat'
import moment from 'moment'

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
    const chats = this.props.chats || []
    const {user} = this.props

    const currUser = chats
      ? chats.map(chat => {
          if (user.id !== chat.sellerId) {
            return {
              chatId: chat.id,
              firstName: chat.product.seller.firstName,
              productName: chat.product.title
            }
          } else {
            return {
              chatId: chat.id,
              firstName: chat.users[0].firstName,
              productName: chat.product.title
            }
          }
        })
      : []

    return (
      <div>
        <h3>All chats</h3>
        <ul>
          {currUser.map(chatRoom => {
            return (
              <li className="d-flex" key={chatRoom.chatId}>
                <Link
                  to={{
                    pathname: `/chats/${chatRoom.chatId}`
                  }}
                >
                  <p>{`${chatRoom.firstName}: ${chatRoom.productName}`}</p>
                </Link>
                <span>
                  <i
                    className="bi bi-trash ml-5"
                    onClick={() => this.deleteClickHandler(chatRoom.chatId)}
                  />
                </span>
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
    user: state.user,
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
