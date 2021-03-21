import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export class AllChats extends Component {
  constructor() {
    super()
    this.state = {chats: []}
    //state or props will populate with chats objects connected to that user once components mount
    //once chats are populated the map function will map through every chat
    //each chat has a link, that navigates to the specific single chat based on chat id
  }
  render() {
    return (
      <div>
        <h3>All chats</h3>
        <ul>
          {this.state.chats.map(chat => {
            return (
              <li key={chat.id}>
                <Link to={`/chat/${chat.id}`}>{chat.senderName}</Link>
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
  return {}
}

export default connect(mapState)(AllChats)
