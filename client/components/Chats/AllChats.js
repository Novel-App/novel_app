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
          //get last chat message
          let lastMessage = {content: '', time: '1800-04-02T14:43:19.818Z'}
          if (chat.users.length === 1) {
            lastMessage = {
              content: chat.users[0].message.content,
              time: chat.users[0].message.createdAt
            }
          } else {
            lastMessage =
              chat.users[0].createdAt > chat.users[1].message.createdAt
                ? {
                    content: chat.users[0].message.content,
                    time: chat.users[0].message.createdAt
                  }
                : {
                    content: chat.users[1].message.content,
                    time: chat.users[1].message.createdAt
                  }
          }
          //if user is chatting the seller
          if (user.id !== chat.sellerId) {
            return {
              chatId: chat.id,
              firstName: chat.product.seller.firstName,
              productName: chat.product.title,
              profileImg: chat.product.seller.profileImage,
              productImg: chat.product.image,
              message: lastMessage
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
              productImg: chat.product.image,
              message: lastMessage
            }
          }
        })
      : []
    return (
      <div className="row rounded-lg overflow-hidden shadow justify-content-center">
        {/* <!-- Users box--> */}
        <div className="col-5 px-0">
          <div className="bg-white">
            <div className="bg-gray px-4 py-2 bg-light">
              <p className="h5 mb-0 py-1">All Chats</p>
            </div>
            <div className="messages-box">
              <div className="list-group rounded-0" />
              {currUser.map(chatRoom => {
                return (
                  <Link
                    to={{
                      pathname: `/chats/${chatRoom.chatId}`
                    }}
                    key={chatRoom.chatId}
                  >
                    <div
                      className="allChat  list-group-item-action list-group-item-light rounded-0 d-inline-flex p-2 justify-content-between"
                      key={chatRoom.chatId}
                    >
                      <div className="d-flex flex-column">
                        <h6 className="mb-0">{chatRoom.firstName}</h6>
                        <div className="media">
                          <img
                            src={chatRoom.profileImg}
                            className="direct-chat-img rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column ">
                        <small className="small font-weight-bold">
                          {moment(
                            moment(chatRoom.message.time).format(
                              'YYYY-MM-DD HH:mm:ss'
                            )
                          ).fromNow()}
                        </small>
                        <p className="font-italic text-muted mb-0 text-small align-middle">
                          {chatRoom.message.content}
                        </p>
                      </div>
                      <div className="d-flex flex-column">
                        <button
                          className="close pull-right"
                          style={{width: '50%', height: '50%'}}
                          aria-label="Close"
                          type="button"
                          onClick={() =>
                            this.deleteClickHandler(chatRoom.chatId)
                          }
                        >
                          X
                        </button>
                        <div className="img_cont">
                          <img
                            src={chatRoom.productImg}
                            className="direct-chat-img"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// <a href="#" class="messages__item unread">
//   <div class="name">Muhammed ERDEM</div>
//   <div class="date">1h ago</div>

//   <div class="content">
//     Currently We are looking for a UI designer to work on our
//     websites and mobile application...
//   </div>
// </a>

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
