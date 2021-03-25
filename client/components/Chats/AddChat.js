import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewChat} from '../../store/chat'

class AddChat extends React.Component {
  constructor() {
    super()
    this.state = {}

    this.addClickHandler = this.addClickHandler.bind(this)
  }

  addClickHandler = (browserId, productId) => {
    this.props.addNewChat(browserId, productId)
  }

  render() {
    console.log('rendering Addchat.....')
    const {browserId, productId} = this.props
    return (
      <div>
        <button
          type="submit"
          onClick={() => this.addClickHandler(browserId, productId)}
        >
          Start A New Chat
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addNewChat: (browserId, productId) =>
      dispatch(addNewChat(browserId, productId))
  }
}
export default connect(null, mapDispatch)(AddChat)
