//single product --> in component: product.sellerId === req.user.id && <AvailabilityUpdateBtn/>
//listings
//--> selected: current availability status of product

//PROPS --> SINGLE PRODUCT

//logic to add buyerId if status changes to "Sold"

//pass in product req.body object including all necessary fields (including user)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateProduct} from '../../store/product'

class AvailabilityUpdateBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.product
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
    this.props.updateProduct({...this.state, availability: evt.target.value})
  }
  render() {
    const {handleChange} = this
    const {availability} = this.state
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="availability">Availability</label>
            <select
              name="availability"
              className="form-control"
              onChange={handleChange}
              value={availability}
              required
            >
              <option value="Available">Available</option>
              <option value="Reserved">Reserved</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateProduct: product => dispatch(updateProduct(product))
  }
}

export default connect(mapState, mapDispatch)(AvailabilityUpdateBtn)