import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Loading} from '../Loading'
import {fetchAllChats, removeChat} from '../../store/chat'
import moment from 'moment'

class AllChats extends Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }

    //state or props will populate with chats objects connected to that user once components mount
    //once chats are populated the map function will map through every chat
    //each chat has a link, that navigates to the specific single chat based on chat id
    this.deleteClickHandler = this.deleteClickHandler.bind(this)
    this.loadingHandler = this.loadingHandler.bind(this)
  }

  componentDidMount() {
    this.props.getAllChats()
    this.loadingHandler()
  }
  loadingHandler = () => {
    setTimeout(() => {
      this.setState({loading: false})
    }, 1000)
  }

  // handling the delete chat button
  deleteClickHandler(chatId) {
    // if (this.props.chat.id)
    this.props.deleteChat(chatId)
  }

  render() {
    const chats = this.props.chats || []
    const {user} = this.props

    if (this.state.loading) {
      return <Loading />
    }

    const currUser = chats
      ? chats.map(chat => {
          //get last chat message
          let lastMessage = {content: '', time: '1800-04-02T14:43:19.818Z'}
          if (chat.users.length === 1) {
            let message = chat.users[0].message.content.split(' ')
            lastMessage = {
              content:
                message.length > 3
                  ? `${message.slice(0, 3).join(' ')}...`
                  : message.join(' '),
              time: chat.users[0].message.createdAt
            }
          } else {
            lastMessage =
              chat.users[0].message.createdAt > chat.users[1].message.createdAt
                ? {
                    content:
                      chat.users[0].message.content.split(' ').length < 3
                        ? chat.users[0].message.content
                        : `${chat.users[0].message.content
                            .split(' ')
                            .slice(0, 3)
                            .join(' ')}...`,
                    time: chat.users[0].message.createdAt
                  }
                : {
                    content:
                      chat.users[1].message.content.split(' ').length < 3
                        ? chat.users[1].message.content
                        : `${chat.users[1].message.content
                            .split(' ')
                            .slice(0, 3)
                            .join(' ')}...`,

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
              productImg: chat.product.image[0],
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
              productImg: chat.product.image[0],
              message: lastMessage
            }
          }
        })
      : []
    return (
      <div className="chats row overflow-hidden justify-content-center">
        {/* <!-- Users box--> */}
        <div className="col-8 px-4">
          <div className="bg-white">
            <div className="d-flex justify-content-center bg-gray px-4 py-2 bg-light">
              <h1 className="h5 mb-0 py-1">Chats</h1>
            </div>
            {/* <div className="card messages-box"> */}
            <div className="list-group d-flex flex-column py-0" />
            {currUser.map(chatRoom => {
              return (
                <Link
                  to={{
                    pathname: `/chats/${chatRoom.chatId}`
                  }}
                  key={chatRoom.chatId}
                >
                  <div
                    className="card d-flex allChat list-group-item-action list-group-item-light rounded-0 p-2  border-bottom"
                    key={chatRoom.chatId}
                  >
                    <div className="row no-gutters">
                      {/* HERE */}
                      <div className="col-md-6 d-flex flex-column">
                        <div className="d-flex flex-column align-items-center ">
                          <h6 className="mb-0">{chatRoom.firstName}</h6>
                          <div className="media">
                            <img
                              src={chatRoom.profileImg}
                              className="direct-chat-img rounded-circle"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-center ">
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
                      </div>

                      {/* HERE */}

                      {/* <div className="col-md-6 d-flex flex-column">
                      <div className="d-flex flex-column align-items-center ">
                        <h6 className="mb-0">{chatRoom.firstName}</h6>
                        <div className="media">
                          <img
                            src={chatRoom.profileImg}
                            className="direct-chat-img rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center ">
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
                    </div> */}

                      {/* <div className="col-md-3 d-flex justify-content-center align-items-center">
                        <img
                          src={chatRoom.productImg}
                          className="direct-chat-img"
                        />
                      </div> */}

                      <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                        <p className="mt-2 mb-0">Listing</p>
                        <img
                          src={chatRoom.productImg}
                          className="direct-chat-img"
                        />
                      </div>

                      <div className="col-md-3 d-flex align-items-center justify-content-center">
                        <button
                          className="delete-chat btn btn-outline-warning btn-sm fixed-top"
                          style={{
                            position: 'relative',
                            right: 5,
                            top: 5
                          }}
                          aria-label="Close"
                          type="button"
                          onClick={() =>
                            this.deleteClickHandler(chatRoom.chatId)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
            {/* </div> */}
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
