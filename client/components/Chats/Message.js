import React from 'react'
import moment from 'moment'

export default function Message(props) {
  const {message, chat} = props
  const users = chat.users || []
  const currUser =
    users.length > 0
      ? users.filter(user => user.message.id === message.id)
      : [{profile: '', firstName: '', lastName: ''}]

  return (
    <div className="box-body">
      <div className="direct-chat-info clearfix">
        {' '}
        <span className="direct-chat-name pull-left">
          {currUser[0].firstName}
        </span>{' '}
        <span className="direct-chat-timestamp pull-right">
          {moment(moment().format('YYYY-MM-DD HH:mm:ss')).fromNow()}
        </span>{' '}
      </div>
      <img
        className="direct-chat-img rounded-circle"
        src={currUser[0].profileImage}
        alt="message user image"
        width="30"
        height="30"
      />
      <div className="direct-chat-text">{message.content}</div>
    </div>
  )
}

//https://bbbootstrap.com/snippets/awesome-chat-messages-box-43788219  --> styling
