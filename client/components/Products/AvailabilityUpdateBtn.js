//single product --> in component: product.sellerId === req.user.id && <AvailabilityUpdateBtn/>
//listings
//--> selected: current availability status of product

//PROPS --> SINGLE PRODUCT

//logic to add buyerId if status changes to "Sold"

//pass in product req.body object including all necessary fields (including user)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../../store/product'
import AssignBuyer from './AssignBuyer'

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
    // ADD CONDITION: IF VALUE = AVAILABLE / RESERVED
    if (evt.target.value === 'Available' || evt.target.value === 'Reserved') {
      this.props.updateProduct({...this.state, availability: evt.target.value})
      //IS THIS OK TO USE
      window.location.reload()
    }
  }
  render() {
    const {handleChange} = this
    const {availability} = this.state
    return (
      <div className="mt-2">
        <form>
          <div className="form-group">
            <label className="text-muted" htmlFor="availability">
              Availability
            </label>
            <select
              name="availability"
              className="form-control select-dropdown"
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
        {this.state.availability === 'Sold' &&
          this.props.product.availability !== 'Sold' && (
            <AssignBuyer product={this.props.product} />
          )}
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
