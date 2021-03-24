import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/product'
import {Link} from 'react-router-dom'
import {fetchUserProducts} from '../../store/userInfo'

class AllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      currentPage: ''
    }
  }
  componentDidMount() {
    const path = this.props.match.path.slice(1)
    const userId = this.props.user.id
    this.setState({currentPage: path})
    path === 'products'
      ? this.props.loadProducts(userId)
      : this.props.loadUserProducts(userId, path)
    this.setState({loading: false})
  }

  render() {
    //loading screen
    if (this.state.loading === true) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    //only display certain buttons if listing page is true
    let products = []
    let noProducts = ''
    let currentPage = this.state.currentPage
    if (currentPage === 'favorites') {
      products = this.props.favorites
      noProducts = (
        <>
          <h2>You do not have any favorite products</h2>
          <p>Browse products and heart some books!</p>
        </>
      )
    } else if (currentPage === 'products') {
      products = this.props.products
      noProducts = <h2>There are no products being sold in your area</h2>
    } else if (currentPage === 'purchases') {
      products = this.props.purchases
      noProducts = <h2>You do not have any past purchases</h2>
    }
    //if there are no products sold
    if (products.length === 0) {
      return <div>{noProducts}</div>
    }
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
    products: state.products.all,
    favorites: state.userInfo.favorites,
    purchases: state.userInfo.purchases
  }
}

const mapDispatch = dispatch => {
  return {
    loadProducts: () => dispatch(fetchProducts()),
    loadUserProducts: (userId, type) =>
      dispatch(fetchUserProducts(userId, type))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
