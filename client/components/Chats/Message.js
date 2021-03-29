import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleChat} from '../../store/chat'
import {fetchMessages} from '../../store/message'
import moment from 'moment'

export class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  async componentDidMount() {
    if (this.props.chatId) {
      await this.props.getMessages(this.props.chatId)
      await this.props.getChat(this.props.chatId)
      this.setState({loading: false})
    }
  }
  render() {
    const messages = this.props.messages || []
    const chat = this.props.chat || {users: []}
    if (this.state.loading) {
      return <></>
    }
    //move the loading state to redux
    if (!chat.users) {
      return <></>
    }
    return (
      <div>
        {messages.map(chatBubble => {
          let info
          //user is browser
          if (this.props.user.id === chatBubble.authorId) {
            info = {
              firstName: this.props.user.firstName,
              profileImg: this.props.user.profileImage
            }
            //guest is the browser (allChat view clicking on chat)
          } else if (
            this.props.user.id !== chat.browserId &&
            chat.browserId === chatBubble.authorId
          ) {
            let guest =
              chat.users[0].id === chatBubble.authorId
                ? chat.users[0]
                : chat.users[1]
            info = {
              firstName: guest.firstName,
              profileImg: guest.profileImage
            }
          } else {
            //guest is the seller
            info = {
              firstName: this.props.chat.product.seller.firstName,
              profileImg: this.props.chat.product.seller.profileImage
            }
          }
          return (
            <div key={chatBubble.id} className="box-body">
              <div className="direct-chat-info clearfix">
                {' '}
                <span className="direct-chat-name pull-left">
                  {info.firstName}
                </span>{' '}
                <span className="direct-chat-timestamp pull-right">
                  {moment(
                    moment(chatBubble.createdAt).format('YYYY-MM-DD HH:mm:ss')
                  ).fromNow()}
                </span>{' '}
              </div>
              <img
                className="direct-chat-img rounded-circle"
                src={info.profileImg}
                alt="message user image"
                width="30"
                height="30"
              />
              <div className="direct-chat-text">{chatBubble.content}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    chat: state.chat.chat,
    messages: state.message.messages,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getChat: id => dispatch(fetchSingleChat(id)),
    getMessages: id => dispatch(fetchMessages(id))
  }
}

export default connect(mapState, mapDispatch)(Message)

//https://bbbootstrap.com/snippets/awesome-chat-messages-box-43788219  --> styling
