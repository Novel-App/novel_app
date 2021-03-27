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
    <div>
      <span>{moment(moment().format('YYYY-MM-DD HH:mm:ss')).fromNow()}</span>
      <img src={currUser[0].profile} />
      <p>{currUser[0].firstName} </p>
      <p>{message.content}</p>
    </div>
  )
}
