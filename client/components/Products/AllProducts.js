import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/product'
import {Link} from 'react-router-dom'
import {fetchUserProducts} from '../../store/userInfo'
import AddChat from '../Chats/AddChat'

class AllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      currentPage: ''
      // isClicked: false,
      // buttonsIcons: {
      //   notFavorite:{icon: },
      //   favorite: {icon: }
      //}
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

      //click handler for favorite
      // clickHandler = (event) =>{
      //     this.setState({
      //        isClicked:!this.state.isClicked // toggles when you click
      //      });
      //   }
    }
    return (
      <div className="container">
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
        <h5>Add a product</h5>
        <div />
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          {products.map(product => (
            <div key={product.id}>
              <div className="col-mb-6">
                <div className="card">
                  <Link to={`/products/${product.id}`}>
                    <img
                      className="card-img-top mx-auto"
                      alt={product.title}
                      src={product.image}
                    />
                    <h3 className="card-title text-center">{product.title}</h3>
                  </Link>
                  <h4 className="card-subtitle mb-2 text-muted text-center">
                    {product.author}
                  </h4>
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-text">{product.createdAt}</h5>
                      <h5 className="card-text">${product.price}</h5>
                      <h5 className="card-text">♡: {product.numFavorites}</h5>
                    </div>
                    <AddChat
                      productId={product.id}
                      browserId={this.props.user.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
