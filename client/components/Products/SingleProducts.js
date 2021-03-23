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
    //or params or the product passed in from props
    let productId = this.props.match.params.id
    this.props.loadProduct(productId)
    this.setState({loading: false})
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
    const barginStatus = product.canBargin
      ? 'Price negotiable'
      : 'Price non-negotiable'
    return (
      <>
        <img className="card-img-top" alt={product.title} src={product.image} />
        <h1 className="card-title">{product.title}</h1>
        <h2 className="card-subtitle mb-2 text-muted">by {product.author}</h2>
        <p>{product.createdAt}</p>
        <p>{barginStatus}</p>
        <p>${product.price}</p>
        <p>{product.description}</p>
        <p>♡: {product.numFavorites}</p>
      </>
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
