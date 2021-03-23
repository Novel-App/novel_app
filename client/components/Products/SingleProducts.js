//refer to carrotmarket wireframe!
//top card: small seller profile picture, name/id, reviewScore  [[extra: checkmark icons for email/location verified]]
//image slides
//body card: title, author, isbn, genre, condition, condition info icon to hover, description
//bottom card: favorites button, numFavorites, price, can bargain, chat button

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../../store/product'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    try {
      this.props.loadProduct(this.props.match.params.id)
      this.setState({loading: false})
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    if (this.state.loading === true) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    const product = this.props.product
    const barginStatus = product.canBargin ? 'negotiable' : 'non-negotiable'
    return (
      <div className="container">
        <div className="mb-5">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                className="img-fluid rounded"
                data-src="holder.js/200x250?theme=thumb"
                alt={product.title}
                src={product.image}
              />
            </div>
            <div className="col-md-5">
              <h2 className="mb-0 text-dark">{product.title}</h2>
              <div className="mb-0 text-dark">by {product.author}</div>
              <div className="mb-0 text-dark">{product.createdAt}</div>
              <div className="mb-0 text-dark">{barginStatus}</div>
              <div className="mb-0 text-dark">${product.price}</div>
              <div className="mb-0 text-dark">♡: </div>
              <p className="pt-1 text-dark">{product.description}</p>
              {/* if user does not equal sellers id then render button to buy product */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    product: state.products.single
  }
}

const mapDispatch = dispatch => {
  return {
    loadProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
