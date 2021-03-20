import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/products'
import {Link} from 'react-router-dom'

//add a product icon --> links to add product component

class AllProducts extends Component {
  constructor() {
    super()
    this.filterProducts = this.filterProducts.bind(this)
  }
  componentDidMount() {
    this.props.loadProducts()
  }
  filterProducts(checkPoint, centerPoint, km) {
    const ky = 40000 / 360
    const kx = Math.cos(Math.PI * centerPoint.latitude / 180.0) * ky
    const dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx
    const dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky
    return Math.sqrt(dx * dx + dy * dy) <= km
  }

  render() {
    if (!this.props.products) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    //filter products within 3km from user location
    const products = this.props.products.filter(product =>
      this.filterProducts(
        product.user.coordinates,
        this.props.user.coordinates,
        3
      )
    )
    return (
      <div>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img alt={product.title} src={product.image} />
                <h1>{product.title}</h1>
                <h2>by {product.author}</h2>
                <h3>{product.createdAt}</h3>
                <h3>${product.price}</h3>
                <h3>♡: {product.numFavorites}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    products: state.all
  }
}

const mapDispatch = dispatch => {
  return {
    loadProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
