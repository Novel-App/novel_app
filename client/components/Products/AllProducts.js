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
      <div className="d-flex flex-column">
        <Link to="/products/add">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="bi bi-plus-circle-fill"
            viewBox="0 0 16 16"
            // alignself="right"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
          </svg>
        </Link>
        {/* <div className="row">
        <div className="col-sm-6">
          <div className="card"> */}
        {products.map(product => (
          // <div key={product.id}>
          <div className="row" key={product.id}>
            <div className="col-sm-6">
              <div className="card">
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
            </div>
          </div>
        ))}
      </div>
      //   </div>
      // </div>
      // </div>
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
