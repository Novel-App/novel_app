import React from 'react'

export default function Message(props) {
  const message = props.message

  return (
    <li className>
      <div className>
        <a href="#">
          <img src={message.sender.image} alt="image" />
        </a>
      </div>
      <div>
        <h4>{message.sender.name}</h4>
        {message.content}
      </div>
    </li>
  )
}
