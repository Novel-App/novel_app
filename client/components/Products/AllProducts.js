import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/product'
import {Link} from 'react-router-dom'

//add a product icon --> links to add product component

class AllProducts extends Component {
  constructor() {
    super()
    // this.filterProducts = this.filterProducts.bind(this)
  }
  componentDidMount() {
    this.props.loadProducts()
  }
  // filterProducts(checkPoint, centerPoint, km) {
  //   const ky = 40000 / 360
  //   const kx = Math.cos(Math.PI * centerPoint[0] / 180.0) * ky
  //   const dx = Math.abs(centerPoint[1] - checkPoint[1]) * kx
  //   const dy = Math.abs(centerPoint[0] - checkPoint[0]) * ky
  //   return Math.sqrt(dx * dx + dy * dy) <= km
  // }

  render() {
    let products = this.props.products || []
    if (products.length === 0) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    //filter products within 3km from user location
    // products = this.props.products.filter(product =>
    //   this.filterProducts(
    //     product.seller.coordinates,
    //     this.props.user.coordinates,
    //     3
    //   )
    // )

    return (
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            {products.map(product => (
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img
                    className="card-img-top"
                    alt={product.title}
                    src={product.image}
                  />
                  <h1 className="card-title">{product.title}</h1>
                </Link>
                <h2 className="card-subtitle mb-2 text-muted">
                  by {product.author}
                </h2>
                <h3>{product.createdAt}</h3>
                <h3>${product.price}</h3>
                <h3>♡: {product.numFavorites}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    products: state.products.all
  }
}

const mapDispatch = dispatch => {
  return {
    loadProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
