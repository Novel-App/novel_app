import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewChat} from '../../store/chat'
import history from '../../history'

class AddChat extends Component {
  constructor() {
    super()
    this.state = {
      createdChat: false
    }
    this.addClickHandler = this.addClickHandler.bind(this)
  }
  addClickHandler = async (browserId, productId) => {
    await this.props.addNewChat(browserId, productId)
    this.setState({createdChat: !this.state.createdChat})
  }
  componentDidUpdate() {
    if (this.state.createdChat && this.props.chat.id) {
      history.push(`/chats/${this.props.chat.id}`)
    }
  }
  render() {
    const {browserId, productId} = this.props
    return (
      <div>
        <button
          className="btn btn-outline-primary rounded"
          type="submit"
          onClick={() => this.addClickHandler(browserId, productId)}
        >
          Chat
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
