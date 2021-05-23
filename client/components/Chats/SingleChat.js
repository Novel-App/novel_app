import React, {Component} from 'react'
import {connect} from 'react-redux'
import Message from './Message'
import {sendMessage, fetchMessages} from '../../store/message'
import {fetchSingleChat} from '../../store/chat'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export class SingleChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      messageSent: false,
      loading: true
    }

    //state or props will populate with messages objects connected to specific singleChat
    //once message are populated the map function will map through every message
    //need to ensure that we're sorting messages by send time
    this.handleChange = this.handleChange.bind(this)
    this.submitChatMessage = this.submitChatMessage.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  componentDidMount() {
    const chatId = Number(this.props.match.params.chatId)
    this.props.getMessages(chatId)
    this.props.getChat(chatId)
    this.setState({loading: false})
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  handleChange(e) {
    this.setState({
      content: e.target.value
    })
  }

  submitChatMessage(e) {
    e.preventDefault()
    this.props.sendMessage({
      ...this.state,
      authorId: this.props.user.id,
      chatId: this.props.chat.id
    })
    const chatId = Number(this.props.match.params.chatId)
    this.props.getChat(chatId)
    this.setState({content: '', messageSent: true})
    this.scrollToBottom()
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest'
    })
  }

  render() {
    const chat = this.props.chat || {}

    return (
      <React.Fragment>
        <div>
          <div className="d-flex justify-content-between w-90">
            <Link to="/chats/">
              <div className="mt-1 ml-2">
                <i
                  className="bi bi-arrow-left-circle"
                  style={{fontSize: '3em'}}
                />
              </div>
            </Link>
          </div>
        </div>
        <div style={{maxWidth: '800px', margin: '0 auto'}}>
          {chat.product && (
            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                  <img
                    src={chat.product.image[0]}
                    className="card-img"
                    alt="product-img"
                    style={{height: '15vh', width: 'auto'}}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <Link to={`/products/${chat.product.id}`}>
                      <h5 className="card-title">
                        {chat.product.title} by {chat.product.author}
                      </h5>
                    </Link>
                    <p className="card-text text-muted">
                      ${chat.product.price}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        {chat.product.availability}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="px-md-3 messages-box">
            <div
              className="list-unstyled"
              style={{height: '300px', overflowY: 'auto'}}
            >
              <Message
                className="mr-3"
                chatId={this.props.match.params.chatId}
              />
              <div
                ref={el => {
                  this.messagesEnd = el
                }}
              />
            </div>
          </div>
          <br />
          <div className="input-group mb-3 d-flex justify-content-end">
            <div
              className="d-flex justify-content-end"
              onSubmit={this.submitChatMessage}
            >
              <div className="align-items-center">
                <input
                  id="messageTextarea"
                  className="form-control"
                  placeholder="Enter your message"
                  type="text"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-outline-secondary d-flex justify-content-end ml-3"
                  onClick={this.submitChatMessage}
                >
                  send
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    chat: state.chat.chat,
    messages: state.message.messages,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getMessages: chatId => dispatch(fetchMessages(chatId)),
    sendMessage: message => dispatch(sendMessage(message)),
    getChat: id => dispatch(fetchSingleChat(id))
  }
}

export default connect(mapState, mapDispatch)(SingleChat)
