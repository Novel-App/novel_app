import React, {Component} from 'react'
import {connect} from 'react-redux'
import Message from './Message'

/**
 * COMPONENT
 */
export class SingleChat extends Component {
  constructor() {
    super()
    this.state = {messages: []}
    //state or props will populate with messages objects connected to specific singleChat
    //once message are populated the map function will map through every message
    //need to ensure that we're sorting messages by send time
  }
  render() {
    return (
      <div>
        <h3>Single Chat</h3>
        {/* displays messages */}
        {this.state.messages.map(message => {
          return (
            <div key={message.id}>
              {/* displays message, sender name and sender profile image */}
              {/* need to sort messages by send time */}
              <Message message={message} />
            </div>
          )
        })}
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

export default connect(mapState)(SingleChat)
