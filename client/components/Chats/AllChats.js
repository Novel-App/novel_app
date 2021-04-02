import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllChats, removeChat} from '../../store/chat'
import moment from 'moment'
import Book from '../Products/Book'

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
          //if user is chatting the seller
          if (user.id !== chat.sellerId) {
            return {
              chatId: chat.id,
              firstName: chat.product.seller.firstName,
              productName: chat.product.title,
              profileImg: chat.product.seller.profileImage,
              productImg: chat.product.image[0]
            }
          } else {
            //if user is chatting the browser
            const browserInfo =
              chat.users[0].id === chat.browserId
                ? chat.users[0]
                : chat.users[1]
            return {
              chatId: chat.id,
              firstName: browserInfo.firstName,
              productName: chat.product.title,
              profileImg: browserInfo.profileImage,
              productImg: chat.product.image[0]
            }
          }
        })
      : []

    return (
      <div>
        <div className="container">
          <nav className="navbar navbar-expand-md">
            <div className="title navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              <h3>All chats</h3>
            </div>
          </nav>
        </div>
        <div className="container-fluid">
          {currUser.map(chatRoom => {
            return (
              <div className="card mb-0" key={chatRoom.chatId}>
                <div className="col-md-4">
                  <div className="row no-gutters">
                    <div className="card-horizontal">
                      <div className="col-4 allChat">
                        <Link
                          to={{
                            pathname: `/chats/${chatRoom.chatId}`
                          }}
                        >
                          <div className="text-small">
                            <strong>{chatRoom.firstName} </strong>
                          </div>
                          <div className="img_cont">
                            <img
                              src={chatRoom.profileImg}
                              className="direct-chat-img rounded-circle"
                            />
                          </div>
                          <div className="last-message text-muted">
                            {/* last message */}
                            {/* <p>
                              <i className="bi bi-book" aria-hidden="true" />:
                              {chatRoom.productName}
                            </p> */}
                          </div>
                        </Link>
                        <div className="img_cont">
                          <img
                            src={chatRoom.productImg}
                            className="direct-chat-img"
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          className="close"
                          aria-label="Close"
                          type="button"
                          onClick={() =>
                            this.deleteClickHandler(chatRoom.chatId)
                          }
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
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
