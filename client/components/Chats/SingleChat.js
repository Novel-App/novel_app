import React, {Component} from 'react'
import {connect} from 'react-redux'
import Message from './Message'
import {Form, Icon, Input, Button, Row, Col} from 'antd'
import {sendMessage, fetchMessages} from '../../store/message'

/**
 * COMPONENT
 */
export class SingleChat extends Component {
  constructor() {
    super()
    this.state = {
      messages: [
        {
          content: 'Love this book!',
          unread: false,
          createdAt: '2021-03-23T16:14:30.003Z',
          updatedAt: '2021-03-23T16:14:30.003Z',
          authorId: 5,
          chatId: 3
        },
        {
          content: 'Same! Are you looking to buy this?',
          unread: true,
          createdAt: '2021-03-23T16:14:30.003Z',
          updatedAt: '2021-03-23T16:14:30.003Z',
          authorId: 3,
          chatId: 3
        }
      ]
    }
    //state or props will populate with messages objects connected to specific singleChat
    //once message are populated the map function will map through every message
    //need to ensure that we're sorting messages by send time
    this.handleChange = this.handleChange.bind(this)
    this.submitChactMessage = this.submitChactMessage.bind(this)
  }

  // componentDidMount() {
  //   console.log('comDidMount.....')
  //   // console.log(this.props.getMessages)
  //   const chatId = Number(this.props.match.params.chatId) // 3
  //   const messages = this.props.getMessages(chatId)
  //   //this.setState({messages: messages})
  // }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({behavior: 'smooth'})
  }

  handleChange() {}

  submitChactMessage() {}

  render() {
    // const messages = this.props.location.chat.chat.users
    // console.log ('---',messages)
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
            {this.state.messages
              ? this.state.messages.map(message => {
                  return <Message key={message.authorId} message={message} />
                })
              : ''}
            <div
              ref={el => {
                this.messagesEnd = el
              }}
              style={{float: 'left', clear: 'both'}}
            />
          </div>

          <Row>
            <Form layout="inline" onSubmit={this.submitChactMessage}>
              <Col span={18}>
                <Input
                  id="message"
                  placeholder="Enter your message"
                  type="text"
                  value={this.state.message}
                  onChange={this.handleChange}
                />
              </Col>
              <Col span={2}>
                {/* {a dropdown icon for uploading pictures or videos} */}
              </Col>
              <Col span={4}>
                <Button type="submit" onClick={this.submitChactMessage}>
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
    messages: state.messages
    //users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    getMessages: chatId => dispatch(fetchMessages(chatId)),
    sendMessage: message => dispatch(sendMessage(message))
  }
}

export default connect(mapState, mapDispatch)(SingleChat)
