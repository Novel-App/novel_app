import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewChat} from '../../store/chat'

class AddChat extends React.Component {
  constructor() {
    super()
    this.state = {}

    this.addClickHandler = this.addClickHandler.bind(this)
  }

  addClickHandler = (browerId, productId) => {
    this.props.addNewChat(browerId, productId)
  }

  render() {
    console.log('rendering Addchat.....')
    const {browerId, productId} = this.props
    return (
      <div>
        <button
          type="submit"
          onClick={() => this.addClickHandler(browerId, productId)}
        >
          Start A New Chat
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addNewChat: (browerId, productId) =>
      dispatch(addNewChat(browerId, productId))
  }
}
export default connect(null, mapDispatch)(AddChat)
