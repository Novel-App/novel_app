//select options to add buyerId if status changes to "Sold"

//pass this into AvailabilityUpdateBtn (conditional, if state availability === sold)
//get chats by productId

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../../store/product'
import {fetchChatsByProduct} from '../../store/chat'

class AssignBuyer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.product
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.loadChatsByProduct(this.props.product.id)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updateProduct({
      ...this.props.product,
      availability: 'Sold',
      buyerId: evt.target.buyerId.value
    })
    //IS THIS OK TO USE
    window.location.reload()
  }
  render() {
    return (
      <div>
        <p>Deal completed!</p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="buyerId">Who bought your book?</label>
            <select name="buyerId" className="form-select" required>
              {this.props.chats.map(chat => {
                return (
                  <option key={chat.id} value={chat.users[0].id}>
                    {chat.users[0].firstName}
                  </option>
                )
              })}
            </select>
          </div>
          <button type="submit">Submit</button>
          {/* <div name="buyerId" className="form-check" >
          {this.props.chats.map(chat => {
                return (
                        <div key={chat.id} >
                        <input className="form-check-input" type="radio" value={chat.users[0].id} />
                        <label className="form-check-label" htmlFor="buyerId">
                            {chat.users[0].firstName}
                        </label>
                        </div>
                )
              })}
           </div>
            <button type="submit">Submit</button> */}
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    chats: state.chat.chats
  }
}

const mapDispatch = dispatch => {
  return {
    loadChatsByProduct: productId => dispatch(fetchChatsByProduct(productId)),
    updateProduct: product => dispatch(updateProduct(product))
  }
}

export default connect(mapState, mapDispatch)(AssignBuyer)
