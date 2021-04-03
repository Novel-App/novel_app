import React, {Component} from 'react'
import {connect} from 'react-redux'
import Message from './Message'
import {sendMessage, fetchMessages, updateUnread} from '../../store/message'
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
      unread: true,
      messageSent: false
    }
    //state or props will populate with messages objects connected to specific singleChat
    //once message are populated the map function will map through every message
    //need to ensure that we're sorting messages by send time
    this.handleChange = this.handleChange.bind(this)
    this.submitChatMessage = this.submitChatMessage.bind(this)
  }

  componentDidMount() {
    const chatId = Number(this.props.match.params.chatId)
    this.props.getMessages(chatId)
    this.props.getChat(chatId)
    console.log('helo!')
    this.props.updateUnread(this.props.chatId)
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({behavior: 'smooth'})
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
  }
  render() {
    const chat = this.props.chat || {}
    console.log(this.props, 'these are my props')
    // const chatId = this.props.match.params.chatId
    return (
      <React.Fragment>
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
          <div className="px-md-3" id="messages">
            <ul
              id="messageFeed"
              className="list-unstyled"
              style={{height: '200px', overflowY: 'scroll'}}
            >
              <Message
                className="mr-3"
                chatId={this.props.match.params.chatId}
              />
              <div
                ref={el => {
                  this.messagesEnd = el
                }}
                // style={{float: 'left', clear: 'both'}}
              />
            </ul>
            <div className="input-group mb-3">
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
                <div className="input-group-append">
                  <button
                    type="submit"
                    className="btn btn-outline-secondary d-flex justify-content-end"
                    onClick={this.submitChatMessage}
                  >
                    {/* <Icon type="enter" /> */}
                    send
                  </button>
                </div>
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
    getChat: id => dispatch(fetchSingleChat(id)),
    updateUnread: id => dispatch(updateUnread(id))
  }
}

export default connect(mapState, mapDispatch)(SingleChat)
