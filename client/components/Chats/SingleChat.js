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
      messages: []
    }
    //state or props will populate with messages objects connected to specific singleChat
    //once message are populated the map function will map through every message
    //need to ensure that we're sorting messages by send time
    this.handleChange = this.handleChange.bind(this)
    this.submitChactMessage = this.submitChactMessage.bind(this)
  }

  componentDidMount() {
    console.log('comDidMount.....')
    // console.log(this.props.getMessages)
    const chatId = Number(this.props.match.params.chatId) // 3
    const messages = this.props.getMessages(chatId)
    this.setState({messages: messages})
  }

  handleChange() {}

  submitChactMessage() {}

  render() {
    console.log('rendering singlechat...')
    return (
      // <div>
      //   <h3>Single Chat</h3>
      //   {/* displays messages */}
      //   <div>
      //     {this.state.messages.map(message => {
      //       return (
      //         <div key={message.id}>
      //           {/* displays message, sender name and sender profile image */}
      //           {/* need to sort messages by send time */}
      //           <Message message={message} />
      //         </div>
      //       )
      //     })}
      //   </div>

      <Row>
        <Form layout="inline" onSubmit={this.submitChactMessage}>
          <Col span={18}>
            <Input
              id="message"
              placeholder="Enter your message"
              type="text"
              // value={this.state.message}
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
      // </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    messages: state.messages
  }
}

const mapDispatch = dispatch => {
  return {
    getMessages: chatId => dispatch(fetchMessages(chatId)),
    sendMessage: message => dispatch(sendMessage(message))
  }
}

export default connect(mapState, mapDispatch)(SingleChat)
