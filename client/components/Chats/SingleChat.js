import React, {Component} from 'react'
import {connect} from 'react-redux'
import Message from './Message'
import {Form, Icon, Input, Button, Row, Col} from 'antd'
import {sendMessage, fetchMessages} from '../../store/message'
import {fetchSingleChat} from '../../store/chat'
import socket from '../../socket'

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
    this.props.getMessages(chatId)
    this.props.getChat(chatId)
    this.setState({content: '', messageSent: true})
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <h3>Single Chat</h3>
        </div>

        <div style={{maxWidth: '800px', margin: '0 auto'}}>
          <div
            className="infinite-container"
            style={{height: '500px', overflowY: 'scroll'}}
          >
            <Message chatId={this.props.match.params.chatId} />
            <div
              ref={el => {
                this.messagesEnd = el
              }}
              style={{float: 'left', clear: 'both'}}
            />
          </div>

          <Row>
            <Form layout="inline" onSubmit={this.submitChatMessage}>
              <Col span={18}>
                <Input
                  id="message"
                  placeholder="Enter your message"
                  type="text"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </Col>
              <Col span={2}>
                {/* {a dropdown icon for uploading pictures or videos} */}
              </Col>
              <Col span={4}>
                <Button type="submit" onClick={this.submitChatMessage}>
                  {/* <Icon type="enter" /> */}
                  send
                </Button>
              </Col>
            </Form>
          </Row>
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
