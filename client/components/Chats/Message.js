import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleChat} from '../../store/chat'
import moment from 'moment'

export class Message extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.props.getChat(this.props.message.chatId)
  }
  render() {
    const {message, chat} = this.props
    console.log('MESSAGE', message)

    const currUser = chat.users
      ? chat.users.filter(user => user.message.authorId === message.authorId)
      : [{profile: '', firstName: '', lastName: ''}]

    const firstName = currUser[0].firstName || ''
    const profileImg = currUser[0].profileImage || ''
    const msgContent = message.content || ''

    return (
      <div className="box-body">
        <div className="direct-chat-info clearfix">
          {' '}
          <span className="direct-chat-name pull-left">{firstName}</span>{' '}
          <span className="direct-chat-timestamp pull-right">
            {moment(moment().format('YYYY-MM-DD HH:mm:ss')).fromNow()}
          </span>{' '}
        </div>
        <img
          className="direct-chat-img rounded-circle"
          src={profileImg}
          alt="message user image"
          width="30"
          height="30"
        />
        <div className="direct-chat-text">{msgContent}</div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    chat: state.chat.chat
  }
}

const mapDispatch = dispatch => {
  return {
    getChat: id => dispatch(fetchSingleChat(id))
  }
}

export default connect(mapState, mapDispatch)(Message)

//https://bbbootstrap.com/snippets/awesome-chat-messages-box-43788219  --> styling
