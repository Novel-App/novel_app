import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewChat, fetchSingleChat} from '../../store/chat'
import history from '../../history'

class AddChat extends React.Component {
  constructor() {
    super()
    this.state = {
      createdChat: false
    }
    this.addClickHandler = this.addClickHandler.bind(this)
  }
  addClickHandler = (browserId, productId) => {
    this.props.addNewChat(browserId, productId)
    this.setState({createdChat: !this.state.createdChat})
  }
  componentDidUpdate() {
    if (this.state.createdChat && this.props.chat.id) {
      history.push(`/messages/${this.props.chat.id}`)
    }
  }
  render() {
    const {browserId, productId} = this.props
    return (
      <div>
        <button
          className="btn-primary"
          type="submit"
          onClick={() => this.addClickHandler(browserId, productId)}
        >
          {this.props.chat.id ? 'Start A New Chat' : 'Continue Chat'}
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
export default connect(mapState, mapDispatch)(AddChat)
