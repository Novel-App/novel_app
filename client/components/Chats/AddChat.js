import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewChat, fetchSingleChat} from '../../store/chat'

class AddChat extends React.Component {
  constructor() {
    super()
    this.state = {
      gotNewChat: false
    }

    this.addClickHandler = this.addClickHandler.bind(this)
  }

  addClickHandler = (browserId, productId) => {
    this.props.addNewChat(browserId, productId)
    this.setState({gotNewChat: true})
    console.log('after change the state', this.props.chat)
  }

  render() {
    console.log('rendering Addchat.....')
    console.log('new added chatid', this.props.chat)
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

const mapState = state => {
  return {
    chat: state.chat.chat
  }
}

const mapDispatch = dispatch => {
  return {
    addNewChat: (browserId, productId) =>
      dispatch(addNewChat(browserId, productId))
  }
}
export default connect(null, mapDispatch)(AddChat)
